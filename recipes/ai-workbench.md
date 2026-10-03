# Recipe: AI Workbench

## 1. 产品类型怎么判断

满足以下任意 1 项，判定为 AI workbench：

- 用户输入 prompt、任务、文件或目标，等待 AI 输出。
- 页面有模型、Agent、工具调用、生成中、结果采纳或历史记录。
- 结果可能被复制、应用、下载、发送、写入或发布。

## 2. 优先读取

- `references/ai-workbench-ui.md`
- `checklists/product-ui-risk-checklist.md`
- `checklists/ui-audit-checklist.md`
- `checklists/mobile-responsive-checklist.md`
- `samples/analysis/ai-workbench-notes.md`

## 3. 优先选择 patterns

1. `patterns/ai-workbench/chat-history-runner`
2. `patterns/states/loading-empty-error-set`
3. `patterns/micro-interactions/react-bits-empty-state`（可选，只用于微交互）

React Bits 不能作为主骨架，只能作为空状态或生成中状态的轻量增强。

## 4. 按任务选择页面结构

简单生成/阅读工具通常只需输入、运行反馈、输出及必要保存/编辑。以下区域是候选，不必全部出现；模型选择、日志和历史只在解决真实任务时加入。

- History：会话、项目、最近运行。
- Composer：多行输入、附件、模式/模型、提交按钮。
- Run Status：步骤、工具调用、停止、失败重试。
- Output：结果、预览、引用、复制、编辑、采纳。
- Review Gate：实际后果和授权要求审核时展示对象与变更，复用宿主审核机制。

## 5. 必须补齐状态

- empty：示例任务和能力入口。
- running：当前步骤、日志摘要、停止/取消。
- error：失败原因、重试、修改输入。
- disabled：模型不可用、权限不足、上下文缺失。
- needs-review：仅在适用审核门时等待确认。
- accepted：已应用后可查看变更或回滚。

## 6. 移动端默认处理

- 历史进入 drawer。
- 输入区固定底部时避开键盘和安全区。
- 输出优先阅读，辅助面板折叠。
- 操作按钮分组，不要挤在输入框里。

## 7. 审核与恢复

读取 `references/interaction-contracts.md`。本地可逆编辑、mock 与普通下载/导出不自动增加确认；真实外部发送、敏感数据、生产写回等按既有授权与宿主规则。需要审核时展示对象、变更及后果，拒绝不产生副作用。

## 8. 改造完成后如何 QA

确需审核的artifact应用任务先读 [review/apply playbook](../examples/ai-workbench-review/PLAYBOOK.md)，运行 `node scripts/verify-ai-workbench-case.mjs` 验证合成状态契约，再按矩阵补真实宿主/浏览器/模型/外部读回。机器示例通过不能替代后者。

1. 截桌面和移动，重点检查输入区、输出区、运行状态。
2. 人工评分时重点看操作路径、状态完整度和产品真实感。
3. 检查 `needs-review` 是否真的阻断副作用。
4. 优先处理主流程阻塞；评分仅辅助，按 SKILL 的最多三轮与证据边界执行。
