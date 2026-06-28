# Benchmarks

这个目录用于后续沉淀“丑原型 -> pattern-first 改造后”的验证案例。当前升级先建立 benchmark 规则，不在本轮虚构完整项目。

## 每个 benchmark 必须包含

- `original/`：原型代码或静态 HTML。
- `improved/`：改造后代码。
- `PATTERN_MATCH.md`：所选 recipe 和 patterns。
- `UI_AUDIT.md`：改造前问题。
- `DESIGN.md`：引用具体 pattern 的设计方案。
- `.design/screenshots/`：before/after 桌面和移动截图。
- `.design/UI_QA_REPORT.md`：机械 QA。
- `VISUAL_SCORECARD.md`：人工视觉评分，平均分必须 >= 4。
- `UI_DELIVERY_REPORT.md`：交付说明和人工确认点。

## 建议首批 benchmark

| benchmark | 推荐 recipe | 推荐 patterns |
|---|---|---|
| ugly-saas-dashboard | saas-dashboard | app-shell/shadcn-dashboard-shell, data-table/faceted-filter-table |
| crm-customer-table | crm-customer-ops | crm/customer-list-detail, data-table/faceted-filter-table |
| ai-prompt-runner | ai-workbench | ai-workbench/chat-history-runner, states/loading-empty-error-set |
| ops-kpi-board | data-dashboard | dashboard/tremor-kpi-chart-grid |
| mobile-notes | mobile-notes-app | mobile-app/notes-workbench |

## 验收规则

平均视觉评分低于 4 分，不算 benchmark 通过。涉及客户数据、权限、群发、导出、写回、外链、删除、密钥时，必须保留人工确认点。
