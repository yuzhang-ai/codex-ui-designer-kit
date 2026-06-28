# Code Notes

AI 工作台骨架：

```tsx
<div className="grid min-h-svh lg:grid-cols-[280px_minmax(0,1fr)_360px]">
  <ConversationSidebar />
  <main className="flex min-h-0 flex-col">
    <RunStatusTimeline />
    <OutputPanel />
    <PromptComposer />
  </main>
  <ContextPanel />
</div>
```

状态枚举建议：

```ts
type RunState = "empty" | "running" | "error" | "needs-review" | "accepted"
```

`needs-review` 不只是视觉状态，要阻止真正的发送、写回、发布或导出。
