# SaaS / 后台系统样本分析

采集日期：2026-06-23
样本数量：12
截图数量：12
当前状态：已修复 UTF-8 乱码，并按质量层级重新整理。

## 总结

这一组样本最适合提炼“工作台、文档型控制台、模板列表、issue 列表、监控入口”的信息架构。它们能帮助 Codex 判断 SaaS 后台不应该被做成 landing page：主内容应围绕对象列表、筛选、状态、详情入口和可执行操作展开。

## 样本清单

| sample_id | 产品 | 页面类型 | 质量层级 | 截图 |
|---|---|---|---|---|
| saas-linear-changelog | Linear Changelog | Product changelog | strong-reference | samples/raw-screenshots/saas-dashboard/saas-linear-changelog__desktop.png |
| saas-stripe-docs-api | Stripe Docs | Developer docs workspace | strong-reference | samples/raw-screenshots/saas-dashboard/saas-stripe-docs-api__desktop.png |
| saas-vercel-templates | Vercel | Template gallery | code-backed | samples/raw-screenshots/saas-dashboard/saas-vercel-templates__desktop.png |
| saas-supabase-docs-database | Supabase Docs | Platform docs workspace | code-backed | samples/raw-screenshots/saas-dashboard/saas-supabase-docs-database__desktop.png |
| saas-github-next-issues | GitHub Issues | Public issue list | code-backed | samples/raw-screenshots/saas-dashboard/saas-github-next-issues__desktop.png |
| saas-github-issues-feature | GitHub Features | Feature/product page | visual-only | samples/raw-screenshots/saas-dashboard/saas-github-issues-feature__desktop.png |
| saas-notion-templates | Notion | Template gallery | strong-reference | samples/raw-screenshots/saas-dashboard/saas-notion-templates__desktop.png |
| saas-jira-templates | Atlassian Jira Templates | Template gallery | visual-only | samples/raw-screenshots/saas-dashboard/saas-jira-templates__desktop.png |
| saas-retool-templates | Retool | Template gallery | strong-reference | samples/raw-screenshots/saas-dashboard/saas-retool-templates__desktop.png |
| saas-posthog-session-replay | PostHog Session Replay | Product feature page | visual-only | samples/raw-screenshots/saas-dashboard/saas-posthog-session-replay__desktop.png |
| saas-sentry-issues | Sentry | Product feature page | visual-only | samples/raw-screenshots/saas-dashboard/saas-sentry-issues__desktop.png |
| saas-datadog-product | Datadog | Product overview | visual-only | samples/raw-screenshots/saas-dashboard/saas-datadog-product__desktop.png |

## 可提炼模式

- 左侧导航或顶部导航必须服务模块定位，不要只做品牌入口。
- 列表型页面需要搜索、筛选、状态、更新时间、负责人或归属字段。
- 模板/资源 gallery 需要分类、搜索、卡片字段统一和空结果状态。
- 文档型工作台适合“左侧目录 + 正文 + 代码/示例/版本信息”的三段式布局。
- issue / monitoring 类页面适合匹配 `patterns/data-table/faceted-filter-table` 和 `patterns/app-shell/shadcn-dashboard-shell`。

## 质量分层说明

- strong-reference：截图可读、结构明确、可继续作为产品 UI 视觉参考。
- visual-only：视觉方向可参考，但页面偏营销或产品介绍，不能直接约束后台骨架。
- weak-sample：本组暂不把产品介绍页判为 weak，但在 recipe 中必须降权。
- code-backed：可与 shadcn/ui blocks、OpenStatus data-table、shadcn-admin 等代码范式匹配。

## 对 Codex 的使用建议

1. 遇到后台、模板中心、资源列表、issue 列表时，先选 `recipes/saas-dashboard.md`。
2. 优先匹配 `app-shell/shadcn-dashboard-shell`、`app-shell/vite-shadcn-admin-shell`、`data-table/faceted-filter-table`。
3. 不要照搬这些品牌的颜色、logo、插画或营销文案。
4. 若目标项目涉及导出、删除、权限、批量操作，必须加入人工确认闭环。
