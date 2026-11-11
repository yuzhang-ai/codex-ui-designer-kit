# PROJECT LOG

这个日志用于记录 Codex UI Designer Kit 从最初方案到当前 pattern-first 版本的演进，方便后续在 GitHub 上复盘为什么会有这些目录、模板和规则。

## 2026-06-23: 原始方向和样本采集

项目起点是一个明确的问题：Codex 能快速做出功能可用的原型，但 UI 经常像 demo 或内部草稿，不像真实产品。最初方案不是单纯“美化页面”，而是建立一个可复用的 UI 改造 kit。

当时确定的基础链路：

```text
collect -> analyze -> codify -> automate -> validate
```

对应落地：

- `samples/collection-plan.md`：公开页面采集边界和分类计划。
- `samples/raw-screenshots/`：公开 UI 截图样本。
- `samples/metadata/*.json`：样本结构化信息。
- `references/*.md`：从样本提炼出的产品类型 UI 规则。
- `checklists/*.md`：审计、风险、移动端、视觉 QA 检查清单。
- `examples/ugly-saas-dashboard/`：第一版 before/after 静态 HTML 示例。

## 2026-06-23: 优化路线和问题诊断

随着第一版 kit 能跑通，新的问题也暴露出来：只依赖截图和抽象规则，无法稳定约束 Codex 的真实代码实现。

关键诊断写入：

- `docs/optimization-roadmap.md`

当时明确的升级方向：

- 从“UI 规则库”升级为“代码范式库 + 视觉 QA + 人工审美复核”。
- 不再只告诉 Codex “要像后台”，而是提供可模仿的 React / Tailwind / shadcn 页面骨架。
- React Bits 只作为微交互参考，不作为 CRM、后台、数据表格主骨架。

## 2026-06-25: Pattern-first 升级

本阶段完成了当前仓库的核心升级：把 kit 从 references-first 调整为 recipe + pattern-first。

主要新增：

- `patterns/registry.json`：按产品类型索引 pattern。
- `patterns/**/pattern.md`：每个 pattern 的适用场景、页面结构、组件拆分、状态、响应式、token、迁移方法和风险。
- `patterns/**/source-map.json`：开源来源、许可证和复制边界。
- `patterns/**/code/README.md`：最小代码骨架或迁移备注。
- `recipes/*.md`：按产品类型组织的改造配方。
- `templates/PATTERN_MATCH.md`：要求 Codex 说明为什么选择某些 pattern。
- `templates/VISUAL_SCORECARD.md`：人工视觉评分模板，平均分低于 4 不算交付。
- `samples/SAMPLE_QUALITY_REPORT.md`：对原有样本做质量分层。
- `KIT_UPGRADE_DELIVERY_REPORT.md`：本轮升级交付报告。

同时修复：

- `samples/analysis/*.md` 的中文乱码。
- `samples/README.md` 的中文乱码。
- `SKILL.md`、`README.md`、`AGENTS.md` 的旧流程说明。

## 当前工作流

新版 kit 的默认工作流：

```text
判断产品类型和主业务对象
-> 读取 recipe
-> 从 patterns/registry.json 选择 1-3 个 pattern
-> 输出 PATTERN_MATCH.md
-> 输出 UI_AUDIT.md
-> 输出 DESIGN.md，并引用具体 pattern
-> 修改目标项目代码
-> 跑桌面和移动截图 QA
-> 填 VISUAL_SCORECARD.md
-> 平均分低于 4 继续修
-> 输出 UI_DELIVERY_REPORT.md
```

## 2026-06-28: GitHub 发布整理

本次发布前整理目标：

- 保留最初方案、路线和后续升级记录。
- 把 pattern-first 改造内容和验证结果提交到 Git。
- 创建远端 GitHub 仓库并推送当前完整目录。
- 推送内容不包含客户数据、密钥、账号、私有链接或真实业务数据。

发布前检查项：

- JSON 解析：`patterns/registry.json`、`patterns/**/source-map.json`、`samples/metadata/*.json`。
- 乱码检查：连续问号乱码不能残留在核心文档中。
- 脚本语法：`node --check scripts/visual-audit.mjs`。
- Git 空白检查：`git diff --check`。

## 后续建议

- 为 `benchmarks/` 增加真实可运行的 before/after 项目。
- 为 Next.js / Vite / Vue / Svelte 增加框架适配说明。
- 增强视觉 QA：颜色、字号、间距、圆角、按钮一致性检测。
- 增加组件级视觉 diff。
