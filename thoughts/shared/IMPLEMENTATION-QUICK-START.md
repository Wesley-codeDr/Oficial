# 🚀 Implementation Quick Start - Phase 4

**Feature**: Export Anamnesis to PDF  
**Ready to Start**: YES ✅  
**Estimated Time**: ~4 hours

---

## ⚡ Start Here

### Step 1: New Session (REQUIRED)
```
End this session → Start new session
```

### Step 2: Run Command
```
/4_implement
```

### Step 3: Watch AI Work
AI will execute all 21 tasks automatically.

---

## 📚 Documents Ready

```
specs/test-pdf-export/
├── spec.md          (400 lines) - What to build
├── plan.md          (932 lines) - How to build it
└── tasks.md         (650 lines) - Step-by-step tasks

thoughts/shared/
├── phase4-checklist.md                    - Task checklist
├── phase4-pre-implementation-validation.md - Validation report
└── plans-archive/
    └── test-pdf-export-implementation-guide.md - Code patterns
```

---

## 🎯 First 3 Commands

```bash
# Task 1.1: Install dependencies
pnpm add @react-pdf/renderer react-pdf

# Task 1.2: Create directories
mkdir -p components/anamnese/ExportPDFButton
mkdir -p lib/pdf
mkdir -p e2e/anamnese

# Task 1.3: Verify typecheck
pnpm typecheck
```

**Time**: 15 minutes

---

## 📝 Files to Create (21 Total)

### Backend (6 files)
```
lib/validations/anamnese.ts                   ✅ Task 2.1
lib/pdf/anamnesis-template.tsx                ✅ Task 2.2
app/api/anamnese/export-pdf/route.ts          ✅ Task 2.3
app/api/anamnese/export-pdf/route.test.ts     ✅ Task 2.4
```

### Frontend (4 files)
```
components/anamnese/ExportPDFButton/useExportPdf.ts           ✅ Task 2.5
components/anamnese/ExportPDFButton/ExportPDFButton.tsx       ✅ Task 2.6
components/anamnese/ExportPDFButton/ExportPDFButton.test.tsx  ✅ Task 2.7
components/anamnese/ExportPDFButton/index.ts                  ✅ Task 2.6
```

### E2E Tests (1 file)
```
e2e/anamnese/export-pdf.spec.ts               ✅ Task 5.1-5.3
```

### Modify (2 files)
```
app/(dashboard)/anamnese/page.tsx             ✅ Task 2.8
vercel.json                                   ✅ Task 1.3
```

---

## 🧪 Validation Loop

After each task:
```bash
# Run tests
pnpm vitest run

# If fail → Fix → Re-test
# If pass → Continue to next task
```

After all tasks:
```bash
# Full test suite
pnpm vitest run
pnpm playwright test

# Code quality
pnpm typecheck
pnpm lint
```

---

## 📊 Progress Tracking

| Phase | Tasks | Status |
|-------|-------|--------|
| 1. Setup | 3 | ⏳ |
| 2. Backend | 6 | ⏳ |
| 3. Frontend | 4 | ⏳ |
| 4. Errors | 2 | ⏳ |
| 5. Security | 4 | ⏳ |
| 6. E2E Tests | 4 | ⏳ |
| 7. Documentation | 2 | ⏳ |

Check off as you complete!

---

## 🚨 Common Issues

### "Module not found: @react-pdf/renderer"
```bash
pnpm add @react-pdf/renderer react-pdf
```

### "Tests failing"
1. Read error message
2. Fix code
3. Re-run: `pnpm vitest run`
4. Repeat until green

### "TypeScript errors"
1. Run: `pnpm typecheck`
2. Check types match interfaces
3. Fix and re-run

### "PDF not downloading"
1. Check browser console
2. Verify API route working
3. Check Content-Disposition header

---

## ✅ Success Criteria

### Functional
- [ ] Button visible on anamnesis results page
- [ ] Clicking button downloads PDF
- [ ] PDF has correct filename
- [ ] PDF contains all sections
- [ ] Loading state works
- [ ] Error toasts appear

### Technical
- [ ] All unit tests pass
- [ ] All E2E tests pass
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] Test coverage >80%

### Compliance
- [ ] CFM fields in PDF
- [ ] No patient identifiers
- [ ] Auth working
- [ ] Authorization working

---

## 🎓 Code Pattern Reference

Use `thoughts/shared/plans-archive/test-pdf-export-implementation-guide.md` for:
- API route pattern
- Zod validation pattern
- Supabase auth pattern
- TanStack Query hook pattern
- React component pattern
- Toast notification pattern
- Test pattern
- Prisma pattern

**All patterns extracted from existing codebase!**

---

## 🔗 Import Paths

```typescript
// Prisma
import { prisma } from '@/lib/db/prisma'

// Supabase Auth
import { getUser } from '@/lib/supabase/server'

// Validation
import { ExportPdfRequestSchema } from '@/lib/validations/anamnese'

// UI Components
import { Button } from '@/components/ui/button'

// Hooks
import { useToast } from '@/hooks/use-toast'

// TanStack Query
import { useMutation } from '@tanstack/react-query'

// Icons
import { FileDown, Loader2 } from 'lucide-react'

// PDF
import { renderToStream } from '@react-pdf/renderer'
```

---

## 💡 Pro Tips

1. **Copy patterns** from implementation guide
2. **Test frequently** (validation loop)
3. **Fix before proceeding** (don't skip failing tests)
4. **Follow existing code style** (consistency)
5. **Use existing utilities** (don't reinvent)

---

## 🎯 Timeline

```
15 min  → Setup complete
60 min  → Backend complete
115 min → Frontend complete
145 min → Errors complete
180 min → Security complete
235 min → E2E complete
250 min → Documentation complete

Total: ~4 hours
```

---

## 🚦 Ready to Start?

### Option 1: AI Implementation (RECOMMENDED)
```
1. End this session
2. Start new session
3. Run: /4_implement
4. AI executes all 21 tasks
```

### Option 2: Manual Implementation
```
1. Open specs/test-pdf-export/tasks.md
2. Follow tasks 1.1 through 6.2
3. Use implementation guide for patterns
4. Use checklist for tracking
```

---

## 📞 Need Help?

- **Tasks**: `specs/test-pdf-export/tasks.md`
- **Patterns**: `thoughts/shared/plans-archive/test-pdf-export-implementation-guide.md`
- **Checklist**: `thoughts/shared/phase4-checklist.md`
- **Validation**: `thoughts/shared/phase4-pre-implementation-validation.md`

---

**Everything is ready. Let's build!** 🚀

---

**Version**: 1.0.0  
**Created**: 2026-01-08  
**Status**: READY
