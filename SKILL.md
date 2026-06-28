---
name: codex-ui-designer-kit
description: Upgrade rough Codex-built prototypes into product-grade Web, SaaS, dashboard, CRM, AI workbench, mobile, settings, data-table, or app-style UI by selecting a recipe, matching concrete React/Tailwind/shadcn patterns, modifying code, running screenshot QA, and applying a human visual scorecard.
---

# Codex UI Designer Kit

Use this skill when a user has a working but unattractive or prototype-like UI and wants it upgraded into a product-grade interface.

This kit is now pattern-first. Do not rely only on screenshots, abstract rules, or checklists. Select a recipe, select 1-3 patterns, write `PATTERN_MATCH.md`, then design and implement against those concrete patterns.

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

Classify the prototype before designing. Identify both product type and main business object.

| Product type | Signals | Recipe |
|---|---|---|
| SaaS / backend dashboard | objects, tables, filters, batch actions, settings | `recipes/saas-dashboard.md` |
| CRM / customer operations | customers, leads, tickets, follow-ups, tags, permissions | `recipes/crm-customer-ops.md` |
| AI workbench | prompt input, output, model state, history, running/error/retry | `recipes/ai-workbench.md` |
| Data dashboard | KPI cards, charts, filters, anomalies, detail tables | `recipes/data-dashboard.md` |
| Mobile notes/task app | notes, tasks, lightweight app shell, mobile list/detail/edit | `recipes/mobile-notes-app.md` |
| Settings/form | configuration, members, permissions, API keys, webhooks | `recipes/saas-dashboard.md` plus `patterns/settings/settings-form-page` |

If the type is mixed, choose the primary user task first, then borrow secondary patterns.

## Pattern Registry

Read `patterns/registry.json` after selecting the recipe.

Select 1-3 patterns:

- One main layout pattern.
- One domain/content pattern when needed.
- One state or micro-interaction pattern when needed.

Never select a pattern just because it is pretty. Select it because it maps to the user role, business object, workflow, and target codebase.

## Core Workflow

1. Identify product type and main business object.
2. Read the corresponding recipe under `recipes/`.
3. Read `patterns/registry.json`.
4. Select 1-3 patterns and inspect each selected `pattern.md`, `source-map.json`, and `code/README.md`.
5. Output `PATTERN_MATCH.md` using `templates/PATTERN_MATCH.md`.
6. Output `UI_AUDIT.md` using `templates/UI_AUDIT.md`.
7. Output `DESIGN.md` using `templates/DESIGN.md`; it must cite concrete selected patterns.
8. Modify target project code, preserving the existing stack and behavior.
9. Run desktop and mobile screenshot QA with `scripts/visual-audit.mjs`.
10. Fill `VISUAL_SCORECARD.md` using `templates/VISUAL_SCORECARD.md`.
11. If the average visual score is below 4, continue fixing.
12. Output `UI_DELIVERY_REPORT.md` using `templates/UI_DELIVERY_REPORT.md`.

## Reference Selection

Recipes decide which references to read first:

- `references/saas-dashboard-ui.md`
- `references/crm-customer-ops-ui.md`
- `references/ai-workbench-ui.md`
- `references/data-dashboard-ui.md`
- `references/h5-mobile-web-ui.md`
- `references/mini-program-patterns-ui.md`
- `references/app-style-web-ui.md`

Then use shared checklists:

- `checklists/ui-audit-checklist.md`
- `checklists/visual-qa-checklist.md`
- `checklists/product-ui-risk-checklist.md`
- `checklists/mobile-responsive-checklist.md`
- `checklists/customer-data-safety-checklist.md` when customer data, CRM, WeCom, sales, support, or marketing workflows are involved.

## Pattern Match Requirements

`PATTERN_MATCH.md` must explain:

- Product type and main business object.
- Selected recipe and why.
- Selected patterns and why.
- Patterns deliberately not selected.
- How target project objects map to pattern objects.
- Which parts to imitate and which parts not to copy.
- License and source risks.
- Human confirmation points.

## UI Audit Requirements

The audit must cover:

- User role and primary task.
- Information hierarchy.
- Navigation and workflow path.
- Table/list/card scanability.
- Typography, spacing, colors, borders, shadows.
- Component states: loading, empty, error, disabled, hover, selected, needs-review.
- Mobile risks: overflow, small buttons, horizontal scroll, fixed bars.
- Business risks: customer data, permissions, secrets, exports, bulk send, external links.

## DESIGN.md Requirements

The design plan must include:

- Product type, main business object, recipe, and selected patterns.
- Screen structure and layout.
- Main components.
- State plan.
- Desktop and mobile behavior.
- Risk controls and human-review gates.
- Implementation file list.
- License/source constraints from selected patterns.

## Code Modification Rules

- Preserve existing app behavior unless UI improvement requires a small structural change.
- Prefer the codebase's existing framework and component style.
- Do not turn tools or internal apps into landing pages.
- Business tools should default to workbench layouts, not oversized hero pages.
- Avoid decorative gradients, glassmorphism, nested cards, and ornamental UI unless the product category truly calls for it.
- Keep customer data, secrets, internal links, and credentials out of code, screenshots, and reports.
- Do not copy whole open-source repositories into the target project. Extract pattern structure and adapt it.
- React Bits is only for optional micro-interactions. It is not a backend, CRM, or dashboard skeleton.

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

## Human Visual Scorecard

Use `templates/VISUAL_SCORECARD.md` after screenshot QA.

Score 1-5:

- 产品真实感
- 信息层级
- 操作路径
- 组件一致性
- 数据密度
- 状态完整度
- 移动端质量
- 代码可维护性

Average score below 4 means the UI is not ready. Continue fixing before delivery.

## Final Delivery Report

Use `templates/UI_DELIVERY_REPORT.md` and include:

- What changed.
- Recipe and patterns used.
- Before/after screenshots.
- Mechanical QA result.
- Visual scorecard result.
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

## Open Source Source Rules

- Prefer public, license-clear sources that are suitable for learning structure or copy-paste under their license.
- Do not collect private pages, logged-in content, customer data, secrets, or account information.
- Do not copy whole repositories blindly.
- shadcn/ui blocks, shadcn-admin, OpenStatus data-table, Tremor, Origin UI, and React Bits must be represented through `patterns/` and `source-map.json`.
- React Bits carries MIT + Commons Clause risk; default to referencing ideas unless a human approves copying code.
