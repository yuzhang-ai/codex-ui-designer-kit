# Code Notes

状态矩阵可以先写成常量：

```ts
type ViewState = "loading" | "empty" | "error" | "ready" | "disabled"
```

组件骨架：

```tsx
function StateBlock({ state }: { state: ViewState }) {
  if (state === "loading") return <TableSkeleton />
  if (state === "empty") return <EmptyState action={<Button>新建</Button>} />
  if (state === "error") return <ErrorState action={<Button>重试</Button>} />
  return <Content />
}
```

每个状态都要有业务语义，不要只放占位文字。
