# settings-form-page

## 适用场景

- SaaS 设置页、账号设置、团队设置、通知偏好、API 配置、权限设置。
- 用户需要查看当前配置、修改、校验、保存、确认风险。

## 不适用场景

- 高转化 landing 表单。
- 一次性 H5 报名页。

## 推荐业务对象

组织、成员、角色、通知、账单、API key、Webhook、集成、默认规则。

## 页面结构

- 左侧：设置分组导航。
- 主区：页面标题、说明、分组表单、保存条。
- 高风险区：API key、Webhook、删除、权限变更单独分区。
- 保存后：成功、失败、未保存变更、重置确认。

## 组件拆分

- `SettingsLayout`
- `SettingsNav`
- `SettingsSection`
- `SettingsField`
- `UnsavedChangesBar`
- `DangerZone`
- `ConfirmDialog`

## 状态设计

- loading：表单字段 skeleton。
- empty：无集成/无成员/无规则时给创建入口。
- error：字段级错误 + 保存失败。
- disabled：权限不足、只读、依赖未满足。
- selected：当前设置分组。
- dirty/saving/saved：未保存、保存中、保存成功清楚。

## 响应式规则

- 桌面：左侧设置导航 220-260px，主表单 max-width 760px。
- 手机：设置分组变 select/tab，表单单列，保存按钮贴近当前表单。
- 危险区移动端不固定底部，避免误触。

## 设计 token 建议

- 字段 label 13-14px，section 标题 16-18px。
- 表单行间距 16-20px，section 间距 28-36px。
- 危险区用边框和说明隔离，不只靠红色。

## 如何迁移到目标项目

1. 先列出设置分组和权限边界。
2. 使用目标项目已有表单库；没有时参考 shadcn form。
3. 给每个字段写 label、说明、错误和 disabled reason。
4. 保存动作需要显示变更摘要或未保存提示。

## 可以模仿

- shadcn form 的字段、校验、说明、错误组织。
- 设置页左侧 nav + 主表单 + danger zone。

## 不要照搬

- 示例 API key、Webhook URL、组织名、账号信息。
- 无关认证/计费逻辑。

## 许可证和风险说明

参考 shadcn forms，shadcn/ui 仓库为 MIT。复制代码时保留许可证说明。涉及 API key、权限、Webhook 时必须人工确认。

## 人工确认点

- 权限变更、邀请/移除成员、删除组织、公开链接、Webhook、API key。
