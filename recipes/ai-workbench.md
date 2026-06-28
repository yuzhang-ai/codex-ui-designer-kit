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

## 4. 页面结构默认搭法

- History：会话、项目、最近运行。
- Composer：多行输入、附件、模式/模型、提交按钮。
- Run Status：步骤、工具调用、停止、失败重试。
- Output：结果、预览、引用、复制、编辑、采纳。
- Review Gate：发送、写入、导出、发布前确认。

## 5. 必须补齐状态

- empty：示例任务和能力入口。
- running：当前步骤、日志摘要、停止/取消。
- error：失败原因、重试、修改输入。
- disabled：模型不可用、权限不足、上下文缺失。
- needs-review：外部副作用前等待确认。
- accepted：已应用后可查看变更或回滚。

## 6. 移动端默认处理

- 历史进入 drawer。
- 输入区固定底部时避开键盘和安全区。
- 输出优先阅读，辅助面板折叠。
- 操作按钮分组，不要挤在输入框里。

## 7. 必须人工确认的操作

- AI 对外发送内容。
- AI 写代码、写数据库、写 CRM/企微/飞书。
- 下载、导出、公开分享、批量生成。
- 日期、链接、收件人、客户称呼和法律/财务文案。

## 8. 改造完成后如何 QA

1. 截桌面和移动，重点检查输入区、输出区、运行状态。
2. 人工评分时重点看操作路径、状态完整度和产品真实感。
3. 检查 `needs-review` 是否真的阻断副作用。
4. 平均分低于 4 分继续修。
