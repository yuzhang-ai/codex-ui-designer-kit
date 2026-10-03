# Pattern selection for this existing case

- Product: mock customer-success dashboard; primary object: account; task: scan risk and choose follow-up.
- Recipe: `recipes/saas-dashboard.md`, with CRM risk checklist.
- `app-shell/shadcn-dashboard-shell`: compact header/navigation/main structure fits the existing improved page.
- `data-table/faceted-filter-table`: account health/owner/last-touch columns and responsive table-to-card structure.
- `states/loading-empty-error-set`: reference for future functional states; existing state cards are explanations only.
- Scope: retrospective structure mapping for the existing static HTML, not a claim that React/shadcn components or functional filtering were implemented. No new component dependency is necessary for QA closure.
- Excluded: landing-page and decorative animation patterns; they do not help account triage.
- Adoption evidence: `original.html`, `improved.html`, `UI_AUDIT.md`, `DESIGN.md`; visual proof must use the fresh run directory, not old D: paths.
