# Recipe: Mobile Notes / Task App

## 1. 产品类型怎么判断

满足以下任意 1 项，判定为 mobile notes/task app：

- 页面对象是便签、任务、清单、收藏、想法、草稿、轻量工单。
- 用户主要在移动端创建、浏览、筛选、编辑、完成。
- 当前原型是卡片/列表，但缺少真实 app shell 和状态。

## 2. 优先读取

- `references/app-style-web-ui.md`
- `references/h5-mobile-web-ui.md`
- `references/mini-program-patterns-ui.md`
- `checklists/mobile-responsive-checklist.md`
- `samples/analysis/app-style-web-ui-notes.md`

## 3. 优先选择 patterns

1. `patterns/mobile-app/notes-workbench`
2. `patterns/states/loading-empty-error-set`
3. `patterns/micro-interactions/react-bits-empty-state`（可选）

如果目标其实是设置表单，不要强行用 notes pattern，改选 `settings/settings-form-page`。

## 4. 页面结构默认搭法

- Mobile Shell：顶部标题、搜索/筛选、创建。
- List：分组、卡片、状态、时间、标签。
- Detail/Edit：标题、正文、标签、保存、删除。
- Bottom Nav：高频入口。
- Sync：保存中、离线、同步失败。

## 5. 必须补齐状态

- loading：列表骨架。
- empty：创建第一条或导入示例。
- error：同步失败、保存失败、离线。
- disabled：只读、已归档、权限不足。
- selected：当前卡片、当前标签、当前 tab。

## 6. 移动端默认处理

- 手机单列，按钮高度至少 44px。
- 底部导航避开安全区。
- 详情编辑用独立页或 bottom sheet。
- 长标题换行或截断，不撑破卡片。

## 7. 必须人工确认的操作

- 删除、批量归档、导出、公开分享。
- 同步到第三方账号或外部空间。
- AI 生成内容自动写入或发送。

## 8. 改造完成后如何 QA

1. 必须截图 390 x 844。
2. 检查无横向滚动、按钮大小、底部遮挡、长文本。
3. 使用视觉评分表，重点看移动端质量、操作路径、状态完整度。
4. 平均分低于 4 分继续修。
