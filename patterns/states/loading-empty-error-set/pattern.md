# loading-empty-error-set

## 适用场景

- 所有 UI 改造项目，尤其是后台、CRM、AI 工作台、数据看板和移动表单。
- 当前页面只有 happy path，缺少 loading、empty、error、disabled、hover、selected。

## 不适用场景

- 无交互的纯静态展示截图。
- 用户明确只要一次性视觉 mock，且不进入代码交付。

## 推荐业务对象

列表、表格、图表、表单、上传、AI 运行、客户详情、设置保存。

## 页面结构

- 每个核心区块都要有独立状态。
- 页面级状态不能遮挡导航和返回路径。
- 操作级状态要靠近按钮或表单字段。

## 组件拆分

- `StateBlock`
- `TableSkeleton`
- `EmptyState`
- `ErrorState`
- `DisabledReason`
- `SelectedState`
- `InlineLoadingButton`
- `ReviewRequiredState`

## 状态设计

- loading：骨架屏优先，按钮 loading 用 spinner + 禁用。
- empty：解释为什么为空，并给下一步。
- error：给失败原因、重试、详情。
- disabled：说明条件或权限不足。
- hover：可点击对象必须有反馈。
- selected：选中项必须改变背景/边框/状态。
- needs-review：高风险动作必须阻断外部副作用。

## 响应式规则

- 移动端 empty/error 不要占满过长高度。
- 按钮状态仍保持 44px 触控高度。
- 文案换行，不用 viewport 字号缩放。

## 设计 token 建议

- 空状态图标 32-48px，标题 15-18px，说明 13-14px。
- error 使用固定警示色，不全屏红。
- skeleton 使用低对比中性色。

## 如何迁移到目标项目

1. 列出每个核心组件的状态矩阵。
2. 给每个状态写真实文案和动作。
3. 不确定数据时使用 mock，但标注 mock。
4. 在 QA 中截图或代码验证这些状态。

## 可以模仿

- shadcn 的 Empty、Skeleton、Alert、Button、Sheet 等组件组合。
- 本 pattern 的状态矩阵。

## 不要照搬

- 泛泛的“暂无数据”，没有原因和下一步。
- 只靠 toast 表示关键失败。

## 许可证和风险说明

本 pattern 为 kit 内部状态范式，可自由迁移。若复制 shadcn 组件源码，保留 MIT 许可证说明。

## 人工确认点

- needs-review 状态要由真实业务逻辑阻断，不只是 UI 文案。
