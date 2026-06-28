# 数据看板样本分析

采集日期：2026-06-23
样本数量：8
截图数量：8
当前状态：已修复 UTF-8 乱码，并重新标注质量层级。

## 总结

数据看板样本主要用于提炼“时间范围 + KPI + 趋势图 + 异常解释 + 明细下钻”的页面结构。公开 gallery 和产品页可以参考图表密度与卡片节奏，但真正落地需要匹配可运行的图表/指标代码范式。

## 样本清单

| sample_id | 产品 | 页面类型 | 质量层级 | 截图 |
|---|---|---|---|---|
| data-plausible-demo | Plausible | Public analytics dashboard | code-backed | samples/raw-screenshots/data-dashboard/data-plausible-demo__desktop.png |
| data-grafana-dashboards | Grafana Dashboards | Dashboard gallery | strong-reference | samples/raw-screenshots/data-dashboard/data-grafana-dashboards__desktop.png |
| data-redash-dashboards | Redash Dashboards | Dashboard documentation | visual-only | samples/raw-screenshots/data-dashboard/data-redash-dashboards__desktop.png |
| data-looker-studio-product | Looker Studio | BI product page | visual-only | samples/raw-screenshots/data-dashboard/data-looker-studio-product__desktop.png |
| data-tableau-showcase | Tableau | Dashboard showcase | visual-only | samples/raw-screenshots/data-dashboard/data-tableau-showcase__desktop.png |
| data-powerbi-product | Power BI | BI product page | visual-only | samples/raw-screenshots/data-dashboard/data-powerbi-product__desktop.png |
| data-geckoboard-examples | Geckoboard Dashboard Examples | Dashboard examples gallery | strong-reference | samples/raw-screenshots/data-dashboard/data-geckoboard-examples__desktop.png |
| data-amplitude-templates | Amplitude | Analytics template gallery | strong-reference | samples/raw-screenshots/data-dashboard/data-amplitude-templates__desktop.png |

## 可提炼模式

- 看板首屏必须先回答“现在好不好、哪里异常、按什么范围看的”。
- KPI 卡需要指标名、当前值、同比/环比、目标/阈值或口径说明。
- 图表区用于解释趋势，明细表用于承接行动。
- 公开 gallery 适合学习卡片密度和筛选，但不能替代真实 dashboard 数据流。

## 质量风险

- 多数 BI 产品页是市场介绍，不是实际分析工作台。
- 缺少移动截图，移动端需要在 recipe 中默认单列化。
- 图表颜色、图例和坐标密度需要人工视觉评分，机械 QA 不能判断数据可读性。

## 对 Codex 的使用建议

1. 遇到运营、销售、产品、监控、BI、KPI 页面，先选 `recipes/data-dashboard.md`。
2. 主 pattern 选 `dashboard/tremor-kpi-chart-grid`，需要明细时叠加 `data-table/faceted-filter-table`。
3. 颜色只用于状态、系列和异常，不要随机彩虹。
4. 数据源失败、无权限、筛选无结果必须有状态。
