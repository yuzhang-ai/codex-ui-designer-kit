# H5 / 移动 Web 样本分析

采集日期：2026-06-23
样本数量：8
截图数量：16
当前状态：已修复 UTF-8 乱码，并重新标注质量层级。

## 总结

H5 / 移动 Web 样本适合提炼移动端单任务流程：用户在手机上快速理解页面、填写/选择/提交、看到结果或下一步。它们不应该反向影响后台或 CRM 的工作台结构。

## 样本清单

| sample_id | 产品 | 页面类型 | 质量层级 | 截图 |
|---|---|---|---|---|
| h5-jotform-templates | Jotform Templates | Form template gallery | weak-sample | samples/raw-screenshots/h5-mobile-web/h5-jotform-templates__desktop.png |
| h5-tally-templates | Tally | Form template gallery | code-backed | samples/raw-screenshots/h5-mobile-web/h5-tally-templates__desktop.png |
| h5-framer-marketplace | Framer | Template marketplace | strong-reference | samples/raw-screenshots/h5-mobile-web/h5-framer-marketplace__desktop.png |
| h5-webflow-showcase | Webflow | Showcase gallery | visual-only | samples/raw-screenshots/h5-mobile-web/h5-webflow-showcase__desktop.png |
| h5-stripe-payments | Stripe Payments | Payments product page | visual-only | samples/raw-screenshots/h5-mobile-web/h5-stripe-payments__desktop.png |
| h5-linear-home | Linear | Responsive product page | strong-reference | samples/raw-screenshots/h5-mobile-web/h5-linear-home__desktop.png |
| h5-notion-product | Notion | Product page | strong-reference | samples/raw-screenshots/h5-mobile-web/h5-notion-product__desktop.png |
| h5-beehiiv | beehiiv | Newsletter SaaS landing | visual-only | samples/raw-screenshots/h5-mobile-web/h5-beehiiv__desktop.png |

## 可提炼模式

- 移动页必须收敛到一个主任务和一个主 CTA。
- 表单/选择/提交要包含字段校验、提交中、成功、失败、返回路径。
- 移动端按钮高度至少 44px，底部固定操作要避开安全区。
- 页面视觉可以更轻盈，但不能牺牲可读性和对比度。

## 质量风险

- H5 样本中的 marketing hero 很容易污染后台设计，使用时必须限定场景。
- Jotform 样本结构信息不足，降为 weak-sample。
- 外链、表单提交和客户信息采集必须人工确认。

## 对 Codex 的使用建议

1. 遇到移动表单、报告、任务页、轻量工具时，先选 `recipes/mobile-notes-app.md` 或对应 H5 规则。
2. notes/task 类移动工具优先匹配 `mobile-app/notes-workbench`。
3. 设置/表单页可匹配 `settings/settings-form-page`，但要单列化并补齐提交状态。
4. 不要把 H5 的大 hero 套到后台、CRM 或数据看板上。
