# Phase 4 Implementation Checklist

**Feature**: Export Anamnesis to PDF  
**Date**: 2026-01-08  
**Total Tasks**: 21  
**Estimated Time**: ~4 hours

---

## Quick Reference

| Phase | Tasks | Time | Status |
|--------|-------|------|--------|
| 1. Setup | 3 | 15 min | ⏳ |
| 2. Backend | 6 | 75 min | ⏳ |
| 3. Frontend | 4 | 55 min | ⏳ |
| 4. Errors | 2 | 30 min | ⏳ |
| 5. Security | 4 | 35 min | ⏳ |
| 6. E2E Tests | 4 | 55 min | ⏳ |
| 7. Documentation | 2 | 20 min | ⏳ |

---

## Task Checklist

### Phase 1: Setup (15 min)

- [ ] 1.1: Install `@react-pdf/renderer` and `react-pdf`
- [ ] 1.2: Create directories (`components/anamnese/ExportPDFButton/`, `lib/pdf/`, `e2e/anamnese/`)
- [ ] 1.3: Configure Vercel function settings (1024 MB, 10s timeout)

**Run after Phase 1**:
```bash
pnpm typecheck
```

---

### Phase 2: Backend (75 min)

- [ ] 2.1: Create Zod schema in `lib/validations/anamnese.ts`
- [ ] 2.2: Create PDF template in `lib/pdf/anamnesis-template.tsx`
- [ ] 2.3: Create API route in `app/api/anamnese/export-pdf/route.ts`
- [ ] 2.4: Write API route tests in `route.test.ts`

**Run after Phase 2**:
```bash
pnpm vitest run app/api/anamnese/export-pdf/
```

---

### Phase 3: Frontend (55 min)

- [ ] 2.5: Create `useExportPdf` hook in `useExportPdf.ts`
- [ ] 2.6: Create `ExportPDFButton` component
- [ ] 2.7: Write component tests in `ExportPDFButton.test.tsx`
- [ ] 2.8: Add button to anamnesis results page in `app/(dashboard)/anamnese/page.tsx`

**Run after Phase 3**:
```bash
pnpm vitest run components/anamnese/ExportPDFButton/
```

---

### Phase 4: Error Handling (30 min)

- [ ] 3.1: Add toast notifications to ExportPDFButton
- [ ] 3.2: Test error scenarios in component tests

**Run after Phase 4**:
```bash
pnpm vitest run
```

---

### Phase 5: Security (35 min)

- [ ] 4.3: Verify PDF template has no patient identifiers
- [ ] 4.4: Write security tests for API route

**Run after Phase 5**:
```bash
pnpm vitest run
```

---

### Phase 6: E2E Testing (55 min)

- [ ] 5.1: Write E2E test for successful export
- [ ] 5.2: Write E2E test for unauthorized access
- [ ] 5.3: Write E2E test for loading states
- [ ] 5.4: Run all tests and fix failures

**Run after Phase 6**:
```bash
pnpm playwright test
pnpm vitest run
```

---

### Phase 7: Documentation (20 min)

- [ ] 6.1: Add JSDoc comments to public APIs
- [ ] 6.2: Update CHANGELOG.md

**Run after Phase 7**:
```bash
pnpm typecheck
pnpm lint
```

---

## Final Validation

### Test Suite
- [ ] All unit tests pass: `pnpm vitest run`
- [ ] All E2E tests pass: `pnpm playwright test`
- [ ] Test coverage >80%

### Code Quality
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`
- [ ] Code formatted: `pnpm format`

### Manual Testing
- [ ] Button visible on anamnesis results page
- [ ] Clicking button downloads PDF
- [ ] PDF has correct filename format
- [ ] PDF contains all required sections
- [ ] Loading state shows during generation
- [ ] Error toasts appear when something goes wrong
- [ ] Unauthorized access blocked (403)

---

## Common Commands

```bash
# Install dependencies
pnpm add @react-pdf/renderer react-pdf

# Run tests
pnpm vitest run                    # Unit tests
pnpm playwright test                # E2E tests

# Code quality
pnpm typecheck                    # TypeScript
pnpm lint                        # ESLint
pnpm format                       # Prettier

# Development
pnpm dev                         # Start dev server

# Build
pnpm build                        # Production build
```

---

## Troubleshooting

### Error: "Module not found: @react-pdf/renderer"
**Solution**: Run `pnpm add @react-pdf/renderer react-pdf`

### Error: "Type '...' is not assignable to type '...'"
**Solution**: Check TypeScript types, ensure props match interface

### Error: "Tests failing"
**Solution**: 
1. Check error messages
2. Review test expectations
3. Fix code or update tests
4. Re-run: `pnpm vitest run`

### Error: "PDF not downloading"
**Solution**:
1. Check browser console for errors
2. Verify API route is working
3. Check Content-Disposition header
4. Verify filename extraction

### Error: "Authorization failing"
**Solution**:
1. Check user is authenticated
2. Verify session.userId === user.id
3. Check Prisma query includes userId

---

## Files to Create

```
app/api/anamnese/export-pdf/
├── route.ts                  ✅ API route
└── route.test.ts            ✅ API tests

components/anamnese/ExportPDFButton/
├── ExportPDFButton.tsx      ✅ Component
├── ExportPDFButton.test.tsx ✅ Component tests
├── useExportPdf.ts          ✅ Hook
└── index.ts                 ✅ Exports

lib/
├── validations/
│   └── anamnese.ts         ✅ Zod schemas
└── pdf/
    └── anamnesis-template.tsx ✅ PDF template

e2e/anamnese/
└── export-pdf.spec.ts       ✅ E2E tests
```

---

## Files to Modify

```
app/(dashboard)/anamnese/
└── page.tsx                ✅ Add ExportPDFButton

CHANGELOG.md                 ✅ Add feature entry

vercel.json                  ✅ Add function config
```

---

## Success Criteria

✅ **Functional**:
- Button visible and clickable
- PDF downloads successfully
- PDF has correct content and formatting
- All error cases handled

✅ **Quality**:
- All tests pass (unit + E2E)
- No TypeScript errors
- Code follows project patterns
- Documentation complete

✅ **Compliance**:
- CFM fields present in PDF
- No patient identifiers in PDF
- Authentication and authorization working
- LGPD compliant

---

**Ready to start Phase 4!** 🚀

Start new session and run: `/4_implement`

---

Checklist Version: 1.0.0 | Created: 2026-01-08
