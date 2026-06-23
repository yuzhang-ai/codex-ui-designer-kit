import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const desktopViewport = { width: 1440, height: 1000 };
const mobileViewport = { width: 390, height: 844 };
const desktopUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';
const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const [key, inline] = arg.slice(2).split('=');
    args[key] = inline ?? argv[++i] ?? true;
  }
  return args;
}

async function existingPath(candidates) {
  for (const candidate of candidates.filter(Boolean)) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {}
  }
  return null;
}

async function findChrome() {
  return await existingPath([
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ]);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = new Map();
    this.opened = new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
    this.ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const pending = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message || JSON.stringify(message.error)));
        else pending.resolve(message.result || {});
        return;
      }
      if (message.method && this.waiters.has(message.method)) {
        for (const waiter of this.waiters.get(message.method)) waiter.resolve(message.params || {});
        this.waiters.delete(message.method);
      }
    });
  }

  async send(method, params = {}, timeoutMs = 30000) {
    await this.opened;
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out`));
      }, timeoutMs);
      this.pending.set(id, {
        resolve: value => {
          clearTimeout(timer);
          resolve(value);
        },
        reject: error => {
          clearTimeout(timer);
          reject(error);
        },
      });
    });
  }

  waitEvent(method, timeoutMs = 20000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`${method} timed out`)), timeoutMs);
      const waiter = {
        resolve: value => {
          clearTimeout(timer);
          resolve(value);
        },
      };
      const list = this.waiters.get(method) || [];
      list.push(waiter);
      this.waiters.set(method, list);
    });
  }

  close() {
    try {
      this.ws.close();
    } catch {}
  }
}

async function waitForChrome(port) {
  for (let i = 0; i < 80; i++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return await response.json();
    } catch {}
    await delay(250);
  }
  throw new Error('Chrome remote debugging endpoint did not start');
}

async function newPage(port) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
  if (!response.ok) throw new Error(`Cannot create Chrome target: ${response.status}`);
  const target = await response.json();
  const page = new CdpClient(target.webSocketDebuggerUrl);
  await page.opened;
  await page.send('Page.enable');
  await page.send('Runtime.enable');
  await page.send('Network.enable');
  return page;
}

async function applyViewport(page, viewport, mobile) {
  await page.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
  await page.send('Emulation.setTouchEmulationEnabled', { enabled: mobile });
  await page.send('Network.setUserAgentOverride', { userAgent: mobile ? mobileUA : desktopUA });
}

async function navigate(page, url) {
  const load = page.waitEvent('Page.loadEventFired', 20000).catch(error => error);
  await page.send('Page.navigate', { url });
  await load;
  await delay(1000);
}

async function evaluate(page, expression) {
  const result = await page.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) throw new Error('Runtime evaluation failed');
  return result.result?.value;
}

const qaExpression = `(() => {
  const clean = value => String(value || '').replace(/\\s+/g, ' ').trim();
  const viewport = { width: window.innerWidth, height: window.innerHeight };
  const root = document.documentElement;
  const body = document.body;
  const text = clean(body?.innerText || '');
  const visible = el => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
  };
  const textOverflow = Array.from(document.querySelectorAll('body *')).filter(visible).filter(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 40 || rect.height < 8) return false;
    if (!clean(el.innerText || el.textContent)) return false;
    return el.scrollWidth > el.clientWidth + 2;
  }).slice(0, 12).map(el => ({
    tag: el.tagName.toLowerCase(),
    text: clean(el.innerText || el.textContent).slice(0, 80),
    clientWidth: el.clientWidth,
    scrollWidth: el.scrollWidth,
  }));
  const smallButtons = Array.from(document.querySelectorAll('button,a,[role="button"],input[type="button"],input[type="submit"]')).filter(visible).filter(el => {
    const rect = el.getBoundingClientRect();
    const text = clean(el.innerText || el.value || el.getAttribute('aria-label') || '');
    if (!text) return false;
    return rect.height < 36 || rect.width < 36;
  }).slice(0, 12).map(el => {
    const rect = el.getBoundingClientRect();
    return { tag: el.tagName.toLowerCase(), text: clean(el.innerText || el.value || el.getAttribute('aria-label') || '').slice(0, 60), width: Math.round(rect.width), height: Math.round(rect.height) };
  });
  const blockingFixed = Array.from(document.querySelectorAll('body *')).filter(visible).filter(el => {
    const style = getComputedStyle(el);
    if (!['fixed', 'sticky'].includes(style.position)) return false;
    const rect = el.getBoundingClientRect();
    const area = rect.width * rect.height;
    return area > viewport.width * viewport.height * 0.32;
  }).slice(0, 8).map(el => {
    const rect = el.getBoundingClientRect();
    return { tag: el.tagName.toLowerCase(), text: clean(el.innerText || el.getAttribute('aria-label') || '').slice(0, 60), width: Math.round(rect.width), height: Math.round(rect.height) };
  });
  return {
    title: document.title || '',
    url: location.href,
    viewport,
    bodyTextLength: text.length,
    bodyTextSample: text.slice(0, 240),
    horizontalScroll: root.scrollWidth > viewport.width + 2 || body.scrollWidth > viewport.width + 2,
    scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
    textOverflow,
    smallButtons,
    blockingFixed,
    hasMain: !!document.querySelector('main,[role="main"]'),
  };
})()`;

async function captureAndAudit(page, url, viewport, mobile, outPath) {
  await applyViewport(page, viewport, mobile);
  await navigate(page, url);
  const qa = await evaluate(page, qaExpression);
  const shot = await page.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
    fromSurface: true,
  });
  await fs.writeFile(outPath, Buffer.from(shot.data, 'base64'));
  const stat = await fs.stat(outPath);
  qa.screenshotPath = outPath;
  qa.screenshotBytes = stat.size;
  qa.blankRisk = qa.bodyTextLength < 20 || stat.size < 8000;
  return qa;
}

function statusIcon(ok) {
  return ok ? 'PASS' : 'FAIL';
}

function listItems(items, render) {
  if (!items?.length) return '- None';
  return items.map(render).join('\n');
}

async function writeReport({ outDir, name, url, desktop, mobile }) {
  const report = `# UI QA REPORT

Target: ${url}

## Screenshots

- Desktop: ${path.relative(outDir, desktop.screenshotPath).replaceAll('\\', '/')}
- Mobile: ${path.relative(outDir, mobile.screenshotPath).replaceAll('\\', '/')}

## Desktop Checks

- ${statusIcon(!desktop.blankRisk)} blank / loading risk: body text ${desktop.bodyTextLength}, screenshot ${desktop.screenshotBytes} bytes
- ${statusIcon(!desktop.horizontalScroll)} horizontal scroll: scrollWidth ${desktop.scrollWidth}, viewport ${desktop.viewport.width}
- ${statusIcon(desktop.textOverflow.length === 0)} text overflow candidates: ${desktop.textOverflow.length}
- ${statusIcon(desktop.smallButtons.length === 0)} small button candidates: ${desktop.smallButtons.length}
- ${statusIcon(desktop.blockingFixed.length === 0)} large fixed overlay candidates: ${desktop.blockingFixed.length}

## Mobile Checks

- ${statusIcon(!mobile.blankRisk)} blank / loading risk: body text ${mobile.bodyTextLength}, screenshot ${mobile.screenshotBytes} bytes
- ${statusIcon(!mobile.horizontalScroll)} horizontal scroll: scrollWidth ${mobile.scrollWidth}, viewport ${mobile.viewport.width}
- ${statusIcon(mobile.textOverflow.length === 0)} text overflow candidates: ${mobile.textOverflow.length}
- ${statusIcon(mobile.smallButtons.length === 0)} small button candidates: ${mobile.smallButtons.length}
- ${statusIcon(mobile.blockingFixed.length === 0)} large fixed overlay candidates: ${mobile.blockingFixed.length}

## Text Overflow Candidates

### Desktop
${listItems(desktop.textOverflow, item => `- ${item.tag}: "${item.text}" (${item.clientWidth}/${item.scrollWidth})`)}

### Mobile
${listItems(mobile.textOverflow, item => `- ${item.tag}: "${item.text}" (${item.clientWidth}/${item.scrollWidth})`)}

## Small Button Candidates

### Desktop
${listItems(desktop.smallButtons, item => `- ${item.tag}: "${item.text}" (${item.width}x${item.height})`)}

### Mobile
${listItems(mobile.smallButtons, item => `- ${item.tag}: "${item.text}" (${item.width}x${item.height})`)}

## Large Fixed Overlay Candidates

### Desktop
${listItems(desktop.blockingFixed, item => `- ${item.tag}: "${item.text}" (${item.width}x${item.height})`)}

### Mobile
${listItems(mobile.blockingFixed, item => `- ${item.tag}: "${item.text}" (${item.width}x${item.height})`)}

## Human Review

- Confirm screenshots do not contain customer data, secrets, internal URLs, or account information.
- Confirm external links, export, bulk-send, writeback, delete, and permission actions are protected by human review when present.
`;
  const reportPath = path.join(outDir, 'UI_QA_REPORT.md');
  const jsonPath = path.join(outDir, `${name}-qa.json`);
  await fs.writeFile(reportPath, report, 'utf8');
  await fs.writeFile(jsonPath, JSON.stringify({ target: url, desktop, mobile }, null, 2), 'utf8');
  return { reportPath, jsonPath };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const input = args.url || args.file;
  if (!input) throw new Error('Usage: node scripts/visual-audit.mjs --url <url> OR --file <html-path> [--name after] [--out .design]');

  const url = args.file ? pathToFileURL(path.resolve(String(args.file))).href : String(input);
  const name = String(args.name || 'page');
  const outDir = path.resolve(String(args.out || '.design'));
  const screenshotsDir = path.join(outDir, 'screenshots');
  await fs.mkdir(screenshotsDir, { recursive: true });

  const chromePath = await findChrome();
  if (!chromePath) throw new Error('Chrome or Edge executable was not found. Set CHROME_PATH if needed.');

  const port = 9400 + Math.floor(Math.random() * 300);
  const userDataDir = path.join(os.tmpdir(), `codex-ui-audit-${Date.now()}`);
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--disable-extensions',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ], { stdio: 'ignore', windowsHide: true });

  let page;
  try {
    await waitForChrome(port);
    page = await newPage(port);
    const desktopPath = path.join(screenshotsDir, `${name}-desktop.png`);
    const mobilePath = path.join(screenshotsDir, `${name}-mobile.png`);
    const desktop = await captureAndAudit(page, url, desktopViewport, false, desktopPath);
    const mobile = await captureAndAudit(page, url, mobileViewport, true, mobilePath);
    const result = await writeReport({ outDir, name, url, desktop, mobile });
    console.log(JSON.stringify({
      target: url,
      desktop: path.relative(process.cwd(), desktopPath).replaceAll('\\', '/'),
      mobile: path.relative(process.cwd(), mobilePath).replaceAll('\\', '/'),
      report: path.relative(process.cwd(), result.reportPath).replaceAll('\\', '/'),
      json: path.relative(process.cwd(), result.jsonPath).replaceAll('\\', '/'),
      desktopIssues: {
        blankRisk: desktop.blankRisk,
        horizontalScroll: desktop.horizontalScroll,
        textOverflow: desktop.textOverflow.length,
        smallButtons: desktop.smallButtons.length,
      },
      mobileIssues: {
        blankRisk: mobile.blankRisk,
        horizontalScroll: mobile.horizontalScroll,
        textOverflow: mobile.textOverflow.length,
        smallButtons: mobile.smallButtons.length,
      },
    }, null, 2));
  } finally {
    page?.close();
    try {
      chrome.kill();
    } catch {}
    const tempRoot = path.resolve(os.tmpdir());
    const profile = path.resolve(userDataDir);
    if (profile.startsWith(tempRoot)) await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch(error => {
  console.error(error.message || error);
  process.exitCode = 1;
});
