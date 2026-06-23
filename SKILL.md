---
name: codex-ui-designer-kit
description: Upgrade rough Codex-built prototypes into product-grade Web, SaaS, dashboard, CRM, AI workbench, H5/mobile, mini-program-style, or app-style UI by auditing the prototype, matching reference rules, modifying code, and running screenshot QA.
---

# Codex UI Designer Kit

Use this skill when a user has a working but unattractive or prototype-like UI and wants it upgraded into a product-grade interface.

## Trigger When

- The user says a tool, app, demo, dashboard, CRM, H5 page, AI workbench, or internal system "不好看", "像原型", "不够产品化", "帮我改 UI", "make it look professional", or similar.
- The user provides existing code, a local URL, a screenshot, a product description, or a rough demo.
- A Codex-generated frontend works functionally but lacks layout, hierarchy, states, responsive QA, or product polish.

## Inputs

The input can be one or more of:

- Existing codebase.
- Local URL such as `http://localhost:3000`.
- Static HTML file.
- Screenshot of a rough prototype.
- Product description or low-fidelity workflow.
- Before/after target category.

## Product Type Detection

Classify the prototype before designing:

- SaaS / backend dashboard: objects, tables, filters, batch actions, settings.
- CRM / customer operations: customers, leads, tickets, follow-ups, tags, permissions.
- AI workbench: prompt input, output, model state, history, running/error/retry.
- Data dashboard: KPI cards, charts, filters, anomalies, detail tables.
- H5 / mobile Web: mobile landing, form, report, campaign, CTA.
- Mini-program pattern: list-detail-submit-result, bottom nav, lightweight workflow.
- App-style Web UI: shell, feed, cards, persistent navigation, repeated use.

If the type is mixed, choose the primary user task first, then borrow secondary rules.

## Reference Selection

Read only the references needed for the product type:

- `references/saas-dashboard-ui.md`
- `references/crm-customer-ops-ui.md`
- `references/ai-workbench-ui.md`
- `references/data-dashboard-ui.md`
- `references/h5-mobile-web-ui.md`
- `references/mini-program-patterns-ui.md`
- `references/app-style-web-ui.md`

Then use these shared checklists:

- `checklists/ui-audit-checklist.md`
- `checklists/visual-qa-checklist.md`
- `checklists/product-ui-risk-checklist.md`
- `checklists/mobile-responsive-checklist.md`
- `checklists/customer-data-safety-checklist.md` when customer data, CRM, WeCom, sales, support, or marketing workflows are involved.

## Core Workflow

1. Identify product type.
2. Read the prototype: inspect files, running UI, screenshot, or URL.
3. Produce a UI audit using `templates/UI_AUDIT.md`.
4. Match the relevant rule file from `references/`.
5. Produce a design plan using `templates/DESIGN.md`.
6. Modify implementation code.
7. Run screenshot QA on desktop and mobile.
8. Fix visual and responsive issues found by QA.
9. Produce a delivery report using `templates/UI_DELIVERY_REPORT.md`.

## UI Audit Requirements

The audit must cover:

- User role and primary task.
- Information hierarchy.
- Navigation and workflow path.
- Table/list/card scanability.
- Typography, spacing, colors, borders, shadows.
- Component states: loading, empty, error, disabled, hover, selected.
- Mobile risks: overflow, small buttons, horizontal scroll, fixed bars.
- Business risks: customer data, permissions, secrets, exports, bulk send, external links.

## DESIGN.md Requirements

The design plan must include:

- Product type and chosen references.
- Screen structure and layout.
- Main components.
- State plan.
- Desktop and mobile behavior.
- Risk controls and human-review gates.
- Implementation file list.

## Code Modification Rules

- Preserve existing app behavior unless UI improvement requires a small structural change.
- Prefer the codebase's existing framework and component style.
- Do not turn tools or internal apps into landing pages.
- Business tools should default to workbench layouts, not oversized hero pages.
- Avoid decorative gradients, glassmorphism, nested cards, and ornamental UI unless the product category truly calls for it.
- Keep customer data, secrets, internal links, and credentials out of code, screenshots, and reports.

## Screenshot QA

Run `scripts/visual-audit.mjs` when possible:

```bash
node scripts/visual-audit.mjs --url http://localhost:3000 --name after
```

Expected output:

- `.design/screenshots/after-desktop.png`
- `.design/screenshots/after-mobile.png`
- `.design/UI_QA_REPORT.md`

If automation cannot run, manually inspect desktop and mobile screenshots and record the reason.

## Final Delivery Report

Use `templates/UI_DELIVERY_REPORT.md` and include:

- What changed.
- Before/after screenshots.
- QA result.
- Remaining risks.
- Human confirmation items.
- Follow-up improvements.

## Must Ask For Human Review

Always require human confirmation for:

- Customer data display/export/writeback.
- Email, WeCom, SMS, webhook, or bulk-send flows.
- Permission changes, invite/remove member, public sharing.
- Delete, merge, batch update, irreversible actions.
- Secrets, tokens, API keys, internal admin links.
- External-facing copy, dates, links, recipients, legal/financial claims.

