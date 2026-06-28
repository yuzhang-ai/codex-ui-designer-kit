# CRM / 客户运营样本分析

采集日期：2026-06-23
样本数量：10
截图数量：10
当前状态：已修复 UTF-8 乱码，并重新标注质量层级。

## 总结

这一组样本的价值在于理解 CRM 页面应该围绕“客户是谁、处于什么阶段、最近发生了什么、下一步做什么”组织，而不是只做产品宣传页。当前样本多数来自公开产品页，所以适合作为业务字段和场景参考，但真正落地时应优先匹配 CRM 列表详情代码范式。

## 样本清单

| sample_id | 产品 | 页面类型 | 质量层级 | 截图 |
|---|---|---|---|---|
| crm-hubspot-crm | HubSpot CRM | CRM product page | visual-only | samples/raw-screenshots/crm-customer-ops/crm-hubspot-crm__desktop.png |
| crm-salesforce-sales-cloud | Salesforce | Sales Cloud product page | weak-sample | samples/raw-screenshots/crm-customer-ops/crm-salesforce-sales-cloud__desktop.png |
| crm-pipedrive-features | Pipedrive | CRM feature page | weak-sample | samples/raw-screenshots/crm-customer-ops/crm-pipedrive-features__desktop.png |
| crm-intercom-helpdesk | Intercom | Help desk product page | visual-only | samples/raw-screenshots/crm-customer-ops/crm-intercom-helpdesk__desktop.png |
| crm-zendesk-ticketing | Zendesk | Ticketing product page | visual-only | samples/raw-screenshots/crm-customer-ops/crm-zendesk-ticketing__desktop.png |
| crm-freshsales | Freshsales | Sales CRM product page | weak-sample | samples/raw-screenshots/crm-customer-ops/crm-freshsales__desktop.png |
| crm-monday-crm | monday CRM | CRM product page | weak-sample | samples/raw-screenshots/crm-customer-ops/crm-monday-crm__desktop.png |
| crm-zoho-crm | Zoho CRM | CRM product page | weak-sample | samples/raw-screenshots/crm-customer-ops/crm-zoho-crm__desktop.png |
| crm-customerio-journeys | Customer.io | Customer journey product page | visual-only | samples/raw-screenshots/crm-customer-ops/crm-customerio-journeys__desktop.png |
| crm-gainsight-cs | Gainsight | Customer success product page | weak-sample | samples/raw-screenshots/crm-customer-ops/crm-gainsight-cs__desktop.png |

## 可提炼模式

- CRM 核心界面应包含客户列表、筛选、分组、客户详情、时间线和下一步动作。
- 产品页里的品牌表达不能直接作为后台骨架，只能抽取“销售管道、客户阶段、旅程、工单、客户成功”的业务对象。
- 公开页缺少真实客户工作台细节，后续必须用 `patterns/crm/customer-list-detail` 补足代码结构。
- 客户数据、群发、导出、写回和权限操作必须默认进入人工确认。

## 质量风险

- 多数公开 CRM 页面偏营销介绍，不是登录后的真实 CRM 工作台。
- 部分样本出现空 DOM、about:blank、标题缺失或页面异常，应降权。
- CRM 场景天然涉及客户信息，样本只能使用 mock 字段和通用结构。

## 对 Codex 的使用建议

1. 遇到客户、线索、工单、跟进、旅程、标签、客户成功等对象，先选 `recipes/crm-customer-ops.md`。
2. 主 pattern 选 `crm/customer-list-detail`，表格复杂时叠加 `data-table/faceted-filter-table`。
3. 不要把 CRM 页面做成 landing page；首屏必须能看到列表、详情或下一步动作。
4. 在 `UI_DELIVERY_REPORT.md` 中列出所有客户数据和外部触达人工确认点。
