# chat-history-runner

## 适用场景

- AI 聊天、Agent 工作台、提示词工具、AI 搜索、代码/文档/图片生成器。
- 用户需要输入任务、等待运行、查看输出、重试、采纳或人工确认。

## 不适用场景

- 只有静态 FAQ 的帮助页面。
- AI 产品营销页或纯展示页。

## 推荐业务对象

会话、任务、prompt、模型、附件、运行步骤、工具调用、输出版本、采纳记录。

## 页面结构

- 左侧：历史会话/项目/最近运行。
- 中央：输入区、运行过程、输出结果。
- 右侧可选：上下文文件、设置、引用、变更摘要。
- 底部或输入区：提交、停止、重试、快捷指令。

## 组件拆分

- `ConversationSidebar`
- `PromptComposer`
- `RunStatusTimeline`
- `OutputPanel`
- `ArtifactPreview`
- `ContextPanel`
- `ReviewGate`
- `RunHistoryItem`

## 状态设计

- empty：给示例任务、可用能力和最近入口。
- running：显示步骤、日志摘要、取消/停止。
- error：失败原因、重试、修改输入建议。
- disabled：模型不可用、权限不足、上下文缺失。
- needs-review：外部发送、写库、改代码、导出前等待确认。
- accepted：结果已应用后显示回滚或查看变更。

## 响应式规则

- 桌面：历史侧栏 260-320px，主输出区优先。
- 平板：右侧上下文折叠为 tab/sheet。
- 手机：历史进入 drawer，输入固定底部并避开安全区。

## 设计 token 建议

- 正文 14-16px，日志/元信息 12-13px。
- 输出卡片 radius 8px 内，不要大面积玻璃拟态。
- 运行状态用固定语义色：running、success、error、review。

## 如何迁移到目标项目

1. 判断 AI 类型：chat、agent、generator、search。
2. 把现有输入/输出拆为 composer、run status、output。
3. 明确哪些动作只是本地预览，哪些会产生外部副作用。
4. 对外部副作用接入 `ReviewGate`。

## 可以模仿

- 历史 + 输入 + 运行 + 输出 + 人工确认的闭环。
- Agent 运行步骤和结果采纳状态。

## 不要照搬

- ChatGPT/Claude/v0 等产品的品牌、模型名、私有交互。
- 登录后界面截图和用户数据。

## 许可证和风险说明

本 pattern 为 kit 内部复合范式，基于公开 AI 产品的通用交互抽象。微交互可参考 React Bits，但 React Bits 许可证带 Commons Clause，不能默认复制分发源码。

## 人工确认点

- 应用代码、写入数据库、发送消息、群发、导出、发布、删除。
- AI 生成的外部文案、日期、链接、收件人。
