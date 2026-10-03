# Recipe: Data Dashboard

## 1. 产品类型怎么判断

满足以下任意 2 项，判定为 data dashboard：

- 页面核心是指标、趋势、图表、排行、异常或明细下钻。
- 用户需要判断表现、解释原因、找到行动入口。
- 有时间范围、业务线、渠道、负责人、地区等筛选维度。

## 2. 优先读取

- `references/data-dashboard-ui.md`
- `references/saas-dashboard-ui.md`
- `checklists/ui-audit-checklist.md`
- `checklists/visual-qa-checklist.md`
- `samples/analysis/data-dashboard-notes.md`

## 3. 优先选择 patterns

1. `patterns/dashboard/tremor-kpi-chart-grid`
2. `patterns/data-table/faceted-filter-table`
3. `patterns/states/loading-empty-error-set`

如果页面既有看板又有大量明细，必须同时选 dashboard + data-table。

## 4. 页面结构默认搭法

- Filters：日期、业务线、渠道、维度、保存视图。
- KPI：3-5 个核心指标，带变化和目标。
- Charts：趋势、分布、漏斗、排行、异常。
- Insight：异常解释、原因、建议动作。
- Details：承接行动的明细表。

## 5. 必须补齐状态

- loading：面板级 skeleton。
- empty：当前筛选无数据，给清筛选。
- error：数据源/API/权限/查询失败。
- disabled：无权限指标或不可选维度。
- selected：图表选中和明细联动。

## 6. 移动端默认处理

- 全部单列。
- KPI 卡 1-2 列，图表固定高度。
- 图例换行，避免坐标文字重叠。
- 明细表改卡片或可控横向滚动。

## 7. 按后果核验的操作

以下是风险检查对象，不是所有按钮一律再次确认。按 `references/interaction-contracts.md` 和当前授权判断；本地可逆操作/mock/普通下载不重复确认，真实敏感数据、外部发送和生产写回保留适用审核。

- 对外发布指标、日期、结论。
- 导出明细数据。
- 涉及客户、订单、收入、合同、人员绩效的数据。
- 自动告警、外部发送、写回。

## 8. 改造完成后如何 QA

1. 机械 QA 检查空白、横向滚动、文字溢出、小按钮。
2. 人工评分重点看信息层级、数据密度、移动端质量。
3. 检查指标口径是否可见。
4. 先处理关键阻塞；Agent评分只作辅助，按SKILL最多三轮修复与证据边界执行。
