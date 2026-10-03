// Synthetic reference protocol only. No provider, network or persistence adapter.
export function createSession(document = { title: 'Synthetic draft' }) {
  return { phase: 'empty', revision: 0, document: structuredClone(document), runId: null, scope: null, device: null, proposal: null, approved: false, history: [], cursor: 0, writes: 0 };
}
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function require(condition, reason) { if (!condition) throw new Error(reason); }
export function transition(input, event) {
  const s = structuredClone(input);
  if (event.type === 'START') {
    require(['empty','error','cancelled','accepted'].includes(s.phase), 'run not startable');
    require(event.ready === true && event.runId && event.scope && ['desktop','tablet','mobile'].includes(event.device), 'readiness or scope missing');
    s.phase = 'running'; s.runId = event.runId; s.scope = event.scope; s.device = event.device; s.proposal = null; s.approved = false;
  } else if (event.type === 'PREVIEW') {
    require(s.phase === 'running' && event.runId === s.runId, 'late or wrong run');
    require(event.baseRevision === s.revision && event.scope === s.scope && event.device === s.device, 'stale or wrong target');
    require(event.schemaValid === true && event.safe === true && typeof event.document?.title === 'string', 'invalid or unsafe preview');
    s.proposal = { document: structuredClone(event.document), baseRevision: event.baseRevision }; s.phase = 'needs-review';
  } else if (event.type === 'APPROVE') {
    require(s.phase === 'needs-review' && event.runId === s.runId, 'approval without preview');
    s.approved = true; s.phase = 'reviewed';
  } else if (event.type === 'APPLY') {
    require(s.phase === 'reviewed' && s.approved && event.runId === s.runId, 'apply without current approval');
    require(event.currentRevision === s.revision && s.proposal.baseRevision === s.revision && event.scope === s.scope && event.device === s.device, 'stale or wrong target');
    if (equal(s.document, s.proposal.document)) { s.phase = 'accepted'; return s; }
    s.history = s.history.slice(0, s.cursor);
    s.history.push({ before: structuredClone(s.document), after: structuredClone(s.proposal.document) });
    s.cursor++; s.document = structuredClone(s.proposal.document); s.revision++; s.writes++; s.phase = 'applying';
  } else if (event.type === 'READBACK' || event.type === 'RECONCILE') {
    require((event.type === 'READBACK' ? s.phase === 'applying' : s.phase === 'unknown') && event.runId === s.runId, 'no pending write');
    require(event.scope === s.scope && event.device === s.device, 'readback wrong target');
    require(event.revision === s.revision && equal(event.document, s.document), 'readback mismatch');
    s.phase = 'accepted';
  } else if (event.type === 'CANCEL') {
    require(['running','needs-review','reviewed','applying'].includes(s.phase), 'nothing to cancel');
    s.phase = s.phase === 'applying' ? 'unknown' : 'cancelled'; s.approved = false;
  } else if (event.type === 'UNKNOWN') {
    require(s.phase === 'applying', 'no write outcome to reconcile'); s.phase = 'unknown';
  } else if (event.type === 'REJECT') {
    require(['running','needs-review','reviewed'].includes(s.phase), 'rejection in wrong phase'); s.phase = 'error'; s.approved = false;
  } else if (event.type === 'UNDO') {
    require(s.phase === 'accepted' && s.cursor > 0, 'no accepted change to undo');
    s.cursor--; s.document = structuredClone(s.history[s.cursor].before); s.revision++; s.writes++;
  } else if (event.type === 'REDO') {
    require(s.phase === 'accepted' && s.cursor < s.history.length, 'nothing to redo');
    s.document = structuredClone(s.history[s.cursor].after); s.cursor++; s.revision++; s.writes++;
  } else throw new Error('unsupported event');
  return s;
}
