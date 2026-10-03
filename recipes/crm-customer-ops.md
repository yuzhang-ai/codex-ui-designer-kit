# Recipe: CRM Customer Ops

## 1. 产品类型怎么判断

满足以下任意 1 项，优先判定为 CRM / customer ops：

- 页面对象是客户、联系人、线索、商机、工单、跟进、旅程、标签。
- 涉及企微、CRM、Salesforce、客服、销售、客户成功、营销自动化。
- 用户要判断客户状态、查看历史、做下一步触达或写回。

## 2. 优先读取

- `references/crm-customer-ops-ui.md`
- `checklists/customer-data-safety-checklist.md`
- `checklists/product-ui-risk-checklist.md`
- `checklists/ui-audit-checklist.md`
- `samples/SAMPLE_QUALITY_REPORT.md`（确认 CRM 样本大多应降权）

## 3. 优先选择 patterns

1. `patterns/crm/customer-list-detail`
2. `patterns/data-table/faceted-filter-table`
3. `patterns/states/loading-empty-error-set`

CRM 页面默认以 `customer-list-detail` 为主 pattern。若列表复杂，再叠加 faceted table。

## 4. 页面结构默认搭法

- Toolbar：客户搜索、阶段、标签、负责人、最近触达。
- List/Table：客户、阶段、负责人、最近触达、下一步动作、风险状态。
- Detail：身份摘要、关键字段、时间线、任务/备注、下一步动作。
- Review Gate：群发、导出、写回、权限变更前展示影响范围。

## 5. 必须补齐状态

- loading：客户列表和时间线分区加载。
- empty：无客户、无跟进、筛选无结果分开。
- error：同步失败、写回失败、权限失败。
- disabled：客户锁定、权限不足、字段不可编辑。
- selected：当前客户和批量选择数量。
- needs-review：外部触达和写回前阻断。

## 6. 移动端默认处理

- 列表优先，详情进入独立页或 drawer。
- 客户卡片展示姓名、公司、阶段、负责人、最近触达。
- 批量操作默认收起，避免误触。
- 电话、邮箱、微信等敏感字段默认低调展示。

## 7. 按后果核验的操作

以下是风险检查对象，不是所有按钮一律再次确认。按 `references/interaction-contracts.md` 和当前授权判断；本地可逆操作/mock/普通下载不重复确认，真实敏感数据、外部发送和生产写回保留适用审核。

- 群发企微、邮件、短信、Webhook。
- 客户导出、字段批量修改、写回 CRM/企微/Salesforce。
- 修改负责人、权限、标签、旅程节点。
- 展示或截图真实客户数据。

## 8. 改造完成后如何 QA

1. 先检查是否使用 mock 或脱敏数据。
2. 跑桌面/移动截图 QA。
3. 使用视觉评分表，重点看产品真实感、操作路径、状态完整度、数据安全。
4. 交付报告列出所有人工确认项，不能只写“已完成”。
