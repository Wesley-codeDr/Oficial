# Tasks: Export Anamnesis to PDF

**Feature ID:** test-pdf-export
**Created:** 2026-01-08
**Status:** Draft
**Version:** 1.0.0

---

## Task Organization

Tasks are organized by user story and include:
- **[P]** = Can be executed in parallel with other [P] tasks
- **Dependencies**: Must complete before starting
- **Acceptance**: How to know it's done

---

## Setup & Configuration

### Task 1.1: Install PDF generation dependencies [P]

**Description:** Install `@react-pdf/renderer` and related packages

**Files to modify:**
- `package.json`

**Steps:**
1. Run `pnpm add @react-pdf/renderer react-pdf`
2. Verify packages installed correctly
3. Check for TypeScript type conflicts
4. Run `pnpm typecheck` to ensure no errors

**Dependencies:** None

**Acceptance Criteria:**
- [ ] @react-pdf/renderer installed (v3.1.14+)
- [ ] react-pdf installed (v7.5.1+)
- [ ] No TypeScript errors after installation
- [ ] pnpm typecheck passes

**Estimated Time:** 5 min

**Complexity:** Low | **Risk:** Low

---

### Task 1.2: Create directory structure [P]

**Description:** Create directories for new components and utilities

**Directories to create:**
- `components/anamnese/ExportPDFButton/`
- `lib/pdf/`
- `e2e/anamnese/`

**Steps:**
1. Create component directory structure
2. Create lib/pdf directory for PDF templates
3. Create e2e/anamnese directory for E2E tests
4. Create placeholder index.ts files

**Dependencies:** None

**Acceptance Criteria:**
- [ ] All directories created
- [ ] Index.ts files exist in component directories
- [ ] No duplicate directories

**Estimated Time:** 5 min

**Complexity:** Low | **Risk:** Low

---

### Task 1.3: Configure Vercel function settings [P]

**Description:** Optimize Vercel serverless function for PDF generation

**Files to modify:**
- `vercel.json` (create if doesn't exist)

**Steps:**
1. Check if vercel.json exists
2. Add function configuration for PDF export route
3. Set memory to 1024 MB
4. Set maxDuration to 10 seconds

**Dependencies:** None

**Acceptance Criteria:**
- [ ] vercel.json created/updated
- [ ] PDF export route configured with 1024 MB memory
- [ ] PDF export route configured with 10s timeout

**Estimated Time:** 5 min

**Complexity:** Low | **Risk:** Low

---

## User Story 1: Export for Medical Records

### Task 2.1: Create Zod validation schema [P]

**Description:** Define request validation schema for PDF export API

**Files to create:**
- `lib/validations/anamnese.ts` (if doesn't exist)

**Steps:**
1. Create or open validations file
2. Define ExportPdfRequestSchema with sessionId validation
3. Export schema for use in API route
4. Add TypeScript types

**Dependencies:** None

**Acceptance Criteria:**
- [ ] ExportPdfRequestSchema defined
- [ ] Validates sessionId as cuid string
- [ ] TypeScript types exported
- [ ] Schema exported for API route use

**Code Example:**
```typescript
import { z } from 'zod';

export const ExportPdfRequestSchema = z.object({
  sessionId: z.string().cuid(),
});

export type ExportPdfRequest = z.infer<typeof ExportPdfRequestSchema>;
```

**Estimated Time:** 5 min

**Complexity:** Low | **Risk:** Low

---

### Task 2.2: Create PDF template component

**Description:** Build React PDF template for anamnesis document

**Files to create:**
- `lib/pdf/anamnesis-template.tsx`

**Steps:**
1. Import Document, Page, Text, View from @react-pdf/renderer
2. Define StyleSheet with CFM-compliant formatting
3. Create AnamnesisPdfDocument component
4. Implement sections: Header, Patient Info, Chief Complaint, Red Flags, Anamnesis, Footer
5. Add Portuguese text for all labels
6. Ensure A4 portrait format
7. Test template rendering

**Dependencies:**
- Task 1.1 (dependencies installed)

**Acceptance Criteria:**
- [ ] Component renders without errors
- [ ] All CFM-required fields present (date, professional, findings)
- [ ] Portuguese language used throughout
- [ ] Red flags displayed prominently when present
- [ ] Footer includes WellWave branding
- [ ] Multi-page support (if content overflows)
- [ ] Styles properly defined (Helvetica font, readable sizes)

**Estimated Time:** 30 min

**Complexity:** Medium | **Risk:** Medium

---

### Task 2.3: Create PDF export API route

**Description:** Implement Next.js API route for PDF generation

**Files to create:**
- `app/api/anamnese/export-pdf/route.ts`

**Steps:**
1. Create API route file
2. Import dependencies (prisma, auth, pdf library, validation)
3. Implement POST handler
4. Validate request with Zod schema
5. Authenticate user via Supabase Auth
6. Fetch anamnesis session from database
7. Authorize (check session.userId === user.id)
8. Generate PDF using AnamnesisPdfDocument
9. Set response headers (Content-Type, Content-Disposition)
10. Return PDF as binary response
11. Handle all error cases (400, 401, 403, 404, 500)
12. Add error logging to Sentry

**Dependencies:**
- Task 1.1 (dependencies installed)
- Task 2.1 (Zod schema)
- Task 2.2 (PDF template)

**Acceptance Criteria:**
- [ ] Endpoint responds to POST requests
- [ ] Request validation works (400 on invalid)
- [ ] Authentication enforced (401 on unauthorized)
- [ ] Authorization enforced (403 on wrong user)
- [ ] Returns 404 for non-existent session
- [ ] Returns 200 with PDF binary for valid request
- [ ] Content-Type header set to application/pdf
- [ ] Content-Disposition header set with correct filename
- [ ] Filename format: anamnesis-[syndrome]-[date].pdf
- [ ] Errors logged to Sentry
- [ ] Response time <3 seconds (tested)

**Estimated Time:** 45 min

**Complexity:** Medium | **Risk:** Medium

---

### Task 2.4: Write API route unit tests

**Description:** Test API route logic and error handling

**Files to create:**
- `app/api/anamnese/export-pdf/route.test.ts`

**Steps:**
1. Create test file
2. Mock Supabase Auth
3. Mock Prisma client
4. Test invalid request body (400)
5. Test unauthorized request (401)
6. Test non-existent session (404)
7. Test unauthorized access (403)
8. Test successful PDF generation (200)
9. Verify Content-Type header
10. Verify Content-Disposition header
11. Verify filename format

**Dependencies:**
- Task 2.3 (API route created)

**Acceptance Criteria:**
- [ ] All test cases implemented
- [ ] Tests pass (pnpm vitest run)
- [ ] Coverage >80% for API route
- [ ] Mocks properly isolated
- [ ] No test pollution between cases

**Estimated Time:** 30 min

**Complexity:** Medium | **Risk:** Low

---

### Task 2.5: Create useExportPdf hook

**Description:** Implement TanStack Query hook for PDF export

**Files to create:**
- `components/anamnese/ExportPDFButton/useExportPdf.ts`

**Steps:**
1. Import useMutation from @tanstack/react-query
2. Define mutation function that calls /api/anamnese/export-pdf
3. Handle response blob
4. Trigger browser download
5. Handle errors and extract error message
6. Export hook with TypeScript types

**Dependencies:**
- Task 2.3 (API route exists)

**Acceptance Criteria:**
- [ ] Hook uses useMutation
- [ ] Calls correct API endpoint
- [ ] Sends correct request body (sessionId)
- [ ] Downloads PDF blob to browser
- [ ] Extracts filename from Content-Disposition header
- [ ] Throws error on failure with message
- [ ] TypeScript types properly defined

**Estimated Time:** 15 min

**Complexity:** Low | **Risk:** Low

---

### Task 2.6: Create ExportPDFButton component

**Description:** Build UI component for PDF export button

**Files to create:**
- `components/anamnese/ExportPDFButton/ExportPDFButton.tsx`
- `components/anamnese/ExportPDFButton/index.ts`

**Steps:**
1. Create component file
2. Define props interface (sessionId, syndrome, disabled)
3. Import shadcn/ui Button component
4. Import FileDown icon from lucide-react
5. Import useExportPdf hook
6. Implement button with loading state
7. Show spinner and "Gerando PDF..." text during export
8. Show "Exportar PDF" with FileDown icon when idle
9. Disable button when isPending or disabled prop is true
10. Add ARIA label for accessibility
11. Handle keyboard navigation (Enter key)
12. Export component in index.ts

**Dependencies:**
- Task 2.5 (useExportPdf hook)

**Acceptance Criteria:**
- [ ] Component accepts sessionId, syndrome, disabled props
- [ ] Renders Button with FileDown icon
- [ ] Shows loading state (spinner + "Gerando PDF...")
- [ ] Shows idle state ("Exportar PDF" + icon)
- [ ] Calls useExportPdf on click
- [ ] Disabled when isPending or disabled prop
- [ ] ARIA label present
- [ ] Keyboard accessible (Enter key)
- [ ] Responsive design (works on mobile)

**Estimated Time:** 20 min

**Complexity:** Low | **Risk:** Low

---

### Task 2.7: Write ExportPDFButton unit tests

**Description:** Test component rendering and behavior

**Files to create:**
- `components/anamnese/ExportPDFButton/ExportPDFButton.test.tsx`

**Steps:**
1. Create test file
2. Mock useExportPdf hook
3. Test component renders correctly
4. Test button shows FileDown icon
5. Test button text is "Exportar PDF"
6. Test loading state (spinner + "Gerando PDF...")
7. Test button disabled when isPending
8. Test button disabled when disabled prop
9. Test button calls exportPdf on click
10. Test ARIA label present
11. Test keyboard accessibility

**Dependencies:**
- Task 2.6 (component created)

**Acceptance Criteria:**
- [ ] All test cases implemented
- [ ] Tests pass (pnpm vitest run)
- [ ] Coverage >80% for component
- [ ] Mocks properly isolated
- [ ] Accessibility tested

**Estimated Time:** 20 min

**Complexity:** Low | **Risk:** Low

---

### Task 2.8: Add ExportPDFButton to anamnesis results page

**Description:** Integrate PDF export button into existing UI

**Files to modify:**
- `app/(dashboard)/anamnese/page.tsx`

**Steps:**
1. Locate anamnesis results section
2. Import ExportPDFButton component
3. Add button to UI (after generated text section)
4. Pass sessionId prop
5. Pass syndrome prop
6. Disable button when anamnesis not generated yet
7. Test button placement and styling

**Dependencies:**
- Task 2.6 (component created)

**Acceptance Criteria:**
- [ ] Button visible on anamnesis results page
- [ ] Button placed in logical location
- [ ] Button disabled when no anamnesis generated
- [ ] Button enabled after anamnesis generated
- [ ] Proper styling with Tailwind
- [ ] Responsive on mobile/tablet/desktop

**Estimated Time:** 10 min

**Complexity:** Low | **Risk:** Low

---

## User Story 2: Handle Export Errors

### Task 3.1: Implement toast notifications for errors

**Description:** Show user-friendly error messages using shadcn/ui toast

**Files to modify:**
- `components/anamnese/ExportPDFButton/ExportPDFButton.tsx`

**Steps:**
1. Import useToast hook from shadcn/ui
2. Add success toast in onSuccess callback
3. Add error toast in onError callback
4. Extract error message from error object
5. Map error types to user-friendly messages:
   - 401: "Por favor, faça login novamente"
   - 403: "Você não tem permissão para exportar esta anamnese"
   - 404: "Anamnese não encontrada"
   - 500: "Erro ao gerar PDF. Nossa equipe foi notificada."
   - Timeout: "Tempo esgotado. Por favor, tente novamente."

**Dependencies:**
- Task 2.6 (component created)
- Task 2.3 (API error responses)

**Acceptance Criteria:**
- [ ] Success toast shown on successful export
- [ ] Error toast shown on failed export
- [ ] Error messages user-friendly (Portuguese)
- [ ] All error types handled
- [ ] Toast auto-dismisses after 5 seconds
- [ ] Button remains clickable after error

**Estimated Time:** 15 min

**Complexity:** Low | **Risk:** Low

---

### Task 3.2: Test error handling scenarios

**Description:** Verify error messages display correctly

**Files to create:**
- No new files (extend ExportPDFButton.test.tsx)

**Steps:**
1. Add test for 401 error
2. Add test for 403 error
3. Add test for 404 error
4. Add test for 500 error
5. Add test for timeout error
6. Verify toast notifications called with correct messages
7. Verify Portuguese text in messages

**Dependencies:**
- Task 3.1 (error toasts implemented)

**Acceptance Criteria:**
- [ ] All error scenarios tested
- [ ] Toast notifications called correctly
- [ ] Error messages in Portuguese
- [ ] Tests pass (pnpm vitest run)

**Estimated Time:** 15 min

**Complexity:** Low | **Risk:** Low

---

## User Story 3: Export Security

### Task 4.1: Implement Supabase Auth in API route

**Description:** Add authentication check to PDF export endpoint

**Note:** Already covered in Task 2.3

**Status:** ✅ COMPLETED in Task 2.3

---

### Task 4.2: Implement authorization check

**Description:** Verify user owns session before exporting

**Note:** Already covered in Task 2.3

**Status:** ✅ COMPLETED in Task 2.3

---

### Task 4.3: Verify no patient data in PDF

**Description:** Ensure PDF template doesn't include patient identifiers

**Files to verify:**
- `lib/pdf/anamnesis-template.tsx`

**Steps:**
1. Review PDF template code
2. Verify no patient name field
3. Verify no patient ID field
4. Verify "DOCUMENTO ANÔNIMO" label present
5. Ensure only session data (anonymous) included
6. Review WellWave system confirms no patient identifiers stored

**Dependencies:**
- Task 2.2 (PDF template created)

**Acceptance Criteria:**
- [ ] PDF template verified to contain no patient identifiers
- [ ] "DOCUMENTO ANÔNIMO" label present
- [ ] Only anonymous session data in PDF
- [ ] No fields for patient name, CPF, ID, etc.

**Estimated Time:** 10 min

**Complexity:** Low | **Risk:** Low

---

### Task 4.4: Write security tests

**Description:** Test authentication and authorization

**Files to create:**
- No new files (extend route.test.tsx)

**Steps:**
1. Test 401 when no auth token
2. Test 401 when invalid auth token
3. Test 403 when user tries to export another user's session
4. Verify error responses don't leak sensitive info
5. Verify authorization check uses userId comparison

**Dependencies:**
- Task 2.4 (API tests created)

**Acceptance Criteria:**
- [ ] Security tests implemented
- [ ] 401 tested for no token
- [ ] 401 tested for invalid token
- [ ] 403 tested for wrong user
- [ ] Tests pass (pnpm vitest run)

**Estimated Time:** 15 min

**Complexity:** Low | **Risk:** Low

---

## Testing

### Task 5.1: Write E2E test for successful export

**Description:** Test complete user flow with Playwright

**Files to create:**
- `e2e/anamnese/export-pdf.spec.ts`

**Steps:**
1. Create test file
2. Implement login flow
3. Navigate to anamnese page
4. Select syndrome (Dor Torácica)
5. Select checkboxes
6. Generate anamnese
7. Click "Exportar PDF" button
8. Wait for download event
9. Verify filename matches pattern
10. Verify file is valid PDF (contains %PDF magic number)
11. Clean up downloaded file

**Dependencies:**
- Task 2.8 (button integrated)
- Task 2.3 (API working)

**Acceptance Criteria:**
- [ ] Complete user flow tested
- [ ] Download event captured
- [ ] Filename matches pattern: anamnesis-[syndrome]-[date].pdf
- [ ] File contains valid PDF header (%PDF)
- [ ] Test passes locally (pnpm playwright test)
- [ ] Test passes in CI

**Estimated Time:** 30 min

**Complexity:** Medium | **Risk:** Medium

---

### Task 5.2: Write E2E test for unauthorized access

**Description:** Test security in E2E environment

**Files to modify:**
- `e2e/anamnese/export-pdf.spec.ts`

**Steps:**
1. Add test case for unauthorized export
2. Login as user A
3. Attempt to export user B's session (via API call)
4. Verify 403 response
5. Verify error message "Access denied"
6. Verify no PDF downloaded

**Dependencies:**
- Task 5.1 (E2E tests created)

**Acceptance Criteria:**
- [ ] Unauthorized access tested
- [ ] 403 status code verified
- [ ] Error message verified
- [ ] No download triggered
- [ ] Test passes

**Estimated Time:** 15 min

**Complexity:** Low | **Risk:** Low

---

### Task 5.3: Write E2E test for loading states

**Description:** Verify loading state during PDF generation

**Files to modify:**
- `e2e/anamnese/export-pdf.spec.ts`

**Steps:**
1. Add test case for loading state
2. Login and generate anamnese
3. Click "Exportar PDF" button
4. Verify loading text visible ("Gerando PDF...")
5. Verify spinner visible
6. Wait for download
7. Verify loading state removed
8. Verify normal state restored

**Dependencies:**
- Task 5.1 (E2E tests created)

**Acceptance Criteria:**
- [ ] Loading state tested
- [ ] "Gerando PDF..." text visible
- [ ] Spinner animation visible
- [ ] Loading state removed after completion
- [ ] Normal state restored
- [ ] Test passes

**Estimated Time:** 10 min

**Complexity:** Low | **Risk:** Low

---

### Task 5.4: Run all tests and fix failures

**Description:** Execute complete test suite and ensure all pass

**Steps:**
1. Run unit tests: `pnpm vitest run`
2. Fix any unit test failures
3. Run E2E tests: `pnpm playwright test`
4. Fix any E2E test failures
5. Run typecheck: `pnpm typecheck`
6. Fix any TypeScript errors
7. Run lint: `pnpm lint`
8. Fix any lint errors
8. Run full test suite again
9. Verify all tests pass

**Dependencies:**
- All previous tasks complete

**Acceptance Criteria:**
- [ ] All unit tests pass (pnpm vitest run)
- [ ] All E2E tests pass (pnpm playwright test)
- [ ] No TypeScript errors (pnpm typecheck)
- [ ] No lint errors (pnpm lint)
- [ ] Test coverage >80%
- [ ] No test pollution

**Estimated Time:** 30 min

**Complexity:** Medium | **Risk:** Medium

---

## Documentation

### Task 6.1: Add JSDoc comments to public APIs

**Description:** Document TypeScript interfaces and functions

**Files to modify:**
- `lib/pdf/anamnesis-template.tsx`
- `components/anamnese/ExportPDFButton/ExportPDFButton.tsx`
- `components/anamnese/ExportPDFButton/useExportPdf.ts`

**Steps:**
1. Add JSDoc comments to component props
2. Add JSDoc comments to hook functions
3. Add JSDoc comments to PDF template
4. Document parameters and return types
5. Add usage examples where helpful

**Dependencies:**
- All implementation tasks complete

**Acceptance Criteria:**
- [ ] JSDoc comments on all public APIs
- [ ] Parameters documented
- [ ] Return types documented
- [ ] Usage examples included
- [ ] No undocumented exports

**Estimated Time:** 15 min

**Complexity:** Low | **Risk:** Low

---

### Task 6.2: Update CHANGELOG.md

**Description:** Document new feature in project changelog

**Files to modify:**
- `CHANGELOG.md` (create if doesn't exist)

**Steps:**
1. Open CHANGELOG.md
2. Add entry for new version
3. List "Added" feature: "Export anamnesis to PDF"
4. Describe feature briefly
5. List user stories implemented
6. List technical changes (new dependencies, API routes, components)

**Dependencies:**
- All implementation tasks complete

**Acceptance Criteria:**
- [ ] CHANGELOG.md updated
- [ ] Version entry added
- [ ] Feature documented
- [ ] Changes listed

**Estimated Time:** 5 min

**Complexity:** Low | **Risk:** Low

---

## Execution Order

### Phase 1: Setup (Parallel - 15 min total)
```
[P] Task 1.1: Install dependencies (5 min)
[P] Task 1.2: Create directories (5 min)
[P] Task 1.3: Configure Vercel (5 min)
```
**Can execute all 3 tasks in parallel**

---

### Phase 2: Backend - User Story 1 (75 min)
```
Task 2.1: Create Zod schema (5 min)
    ↓
Task 2.2: Create PDF template (30 min)
    ↓
Task 2.3: Create API route (45 min) [Start after 2.1, parallel with 2.2]
    ↓
Task 2.4: Write API tests (30 min)
```
**Can parallelize Task 2.2 and 2.3 after Task 2.1**

---

### Phase 3: Frontend - User Story 1 (55 min)
```
Task 2.5: Create hook (15 min) [After 2.3]
    ↓
Task 2.6: Create component (20 min)
    ↓
Task 2.7: Write component tests (20 min)
    ↓
Task 2.8: Integrate into page (10 min)
```

---

### Phase 4: Error Handling (30 min)
```
Task 3.1: Add toast notifications (15 min) [After 2.6]
    ↓
Task 3.2: Test error scenarios (15 min)
```

---

### Phase 5: Security - User Story 3 (35 min)
```
Task 4.1: Auth (DONE in 2.3)
Task 4.2: Authorization (DONE in 2.3)
    ↓
Task 4.3: Verify no patient data (10 min)
    ↓
Task 4.4: Write security tests (15 min)
```

---

### Phase 6: E2E Testing (55 min)
```
Task 5.1: E2E test - successful export (30 min)
    ↓
Task 5.2: E2E test - unauthorized (15 min)
    ↓
Task 5.3: E2E test - loading states (10 min)
    ↓
Task 5.4: Run all tests, fix failures (30 min)
```

---

### Phase 7: Documentation (20 min)
```
[P] Task 6.1: Add JSDoc comments (15 min)
[P] Task 6.2: Update CHANGELOG (5 min)
```
**Can execute both in parallel**

---

## Dependency Graph

```
Phase 1 (Setup): [1.1, 1.2, 1.3] - All parallel
    ↓
Phase 2 (Backend):
    2.1 (Zod schema)
    ├→ 2.2 (PDF template)
    └→ 2.3 (API route) [Can parallel with 2.2]
        ↓
        2.4 (API tests)
    ↓
Phase 3 (Frontend):
    2.5 (Hook) [After 2.3]
        ↓
        2.6 (Component)
            ↓
            2.7 (Component tests)
                ↓
                2.8 (Integrate)
    ↓
Phase 4 (Errors):
    3.1 (Toasts) [After 2.6]
        ↓
        3.2 (Error tests)
    ↓
Phase 5 (Security):
    4.3 (Verify patient data)
        ↓
        4.4 (Security tests)
    ↓
Phase 6 (E2E):
    5.1 (Export test)
        ↓
        5.2 (Unauthorized test)
        ↓
        5.3 (Loading test)
        ↓
        5.4 (Run all tests)
    ↓
Phase 7 (Docs): [6.1, 6.2] - Both parallel
```

---

## Complexity Estimates

| Task | Complexity | Time | Risk | Notes |
|------|------------|------|------|-------|
| 1.1 | Low | 5min | Low | Simple install |
| 1.2 | Low | 5min | Low | Create dirs |
| 1.3 | Low | 5min | Low | Config file |
| 2.1 | Low | 5min | Low | Zod schema |
| 2.2 | Medium | 30min | Medium | PDF layout |
| 2.3 | Medium | 45min | Medium | API logic |
| 2.4 | Medium | 30min | Low | Unit tests |
| 2.5 | Low | 15min | Low | Hook |
| 2.6 | Low | 20min | Low | Component |
| 2.7 | Low | 20min | Low | Unit tests |
| 2.8 | Low | 10min | Low | Integration |
| 3.1 | Low | 15min | Low | Toasts |
| 3.2 | Low | 15min | Low | Error tests |
| 4.3 | Low | 10min | Low | Verification |
| 4.4 | Low | 15min | Low | Security tests |
| 5.1 | Medium | 30min | Medium | E2E flow |
| 5.2 | Low | 15min | Low | E2E test |
| 5.3 | Low | 10min | Low | E2E test |
| 5.4 | Medium | 30min | Medium | Fix tests |
| 6.1 | Low | 15min | Low | Comments |
| 6.2 | Low | 5min | Low | Changelog |

**Total Estimated Time:** 5-5.5 hours (with parallel execution: ~4 hours)

---

## Risk Assessment

### High-Risk Tasks
- **Task 2.2 (PDF Template)**: Complex PDF layout may need iterations → **Mitigation**: Test template rendering early, use existing examples from @react-pdf/renderer docs
- **Task 2.3 (API Route)**: Many edge cases (auth, authorization, errors) → **Mitigation**: Comprehensive unit tests, refer to existing API routes in codebase
- **Task 5.4 (Run all tests)**: May uncover issues requiring rework → **Mitigation**: Allocate buffer time, fix iteratively

### Dependencies on External Factors
- **Task 2.2**: Requires @react-pdf/renderer to work correctly → **Mitigation**: Well-maintained library (2M+ downloads), tested before use
- **Task 5.1**: Requires Playwright environment configured → **Mitigation**: Playwright already configured in project
- **Task 2.3**: Requires Supabase Auth working → **Mitigation**: Auth already configured and working

### Medium-Risk Tasks
- **Task 5.1 (E2E Test)**: Full user flow may be fragile → **Mitigation**: Use stable selectors, wait for elements, add retries
- **Task 2.4 (API Tests)**: Mocking Supabase and Prisma can be tricky → **Mitigation**: Use existing test patterns in codebase

### Low-Risk Tasks
- All setup tasks (1.x): Straightforward
- Frontend tasks (2.5-2.8): Well-established patterns
- Documentation tasks (6.x): No execution risk

---

## Parallel Execution Opportunities

### Can Run in Parallel (saves time):
1. **Phase 1 Setup** (15 min → 15 min, no savings, but organized)
   - Tasks 1.1, 1.2, 1.3 can run simultaneously

2. **Phase 2 Backend** (75 min → 45 min, saves 30 min)
   - Task 2.2 (PDF template) and 2.3 (API route) can run in parallel after 2.1

3. **Phase 7 Documentation** (20 min → 15 min, saves 5 min)
   - Tasks 6.1 and 6.2 can run in parallel

### Must Run Sequentially:
- Frontend tasks (2.5-2.8) depend on backend (2.3)
- Error handling (3.x) depends on component (2.6)
- E2E tests (5.x) depend on all implementation
- Security tests (4.x) depend on API route (2.3)

**Total Time with Parallel Execution:**
- Sequential estimate: 5.5 hours
- With parallelization: ~4 hours
- **Time saved: 1.5 hours (27% reduction)**

---

## Optional Enhancements (Future)

Tasks that could be added in future iterations:

- [ ] **Batch Export**: Allow exporting multiple anamneses at once
- [ ] **PDF Caching**: Cache generated PDFs to avoid regeneration
- [ ] **Custom Templates**: Allow users to customize PDF layout
- [ ] **Digital Signature**: Add digital signature support
- [ ] **Email Delivery**: Send PDF via email instead of download
- [ ] **Print Preview**: Show preview before download
- [ ] **Export Formats**: Support Word, HTML, etc.
- [ ] **Audit Logging**: Add PdfExport table to database
- [ ] **Rate Limiting**: Add rate limiting per user
- [ ] **Performance Metrics**: Track PDF generation time

---

## ✅ Phase 3 Completion Checklist

Before moving to Phase 4:

- [x] `specs/test-pdf-export/tasks.md` created and complete
- [x] All tasks have clear descriptions
- [x] All tasks have file paths listed
- [x] All tasks have step-by-step instructions
- [x] Dependencies identified for each task
- [x] Parallel-safe tasks marked with `[P]`
- [x] Acceptance criteria defined per task
- [x] Execution order documented
- [x] Time estimates provided
- [x] Risk assessment complete
- [x] Dependency graph created
- [x] Parallel execution opportunities identified
- [ ] Human review received (recommended)
- [x] Context budget: Still in Smart Zone (20-40%)

---

**Tasks Breakdown Complete!** 🎉

**Summary:**
- **21 total tasks**
- **3 user stories covered**
- **3 setup/config tasks**
- **6 backend tasks**
- **4 frontend tasks**
- **2 error handling tasks**
- **4 security tasks**
- **4 E2E testing tasks**
- **2 documentation tasks**

**Execution order:**
- Phase 1 (Setup): 3 tasks - 15 min (all parallel)
- Phase 2 (Backend): 4 tasks - 75 min (30 min saved with parallel)
- Phase 3 (Frontend): 4 tasks - 55 min
- Phase 4 (Errors): 2 tasks - 30 min
- Phase 5 (Security): 3 tasks - 35 min
- Phase 6 (E2E): 4 tasks - 55 min
- Phase 7 (Docs): 2 tasks - 20 min (parallel)

**Total estimated time:** 
- Sequential: 5.5 hours
- With parallelization: ~4 hours
- **Time saved: 1.5 hours (27% reduction)**

**Parallel execution opportunities:**
- 7 tasks can run in parallel
- Could reduce timeline by 27%

**📄 Full task breakdown:** `specs/test-pdf-export/tasks.md` (this file)

**Ready to proceed to Phase 4 (Implementation)?**
- If yes: Start new session and run `/4_implement`
- If concerns: What needs adjustment?

---

**Phase 3 Complete** | **Context**: ~35% (Smart Zone) | **Next**: Phase 4 (Implementation)
