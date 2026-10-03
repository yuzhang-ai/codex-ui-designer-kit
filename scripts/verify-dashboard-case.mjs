import { spawnSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { qaFailures } from './qa-contract.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const caseDir = path.join(root, 'examples/ugly-saas-dashboard');
const outDir = path.resolve(process.argv[2] || path.join(caseDir, '.design/current-run'));
if (outDir === path.join(caseDir, '.design')) throw new Error('Use a separate run directory; preserve historical evidence.');
if (typeof WebSocket !== 'function') throw new Error('Use Node.js >=22.');
function run(script, args) {
  const result = spawnSync(process.execPath, [path.join(root, 'scripts', script), ...args], {cwd: root, encoding: 'utf8', timeout: 90000});
  if (result.status !== 0) throw new Error(`${script}: ${result.stderr || result.error || 'nonzero exit'}`);
}
try {
  for (const file of ['original.html', 'improved.html', 'UI_AUDIT.md', 'DESIGN.md', 'PATTERN_MATCH.md', 'VISUAL_SCORECARD.md']) await fs.access(path.join(caseDir, file));
  run('visual-audit.mjs', ['--file', path.join(caseDir, 'original.html'), '--name', 'before', '--out', outDir]);
  run('visual-audit.mjs', ['--file', path.join(caseDir, 'improved.html'), '--name', 'after', '--out', outDir]);
  const before = JSON.parse(await fs.readFile(path.join(outDir, 'before-qa.json'), 'utf8'));
  const after = JSON.parse(await fs.readFile(path.join(outDir, 'after-qa.json'), 'utf8'));
  const beforeFailures = qaFailures(before), afterFailures = qaFailures(after);
  const integrityFailures = [];
  for (const name of ['before', 'after']) for (const view of ['desktop', 'mobile']) {
    const png = await fs.readFile(path.join(outDir, 'screenshots', `${name}-${view}.png`));
    const expected = view === 'desktop' ? [1440, 1000] : [390, 844];
    if (png.length < 24 || !png.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) || png.readUInt32BE(16) !== expected[0] || png.readUInt32BE(20) !== expected[1]) integrityFailures.push(`${name}-${view}: invalid PNG or dimensions`);
  }
  if (!beforeFailures.includes('mobile: horizontalScroll')) integrityFailures.push('baseline mobile overflow was not detected');
  if (!beforeFailures.some(item => item.includes('smallButtons'))) integrityFailures.push('baseline small buttons were not detected');
  run('compare-before-after.mjs', ['--out', outDir]);
  run('generate-ui-report.mjs', ['--caseDir', caseDir, '--designDir', outDir, '--out', path.join(outDir, 'UI_DELIVERY_REPORT.md')]);
  const result = {status: afterFailures.length || integrityFailures.length ? 'Failed' : 'Candidate', evidenceLevel: 'real browser render via isolated headless Chrome/Edge; screenshot review and human scoring separate', capturedAt: after.capturedAt, runtime: process.version, beforeFailures, afterFailures, integrityFailures, humanReview: 'pending', interactionCoverage: 'not implemented: static mock HTML', metrics: {before: Object.fromEntries(['desktop', 'mobile'].map(v=>[v, {smallButtons: before[v].smallButtons.length, scrollWidth: before[v].scrollWidth, expectedWidth: before[v].expectedViewport.width}])), after: Object.fromEntries(['desktop','mobile'].map(v=>[v, {smallButtons: after[v].smallButtons.length, scrollWidth: after[v].scrollWidth, expectedWidth: after[v].expectedViewport.width}]))}};
  await fs.writeFile(path.join(outDir, 'verification.json'), JSON.stringify(result, null, 2), 'utf8');
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.status === 'Failed' ? 1 : 0;
} catch(error) { console.error(error.message); process.exitCode = 1; }
