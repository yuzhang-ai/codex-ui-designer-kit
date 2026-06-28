# Code Notes

移动优先骨架：

```tsx
<MobileShell>
  <QuickCapture />
  <TagFilter />
  <NotesList />
  <BottomNav />
</MobileShell>
```

桌面增强：

```tsx
<div className="grid h-svh md:grid-cols-[360px_minmax(0,1fr)]">
  <NotesList />
  <NoteEditor />
</div>
```

移动端不要把桌面双栏硬挤进去；详情和编辑应变成独立页、drawer 或 bottom sheet。
