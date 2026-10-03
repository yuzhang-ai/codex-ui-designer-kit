# Dashboard QA reproduction

## What this case demonstrates

An existing mock dashboard changes from a large hero and fixed desktop width to a compact account workbench. It is static HTML: buttons, filters and state cards do not implement a business workflow, approvals, loading/error transitions or backend persistence. Machine checks validate rendering/layout candidates; they cannot establish those features or customer outcomes.

## Choose the workflow

- Existing before/after HTML: use the paired verifier below. It renders both files, preserves historical evidence, checks PNG dimensions, confirms baseline defects, then reports improved-layout failures.
- A single page or running app: use `visual-audit.mjs --file ...` or `--url ...`; inspect both screenshots and address reported candidates.
- Interactive product: additionally exercise task completion and loading/empty/error/disabled/selected states in a visible browser. That acceptance is outside this static case.
- External data/actions: complete human review before publication or writeback. This case contains mock data only.

## Commands from repository root (PowerShell)

Node.js >=22 is required for built-in WebSocket. Confirm the runtime before running:

```powershell
node --version
node --test tests/qa-contract.test.mjs
node scripts/verify-dashboard-case.mjs examples/ugly-saas-dashboard/.design/recheck
```

Set `CHROME_PATH` to an installed Chrome/Edge executable if automatic Windows discovery fails. The script uses a temporary isolated profile, never an authenticated profile. Do not point `CHROME_PATH` to a profile directory.

Exit 0 means both baseline defects were detected, four fresh screenshot headers/dimensions validated, and after-version mechanical checks passed. Status remains **Candidate**. Exit 1 means command/schema/rendering/layout/integrity failure; inspect stderr and `verification.json` if generated. Capture has a 90-second upper bound per page. Stop after two same-family failures without new evidence and diagnose; do not repeatedly install tools or retry blindly.

Output directory contains before/after QA JSON, separate named QA reports, four screenshots, comparison, Candidate delivery report, and verification.json. The generic UI_QA_REPORT.md is an after/latest compatibility alias; use named reports to compare.

## Metric and human-review boundaries

Measured values: requested vs actual viewport width, scroll width, blank risk, overflow/button/overlay candidate counts, PNG dimensions, capture timestamp/runtime. Candidate counts are heuristic signals, not accessibility certification; screenshot byte size is not a design-quality score. Human scoring remains blank in VISUAL_SCORECARD.md.

| Human test | Before result | After result | Reviewer/date | Evidence/next fix |
|---|---|---|---|---|
| Find at-risk account and next action (time, errors) | | | | |
| Read account on mobile without clipping | | | | |
| Loading/empty/error transitions | | | | |
| Export approval actually prevents action | | | | |
| User feedback and overall preference | | | | |

Known gaps: no interactive implementation or user test; no human score; screenshots show one viewport height, not all scrolled content; no keyboard/contrast/full accessibility audit. The old D: reports remain historical artifacts and must not be reported as this run's evidence.

## Failure fixed in this Candidate

1. Node20 declared supported while global WebSocket was unavailable: minimum now >=22, scripts fail before browser launch with a clear message.
2. Mobile layout expands window.innerWidth to 1100 while physical emulation is 390: old self-relative overflow check falsely passed. Now compare scroll width and layout viewport against the requested viewport.
3. Before QA report overwritten by after: retain named reports alongside compatibility alias.
4. Delivery generator ignored machine failures/pattern/human scoring: includes those inputs and explicitly stays Candidate.
