---
name: codex-ui-designer-kit
description: Design and implement coherent product UI with Codex for users without design experience, from a product idea or an existing rough interface. Use for whole page sets, visual direction, plain-language effect exploration, responsive layouts, and usable interaction states; not for backend-only tasks.
---

# Codex UI Designer Kit

让没有设计经验的人，无论只有产品想法，还是已有一个不知道怎么改的小 demo，都能通过 Skill 引导 Codex 做出一套产品级页面。

承担设计判断：把自然语言需求转成页面结构、统一视觉规范和可操作的界面，再用真实运行与视觉检查迭代。不要要求用户先选择字体、风格术语、组件库或设计参数。产品级是交付目标，不能仅凭用了本 Skill 或生成截图就宣称达成。

## 1. 理解产品，选择工作模式

从用户描述和项目事实提取：谁使用、要完成什么任务、核心对象与输入输出、主要设备、已有代码/品牌/参考、此次范围。给出简短理解和有理由的默认方案；只有缺失信息会显著改变结果时，才用日常语言提问。

- **从零新建**：从想法规划必要页面和主流程，再生成实际项目代码；不要求先提供原型或 Before 截图。
- **已有改造**：先确认运行入口和现有行为，审查主要问题；保留用户已有修改和功能。用 `templates/UI_AUDIT.md` 做针对性审查。
- **局部优化**：只处理指定页面/组件，沿用现有系统；不强行重做整套产品。

技术栈优先沿用工程；全新项目先查运行时与已有模板，选择能在当前环境运行的轻量方案。不要因为 pattern 示例使用 React 就强制迁移。

## 2. 先规划一套页面，再决定单页外观

读取 `references/product-design-workflow.md`。以一条主任务闭环决定页面范围，例如「列表 → 详情 → 编辑 → 保存并返回」。为每页记录主任务、对象、入口/返回、共享组件和关键状态；明确跨页数据从哪里来、如何保存、刷新后是否保留。

使用 `templates/DESIGN.md` 保存设计决策。小任务合并成一份简短记录即可，不机械生成所有模板。不要自动加入登录、付费、后台、社交等用户没有要求的能力。Mock、浏览器本地存储、真实服务分别标注。

## 3. 替用户选择有依据的视觉方向

读取 `references/design-foundations.md`，先排代表页的内容优先级，再决定排版角色、分组与各区域的响应式变化。

结合任务、内容密度、用户、品牌和参考，给出一个推荐方向及理由；落成字体层级、颜色语义、间距、圆角、边框、布局与交互反馈的共享 tokens。没有品牌时选择清晰克制的默认方向，必要时只给一个有实际差异的备选。

- 工具/后台：突出任务、信息可扫读、列表详情和操作效率。
- 内容/移动产品：突出阅读、编辑与轻量导航。
- 展示/营销页面：突出内容叙事与转化；视觉表现服务于文案和品牌。

避免把所有品类套进同一种 hero、三列卡片、渐变或玻璃效果。先实现最能代表核心任务的一页，用真实内容和目标设备验证方向，再扩展其余页面，共用组件与 tokens。明确推荐不等于要求用户逐项批准；在授权范围内继续执行。

### 用户说不出效果名字时

读取 `references/design-dialogue.md`，把“想要这种感觉”拆成视觉、结构、交互和动效意图；再用 `references/effect-patterns.md` 按场景检索；需要细分交互时按需读取 `references/series-ui-patterns.md`，不要一次加载或展示整个目录。先用白话解释一个推荐效果及取舍，必要时展示一到两个同内容小样供比较，再把选定效果写成实现规格。术语帮助沟通，不成为用户门槛；明确偏好后不重复选择。

对于加载、生成、切换与保存主动判断是否需要反馈，效果依据真实状态运行，不能伪造进度。参考视频未成功读取时如实标注。可用 `examples/effect-studio/index.html` 体验加载、转场、排版与减少动态效果；它是独立交互样例，不是已接模型的产品。

### 按需复用资源

| 场景 | 入口 |
|---|---|
| SaaS / 设置 / 表单 | `recipes/saas-dashboard.md` |
| CRM / 客户运营 | `recipes/crm-customer-ops.md` |
| AI 工作台 | `recipes/ai-workbench.md` |
| 数据看板 | `recipes/data-dashboard.md` |
| 移动笔记 / 任务 | `recipes/mobile-notes-app.md` |
| 展示 / 营销页面 | `references/product-design-workflow.md` 的展示页面分支 |

业务工具读取 `patterns/registry.json`，按需选 1–3 个布局、内容、状态 pattern；检查 `pattern.md`、`source-map.json` 和 `code/README.md`。用 `templates/PATTERN_MATCH.md` 或 DESIGN 的来源段说明映射、采用/舍弃理由、许可与适配。

现有 recipes/patterns 是设计指导与结构示意，含未定义组件，**不是可直接运行的整套模板**。找不到匹配时记录缺口，复用工程组件或核验公开官方来源后自行实现；不得伪称库内已提供该能力。React Bits 只用于适合的局部效果；核对所选源的许可与版本，不盲目复制整仓。

## 4. 实现可用界面，而非只画成功态

实现当前授权范围内的页面、导航、组件和主流程。状态表按具体任务填写：触发条件、可见反馈、下一步、数据变化、失败恢复。覆盖适用的 loading、empty、error、disabled、selected、保存中/已保存；AI 场景补运行、取消、重试以及适用的预览/应用/读回/撤销契约。

涉及提交、保存、AI 或复杂控件时读取 `references/interaction-contracts.md`：落实保留输入、真实成功、用户修正与焦点去向，并用实际操作验收。简单 AI 工具不默认膨胀为完整工作台。

响应式不是整体缩小：说明导航、列表/表格、侧栏和主操作在小屏如何变化。处理长标题、真实数量、空数据、失败和窄屏；提供清晰标签、键盘焦点、可读对比、足够操作区域，不能仅用颜色传达状态。

沿用已有框架和设计系统；抽出实际复用组件，避免每页各自硬编码规范。示例数据标为 mock；未连接服务的按钮不得暗示已保存、已发送或已完成真实任务。

## 5. 真实检查、迭代、交付

读取 `references/product-quality.md`。按范围运行构建/现有测试、浏览器主路径和多视口检查，实际查看截图；多页产品检查共享布局和代表性页面的特殊状态。已有改造保留前后对比，新建提供页面与主流程证据。

可用 `scripts/visual-audit.mjs` 捕获桌面/移动截图：

```bash
node scripts/visual-audit.mjs --url http://localhost:3000 --name after
```

运行前检查脚本参数与 Node/浏览器前提。自动报告是机器检查，不证明视觉质量或业务闭环。不能运行浏览器时记录原因和未验证项。

先修复阻塞主流程、溢出、遮挡、状态误导与跨页不一致。默认最多 3 轮聚焦修复；两次同类失败没有新增证据时先写根因链并更换最小探针；仍未通过则交付 Candidate 和具体缺口，不无限循环或宣称完成。

交付实际代码、启动方式、简短 DESIGN 与验收结果；复杂任务用 `templates/UI_DELIVERY_REPORT.md` 汇总。`templates/VISUAL_SCORECARD.md` 可辅助评审：Agent 评分标为自评，真人未评保持未评。4 分阈值是本项目内部约定，平均分不能掩盖关键阻塞；用户/真人验收与机器通过分别报告。

## 授权与资料边界

本地设计、代码和 mock 交互在用户授权范围内继续推进。真实发送、生产写回、权限变更、公开发布、删除等外部副作用按既有授权执行；授权不足时先做好可审阅结果，再请求最终确认。模拟界面不需要为每个敏感按钮额外索取权限。

不把客户数据、凭证、私有截图或公司内部材料带入公开代码/报告。许可、外部文案、日期和链接按实际用途核验。既有 `checklists/` 和领域 `references/` 按需加载，不能将所有规则与风险流程堆给用户。
