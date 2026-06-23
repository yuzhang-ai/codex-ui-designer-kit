import { promises as fs } from 'node:fs';
import path from 'node:path';

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

async function pngInfo(file) {
  const buffer = await fs.readFile(file);
  if (buffer.toString('ascii', 1, 4) !== 'PNG') return { width: null, height: null, bytes: buffer.length };
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    bytes: buffer.length,
  };
}

function rel(from, to) {
  return path.relative(from, to).replaceAll('\\', '/');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outDir = path.resolve(String(args.out || '.design'));
  const screenshotsDir = path.resolve(String(args.screenshots || path.join(outDir, 'screenshots')));
  const beforeDesktop = path.resolve(String(args.beforeDesktop || path.join(screenshotsDir, 'before-desktop.png')));
  const beforeMobile = path.resolve(String(args.beforeMobile || path.join(screenshotsDir, 'before-mobile.png')));
  const afterDesktop = path.resolve(String(args.afterDesktop || path.join(screenshotsDir, 'after-desktop.png')));
  const afterMobile = path.resolve(String(args.afterMobile || path.join(screenshotsDir, 'after-mobile.png')));

  const files = [beforeDesktop, beforeMobile, afterDesktop, afterMobile];
  for (const file of files) await fs.access(file);
  await fs.mkdir(outDir, { recursive: true });

  const beforeDesktopInfo = await pngInfo(beforeDesktop);
  const beforeMobileInfo = await pngInfo(beforeMobile);
  const afterDesktopInfo = await pngInfo(afterDesktop);
  const afterMobileInfo = await pngInfo(afterMobile);

  const report = `# BEFORE / AFTER REPORT

## Screenshots

| View | Before | After |
|---|---|---|
| Desktop | ${rel(outDir, beforeDesktop)} | ${rel(outDir, afterDesktop)} |
| Mobile | ${rel(outDir, beforeMobile)} | ${rel(outDir, afterMobile)} |

## Image Metadata

| View | Before Size | After Size |
|---|---:|---:|
| Desktop | ${beforeDesktopInfo.width}x${beforeDesktopInfo.height}, ${beforeDesktopInfo.bytes} bytes | ${afterDesktopInfo.width}x${afterDesktopInfo.height}, ${afterDesktopInfo.bytes} bytes |
| Mobile | ${beforeMobileInfo.width}x${beforeMobileInfo.height}, ${beforeMobileInfo.bytes} bytes | ${afterMobileInfo.width}x${afterMobileInfo.height}, ${afterMobileInfo.bytes} bytes |

## Review Notes

- Confirm the after version improves information architecture, not only color.
- Confirm desktop and mobile screenshots both show usable content.
- Confirm customer data, secrets, internal URLs, and account information are not visible.
- Confirm high-risk operations have human confirmation.
`;

  const reportPath = path.join(outDir, 'BEFORE_AFTER_REPORT.md');
  await fs.writeFile(reportPath, report, 'utf8');
  console.log(JSON.stringify({
    report: rel(process.cwd(), reportPath),
    beforeDesktop: rel(process.cwd(), beforeDesktop),
    afterDesktop: rel(process.cwd(), afterDesktop),
    beforeMobile: rel(process.cwd(), beforeMobile),
    afterMobile: rel(process.cwd(), afterMobile),
  }, null, 2));
}

main().catch(error => {
  console.error(error.message || error);
  process.exitCode = 1;
});
