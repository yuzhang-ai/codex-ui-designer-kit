# UI AUDIT

## Summary

- Product type: SaaS / CRM-style customer success dashboard.
- User role: customer success manager reviewing account health and follow-up tasks.
- Primary task: find at-risk accounts and decide next action.
- Current UI quality: functional but prototype-like, visually noisy, not safe for customer operations.

## Findings

| Priority | Area | Issue | Evidence | Recommended Fix |
|---|---|---|---|---|
| P1 | Information hierarchy | Hero dominates the page but does not help the dashboard task. | Huge title and gradient appear before filters, metrics, or account list. | Replace with compact workbench header and task summary. |
| P1 | Risk operations | Export, delete, and email blast are ordinary tiny buttons. | High-risk actions sit beside refresh/settings without confirmation. | Separate dangerous actions and label human review. |
| P1 | Mobile | Page has `min-width: 1100px`, causing horizontal scroll. | Original CSS forces desktop width. | Use responsive single-column layout and cardified table rows. |
| P2 | Metrics | KPI cards lack period, comparison, and explanation. | Values are large but ambiguous. | Add KPI labels, comparisons, and notes. |
| P2 | Table scanability | Rows do not expose clear status or next action. | Status text is inconsistent and long. | Add stable health tags, owner, last touch, and action buttons. |
| P2 | States | No loading, empty, error, disabled, hover, or selected state plan. | Original UI only shows happy path. | Add state section and implementation hooks. |

## Risk Review

- Uses mock account names only.
- Export, bulk email, delete, CRM writeback, and permission changes must require human confirmation.
- Delivery screenshots must be checked for customer data and internal URLs.

