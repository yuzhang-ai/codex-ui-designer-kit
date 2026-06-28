# Codex UI Designer Kit 优化路线

## 结论

当前工具最终效果依旧容易拉跨，核心原因不是样本不够多，而是输入给 Codex 的内容还停留在“截图 + 抽象规则 + 检查清单”。Codex 真正需要的是可直接模仿的代码范式：页面骨架、组件拆分、设计 token、状态组件、响应式写法、交互细节和可运行示例。

下一阶段应从“UI 规则库”升级成“代码范式库 + 视觉 QA + 人工审美复核”的工具包。

## 当前问题诊断

### 1. 样本是视觉样本，不是实现样本

现有 `samples/` 主要沉淀公开页面截图、DOM 摘要和 UI 规则。这能帮助 Codex 知道“什么方向比较专业”，但不能告诉它“代码应该怎么组织”。

Codex 在真实项目里会遇到：

- 应该用哪些组件？
- shell、sidebar、toolbar、list、detail、modal 如何拆？
- 表格/列表的密度、行高、字段顺序怎么写成代码？
- mobile breakpoint 怎么处理？
- loading/empty/error/disabled/selected 状态怎么落到组件？

如果没有代码样例，它会靠自由发挥，效果自然不稳定。

### 2. 规则过抽象，缺少可执行约束

例如“左侧导航 + 主内容 + 筛选 + 表格”是对的，但对 Codex 来说还不够。它还需要更硬的约束：

- sidebar 宽度范围，例如 240-280px；
- header 高度，例如 56-64px；
- table row height，例如 44-52px；
- card radius，例如 6-8px；
- gap scale，例如 8/12/16/24；
- button hierarchy：primary / secondary / ghost / destructive；
- mobile 行为：sidebar 折叠、底部操作栏、表格卡片化。

现在的 references 能提醒方向，但不能稳定约束实现。

### 3. 示例太少，而且不是目标框架

当前只有一个静态 HTML before/after 示例。它证明了流程可跑，但无法覆盖 React / Vite / Next.js / Tailwind / shadcn / Vue 等真实项目。

Codex 需要看到多个“真实项目式案例”：

- React + Tailwind 工作台；
- shadcn/ui dashboard；
- CRM 客户详情页；
- AI workbench；
- 数据表格 + 筛选 + 详情抽屉；
- mobile app-style 便签/任务工具；
- H5 表单/报告页。

每个案例都应该包含截图、源代码、改造前后说明、状态覆盖和视觉 QA。

### 4. 部分样本分析文件已损坏

`samples/analysis/*.md` 中出现大量连续问号乱码，说明这些分析笔记已经失去有效语义。它们会污染 Codex 的判断：文件存在，但内容不可用。

这批文件需要重新生成或废弃，不能继续作为高质量参考。

### 5. QA 脚本只能抓机械问题，不能判断“美不美”

当前 `visual-audit.mjs` 能检查：

- 空白/loading 风险；
- 横向滚动；
- 文本溢出；
- 小按钮；
- 大固定遮挡。

这些是底线 QA，不是审美 QA。一个页面可以全部 PASS，但仍然丑，因为它可能存在：

- 信息层级弱；
- 数据密度不对；
- 颜色体系混乱；
- 卡片太碎；
- 图标/按钮没有节奏；
- 主操作不明确；
- app shell 不像真实产品；
- 组件细节没有统一。

下一步要加入“人工视觉评分表 + 截图对照 + 参考 pattern 对齐检查”。

## 推荐开源代码来源

原则：优先找可 copy-paste、结构完整、许可证清晰、偏真实应用界面的项目。React Bits 适合作为动效和微交互补充，但不适合作为业务工具的主骨架。

| 来源 | 适合用途 | 使用建议 | 风险 |
|---|---|---|---|
| shadcn/ui blocks | dashboard shell、sidebar、table、chart、login、settings | 作为默认 React/Tailwind/shadcn 范式库 | 需要适配目标项目依赖 |
| shadcn-admin | Vite + React 后台、侧边栏、命令搜索、多页面结构 | 抽取 app shell、路由布局、主题、表格页 | 不要整仓库照搬 |
| next-shadcn-dashboard-starter | Next.js 管理后台、认证、图表、表格、表单 | 作为 Next.js 项目的完整结构参考 | 依赖较重，需要裁剪 |
| openstatus data-table-filters | 高质量数据表格、筛选、排序、详情面板 | 用于 CRM/后台/数据看板核心表格 | 表格抽象较复杂 |
| Tremor | 数据看板、图表、指标卡、dashboard 组件 | 用于 analytics / BI / KPI 页面 | 要确认 Tailwind/Radix 适配成本 |
| Origin UI | copy-paste app UI 组件 | 用于表单、命令菜单、设置、列表、控件细节 | 需要统一 token，不要混搭过度 |
| React Bits | 动效、空状态、轻量视觉亮点 | 只用于产品页、AI 工作台、个别微交互 | 许可证带 Commons Clause，默认不内置复制源码 |

## 新架构设计

建议把项目从现在的结构升级为：

```text
.
  references/                 # 抽象规则，继续保留
  checklists/                  # 审计和安全清单，继续保留
  templates/                   # 输出模板，继续保留
  scripts/                     # QA / 导入 / 报告脚本
  samples/                     # 视觉样本，清洗后保留
  patterns/                    # 新增：可模仿代码范式
    registry.json
    app-shell/
      shadcn-dashboard-shell/
        pattern.md
        screenshot.png
        source-map.json
        code/
    data-table/
      faceted-filter-table/
    crm/
      customer-list-detail/
    ai-workbench/
      chat-run-history/
    mobile-app/
      notes-workbench/
  recipes/                     # 新增：按产品类型组织的改造配方
    saas-dashboard.md
    crm-customer-ops.md
    ai-workbench.md
    data-dashboard.md
    mobile-notes-app.md
  benchmarks/                  # 新增：丑原型 -> 改造后，用于验证 kit 是否真的变强
```

## Pattern 文件应该包含什么

每个 pattern 都要让 Codex 能直接照着改：

```yaml
id: shadcn-dashboard-shell
category: app-shell
source:
  name: shadcn/ui blocks
  url: https://ui.shadcn.com/blocks
  license: MIT
best_for:
  - SaaS dashboard
  - CRM
  - internal tools
not_for:
  - landing page
  - one-off H5 campaign
depends_on:
  - React
  - Tailwind
  - shadcn/ui
core_structure:
  - SidebarProvider
  - AppSidebar
  - SiteHeader
  - SectionCards
  - DataTable
responsive_rules:
  - sidebar collapses on mobile
  - table becomes horizontal-scroll container or card list
state_requirements:
  - loading
  - empty
  - error
  - selected
implementation_notes:
  - Preserve target app data flow.
  - Copy layout rhythm, not brand style.
  - Replace mock data with target app domain objects.
```

同时配 `pattern.md`，写清楚：

- 适合什么业务；
- 关键布局；
- 组件拆分；
- token；
- 状态；
- mobile；
- 如何迁移到目标项目；
- 哪些代码可以参考，哪些不能复制；
- 人工确认点。

## Codex 工作流升级

旧流程：

1. 判断产品类型；
2. 读 references；
3. 输出 audit；
4. 写 design；
5. 改代码；
6. 截图 QA。

新流程：

1. 判断产品类型和主对象。
2. 选择 1 个主 recipe。
3. 从 `patterns/registry.json` 选择 1-3 个代码 pattern。
4. 先写 `PATTERN_MATCH.md`：为什么选这些，不选哪些。
5. 输出 `UI_AUDIT.md`。
6. 输出 `DESIGN.md`，必须引用具体 pattern 和文件。
7. 改代码，优先复用目标项目技术栈。
8. 运行桌面和移动截图 QA。
9. 用人工视觉评分表打分。
10. 修复后输出 `UI_DELIVERY_REPORT.md`。

## 人工视觉评分表

建议每次改造后人工给 1-5 分：

| 维度 | 说明 |
|---|---|
| 产品真实感 | 是否像真实可用产品，而不是 demo |
| 信息层级 | 用户 5 秒内能否知道页面在干什么 |
| 操作路径 | 主操作、次操作、危险操作是否清楚 |
| 组件一致性 | 字号、间距、圆角、边框、按钮是否统一 |
| 数据密度 | 是否适合目标场景，不空不挤 |
| 状态完整度 | loading / empty / error / disabled / hover / selected 是否齐 |
| 移动端质量 | 是否无横向滚动、遮挡、小按钮、文字溢出 |
| 代码可维护性 | 组件拆分是否清楚，是否尊重原项目结构 |

目标：平均分低于 4 不算交付。

## 分阶段执行计划

### Phase 1：修复现有资料

- 重新生成 `samples/analysis/*.md`，消除连续问号乱码。
- 给每个样本打标签：visual-only / code-backed / weak-sample。
- 删除或降权加载失败、cookie 遮挡、营销页误判为后台的样本。
- 更新 `SKILL.md`：要求先选 recipe 和 pattern。

### Phase 2：建立开源代码范式库

- 新增 `patterns/registry.json`。
- 第一批只做 8-12 个高质量 pattern，不贪多。
- 每个 pattern 必须包含截图、来源、许可证、适用场景、代码入口、迁移说明。
- 优先覆盖：
  - dashboard shell；
  - sidebar layout；
  - data table with filters；
  - customer list/detail；
  - AI chat/workbench；
  - mobile notes/task app；
  - empty/error/loading states；
  - settings/form page。

### Phase 3：做真实 benchmark

建立 5-10 个“丑原型”基准项目：

- 桌面便签；
- CRM 客户表；
- 数据看板；
- AI 工具工作台；
- H5 表单；
- 项目任务面板。

每个 benchmark 都要有：

- before 截图；
- after 截图；
- 源代码；
- `UI_AUDIT.md`；
- `DESIGN.md`；
- `PATTERN_MATCH.md`；
- `UI_DELIVERY_REPORT.md`；
- 人工视觉评分。

### Phase 4：增强 QA

- 保留现有机械 QA。
- 增加截图对照报告：before / after / reference pattern。
- 增加 token 提取：颜色、字号、间距、圆角。
- 增加 component consistency 检查：按钮高度、圆角、边框、字号是否统一。
- 增加人工评分模板。

### Phase 5：做成真正的 skill kit

最终使用方式应该是：

```text
使用 Codex UI Designer Kit 改造这个项目。
先判断产品类型，再选择 recipe 和 pattern。
不要只读规则，要引用 patterns 里的代码范式。
输出 PATTERN_MATCH.md、UI_AUDIT.md、DESIGN.md。
改代码后跑桌面/移动截图 QA 和人工视觉评分。
平均评分低于 4 分继续修。
```

## 对 React Bits 的判断

React Bits 很强，但它解决的是“动效和记忆点”，不是“业务工具产品化”的主骨架。对当前 kit 来说，它应该排在第二层：

- 可以用于 AI workbench 的输入动效、生成中状态、空状态视觉；
- 可以用于 H5/产品页的视觉亮点；
- 不建议用于 CRM、后台、数据表格的主体布局；
- 不建议把它作为默认复制源码来源，因为许可证不是纯 MIT，而是 MIT + Commons Clause，需要单独确认使用边界。

我的建议是：React Bits 放进 `patterns/micro-interactions/`，默认作为可选增强，不作为基础模板。

## 第一批最值得做的 pattern

1. `app-shell/shadcn-dashboard-shell`
2. `app-shell/vite-shadcn-admin-shell`
3. `data-table/faceted-filter-table`
4. `dashboard/tremor-kpi-chart-grid`
5. `crm/customer-list-detail`
6. `ai-workbench/chat-history-runner`
7. `mobile-app/notes-workbench`
8. `states/loading-empty-error-set`
9. `settings/settings-form-page`
10. `micro-interactions/react-bits-empty-state`

## 成功标准

这个 kit 升级后，Codex 不应该只是说“我会让 UI 更专业”，而应该能做到：

- 明确选择某个 pattern；
- 解释为什么选它；
- 把目标项目的业务对象映射到 pattern；
- 按 pattern 改组件；
- 生成可运行代码；
- 截图 QA；
- 人工评分；
- 低分继续修。

这样才会从“凭感觉美化”变成“按成熟产品代码范式改造”。这才是下一步真正能让效果稳定提升的地方。
