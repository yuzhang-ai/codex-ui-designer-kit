# SAMPLE QUALITY REPORT

生成日期：2026-06-25  
范围：`samples/metadata/*.json`、`samples/analysis/*.md`、`samples/raw-screenshots/**/*`  
结论：`samples/analysis/*.md` 全量存在连续问号乱码，已用 UTF-8 中文内容重写。样本库保留为视觉与业务模式参考，但新版 kit 必须通过 `recipes/` 和 `patterns/` 进行代码范式约束。

## 质量层级定义

| 层级 | 用途 | 使用方式 |
|---|---|---|
| strong-reference | 高质量 UI 参考 | 可用于视觉密度、信息层级、布局节奏和状态意识参考 |
| visual-only | 截图参考 | 只能参考局部视觉，不直接作为页面骨架 |
| weak-sample | 降权样本 | 登录墙、验证码、about:blank、404、DOM 信息不足或营销页误判后台 |
| code-backed | 代码范式候选 | 可与公开开源 pattern 或本仓库 `patterns/` 进行映射 |

## 总览

| 分类 | 样本数 | strong-reference | visual-only | weak-sample | code-backed | 主要风险 |
|---|---:|---:|---:|---:|---:|---|
| SaaS / 后台系统 | 12 | 4 | 5 | 0 | 3 | 产品页和模板页可能被误当后台 |
| CRM / 客户运营 | 10 | 0 | 4 | 6 | 0 | 公开页偏营销，缺少真实客户工作台 |
| AI 工作台 | 10 | 2 | 3 | 4 | 1 | 登录/安全验证导致空样本，产品页动效容易误导 |
| 数据看板 | 8 | 3 | 4 | 0 | 1 | gallery 和产品页不能替代真实 dashboard |
| H5 / 移动 Web | 8 | 3 | 3 | 1 | 1 | H5 hero 不应污染后台/CRM |
| 小程序式模式 | 6 | 2 | 0 | 0 | 4 | 组件库不是完整业务页 |
| App 风格 Web UI | 6 | 2 | 4 | 0 | 0 | 多数是产品展示页，需降权使用 |

## 详细分层

### SaaS / 后台系统

| sample_id | 层级 | 依据 | 后续匹配 |
|---|---|---|---|
| saas-linear-changelog | strong-reference | 更新列表和信息层级清楚 | app-shell / list pattern |
| saas-stripe-docs-api | strong-reference | 文档工作台结构清楚 | app-shell / settings pattern |
| saas-vercel-templates | code-backed | 模板 gallery 可映射卡片+筛选结构 | shadcn dashboard shell |
| saas-supabase-docs-database | code-backed | 左侧导航和文档结构适合抽象为 shell | shadcn sidebar |
| saas-github-next-issues | code-backed | issue 列表可映射表格筛选 | OpenStatus / TanStack table |
| saas-github-issues-feature | visual-only | 偏产品介绍 | 不作为后台骨架 |
| saas-notion-templates | strong-reference | 模板卡片密度和分类明确 | gallery/card pattern |
| saas-jira-templates | visual-only | 模板页，业务操作不足 | 只看分类和卡片 |
| saas-retool-templates | strong-reference | 工具模板场景贴近内部系统 | dashboard/app-shell |
| saas-posthog-session-replay | visual-only | 产品功能页 | 只看监控语义 |
| saas-sentry-issues | visual-only | 产品功能页 | 只看 issue/alert 语义 |
| saas-datadog-product | visual-only | 产品概览页 | 只看监控对象 |

### CRM / 客户运营

| sample_id | 层级 | 依据 | 后续匹配 |
|---|---|---|---|
| crm-hubspot-crm | visual-only | CRM 业务对象丰富但偏产品页 | customer-list-detail |
| crm-salesforce-sales-cloud | weak-sample | 结构信息不足 | 降权 |
| crm-pipedrive-features | weak-sample | 页面异常/信息不足风险 | 降权 |
| crm-intercom-helpdesk | visual-only | 可参考 ticket/customer context | customer-list-detail |
| crm-zendesk-ticketing | visual-only | 可参考工单语义 | customer-list-detail |
| crm-freshsales | weak-sample | DOM 信息不足 | 降权 |
| crm-monday-crm | weak-sample | DOM 信息不足 | 降权 |
| crm-zoho-crm | weak-sample | about:blank | 降权 |
| crm-customerio-journeys | visual-only | 可参考旅程/自动化语义 | customer-list-detail |
| crm-gainsight-cs | weak-sample | about:blank | 降权 |

### AI 工作台

| sample_id | 层级 | 依据 | 后续匹配 |
|---|---|---|---|
| ai-chatgpt | weak-sample | about:blank | 降权 |
| ai-claude | weak-sample | 安全验证/登录状态 | 降权 |
| ai-perplexity | weak-sample | 安全验证状态 | 降权 |
| ai-cursor | visual-only | AI coding 产品页 | AI workbench 语义参考 |
| ai-v0-chat | code-backed | prompt-to-UI 工作台结构可映射 | chat-history-runner |
| ai-lovable | strong-reference | app builder 任务流清楚 | chat-history-runner |
| ai-replit-agent | strong-reference | agent 输入和运行语义清楚 | chat-history-runner |
| ai-gamma | weak-sample | DOM 信息不足 | 降权 |
| ai-runway | visual-only | AI media 产品页 | 只看生成/素材语义 |
| ai-midjourney-explore | visual-only | gallery/explore 结构 | 可借鉴内容流 |

### 数据看板

| sample_id | 层级 | 依据 | 后续匹配 |
|---|---|---|---|
| data-plausible-demo | code-backed | 公开 analytics dashboard，结构接近真实看板 | tremor-kpi-chart-grid |
| data-grafana-dashboards | strong-reference | dashboard gallery、搜索和分类明确 | dashboard/cards |
| data-redash-dashboards | visual-only | 文档页 | 只看 dashboard 概念 |
| data-looker-studio-product | visual-only | BI 产品页 | 降权为视觉参考 |
| data-tableau-showcase | visual-only | showcase | 降权为视觉参考 |
| data-powerbi-product | visual-only | 产品页 | 降权为视觉参考 |
| data-geckoboard-examples | strong-reference | KPI examples 清楚 | tremor-kpi-chart-grid |
| data-amplitude-templates | strong-reference | analytics template gallery | dashboard/cards |

### H5 / 移动 Web

| sample_id | 层级 | 依据 | 后续匹配 |
|---|---|---|---|
| h5-jotform-templates | weak-sample | DOM 信息不足 | 降权 |
| h5-tally-templates | code-backed | 表单 gallery 可映射设置/表单 pattern | settings-form-page |
| h5-framer-marketplace | strong-reference | marketplace 结构清楚 | mobile/cards |
| h5-webflow-showcase | visual-only | showcase | 只看卡片流 |
| h5-stripe-payments | visual-only | 支付产品页 | 只看移动 CTA |
| h5-linear-home | strong-reference | 响应式节奏好 | mobile responsive |
| h5-notion-product | strong-reference | 产品信息层级清楚 | mobile responsive |
| h5-beehiiv | visual-only | newsletter landing | 只看 CTA |

### 小程序式模式

| sample_id | 层级 | 依据 | 后续匹配 |
|---|---|---|---|
| mini-wechat-design | strong-reference | 官方设计原则 | mobile workflow |
| mini-alipay-design | strong-reference | 官方设计原则 | mobile workflow |
| mini-tdesign | code-backed | 组件库可映射移动组件状态 | states / mobile |
| mini-weui | code-backed | 组件 demo 可映射移动控件 | states / mobile |
| mini-vant-weapp | code-backed | 移动组件库 | states / mobile |
| mini-ant-mobile-list | code-backed | 列表组件清楚 | mobile list |

### App 风格 Web UI

| sample_id | 层级 | 依据 | 后续匹配 |
|---|---|---|---|
| app-todoist | visual-only | 产品页，非真实 app shell | notes-workbench |
| app-spotify-web | strong-reference | 真实 media app shell | app shell / feed |
| app-arc | visual-only | 产品展示页 | 只看品牌节奏 |
| app-things | visual-only | 产品页 | notes/task 语义参考 |
| app-product-hunt | strong-reference | community feed 结构清楚 | feed/list |
| app-apple-iphone | visual-only | 产品页 | 不用于工具骨架 |

## 修复记录

- 已重写 `samples/analysis/*.md`，不再包含连续问号乱码。
- 已修复 `samples/README.md` 的中文乱码。
- 已保留原 metadata 和截图路径，不删除任何采集证据。

## 后续使用规则

1. `weak-sample` 只能作为风险记录，不能作为设计主依据。
2. `visual-only` 只能给视觉节奏和信息层级参考，不能直接决定 React 组件结构。
3. `strong-reference` 可进入 UI audit 和 DESIGN 参考，但仍要通过 pattern 落地。
4. `code-backed` 应优先映射到 `patterns/registry.json`，并在 `PATTERN_MATCH.md` 说明原因。
5. 任何涉及客户数据、外部发送、导出、写回、权限、删除、密钥的样本或目标项目，都必须人工确认。
