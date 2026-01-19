---
tags: [index, overview]
summary: Overview of project memory categories for WellWave
relevantTo: [project, memory, overview]
importance: 0.5
relatedFiles: []
usageStats:
  loaded: 0
  referenced: 0
  successfulFeatures: 0
---
# Project Memory Index

This folder contains agent learnings organized by category for the WellWave project.
Categories are created automatically as agents work on features.

## How This Works

1. After each successful feature, learnings are extracted and categorized
2. Relevant memory files are loaded into agent context for future features
3. Usage statistics help prioritize which memories are most helpful

## Categories

### Core Categories
- **gotchas.md** - Mistakes and edge cases to avoid (importance: 0.9)
- **architecture.md** - Architecture decisions and patterns (importance: 0.7)

### Domain Categories
- **medical.md** - Medical domain knowledge and CFM compliance (importance: 0.95)
- **compliance.md** - Security and regulatory compliance patterns (importance: 0.9)

### Technical Categories
- **ui.md** - UI/UX patterns and Glass Design System (importance: 0.7)
- **performance.md** - Performance optimization patterns (importance: 0.6)
- **security.md** - Security implementation patterns (importance: 0.8)

## Priority Loading

When starting a feature, memories are loaded based on:
1. Feature category (Medical, UI, API, etc.)
2. Importance score (higher = loaded first)
3. Usage statistics (frequently helpful = higher priority)
4. Related files (if working in a specific path)

## Memory Format

Each memory file follows this structure:
```yaml
---
tags: [tag1, tag2]
summary: Brief description
relevantTo: [keyword1, keyword2]
importance: 0.0-1.0
relatedFiles: [path1, path2]
usageStats:
  loaded: 0
  referenced: 0
  successfulFeatures: 0
---
# Category Name

Content organized by patterns, decisions, gotchas, etc.
```
