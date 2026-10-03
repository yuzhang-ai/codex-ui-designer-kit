# VISUAL SCORECARD

4 is an internal review convention, not a universal product-grade standard. Identify Agent self-review versus human review; do not fill a human score when no human reviewed. Averages cannot override a broken main flow or critical defect. Unreviewed results remain Candidate.

## Score Summary

- Product type:
- Recipe:
- Patterns:
- Desktop screenshot:
- Mobile screenshot:
- Review type: Agent self-review / Human review / Not reviewed
- Reviewer:
- Date:
- Average score:
- Delivery decision: Candidate / Reviewed / Continue fixing

## 1-5 Scoring Rubric

| Score | Meaning |
|---:|---|
| 1 | Broken, prototype-like, or misleading |
| 2 | Functional but rough, weak hierarchy, incomplete states |
| 3 | Acceptable baseline, still visibly generic or uneven |
| 4 | Product-grade, clear, consistent, usable |
| 5 | Excellent, polished, domain-fit, resilient across states |

## Score Table

| Dimension | Score 1-5 | Evidence | Must Fix If Below 4 |
|---|---:|---|---|
| 产品真实感 |  | 是否像真实可用产品，而不是 demo |  |
| 信息层级 |  | 用户 5 秒内能否知道页面在干什么 |  |
| 操作路径 |  | 主操作、次操作、危险操作是否清楚 |  |
| 组件一致性 |  | 字号、间距、圆角、边框、按钮是否统一 |  |
| 数据密度 |  | 是否适合目标场景，不空不挤 |  |
| 状态完整度 |  | loading / empty / error / disabled / hover / selected 是否齐 |  |
| 移动端质量 |  | 是否无横向滚动、遮挡、小按钮、文字溢出 |  |
| 代码可维护性 |  | 组件拆分是否清楚，是否尊重原项目结构 |  |

## Required Fixes Before Delivery

- [ ] 
- [ ] 
- [ ] 

## Human Review Gate

- [ ] Customer data / sensitive data reviewed.
- [ ] Permissions and roles reviewed.
- [ ] Bulk send / export / writeback reviewed.
- [ ] External links, dates, recipients and final copy reviewed.
- [ ] Delete / irreversible actions reviewed.
- [ ] Secrets, API keys and internal links reviewed.

## Decision

- Average score:
- Pass threshold met: Yes / No
- If no, next repair target:
