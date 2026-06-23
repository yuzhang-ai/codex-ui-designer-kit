# Codex UI Designer Kit 样本采集计划

采集日期：2026-06-23

目标：采集公开可访问的 Web / SaaS / 工具类 UI 页面截图和结构化分析，用于沉淀 Codex UI Designer Kit 的 UI 改造规则。所有页面只用于通用模式分析，不复制品牌资产、logo、专有插画、客户数据或内部信息。

## 执行边界

- 只访问公开页面，不登录账号。
- 不提交表单、不上传文件、不改权限、不触发付费或外部副作用。
- 不采集客户数据、密钥、账号信息、内部页面、付费后台内容。
- 遇到登录墙、敏感信息、真实客户数据、验证码或付费后台，跳过并记录风险备注。
- 桌面截图基准 viewport：1440 x 1000。
- 移动截图基准 viewport：390 x 844。

## 采集清单

### 01-saas-dashboard / 12 个

| sample_id | 产品 | URL | 采集重点 |
|---|---|---|---|
| saas-linear-changelog | Linear | https://linear.app/changelog | release timeline / 产品更新列表 |
| saas-stripe-docs-api | Stripe Docs | https://docs.stripe.com/api | 文档型工作台、侧边导航、代码区 |
| saas-vercel-templates | Vercel | https://vercel.com/templates | 模板列表、筛选、卡片密度 |
| saas-supabase-docs-database | Supabase Docs | https://supabase.com/docs/guides/database/overview | docs 导航、平台信息架构 |
| saas-github-next-issues | GitHub Issues | https://github.com/vercel/next.js/issues | 列表、筛选、状态标签 |
| saas-github-issues-feature | GitHub Features | https://github.com/features/issues | issue workflow 展示 |
| saas-notion-templates | Notion | https://www.notion.com/templates | workspace / template grid |
| saas-jira-templates | Atlassian Jira Templates | https://www.atlassian.com/software/jira/templates | 模板分类、卡片列表 |
| saas-retool-templates | Retool | https://retool.com/templates | 工具模板、后台界面模式 |
| saas-posthog-session-replay | PostHog | https://posthog.com/product/session-replay | session replay / monitoring UI |
| saas-sentry-issues | Sentry | https://sentry.io/product/issues/ | issue / error monitoring UI |
| saas-datadog-product | Datadog | https://www.datadoghq.com/product/ | 监控工作台视觉模式 |

### 02-crm-customer-ops / 10 个

| sample_id | 产品 | URL | 采集重点 |
|---|---|---|---|
| crm-hubspot-crm | HubSpot CRM | https://www.hubspot.com/products/crm | CRM 总览、销售工作流 |
| crm-salesforce-sales-cloud | Salesforce | https://www.salesforce.com/sales/cloud/ | 销售管道、客户运营 |
| crm-pipedrive-features | Pipedrive | https://www.pipedrive.com/en/features/crm-software | pipeline / deal board |
| crm-intercom-helpdesk | Intercom | https://www.intercom.com/help-desk | inbox / ticket / customer context |
| crm-zendesk-ticketing | Zendesk | https://www.zendesk.com/service/ticketing-system/ | ticket workspace |
| crm-freshsales | Freshsales | https://www.freshworks.com/crm/sales/ | sales CRM dashboard |
| crm-monday-crm | monday CRM | https://monday.com/crm | CRM board / automation |
| crm-zoho-crm | Zoho CRM | https://www.zoho.com/crm/ | lead / deal / record UI |
| crm-customerio-journeys | Customer.io | https://customer.io/journeys/ | customer journey / segment |
| crm-gainsight-cs | Gainsight | https://www.gainsight.com/customer-success/ | customer success dashboard |

### 03-ai-workbench / 10 个

| sample_id | 产品 | URL | 采集重点 |
|---|---|---|---|
| ai-chatgpt | ChatGPT | https://chatgpt.com/ | 输入区、空状态、模型入口 |
| ai-claude | Claude | https://claude.ai/ | 输入区、历史入口、工作台结构 |
| ai-perplexity | Perplexity | https://www.perplexity.ai/ | 搜索式 AI 工作台 |
| ai-cursor | Cursor | https://www.cursor.com/ | AI coding 产品工作流 |
| ai-v0-chat | v0 | https://v0.dev/chat | prompt-to-UI 工作台 |
| ai-lovable | Lovable | https://lovable.dev/ | prompt app builder |
| ai-replit-agent | Replit Agent | https://replit.com/agent | agent task input / run context |
| ai-gamma | Gamma | https://gamma.app/ | AI presentation input flow |
| ai-runway | Runway | https://runwayml.com/ | AI media tool UI |
| ai-midjourney-explore | Midjourney | https://www.midjourney.com/explore | gallery / generation discovery |

### 04-data-dashboard / 8 个

| sample_id | 产品 | URL | 采集重点 |
|---|---|---|---|
| data-plausible-demo | Plausible | https://plausible.io/plausible.io | 公开 analytics dashboard |
| data-grafana-dashboards | Grafana Dashboards | https://grafana.com/grafana/dashboards/ | dashboard gallery / search / filtering |
| data-redash-dashboards | Redash Dashboards | https://redash.io/help/user-guide/dashboards/ | dashboard layout / widgets / sharing concepts |
| data-looker-gallery | Looker Studio | https://lookerstudio.google.com/gallery | dashboard gallery |
| data-tableau-public | Tableau Public | https://public.tableau.com/app/discover | public dashboard discovery |
| data-powerbi-gallery | Power BI / Fabric | https://community.fabric.microsoft.com/t5/Data-Stories-Gallery/bd-p/DataStoriesGallery | dashboard examples |
| data-geckoboard-examples | Geckoboard | https://www.geckoboard.com/dashboard-examples/ | dashboard examples / KPI cards |
| data-amplitude-templates | Amplitude | https://amplitude.com/templates | analytics templates |

### 05-h5-mobile-web / 8 个

| sample_id | 产品 | URL | 采集重点 |
|---|---|---|---|
| h5-jotform-templates | Jotform | https://www.jotform.com/form-templates/ | mobile form / conversion |
| h5-tally-templates | Tally | https://tally.so/templates | form gallery / lightweight submit |
| h5-framer-marketplace | Framer | https://www.framer.com/marketplace/ | mobile landing / template cards |
| h5-webflow-showcase | Webflow | https://webflow.com/made-in-webflow | responsive showcase |
| h5-stripe-payments | Stripe Payments | https://stripe.com/payments | mobile commerce / CTA |
| h5-linear-home | Linear | https://linear.app/ | responsive product page |
| h5-notion-product | Notion | https://www.notion.com/product | mobile workspace story |
| h5-beehiiv | beehiiv | https://www.beehiiv.com/ | newsletter / report style landing |

### 06-mini-program-patterns / 6 个

| sample_id | 产品 | URL | 采集重点 |
|---|---|---|---|
| mini-wechat-design | 微信小程序设计 | https://developers.weixin.qq.com/miniprogram/design/ | 小程序规范、页面结构 |
| mini-alipay-design | 支付宝小程序设计 | https://opendocs.alipay.com/mini/design | 小程序设计规范 |
| mini-tdesign | TDesign MiniProgram | https://tdesign.tencent.com/miniprogram/overview | 组件、表单、列表 |
| mini-weui | WeUI | https://weui.io/ | 微信风格组件 |
| mini-vant-weapp | Vant Weapp | https://youzan.github.io/vant-weapp/#/home | 移动组件库 |
| mini-ant-mobile-list | Ant Design Mobile | https://mobile.ant.design/components/list | App / 小程序式列表 |

### 07-app-style-web-ui / 6 个

| sample_id | 产品 | URL | 采集重点 |
|---|---|---|---|
| app-todoist | Todoist | https://todoist.com/ | productivity app UI |
| app-spotify-web | Spotify Web | https://open.spotify.com/ | media app shell |
| app-arc | Arc | https://arc.net/ | browser app product UI |
| app-things | Things | https://culturedcode.com/things/ | productivity app visual hierarchy |
| app-product-hunt | Product Hunt | https://www.producthunt.com/ | community feed / app-like browsing |
| app-apple-iphone | Apple iPhone | https://www.apple.com/iphone/ | app-style product page |
