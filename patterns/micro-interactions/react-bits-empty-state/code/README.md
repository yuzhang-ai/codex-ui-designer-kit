# Code Notes

默认先写本地轻量 fallback，不直接复制 React Bits 源码：

```tsx
function EmptyState() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-3 py-10 text-center">
      <AnimatedEmptyIcon />
      <div>
        <h3 className="text-base font-medium">还没有内容</h3>
        <p className="mt-1 text-sm text-muted-foreground">创建第一条记录后，这里会显示可操作列表。</p>
      </div>
      <Button>新建</Button>
    </div>
  )
}
```

如果要复制 React Bits 组件源码：

1. 先确认许可证。
2. 保留版权和许可证说明。
3. 不把组件本身作为可售卖/可再分发资产。
4. 提供 reduced-motion fallback。
