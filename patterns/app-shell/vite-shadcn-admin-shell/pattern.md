# vite-shadcn-admin-shell

## 适用场景

- Vite + React 项目，需要后台侧栏、主题、命令搜索、多页面管理结构。
- 内部工具、管理后台、设置中心、运营工作台。

## 不适用场景

- Next.js App Router 项目已有成熟 shell。
- 只需要单页表单或移动 H5 的项目。

## 推荐业务对象

用户、团队、角色、设置项、任务、订单、工单、运营资源。

## 页面结构

- 顶层 layout 负责 sidebar、header、主题和全局搜索。
- 页面内容只关心业务模块，不重复实现导航。
- 列表页使用 toolbar + table + pagination。
- 设置页使用分组表单和保存状态。

## 组件拆分

- `AppLayout`
- `SidebarNav`
- `TopBar`
- `CommandSearch`
- `ThemeToggle`
- `PageHeader`
- `ContentSection`
- `RouteOutlet`

## 状态设计

- loading：路由级和区块级 skeleton 分开。
- empty：模块内说明空状态，不影响全局 shell。
- error：页面错误保留 shell，让用户可返回其他模块。
- disabled：权限不足时按钮禁用并显示原因。
- selected：当前路由、当前 tab、当前筛选可见。

## 响应式规则

- 桌面：固定 sidebar + 内容自适应。
- 小屏：sidebar 收起为 drawer 或顶部菜单。
- 表格移动端卡片化；设置表单移动端单列。

## 设计 token 建议

- 保持 shadcn 默认 token，不混入过多自定义渐变。
- sidebar 宽度 240-280px。
- header 高度 56-64px。
- 表格行高 44-52px。

## 如何迁移到目标项目

1. 如果目标项目是 Vite/React，先看是否已有 layout。
2. 仅抽取 shell、命令搜索、路由分层和主题结构。
3. 保留目标项目状态管理和 API 调用。
4. 不要整仓库照搬，不要引入无关页面。

## 可以模仿

- Vite 管理后台的目录结构。
- sidebar、命令搜索、主题切换、页面 header 组合。
- 多页面模块的布局节奏。

## 不要照搬

- 示例菜单、账号、主题定制、第三方登录。
- 与目标项目不相关的页面和依赖。

## 许可证和风险说明

参考 `satnaing/shadcn-admin`，公开仓库为 MIT。只提炼 app shell 和结构，复制代码前检查目标依赖、版本和许可证说明。

## 人工确认点

- 用户、团队、角色、权限和设置写入。
- 管理员操作、公开分享、邀请/移除成员。
