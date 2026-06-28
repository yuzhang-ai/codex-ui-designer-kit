# shadcn-dashboard-shell

## 适用场景

- SaaS dashboard、后台系统、CRM、数据看板、内部工具。
- 目标页面需要稳定导航、顶部上下文、指标/图表/表格组合。

## 不适用场景

- 纯 landing page、一次性 H5 活动页、只有一个表单的轻量页。
- 强品牌视觉优先、没有重复使用路径的展示页。

## 推荐业务对象

项目、客户、订单、任务、issue、事件、资源、成员、配置项、分析指标。

## 页面结构

- `SidebarProvider` 包住整个工作台。
- `AppSidebar` 放全局导航、分组、用户入口。
- `SiteHeader` 放当前模块、搜索、时间范围、主操作。
- 主内容按“概览卡片 -> 图表/趋势 -> 表格/列表”排列。
- 详情优先用 drawer/sheet，不要打断列表上下文。

## 组件拆分

- `AppSidebar`
- `SiteHeader`
- `SectionCards`
- `ChartArea`
- `DataTable`
- `DetailSheet`
- `BulkActionBar`

## 状态设计

- loading：主内容骨架，表格行级 skeleton。
- empty：说明无数据原因，提供创建、导入或清筛选入口。
- error：区块级错误，保留导航和重试按钮。
- disabled：权限不足或条件不满足时说明原因。
- selected：选中导航、表格行、筛选项都要明确。

## 响应式规则

- 桌面：sidebar 240-288px，header 56-64px，内容区 16/24px gutter。
- 平板：sidebar 可折叠为 icon rail。
- 手机：sidebar 进入 drawer，表格变卡片列表或只展示关键字段。

## 设计 token 建议

- 字号：页面标题 20-24px，区块标题 15-17px，表格 13-14px。
- 间距：8/12/16/24px。
- 圆角：6-8px，避免过度大圆角。
- 色彩：中性色承载结构，主色只给主操作和关键状态。

## 如何迁移到目标项目

1. 保留目标项目路由和数据流。
2. 把现有页面拆成 shell、header、content、table/detail。
3. 用目标业务对象替换 demo 数据。
4. 只复制布局节奏和组件关系，不复制品牌文案或图标。
5. 在 `DESIGN.md` 中写明引用本 pattern 的页面区域。

## 可以模仿

- sidebar + header + content 的层级。
- 概览、图表、表格的组织顺序。
- shadcn 组件命名和组合方式。

## 不要照搬

- 示例业务字段、图表数据、品牌名、占位图、颜色主题。
- 与目标项目无关的认证、计费、多租户结构。

## 许可证和风险说明

主要参考 shadcn/ui blocks。shadcn/ui 仓库为 MIT 许可证；复制上游代码时保留版权和许可证说明。不要复制第三方品牌资产。

## 人工确认点

- 客户数据、导出、删除、批量修改、权限变更。
- 对外链接、公开分享、Webhook、邮件/企微/SMS 发送。
