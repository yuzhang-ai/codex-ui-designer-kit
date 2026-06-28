# Code Notes

Vite 后台 shell 推荐拆法：

```tsx
export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div className="pl-0 md:pl-64">
        <TopBar />
        <main className="px-4 py-4 md:px-6 md:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
```

页面不要重复实现全局导航。每个 route 只负责：

- `PageHeader`
- 当前模块 toolbar
- 表格、详情、表单或图表
- loading / empty / error / disabled 状态
