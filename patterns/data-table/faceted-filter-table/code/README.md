# Code Notes

字段优先级先行，组件随后：

```tsx
const customerColumns = [
  col.text("name", { header: "客户" }),
  col.badge("stage", { header: "阶段" }),
  col.text("owner", { header: "负责人" }),
  col.date("lastContactedAt", { header: "最近跟进" }),
]
```

推荐页面骨架：

```tsx
<PageHeader title="客户" action={<Button>新建客户</Button>} />
<DataTableToolbar table={table} filters={filters} />
<DataTable table={table} />
<BulkActionBar selectedCount={table.getSelectedRowModel().rows.length} />
<RowDetailSheet />
```

移动端不要硬塞所有列。改成卡片列表，展示客户名、阶段、负责人、最近跟进和主操作。
