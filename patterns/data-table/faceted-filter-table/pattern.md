# faceted-filter-table

## 适用场景

- CRM 客户列表、后台资源列表、日志/事件列表、订单/任务表格。
- 用户需要搜索、筛选、排序、分页、批量选择、查看详情。

## 不适用场景

- 只有 5 条以内静态内容的展示列表。
- 移动端单任务表单，不需要复杂筛选。

## 推荐业务对象

客户、线索、工单、订单、issue、事件、请求日志、任务、素材、成员。

## 页面结构

- 顶部：标题、主操作、保存视图。
- Toolbar：关键词搜索、faceted filters、日期范围、清筛选。
- Table：列定义、排序、状态 badge、行操作。
- 底部：分页、已选数量、批量操作。
- 详情：sheet/drawer 承接当前行上下文。

## 组件拆分

- `DataTable`
- `DataTableToolbar`
- `DataTableFacetedFilter`
- `DataTableViewOptions`
- `DataTablePagination`
- `RowActions`
- `RowDetailSheet`
- `BulkActionBar`

## 状态设计

- loading：保持表头，行 skeleton。
- empty：区分“无数据”和“筛选无结果”。
- error：说明数据源或查询失败，提供重试。
- disabled：批量操作不可用时显示原因。
- selected：选中行数量和影响范围必须可见。

## 响应式规则

- 桌面：表格紧凑，行高 44-52px。
- 平板：保留横向滚动，但 toolbar 换行。
- 手机：转为卡片列表，展示 4-6 个关键字段和主操作。

## 设计 token 建议

- 表格正文 13-14px，辅助信息 12px。
- badge 使用固定语义色，不随机。
- toolbar gap 8/12px，表格外框 radius 6-8px。

## 如何迁移到目标项目

1. 先定义目标业务对象和字段优先级。
2. 把所有 filter 写成可复用 schema。
3. URL 状态可选，业务复杂时优先保存到 search params。
4. 行详情不要跳转丢上下文，优先用 sheet。

## 可以模仿

- OpenStatus 的 faceted filter、命令式筛选、行详情、URL state 思路。
- shadcn data-table 的列定义、排序、可见列、行选择结构。

## 不要照搬

- 示例日志字段、状态码、演示数据。
- 过度复杂的 store，除非目标项目确实需要。

## 许可证和风险说明

OpenStatus data-table-filters 为 MIT；TanStack Table 为 MIT。复制代码时保留许可证说明。涉及客户列表、导出、批量修改时必须人工确认。

## 人工确认点

- 导出字段和数量。
- 批量发送、批量修改、删除。
- 客户数据和权限字段展示。
