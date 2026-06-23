import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const workspaceRoot = process.cwd();
const samplesRoot = path.join(workspaceRoot, 'samples');
const screenshotRoot = path.join(samplesRoot, 'raw-screenshots');
const metadataRoot = path.join(samplesRoot, 'metadata');

const desktopViewport = { width: 1440, height: 1000 };
const mobileViewport = { width: 390, height: 844 };

const categoryMap = {
  '01-saas-dashboard': { dir: 'saas-dashboard', label: 'SaaS / 后台系统' },
  '04-data-dashboard': { dir: 'data-dashboard', label: '数据看板' },
  '05-h5-mobile-web': { dir: 'h5-mobile-web', label: 'H5 / 移动 Web' },
  '06-mini-program-patterns': { dir: 'mini-program-patterns', label: '小程序式模式' },
  '07-app-style-web-ui': { dir: 'app-style-web-ui', label: 'App 风格 Web UI' },
};

const samplesByCategory = {
  '05-h5-mobile-web': [
    { sample_id: 'h5-typeform-templates', product: 'Typeform', url: 'https://www.typeform.com/templates/', page_type: 'Form template gallery', focus: 'mobile form / conversion', mobile: true },
    { sample_id: 'h5-tally-templates', product: 'Tally', url: 'https://tally.so/templates', page_type: 'Form template gallery', focus: 'form gallery / lightweight submit', mobile: true },
    { sample_id: 'h5-framer-marketplace', product: 'Framer', url: 'https://www.framer.com/marketplace/', page_type: 'Template marketplace', focus: 'mobile landing / template cards', mobile: true },
    { sample_id: 'h5-webflow-showcase', product: 'Webflow', url: 'https://webflow.com/made-in-webflow', page_type: 'Showcase gallery', focus: 'responsive showcase', mobile: true },
    { sample_id: 'h5-stripe-payments', product: 'Stripe Payments', url: 'https://stripe.com/payments', page_type: 'Payments product page', focus: 'mobile commerce / CTA', mobile: true },
    { sample_id: 'h5-linear-home', product: 'Linear', url: 'https://linear.app/', page_type: 'Responsive product page', focus: 'responsive product page', mobile: true },
    { sample_id: 'h5-notion-product', product: 'Notion', url: 'https://www.notion.com/product', page_type: 'Product page', focus: 'mobile workspace story', mobile: true },
    { sample_id: 'h5-beehiiv', product: 'beehiiv', url: 'https://www.beehiiv.com/', page_type: 'Newsletter SaaS landing', focus: 'newsletter / report style landing', mobile: true },
  ],
  '06-mini-program-patterns': [
    { sample_id: 'mini-wechat-design', product: '微信小程序设计', url: 'https://developers.weixin.qq.com/miniprogram/design/', page_type: 'Design guidelines', focus: '小程序规范、页面结构', mobile: true },
    { sample_id: 'mini-alipay-design', product: '支付宝小程序设计', url: 'https://opendocs.alipay.com/mini/design', page_type: 'Design guidelines', focus: '小程序设计规范', mobile: true },
    { sample_id: 'mini-tdesign', product: 'TDesign MiniProgram', url: 'https://tdesign.tencent.com/miniprogram/overview', page_type: 'Component docs', focus: '组件、表单、列表', mobile: true },
    { sample_id: 'mini-weui', product: 'WeUI', url: 'https://weui.io/', page_type: 'Component demo', focus: '微信风格组件', mobile: true },
    { sample_id: 'mini-vant-weapp', product: 'Vant Weapp', url: 'https://youzan.github.io/vant-weapp/#/home', page_type: 'Component docs', focus: '移动组件库', mobile: true },
    { sample_id: 'mini-ant-mobile-list', product: 'Ant Design Mobile', url: 'https://mobile.ant.design/components/list', page_type: 'Component docs', focus: 'App / 小程序式列表', mobile: true },
  ],
  '07-app-style-web-ui': [
    { sample_id: 'app-todoist', product: 'Todoist', url: 'https://todoist.com/', page_type: 'Productivity app product page', focus: 'productivity app UI', mobile: true },
    { sample_id: 'app-spotify-web', product: 'Spotify Web', url: 'https://open.spotify.com/', page_type: 'Media app shell', focus: 'media app shell', mobile: true },
    { sample_id: 'app-arc', product: 'Arc', url: 'https://arc.net/', page_type: 'Browser app product page', focus: 'browser app product UI', mobile: true },
    { sample_id: 'app-things', product: 'Things', url: 'https://culturedcode.com/things/', page_type: 'Productivity app product page', focus: 'productivity app visual hierarchy', mobile: true },
    { sample_id: 'app-figma-community', product: 'Figma Community', url: 'https://www.figma.com/community', page_type: 'Community browsing', focus: 'community grid / app-like browsing', mobile: true },
    { sample_id: 'app-apple-iphone', product: 'Apple iPhone', url: 'https://www.apple.com/iphone/', page_type: 'Product page', focus: 'app-style product page', mobile: true },
  ],
};

const dataReplacement = {
  sample_id: 'data-posthog-product-analytics',
  product: 'PostHog Product Analytics',
  url: 'https://posthog.com/product/product-analytics',
  category: '04-data-dashboard',
  page_type: 'Product analytics page',
  focus: 'product analytics dashboard / events / funnels',
  mobile: false,
};

const repairReplacements = [
  {
    replace_id: 'saas-linear-roadmap',
    sample: { sample_id: 'saas-linear-changelog', product: 'Linear Changelog', url: 'https://linear.app/changelog', category: '01-saas-dashboard', page_type: 'Product changelog', focus: 'release timeline / product update list', mobile: false },
  },
  {
    replace_id: 'saas-supabase-dashboard-docs',
    sample: { sample_id: 'saas-supabase-docs-database', product: 'Supabase Docs', url: 'https://supabase.com/docs/guides/database/overview', category: '01-saas-dashboard', page_type: 'Platform docs workspace', focus: 'docs navigation / product architecture', mobile: false },
  },
  {
    replace_id: 'saas-airtable-templates',
    sample: { sample_id: 'saas-jira-templates', product: 'Atlassian Jira Templates', url: 'https://www.atlassian.com/software/jira/templates', category: '01-saas-dashboard', page_type: 'Template gallery', focus: 'template cards / filters / work management patterns', mobile: false },
  },
  {
    replace_id: 'saas-posthog-demo',
    sample: { sample_id: 'saas-posthog-session-replay', product: 'PostHog Session Replay', url: 'https://posthog.com/product/session-replay', category: '01-saas-dashboard', page_type: 'Product feature page', focus: 'session replay / event detail / monitoring UI', mobile: false },
  },
  {
    replace_id: 'data-grafana-play',
    sample: { sample_id: 'data-grafana-dashboards', product: 'Grafana Dashboards', url: 'https://grafana.com/grafana/dashboards/', category: '04-data-dashboard', page_type: 'Dashboard gallery', focus: 'dashboard cards / search / filtering', mobile: false },
  },
  {
    replace_id: 'data-metabase-product',
    sample: { sample_id: 'data-redash-dashboards', product: 'Redash Dashboards', url: 'https://redash.io/help/user-guide/dashboards/', category: '04-data-dashboard', page_type: 'Dashboard documentation', focus: 'dashboard layout / widgets / sharing concepts', mobile: false },
  },
  {
    replace_id: 'data-posthog-product-analytics',
    sample: { sample_id: 'data-geckoboard-examples', product: 'Geckoboard Dashboard Examples', url: 'https://www.geckoboard.com/dashboard-examples/', category: '04-data-dashboard', page_type: 'Dashboard examples gallery', focus: 'dashboard examples / KPI cards / team visibility', mobile: false },
  },
  {
    replace_id: 'h5-typeform-templates',
    sample: { sample_id: 'h5-jotform-templates', product: 'Jotform Templates', url: 'https://www.jotform.com/form-templates/', category: '05-h5-mobile-web', page_type: 'Form template gallery', focus: 'mobile form / conversion / template browsing', mobile: true },
  },
  {
    replace_id: 'app-figma-community',
    sample: { sample_id: 'app-product-hunt', product: 'Product Hunt', url: 'https://www.producthunt.com/', category: '07-app-style-web-ui', page_type: 'Community feed', focus: 'app-like browsing / cards / voting / discovery', mobile: true },
  },
];

const cliArgs = process.argv.slice(2);
const onlyCategoriesArg = cliArgs.find(arg => arg.startsWith('--categories='));
const onlyCategories = onlyCategoriesArg
  ? new Set(onlyCategoriesArg.slice('--categories='.length).split(',').map(item => item.trim()).filter(Boolean))
  : null;
const freshPagePerSample = cliArgs.includes('--fresh-page-per-sample');
const skipDataReplacement = cliArgs.includes('--skip-data-replacement');
const runRepairReplacements = cliArgs.includes('--repair-replacements');
const skipCategoryRun = cliArgs.includes('--skip-category-run');

const desktopUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';
const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

function rel(filePath) {
  return path.relative(workspaceRoot, filePath).split(path.sep).join('/');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean);
  return candidates.find(candidate => {
    try {
      return Boolean(candidate && fs.stat(candidate));
    } catch {
      return false;
    }
  });
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

class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
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
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message || JSON.stringify(message.error)));
        else resolve(message.result || {});
        return;
      }
      if (message.method && this.waiters.has(message.method)) {
        for (const waiter of this.waiters.get(message.method)) waiter.resolve(message.params || {});
        this.waiters.delete(message.method);
      }
    });
  }

  async send(method, params = {}) {
    await this.opened;
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out`));
      }, 30000);
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
      const timer = setTimeout(() => {
        const list = this.waiters.get(method) || [];
        this.waiters.set(method, list.filter(waiter => waiter.resolve !== resolve));
        reject(new Error(`${method} timed out`));
      }, timeoutMs);
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
  const versionUrl = `http://127.0.0.1:${port}/json/version`;
  for (let i = 0; i < 80; i++) {
    try {
      const response = await fetch(versionUrl);
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
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.opened;
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Network.enable');
  return client;
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
  await delay(2500);
}

const signalExpression = `(() => {
  const body = document.body;
  const clean = value => String(value || '').replace(/\\s+/g, ' ').trim();
  const pickText = (selector, limit) => Array.from(document.querySelectorAll(selector)).slice(0, limit).map(el => clean(el.innerText || el.textContent)).filter(Boolean).filter(v => v.length <= 140);
  const headings = pickText('h1,h2,h3,[role="heading"]', 12);
  const navItems = pickText('nav a, header a, aside a, [role="navigation"] a', 18);
  const buttonTexts = pickText('button,[role="button"],input[type="button"],input[type="submit"]', 16);
  const styleTargets = Array.from(document.querySelectorAll('body,main,header,nav,aside,section,article,button,a,input,textarea')).slice(0, 80);
  const styles = styleTargets.map(el => {
    const cs = getComputedStyle(el);
    return { color: cs.color, backgroundColor: cs.backgroundColor, fontFamily: cs.fontFamily, fontSize: cs.fontSize, borderRadius: cs.borderRadius, boxShadow: cs.boxShadow, borderColor: cs.borderColor };
  });
  const uniq = arr => Array.from(new Set(arr.filter(Boolean).filter(v => v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent'))).slice(0, 10);
  const rectTargets = Array.from(document.querySelectorAll('nav,aside,header,main,table,form,article,section,[role="table"],[role="grid"]')).slice(0, 50);
  const rects = rectTargets.map(el => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName.toLowerCase(), className: clean(el.className).slice(0, 80), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  });
  const classEls = Array.from(document.querySelectorAll('[class]')).slice(0, 800);
  const countClassIncludes = needle => classEls.filter(el => clean(el.className).toLowerCase().includes(needle)).length;
  const bodyStyle = body ? getComputedStyle(body) : null;
  const text = clean(body && body.innerText || '').slice(0, 4000);
  return {
    title: document.title || '',
    lang: document.documentElement.lang || '',
    viewport: { width: window.innerWidth, height: window.innerHeight },
    url: location.href,
    textSample: text,
    headings,
    nav: { items: navItems, count: navItems.length, sideLikely: rects.some(r => ['nav','aside'].includes(r.tag) && r.w > 120 && r.w < window.innerWidth * 0.45 && r.h > window.innerHeight * 0.35) },
    buttons: buttonTexts,
    components: {
      tables: document.querySelectorAll('table,[role="table"],[role="grid"]').length,
      forms: document.querySelectorAll('form').length,
      inputs: document.querySelectorAll('input,textarea,select,[contenteditable="true"]').length,
      buttons: document.querySelectorAll('button,[role="button"],input[type="button"],input[type="submit"]').length,
      links: document.querySelectorAll('a[href]').length,
      cards: countClassIncludes('card') + document.querySelectorAll('article').length,
      dialogs: document.querySelectorAll('[role="dialog"],dialog').length,
      badges: countClassIncludes('badge') + countClassIncludes('tag') + countClassIncludes('pill') + countClassIncludes('status')
    },
    layout: {
      hasHeader: !!document.querySelector('header'),
      hasLeftNav: rects.some(r => ['aside','nav'].includes(r.tag) && r.x < 140 && r.h > window.innerHeight * 0.35),
      hasMain: !!document.querySelector('main'),
      hasTableLike: !!document.querySelector('table,[role="table"],[role="grid"]'),
      hasFormLike: !!document.querySelector('form,input,textarea,select,[contenteditable="true"]')
    },
    colors: uniq(styles.flatMap(s => [s.color, s.backgroundColor, s.borderColor])),
    fontFamilies: uniq(styles.map(s => s.fontFamily)).slice(0, 5),
    fontSizes: uniq(styles.map(s => s.fontSize)).slice(0, 8),
    radii: uniq(styles.map(s => s.borderRadius)).slice(0, 8),
    shadows: uniq(styles.map(s => s.boxShadow)).filter(v => v !== 'none').slice(0, 5),
    bodyFont: bodyStyle ? { fontFamily: bodyStyle.fontFamily, fontSize: bodyStyle.fontSize, color: bodyStyle.color, backgroundColor: bodyStyle.backgroundColor } : null
  };
})()`;

async function extractSignal(page) {
  const result = await page.send('Runtime.evaluate', {
    expression: signalExpression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) throw new Error('Signal extraction failed');
  return result.result?.value || {};
}

function baseRulesFor(sample, signal) {
  const rules = [];
  const category = sample.category;
  if (signal?.layout?.hasLeftNav || signal?.nav?.sideLikely) rules.push('复杂工作台优先使用左侧主导航 + 顶部上下文操作区，降低跨页面跳转成本');
  if ((signal?.components?.buttons || 0) > 4) rules.push('主要动作和次要动作在视觉权重上分层，避免所有按钮同等强调');
  if ((signal?.components?.forms || 0) > 0 || (signal?.components?.inputs || 0) > 0) rules.push('输入区应靠近结果/反馈区，并提供清晰的提交、取消、重试状态');
  if ((signal?.components?.cards || 0) > 5) rules.push('卡片列表需要一致的缩略信息密度、标签位置和悬停反馈');
  if (category === '04-data-dashboard') rules.push('数据看板应先给结论指标，再给趋势和可下钻明细，异常状态要有解释入口');
  if (category === '05-h5-mobile-web') rules.push('移动首屏只保留一个主任务，CTA 需要落在拇指友好区域并避免被安全区遮挡');
  if (category === '06-mini-program-patterns') rules.push('轻量流程适合列表-详情-提交的短路径，底部导航只放高频任务');
  if (category === '07-app-style-web-ui') rules.push('App 风格 Web 应用稳定的 shell、底部/侧边导航和卡片节奏，让用户感觉可持续使用而不是一次性落地页');
  return [...new Set(rules)].slice(0, 4);
}

function professionalReason(signal) {
  const parts = [];
  if (signal?.headings?.length) parts.push('首屏层级清晰，标题和操作区有明确优先级');
  if (signal?.nav?.items?.length) parts.push('导航结构可扫描，用户能快速判断当前位置和下一步');
  if ((signal?.components?.cards || 0) + (signal?.components?.tables || 0) > 0) parts.push('内容被稳定容器组织，密度和留白相对克制');
  if (signal?.colors?.length) parts.push('颜色主要服务于状态、品牌和行动强调，没有把所有信息都做成同一权重');
  return parts.length ? parts.join('；') : '页面结构较克制，围绕一个明确主任务组织内容';
}

function inferDensity(signal) {
  const c = signal?.components || {};
  if ((c.tables || 0) > 0 || (c.links || 0) > 120) return '高密度：适合后台、表格、筛选和批量处理场景';
  if ((c.cards || 0) > 8 || (c.links || 0) > 60) return '中高密度：以卡片/列表承载多对象浏览';
  return '中低密度：更偏首屏转化、产品说明或聚焦任务';
}

function inferStates(signal) {
  const text = (signal?.textSample || '').toLowerCase();
  const states = [];
  if (text.includes('loading') || text.includes('加载')) states.push('loading');
  if (text.includes('empty') || text.includes('no results') || text.includes('暂无')) states.push('empty');
  if (text.includes('error') || text.includes('failed') || text.includes('失败')) states.push('error');
  if (text.includes('disabled') || text.includes('不可用')) states.push('disabled');
  if ((signal?.components?.badges || 0) > 0) states.push('status badges');
  return states.length ? states.join(' / ') : '首屏未显式暴露，需要后续交互样本补充 hover / selected / error / empty';
}

function buildMetadata(sample, desktopSignal, desktopPath, mobileSignal, mobilePath, status, error) {
  const signal = desktopSignal || mobileSignal || {};
  const category = sample.category;
  const categoryInfo = categoryMap[category];
  const text = (signal.textSample || '').toLowerCase();
  const risk = [];
  if (status !== 'captured') risk.push(status);
  if (/sign in|log in|login|登录|captcha|verify you are human|access denied|forbidden/.test(text)) risk.push('页面包含登录/验证相关入口，仅记录公开首屏，不进行登录或提交');
  if (error) risk.push(error);
  return {
    sample_id: sample.sample_id,
    product_name: sample.product,
    page_url: sample.url,
    resolved_url: signal.url || null,
    page_type: sample.page_type,
    category,
    category_label: categoryInfo.label,
    collection_date: '2026-06-23',
    screenshot_path: desktopPath ? rel(desktopPath) : null,
    mobile_screenshot_path: mobilePath ? rel(mobilePath) : null,
    desktop_viewport: desktopPath ? `${desktopViewport.width}x${desktopViewport.height}` : null,
    mobile_viewport: mobilePath ? `${mobileViewport.width}x${mobileViewport.height}` : null,
    page_main_task: sample.focus,
    user_role: category === '04-data-dashboard' ? '数据分析、运营、管理者' : category === '06-mini-program-patterns' ? '移动端轻量流程用户 / 小程序设计者' : '产品用户 / 内部工具使用者',
    information_architecture: signal.nav?.items?.length ? `导航项示例：${signal.nav.items.slice(0, 8).join(' / ')}；标题层级示例：${(signal.headings || []).slice(0, 6).join(' / ')}` : `标题层级示例：${(signal.headings || []).slice(0, 8).join(' / ') || '首屏标题不明显，需结合截图复核'}`,
    layout_structure: signal.layout?.hasLeftNav ? '左侧导航 + 主内容区 + 顶部/局部操作区' : signal.layout?.hasHeader ? '顶部导航 + 首屏内容区 + 卡片/模块分区' : '单页内容流或嵌入式 demo 结构',
    navigation_pattern: signal.nav?.sideLikely ? '侧边导航 / 工作台型导航' : signal.nav?.count ? '顶部导航 / 分类入口 / 页内锚点' : '导航弱，偏单任务首屏',
    primary_components: {
      headings: signal.headings || [],
      nav_items: signal.nav?.items || [],
      buttons: signal.buttons || [],
      counts: signal.components || {},
    },
    typography_hierarchy: {
      font_families: signal.fontFamilies || [],
      font_sizes: signal.fontSizes || [],
      body_font: signal.bodyFont || null,
    },
    color_characteristics: signal.colors || [],
    spacing_characteristics: signal.layout?.hasLeftNav ? '工作台式分栏，信息密度较高，主区域需要稳定边距和列表节奏' : '首屏留白较多，模块间距服务于叙事和转化',
    radius_shadow_border_characteristics: {
      radii: signal.radii || [],
      shadows: signal.shadows || [],
      note: (signal.shadows || []).length ? '使用阴影强化层级，但应克制用于浮层/卡片' : '更多依赖边框、留白或背景块建立层级',
    },
    table_card_list_density: inferDensity(signal),
    state_design: inferStates(signal),
    why_professional: professionalReason(signal),
    reusable_rules_for_codex_ui_designer_kit: baseRulesFor(sample, signal),
    risk_notes: risk.length ? [...new Set(risk)] : ['公开页面采集；未登录、未提交表单、未采集客户数据或密钥'],
    capture_status: status,
    capture_error: error || null,
  };
}

async function capture(page, sample) {
  await fs.mkdir(path.join(screenshotRoot, categoryMap[sample.category].dir), { recursive: true });
  let desktopSignal = null;
  let mobileSignal = null;
  let desktopPath = null;
  let mobilePath = null;
  const warnings = [];
  let status = 'captured';
  let error = null;
  try {
    await applyViewport(page, desktopViewport, false);
    try {
      await navigate(page, sample.url);
    } catch (navigationError) {
      warnings.push(`desktop navigation warning: ${String(navigationError.message || navigationError).slice(0, 220)}`);
    }
    try {
      desktopSignal = await extractSignal(page);
    } catch (signalError) {
      warnings.push(`desktop signal warning: ${String(signalError.message || signalError).slice(0, 220)}`);
    }
    desktopPath = path.join(screenshotRoot, categoryMap[sample.category].dir, `${sample.sample_id}__desktop.png`);
    const desktopShot = await page.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
    await fs.writeFile(desktopPath, Buffer.from(desktopShot.data, 'base64'));

    if (sample.mobile) {
      await applyViewport(page, mobileViewport, true);
      try {
        await navigate(page, sample.url);
      } catch (navigationError) {
        warnings.push(`mobile navigation warning: ${String(navigationError.message || navigationError).slice(0, 220)}`);
      }
      try {
        mobileSignal = await extractSignal(page);
      } catch (signalError) {
        warnings.push(`mobile signal warning: ${String(signalError.message || signalError).slice(0, 220)}`);
      }
      mobilePath = path.join(screenshotRoot, categoryMap[sample.category].dir, `${sample.sample_id}__mobile.png`);
      const mobileShot = await page.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
      await fs.writeFile(mobilePath, Buffer.from(mobileShot.data, 'base64'));
    }
  } catch (captureError) {
    status = 'capture_failed';
    error = String(captureError.message || captureError).slice(0, 500);
  }
  return buildMetadata(sample, desktopSignal, desktopPath, mobileSignal, mobilePath, status, [error, ...warnings].filter(Boolean).join(' | ') || null);
}

async function writeCategory(category, metas) {
  const file = path.join(metadataRoot, `${categoryMap[category].dir}.json`);
  await fs.writeFile(file, JSON.stringify(metas, null, 2), 'utf8');
  return file;
}

async function main() {
  const chromePath = await existingPath([
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ]);
  if (!chromePath) throw new Error('Chrome or Edge executable was not found');

  await fs.mkdir(metadataRoot, { recursive: true });
  for (const info of Object.values(categoryMap)) await fs.mkdir(path.join(screenshotRoot, info.dir), { recursive: true });

  const port = 9300 + Math.floor(Math.random() * 300);
  const userDataDir = path.join(os.tmpdir(), `codex-ui-capture-${Date.now()}`);
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

    if (!skipDataReplacement && (!onlyCategories || onlyCategories.has('04-data-dashboard'))) {
      const dataFile = path.join(metadataRoot, 'data-dashboard.json');
      try {
        const dataMetas = JSON.parse(await fs.readFile(dataFile, 'utf8'));
        const replacementMeta = await capture(page, dataReplacement);
        const merged = dataMetas.map(meta => meta.sample_id === 'data-mixpanel-analytics' ? replacementMeta : meta);
        if (!merged.some(meta => meta.sample_id === dataReplacement.sample_id)) merged.push(replacementMeta);
        await writeCategory('04-data-dashboard', merged);
        console.log(`[04-data-dashboard] ${replacementMeta.sample_id} -> ${replacementMeta.capture_status}`);
      } catch (error) {
        console.log(`[04-data-dashboard] replacement skipped: ${String(error.message || error)}`);
      }
    }

    if (runRepairReplacements) {
      const replacementsByCategory = new Map();
      for (const item of repairReplacements) {
        if (onlyCategories && !onlyCategories.has(item.sample.category)) continue;
        const meta = await capture(page, item.sample);
        console.log(`[repair] ${item.replace_id} -> ${meta.sample_id} (${meta.capture_status})`);
        if (!replacementsByCategory.has(item.sample.category)) replacementsByCategory.set(item.sample.category, []);
        replacementsByCategory.get(item.sample.category).push({ replace_id: item.replace_id, meta });
        if (freshPagePerSample) {
          try {
            page?.close();
          } catch {}
          page = await newPage(port);
        }
      }
      for (const [category, replacements] of replacementsByCategory.entries()) {
        const file = path.join(metadataRoot, `${categoryMap[category].dir}.json`);
        let existing = [];
        try {
          existing = JSON.parse(await fs.readFile(file, 'utf8'));
        } catch {}
        for (const replacement of replacements) {
          const index = existing.findIndex(meta => meta.sample_id === replacement.replace_id);
          if (index >= 0) existing[index] = replacement.meta;
          else existing.push(replacement.meta);
        }
        await writeCategory(category, existing);
        console.log(`[repair] wrote ${rel(file)}`);
      }
    }

    if (skipCategoryRun) return;

    for (const [category, samples] of Object.entries(samplesByCategory)) {
      if (onlyCategories && !onlyCategories.has(category)) continue;
      const metas = [];
      for (const sample of samples.map(item => ({ ...item, category }))) {
        if (freshPagePerSample) {
          try {
            page?.close();
          } catch {}
          page = await newPage(port);
        }
        const meta = await capture(page, sample);
        metas.push(meta);
        console.log(`[${category}] ${meta.sample_id} -> ${meta.capture_status}`);
      }
      const file = await writeCategory(category, metas);
      console.log(`[${category}] wrote ${rel(file)}`);
    }
  } finally {
    try {
      page?.close();
    } catch {}
    try {
      chrome.kill();
    } catch {}
    const resolvedTemp = path.resolve(os.tmpdir());
    const resolvedProfile = path.resolve(userDataDir);
    if (resolvedProfile.startsWith(resolvedTemp)) {
      await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
