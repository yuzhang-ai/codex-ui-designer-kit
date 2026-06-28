# 小程序式模式样本分析

采集日期：2026-06-23
样本数量：6
截图数量：12
当前状态：已修复 UTF-8 乱码，并重新标注质量层级。

## 总结

小程序式样本主要用于提炼“列表 -> 详情 -> 提交 -> 结果”的轻量流程闭环。它们更像移动端交互规范和组件库参考，而不是 Web 后台主骨架。

## 样本清单

| sample_id | 产品 | 页面类型 | 质量层级 | 截图 |
|---|---|---|---|---|
| mini-wechat-design | 微信小程序设计 | Design guidelines | strong-reference | samples/raw-screenshots/mini-program-patterns/mini-wechat-design__desktop.png |
| mini-alipay-design | 支付宝小程序设计 | Design guidelines | strong-reference | samples/raw-screenshots/mini-program-patterns/mini-alipay-design__desktop.png |
| mini-tdesign | TDesign MiniProgram | Component docs | code-backed | samples/raw-screenshots/mini-program-patterns/mini-tdesign__desktop.png |
| mini-weui | WeUI | Component demo | code-backed | samples/raw-screenshots/mini-program-patterns/mini-weui__desktop.png |
| mini-vant-weapp | Vant Weapp | Component docs | code-backed | samples/raw-screenshots/mini-program-patterns/mini-vant-weapp__desktop.png |
| mini-ant-mobile-list | Ant Design Mobile | Component docs | code-backed | samples/raw-screenshots/mini-program-patterns/mini-ant-mobile-list__desktop.png |

## 可提炼模式

- 移动轻流程适合列表、详情、提交、确认摘要、结果反馈。
- 每页只保留一个主操作，危险操作隔离。
- 状态、时间、责任人、下一步入口要在列表项固定位置。
- 底部操作栏要避开安全区，并避免与底部导航冲突。

## 质量风险

- 组件库页面不是业务成品页，不能直接当作完整产品结构。
- 小程序规范适合移动流程，不适合桌面 SaaS/CRM 主工作台。
- 真实业务提交、订单、客户信息和工单写回必须人工确认。

## 对 Codex 的使用建议

1. 移动端任务、订单、审批、工单、报名流程可以借用本组规则。
2. React Web 项目可把这些规则迁移为 `mobile-app/notes-workbench` 或状态 pattern。
3. 移动 QA 必须检查底部安全区、按钮高度和横向滚动。
4. 不要复制平台品牌、图标或专有组件源码。
