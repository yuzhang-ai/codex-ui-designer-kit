# Code Notes

推荐 dashboard 层级：

```tsx
<DashboardFilters />
<section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  {metrics.map((metric) => <KpiCard key={metric.id} metric={metric} />)}
</section>
<section className="grid gap-4 xl:grid-cols-2">
  <TrendChart />
  <BreakdownChart />
</section>
<AnomalyCallout />
<InsightTable />
```

每个 `KpiCard` 至少包含：

- 指标名
- 当前值
- 同比/环比或目标达成
- 时间范围或口径入口
