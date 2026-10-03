import test from 'node:test';
import assert from 'node:assert/strict';
import { assessViewport, qaFailures } from '../scripts/qa-contract.mjs';

test('mobile layout expanded to 1100 must fail against requested 390', () => {
  const actual = assessViewport({ viewport: { width: 1100 }, scrollWidth: 1100 }, { width: 390, height: 844 });
  assert.equal(actual.horizontalScroll, true);
  assert.equal(actual.layoutViewportMismatch, true);
});
test('two-pixel measurement tolerance and valid viewport pass', () => {
  assert.equal(assessViewport({ viewport: { width: 390 }, scrollWidth: 392 }, { width: 390 }).horizontalScroll, false);
});
test('missing QA never passes', () => {
  assert.equal(qaFailures({}).length, 2);
  assert.ok(qaFailures({desktop: {}, mobile: {}}).length >= 6);
});
test('clean QA passes mechanical contract; overlay still fails', () => {
  const clean = () => ({ blankRisk: false, horizontalScroll: false, layoutViewportMismatch: false, textOverflow: [], smallButtons: [], blockingFixed: [] });
  assert.deepEqual(qaFailures({desktop: clean(), mobile: clean()}), []);
  const mobile = clean(); mobile.blockingFixed.push({tag: 'div'});
  assert.deepEqual(qaFailures({desktop: clean(), mobile}), ['mobile: blockingFixed (1)']);
});
