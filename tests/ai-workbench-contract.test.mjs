import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession, transition} from '../examples/ai-workbench-review/session-contract.mjs';
const identity = {runId: 'mock-run-1', scope: 'mock-document', device: 'desktop'};
const start = () => transition(createSession(), {type: 'START', ready: true, ...identity});
const preview = s => transition(s, {type: 'PREVIEW', ...identity, baseRevision: 0, schemaValid: true, safe: true, document: {title: 'Synthetic revision'}});
const approved = () => transition(preview(start()), {type: 'APPROVE', runId: identity.runId});
const apply = s => transition(s, {type: 'APPLY', ...identity, currentRevision: 0});
function blocked(s, e, match) { const old = structuredClone(s); assert.throws(()=>transition(s,e), match); assert.deepEqual(s,old); }

test('requires readiness and target before running',()=> blocked(createSession(), {type:'START',...identity,ready:false}, /readiness/));
test('preview does not write; apply needs approval',()=> {const s=preview(start()); assert.equal(s.writes,0); blocked(s,{type:'APPLY',...identity,currentRevision:0},/approval/);});
test('one apply remains pending until exact readback; undo redo restore',()=> {
  const s=apply(approved()); assert.equal(s.phase,'applying'); assert.equal(s.history.length,1); assert.equal(s.writes,1);
  blocked(s,{type:'READBACK',...identity,revision:1,document:{title:'wrong'}},/mismatch/);
  const accepted=transition(s,{type:'READBACK',...identity,revision:1,document:s.document});
  const undo=transition(accepted,{type:'UNDO'}), redo=transition(undo,{type:'REDO'});
  assert.equal(undo.document.title,'Synthetic draft'); assert.deepEqual(redo.document,s.document); assert.equal(redo.history.length,1);
});
test('duplicate apply cannot produce a second write',()=>blocked(apply(approved()),{type:'APPLY',...identity,currentRevision:1},/approval/));
test('stale revision, wrong device and wrong scope never apply',()=> {
  for (const patch of [{currentRevision:2},{device:'mobile'},{scope:'other'}]) blocked(approved(),{type:'APPLY',...identity,currentRevision:0,...patch},/stale|target/);
});
test('invalid and unsafe proposals do not write',()=> {
  for(const patch of [{schemaValid:false},{safe:false}]) blocked(start(),{type:'PREVIEW',...identity,baseRevision:0,schemaValid:true,safe:true,document:{title:'blocked'},...patch},/invalid|unsafe/);
});
test('cancel before apply rejects late completion without writes',()=> {const s=transition(start(),{type:'CANCEL'}); assert.equal(s.writes,0); blocked(s,{type:'PREVIEW',...identity,baseRevision:0,schemaValid:true,safe:true,document:{title:'late'}},/late/);});
test('unknown outcome blocks replay and new run until read-only reconciliation',()=> {
  const s=transition(apply(approved()),{type:'UNKNOWN'});
  blocked(s,{type:'APPLY',...identity,currentRevision:1},/approval/);
  blocked(s,{type:'START',...identity,ready:true},/startable/);
  const reconciled=transition(s,{type:'RECONCILE',...identity,revision:1,document:s.document}); assert.equal(reconciled.writes,1); assert.equal(reconciled.phase,'accepted');
});
test('readback and reconciliation reject matching content from wrong scope or device',()=> {
  const applying=apply(approved());
  for (const type of ['READBACK','RECONCILE']) {
    const s=type==='READBACK'?applying:transition(applying,{type:'UNKNOWN'});
    for (const patch of [{scope:'other-document'},{device:'mobile'}]) {
      blocked(s,{type,...identity,revision:s.revision,document:s.document,...patch},/wrong target/);
      assert.equal(s.writes,1);
    }
  }
});
test('cancel after write stays unknown rather than claiming rollback',()=>assert.equal(transition(apply(approved()),{type:'CANCEL'}).phase,'unknown'));
test('no-op proposal adds no write or history item',()=> {
  const s=transition(start(),{type:'PREVIEW',...identity,baseRevision:0,schemaValid:true,safe:true,document:{title:'Synthetic draft'}});
  const a=apply(transition(s,{type:'APPROVE',runId:identity.runId})); assert.equal(a.writes,0); assert.equal(a.history.length,0);
});
