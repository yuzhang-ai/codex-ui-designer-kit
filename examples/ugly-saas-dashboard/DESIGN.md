# DESIGN

## Product Type

- Type: SaaS / CRM customer success dashboard.
- Reference files: `references/saas-dashboard-ui.md`, `references/crm-customer-ops-ui.md`, `references/data-dashboard-ui.md`.
- User role: customer success manager.
- Primary task: identify at-risk accounts and create follow-up actions.

## Design Goals

- Turn the prototype from a marketing-like page into a workbench.
- Make account health, ownership, last touch, and next action scanable.
- Add risk controls for export, bulk send, and CRM writeback.

## Screen Structure

- Navigation: dark left shell on desktop; horizontal compact nav on mobile.
- Main content: header, filters, KPI cards, priority accounts table.
- Secondary content: state coverage cards and risk note.
- Primary action: `Create follow-up`.
- Risk area: export is labeled as requiring review.

## Component Plan

| Component | Purpose | Desktop Behavior | Mobile Behavior |
|---|---|---|---|
| Sidebar | Stable app shell | 248px left nav | Sticky top nav with horizontal scroll |
| Filters | Narrow account list | Four-column grid | Single-column controls |
| KPI cards | Show current account health | Four columns | Single-column stack |
| Account table | Review priority accounts | Table with status tags | Cardified rows with labels |
| State cards | Document required UI states | Four columns | Single-column stack |

## State Plan

- Loading: skeleton rows while account data loads.
- Empty: explain filter result and offer clear filters.
- Error: CRM sync failure with retry.
- Disabled: export disabled until manager approval.
- Hover: buttons and nav links provide feedback.
- Selected: active nav and future selected rows.
- Needs human review: export, bulk email, writeback, delete.

## Safety Plan

- All account data is mock.
- Export and external communication require human review.
- No secrets, tokens, internal URLs, or customer data are included.

