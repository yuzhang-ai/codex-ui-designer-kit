# Code Notes

推荐骨架：

```tsx
<CustomerToolbar />
<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px]">
  <CustomerTable />
  <CustomerSummaryPanel>
    <CustomerTimeline />
    <NextActionPanel />
    <RiskActionGroup />
  </CustomerSummaryPanel>
</div>
<ReviewGateDialog />
```

列表字段优先级：

1. 客户 / 公司
2. 阶段 / 标签
3. 负责人
4. 最近触达
5. 下一步动作
6. 风险状态
