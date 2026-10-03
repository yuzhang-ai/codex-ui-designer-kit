# Reviewable AI workbench playbook

This is a generic protocol example with a synthetic title change. It contains no model, backend, production editor, private asset or external integration. Use it with `ai-workbench/chat-history-runner`; retain the host application's components and tokens. A passing contract does not certify a deployed product.

## Choose and describe the task

Choose this flow when applying an AI proposal requires review because of its consequences and the current authorization. Ordinary authorized local reversible edits do not automatically require this protocol. A chat-only answer can finish at output review; a changing task needs a target, proposed diff and confirmation. Keep familiar form/table/editor controls for precision work. Additional voice/suggestion entry points may share this protocol but are not implemented by this example.

Keep four concerns visible: task and target; run progress; proposed result; applied artifact. Chat text is not the canonical document. Context identifies the document/node/selected device/version and supported operation. Do not add a new branded component library for these concerns.

## State and action contract

| State | User-facing meaning | Allowed action | Required evidence |
|---|---|---|---|
| empty | No active task | Choose target and submit | Target + capabilities + readiness |
| running | Proposal being prepared | Stop | Run identity and bounded progress |
| needs-review | Valid proposal, not written | Inspect diff, approve, reject | Fresh base revision, exact scope/device, schema and safety checks |
| reviewed | User approved this proposal | Apply once, cancel | Approval bound to current run/proposal |
| applying | Write submitted; completion pending | Observe, reconcile uncertainty | Receipt and target readback, not assistant prose |
| accepted | Target matches intended result | View change, Undo/Redo | Content/revision match; restore evidence |
| cancelled | Stopped before write | Start a new task | Zero writes, late completion rejected |
| unknown | Write may already have happened | Read-only reconciliation | No replay or new write until outcome known |
| error | Invalid/unsupported proposal | Correct input/schema, start fresh | Precise reason; zero unintended writes |

Compile/schema failure keeps Apply unavailable. Re-fetch the exact capability/schema and fresh artifact observation; do not guess fields or loosen validation. A no-op adds neither history item nor write. Cancel after a submitted write must not claim rollback; reconcile then use explicit Undo if needed. The reference allows one outstanding write and one atomic artifact change, not concurrency, partial batch apply or persistent recovery.

## UI and evidence mapping

- PromptComposer: goal + target, capability limits and disabled reason.
- RunStatusTimeline: operation, run identity, progress, stop reason. Never use an HTTP-ready signal as end-to-end success.
- ArtifactPreview: before/after diff, target identity, revision, device; preview has zero writes.
- ReviewGate: explicit approve/reject; keep risky Apply separate from conversational Send.
- OutputPanel: applying/accepted/unknown feedback; do not display accepted until exact readback.
- ContextPanel: same canonical artifact facts as the host editor, not a second ad-hoc document store.
- Evidence item: stable element/node ID, action, expected change, actual readback, failure and next probe. Screenshots supplement facts; they do not replace them.

## Reproduce the synthetic QA

From repository root, with Node >=22:

```powershell
node scripts/verify-ai-workbench-case.mjs examples/ai-workbench-review/.design/current-run
node --test tests/ai-workbench-contract.test.mjs
```

Exit0 is a synthetic Candidate. Exit1 is a contract failure, timeout or invalid/missing test result. `verification.json` states the evidence tier and dynamically counted tests; `contract-tests.txt` records positive/negative checks. No dependencies, browser, provider credentials or billing calls are used. Existing dashboard rendering remains covered by its separate verifier.

## Acceptance matrix before adapting this to a real product

| Requirement | Synthetic machine check | Real browser/host evidence still needed | Human result |
|---|---|---|---|
| Readiness/capability before submit | missing readiness rejected | Actual host handshake and disabled UI | |
| Preview has zero writes | checked | Preview/diff bound to actual selected element | |
| Approval and one apply | checked | Apply gate really blocks writer; one receipt/history step | |
| Stale/scope/device mismatch | checked | Change selection/revision while preview open; rejected write | |
| Invalid/unsafe proposal | checked | Real schema and sandbox/compiler refusal; zero network/write | |
| Applied result/readback | exact fixture checked | Actual artifact + save/reload/version readback | |
| Undo/Redo | fixture restoration checked | Actual history and visible restored content | |
| Cancel/late callback | checked | Persistent stop, delayed response and zero unexpected writes | |
| Unknown result | no replay checked | Disconnect during write; durable reconciliation | |
| No-op | zero history/write checked | Same artifact duplicate proposal; disabled/no-op feedback | |
| Desktop/tablet/mobile preview | identity only | Device geometry and documented scaling/reflow policy | |
| Visual/accessibility quality | not checked | Screenshots, keyboard, contrast, focus and small targets | |

Reviewer, date, measured completion time, error count, human score and feedback remain blank. Do not invent user preference or business uplift. Mark unsupported tests HOLD rather than PASS. Before external use, additionally review privacy, recipient/target, version, permissions and irreversible actions.

## Boundaries and failure handling

The flags `schemaValid`, `safe`, `ready` represent injected mock facts, not real security validation. A production adapter must obtain them from authoritative host/schema/compiler evidence. The reducer is a teaching reference, not a drop-in security or authorization system. Stop after two same-family failures without new evidence, write the reason chain and choose one discriminating probe. Record each acceptance unit's exact environment/version, evidence tier and untested scope.
