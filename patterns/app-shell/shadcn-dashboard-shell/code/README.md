# Code Notes

最小迁移骨架：

```tsx
export function DashboardShell() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <SectionCards />
          <ChartArea />
          <DataTable />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

迁移时优先替换：

- `AppSidebar`：导航项、当前模块、用户入口。
- `SiteHeader`：标题、搜索、时间范围、主操作。
- `DataTable`：目标业务对象字段、筛选、批量操作。

不要把 shell 放进装饰卡片；它应该是页面根结构。
