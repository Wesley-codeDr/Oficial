# Automaker Quick Start

## 🚀 Getting Started (30 seconds)

### 1. Open Automaker
Start Automaker application on ports 3007-3008

### 2. Create Feature
Click "New Feature" → Choose category → Describe task

### 3. Let it work
Agent will complete the task automatically

## 📋 Categories

| Category | Use For | Agent Speed |
|----------|---------|-------------|
| **Medical** | Anamnese, CFM compliance | Slow (Sonnet) |
| **UI/UX** | Components, design | Fast (Haiku) |
| **API** | Endpoints, integrations | Fast (Haiku) |
| **Bug Fix** | Quick fixes | Fast (Haiku) |
| **Refactor** | Code cleanup | Fast (Haiku) |

## ⚡ Performance Tips

✅ **DO**
- Use Bug Fix category for small changes
- Break large features into smaller tasks
- Run cleanup weekly
- Let auto-categorization work

❌ **DON'T**
- Create one huge feature
- Mix multiple concerns
- Keep completed features
- Manually load all memory files

## 🛠️ Common Tasks

### Fix a bug
1. Category: "Bug Fix"
2. Describe the issue
3. Agent uses Haiku (fast)
4. Done in minutes

### Add UI component
1. Category: "UI/UX"
2. Describe component
3. Agent uses Haiku (fast)
4. Uses glass design tokens

### Medical feature
1. Category: "Medical"
2. Describe anamnese change
3. Agent uses Sonnet (accurate)
4. Validates CFM compliance

## 📊 What's Optimized

- ⚡ Context: 15-30% (was 20-40%)
- ⚡ Memory: 2 files max (was 5)
- ⚡ Model: Haiku default (was Sonnet)
- ⚡ Workflows: Manual (was auto)

## 🧹 Weekly Maintenance

```bash
# Run this once a week
.automaker/scripts/cleanup.sh
```

## 🆘 Troubleshooting

### Automaker is slow
```bash
# Clean old features
.automaker/scripts/cleanup.sh

# Check size
du -sh .automaker/
```

### Agent loading too much context
- Check config.json `maxFilesPerFeature: 2`
- Verify .automakerignore exists
- Archive old features

### Wrong model being used
- Check feature category
- Medical → Sonnet (slow, accurate)
- Others → Haiku (fast)

---

*Need help? Check PERFORMANCE.md for details*
