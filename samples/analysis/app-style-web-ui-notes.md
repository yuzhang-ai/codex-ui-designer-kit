# App 风格 Web UI 样本分析

采集日期：2026-06-23
样本数量：6
截图数量：12
当前状态：已修复 UTF-8 乱码，并重新标注质量层级。

## 总结

App 风格 Web 样本适合提炼稳定 shell、内容 feed、当前选中态、轻量互动和移动端单列体验。它们能帮助 Codex 避免把可反复使用的 Web app 做成一次性展示页。

## 样本清单

| sample_id | 产品 | 页面类型 | 质量层级 | 截图 |
|---|---|---|---|---|
| app-todoist | Todoist | Productivity app product page | visual-only | samples/raw-screenshots/app-style-web-ui/app-todoist__desktop.png |
| app-spotify-web | Spotify Web | Media app shell | strong-reference | samples/raw-screenshots/app-style-web-ui/app-spotify-web__desktop.png |
| app-arc | Arc | Browser app product page | visual-only | samples/raw-screenshots/app-style-web-ui/app-arc__desktop.png |
| app-things | Things | Productivity app product page | visual-only | samples/raw-screenshots/app-style-web-ui/app-things__desktop.png |
| app-product-hunt | Product Hunt | Community feed | strong-reference | samples/raw-screenshots/app-style-web-ui/app-product-hunt__desktop.png |
| app-apple-iphone | Apple iPhone | Product page | visual-only | samples/raw-screenshots/app-style-web-ui/app-apple-iphone__desktop.png |

## 可提炼模式

- 高频 Web app 需要稳定导航、当前选中状态、内容对象字段和主操作位置。
- Feed / 内容列表需要标题、来源、状态、互动计数和加载更多。
- 生产力工具需要任务列表、详情/编辑区域、标签、搜索和空状态。
- 移动端应变成单列内容流或底部导航，不能保留桌面多栏硬挤。

## 质量风险

- Todoist、Arc、Things、Apple 更偏产品展示页，只能作为视觉节奏参考。
- Spotify 和 Product Hunt 更接近真实 app shell/feed，但不能复制品牌资产。
- App 风格可以更强品牌化，但组件状态和操作路径仍要清楚。

## 对 Codex 的使用建议

1. 遇到生产力工具、便签、任务、feed、内容浏览，先判断是否使用 `recipes/mobile-notes-app.md`。
2. 主 pattern 可选 `mobile-app/notes-workbench`，桌面 shell 可叠加 `app-shell/shadcn-dashboard-shell`。
3. 需要轻量空状态动效时，可选 `micro-interactions/react-bits-empty-state`，但必须注意许可证风险。
4. 不要把 app shell 隐藏在 hero 下面，首屏必须能看到真实任务区。
