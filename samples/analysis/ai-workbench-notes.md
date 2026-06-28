# AI 工作台样本分析

采集日期：2026-06-23
样本数量：10
截图数量：20
当前状态：已修复 UTF-8 乱码，并重新标注质量层级。

## 总结

AI 工作台样本覆盖了聊天、搜索、代码生成、应用生成、演示文稿生成和媒体生成。它们共同说明：AI UI 不能只有一个输入框，必须同时呈现输入上下文、运行状态、输出结果、历史记录和人工确认。

## 样本清单

| sample_id | 产品 | 页面类型 | 质量层级 | 截图 |
|---|---|---|---|---|
| ai-chatgpt | ChatGPT | AI assistant entry | weak-sample | samples/raw-screenshots/ai-workbench/ai-chatgpt__desktop.png |
| ai-claude | Claude | AI assistant entry | weak-sample | samples/raw-screenshots/ai-workbench/ai-claude__desktop.png |
| ai-perplexity | Perplexity | AI search workbench | weak-sample | samples/raw-screenshots/ai-workbench/ai-perplexity__desktop.png |
| ai-cursor | Cursor | AI coding product page | visual-only | samples/raw-screenshots/ai-workbench/ai-cursor__desktop.png |
| ai-v0-chat | v0 | Prompt-to-UI workbench | code-backed | samples/raw-screenshots/ai-workbench/ai-v0-chat__desktop.png |
| ai-lovable | Lovable | AI app builder | strong-reference | samples/raw-screenshots/ai-workbench/ai-lovable__desktop.png |
| ai-replit-agent | Replit Agent | Agent product page | strong-reference | samples/raw-screenshots/ai-workbench/ai-replit-agent__desktop.png |
| ai-gamma | Gamma | AI presentation product page | weak-sample | samples/raw-screenshots/ai-workbench/ai-gamma__desktop.png |
| ai-runway | Runway | AI media product page | visual-only | samples/raw-screenshots/ai-workbench/ai-runway__desktop.png |
| ai-midjourney-explore | Midjourney | AI gallery / explore | visual-only | samples/raw-screenshots/ai-workbench/ai-midjourney-explore__desktop.png |

## 可提炼模式

- AI 工作台至少需要：历史/项目、主输入、运行状态、输出预览、采纳/重试/复制动作。
- Agent 型界面要显式展示步骤、工具调用、等待确认、失败重试和已应用状态。
- AI 生成结果对外发送、写库、改代码、导出前必须有 needs-review 状态。
- 空状态应给示例任务和可用能力，不要只放一句欢迎语。

## 质量风险

- 部分 AI 站点被安全验证、登录页或 about:blank 阻断，只能作为 weak-sample。
- AI 产品页常有强视觉和动效，但不能替代工作台骨架。
- React Bits 可作为空状态或生成中微交互参考，但不能作为后台主结构。

## 对 Codex 的使用建议

1. 遇到聊天、Agent、生成器、AI 搜索、AI 自动化，先选 `recipes/ai-workbench.md`。
2. 主 pattern 选 `ai-workbench/chat-history-runner`，需要状态补齐时叠加 `states/loading-empty-error-set`。
3. 可选微交互只放在输入、空状态或生成中区域，不要抢占结果阅读区。
4. 任何外部副作用都必须进入人工确认。
