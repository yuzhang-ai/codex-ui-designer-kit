# Recipe: SaaS Dashboard

## 1. 产品类型怎么判断

满足以下任意 2 项，优先判定为 SaaS dashboard：

- 页面对象是项目、任务、资源、issue、模板、成员、订单、配置项。
- 用户需要搜索、筛选、查看详情、执行操作或批量处理。
- 页面有导航、列表/表格、卡片网格、设置、监控入口。
- 当前原型像工具或后台，却被做成了 landing page。

## 2. 优先读取

- `references/saas-dashboard-ui.md`
- `references/app-style-web-ui.md`（只在需要稳定 shell 时补充）
- `checklists/ui-audit-checklist.md`
- `checklists/product-ui-risk-checklist.md`
- `checklists/mobile-responsive-checklist.md`

## 3. 优先选择 patterns

1. `patterns/app-shell/shadcn-dashboard-shell`
2. `patterns/app-shell/vite-shadcn-admin-shell`
3. `patterns/data-table/faceted-filter-table`
4. `patterns/states/loading-empty-error-set`

默认选择 1 个 shell pattern + 1 个业务内容 pattern。表格重时选 faceted table；多页面 Vite 项目选 Vite admin shell。

## 4. 页面结构默认搭法

- Shell：左侧导航或顶部导航。
- Header：模块标题、搜索、主操作、时间/视图切换。
- Main：概览卡片、列表/表格/卡片网格。
- Detail：drawer/sheet 或详情页。
- Risk area：删除、导出、权限、批量操作隔离。

## 5. 必须补齐状态

- loading：shell 不闪白，内容区骨架。
- empty：无数据、筛选无结果分别说明。
- error：数据源/API/权限失败可重试。
- disabled：权限不足或条件不满足说明原因。
- hover/selected：导航、表格行、卡片、筛选项明确。

## 6. 移动端默认处理

- sidebar 变 drawer 或顶部菜单。
- 表格转卡片列表，保留 4-6 个关键字段。
- 主操作保持可见但不遮挡内容。
- 避免横向滚动，除非是受控表格容器。

## 7. 按后果核验的操作

以下是风险检查对象，不是所有按钮一律再次确认。按 `references/interaction-contracts.md` 和当前授权判断；本地可逆操作/mock/普通下载不重复确认，真实敏感数据、外部发送和生产写回保留适用审核。

- 导出、删除、批量修改、权限变更。
- 外部链接、公开分享、Webhook。
- 客户或账号相关数据展示。
- API key、token、内部链接。

## 8. 改造完成后如何 QA

1. 运行 `scripts/visual-audit.mjs` 截桌面和移动。
2. 使用 `templates/VISUAL_SCORECARD.md` 打分。
3. 先处理关键阻塞；Agent评分只作辅助，按SKILL最多三轮修复与证据边界执行。
4. `UI_DELIVERY_REPORT.md` 必须包含 pattern 引用、截图路径、失败项和人工确认点。
