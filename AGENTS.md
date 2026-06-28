# Codex UI Designer Kit Instructions

本项目目标：把功能可用但 UI 粗糙的 Codex 原型改造成产品级界面，并沉淀可复用的规则、模板、脚本和案例。

## 默认工作原则

- 不要把工具、后台、CRM、数据看板做成 landing page。
- 业务工具优先工作台界面：导航、筛选、列表/表格、详情、操作路径要清楚。
- 不要滥用大渐变、大 hero、装饰卡片、玻璃拟态。
- 优先信息密度、可扫读、清晰操作路径。
- 任何 UI 改造都要考虑 loading、empty、error、disabled、hover、selected 状态。
- 必须做桌面端和移动端截图 QA。
- 涉及客户数据、权限、群发、导出、外链、写回时必须提醒人工确认。

## 推荐流程

1. 判断产品类型。
2. 读取对应 `recipes/*.md`。
3. 从 `patterns/registry.json` 选择 1-3 个 pattern。
4. 使用 `templates/PATTERN_MATCH.md` 输出 `PATTERN_MATCH.md`，说明为什么选这些 pattern。
5. 读取对应 `references/*.md` 和 checklists。
6. 使用 `checklists/ui-audit-checklist.md` 输出 `UI_AUDIT.md`。
7. 使用 `templates/DESIGN.md` 输出设计方案，必须引用具体 pattern。
8. 修改代码。
9. 运行 `scripts/visual-audit.mjs` 做桌面和移动截图 QA。
10. 使用 `templates/VISUAL_SCORECARD.md` 做人工视觉评分，平均分低于 4 分继续修。
11. 使用 `templates/UI_DELIVERY_REPORT.md` 输出交付报告。

## 样式边界

- 表格、列表、卡片要能扫读。
- 主操作突出，次操作退后，危险操作隔离。
- 字号、间距、颜色、圆角、阴影要统一。
- 固定格式 UI 元素要有稳定尺寸，避免 hover、标签、动态文本导致布局跳动。
- 移动端不要出现横向滚动、按钮过小、文字溢出、底部栏遮挡。

## 安全边界

- 不采集、不提交、不暴露客户数据、密钥、账号、内部页面。
- 示例数据使用 mock，并明确标记。
- 群发、导出、删除、写回、权限变更都需要人工确认。
- 外部链接、邮件标题日期、收件人和下载链接必须人工校验。
