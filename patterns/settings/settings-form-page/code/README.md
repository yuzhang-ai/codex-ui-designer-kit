# Code Notes

设置页骨架：

```tsx
<SettingsLayout>
  <SettingsNav />
  <main className="max-w-3xl space-y-8">
    <SettingsSection title="通知">
      <SettingsField name="emailDigest" />
      <SettingsField name="weeklySummary" />
    </SettingsSection>
    <DangerZone />
    <UnsavedChangesBar />
  </main>
</SettingsLayout>
```

字段必须有：

- label
- description
- current value
- validation error
- disabled reason
- saving/saved feedback
