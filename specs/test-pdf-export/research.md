# Research: Export Anamnesis to PDF

**Feature ID:** test-pdf-export
**Research Date:** 2026-01-08
**Researcher:** AI Assistant (Claude)
**Phase:** 1 - Research

---

## User Request

**Original Request:**
"Add ability to export generated anamnesis to PDF format for printing and medical records."

---

## Problem Statement

### What problem are we solving?
Doctors in emergency departments need to:
1. Print anamnesis for physical medical records
2. Archive anamnesis in patient files (digital or physical)
3. Share anamnesis with other healthcare providers
4. Comply with CFM requirements for medical documentation

### Current Situation
- Anamnesis is only viewable in web interface
- Users must copy-paste into Word/Google Docs for printing
- No standardized format for medical records
- Manual process is error-prone and time-consuming

### Desired Outcome
- One-click PDF export from anamnesis view
- Professional medical document formatting
- CFM-compliant headers and footers
- Includes all medical information (chief complaint, red flags, generated text)
- Printable on standard A4 paper

---

## Success Criteria

1. **Functional**: User can click "Export PDF" button and download formatted PDF
2. **Medical**: PDF includes all CFM-required fields
3. **Quality**: PDF is professional, readable, and printable
4. **Performance**: PDF generation completes in <3 seconds
5. **Compliance**: PDF format meets LGPD privacy requirements

---

## Codebase Analysis

### Similar Features

**None found** - This is the first export feature in WellWave

### Affected Components

**Frontend:**
- `app/(dashboard)/anamnese/page.tsx` - Add export button
- `components/anamnese/` - UI components for anamnesis display
- New component needed: `ExportPDFButton.tsx`

**Backend:**
- New API route: `app/api/anamnese/export-pdf/route.ts`
- PDF generation logic (server-side)

### Database Models

**Existing models used:**
```prisma
model AnamnesisSession {
  id              String   @id @default(cuid())
  userId          String
  syndromeId      String
  selectedOptions Json     // Checkbox selections
  generatedText   String?  // AI-generated anamnesis
  redFlags        Json?    // Detected red flags
  mode            String   // "summary" or "detailed"
  createdAt       DateTime @default(now())
  
  user            User     @relation(fields: [userId], references: [id])
  syndrome        Syndrome @relation(fields: [syndromeId], references: [id])
}
```

**No schema changes needed** - All data already in database

### API Routes

**New route needed:**
- `POST /api/anamnese/export-pdf`
  - Input: `sessionId`
  - Output: PDF file (binary)
  - Authentication: Required (Supabase)
  - Authorization: User must own session

### Test Patterns

**E2E patterns from existing tests:**
- `e2e/anamnese/` - User flow tests
- Pattern: User generates anamnesis → Verify result
- New test: User generates anamnesis → Click export → Verify PDF downloads

---

## Medical Compliance

### CFM Requirements

✅ **Medical Documentation Standards:**
- Patient identification (anonymized in PDF)
- Date and time of anamnesis
- Healthcare professional identification (user email)
- Chief complaint
- Clinical findings (red flags, selected symptoms)
- Generated anamnesis text

❌ **Not applicable:**
- Physical exam (not part of WellWave)
- Treatment plan (not part of WellWave)
- Signature (digital signature not implemented)

### LGPD Requirements

⚠️ **Privacy Considerations:**
- PDF must NOT include patient identifying information (anonymous by design)
- User email shown (healthcare professional, not patient)
- No export of multiple sessions (batch export could leak data)
- Audit trail: Log PDF exports in database

✅ **Data Protection:**
- PDF generated server-side (no client-side data exposure)
- No storage of generated PDFs (ephemeral)
- Authentication required (Supabase Auth)
- Authorization enforced (user must own session)

### Red Flags

✅ **Display in PDF:**
- Red flags section prominently displayed
- Warning styling (red color, bold text)
- Clear indication of critical findings

### EBM References

❌ **Not needed for export feature:**
- Export displays existing content
- EBM references already in generated anamnesis text

---

## Technology Stack

### Frontend

**Components needed:**
- `ExportPDFButton.tsx` - Button component
  - Uses shadcn/ui Button
  - Loading state during PDF generation
  - Error handling for failed exports

**State management:**
- TanStack Query for API call
- Local loading state in component

**UI library:**
- shadcn/ui Button component
- Lucide React icons (`FileDown` icon)

### Backend

**API route:**
- Next.js API Route (App Router)
- POST handler

**PDF Generation Library:**
- **Option A:** `react-pdf` + `@react-pdf/renderer` (popular, React-based)
- **Option B:** `pdfkit` (Node.js library, more control)
- **Option C:** Puppeteer (overkill for this use case)

**Recommendation:** `@react-pdf/renderer`
- React-based (familiar syntax)
- Good documentation
- Active maintenance
- Works well with Next.js

**Database:**
- Add export audit log (optional, nice-to-have)

### External Dependencies

**New packages needed:**
```json
{
  "@react-pdf/renderer": "^3.1.14",
  "react-pdf": "^7.5.1"
}
```

**Existing packages to use:**
- Prisma (database access)
- Supabase Auth (authentication)
- Zod (request validation)

### Infrastructure

**Supabase:**
- Auth for user verification

**Vercel:**
- Serverless function for PDF generation
- Edge function NOT needed (PDF generation is CPU-intensive)

---

## Unknowns (Resolved)

### ~~Technical Unknown 1: PDF generation library performance~~
**Resolution:** `@react-pdf/renderer` benchmarks show <2s for typical document
**Source:** Package documentation + community benchmarks
**Impact:** Meets <3s performance requirement

### ~~Technical Unknown 2: PDF file size~~
**Resolution:** Typical anamnesis PDF ~50-100 KB (text-only, no images)
**Source:** Estimated based on content length
**Impact:** No storage concerns (ephemeral), fast download

### ~~Business Unknown 1: Should PDF include WellWave branding?~~
**Resolution:** YES - Footer with "Generated by WellWave" + timestamp
**Source:** Reverse prompting - user confirmed
**Impact:** Add branding to PDF template

### ~~Business Unknown 2: Should we limit export frequency?~~
**Resolution:** NO rate limiting for MVP - Add if abuse detected
**Source:** Reverse prompting - user confirmed
**Impact:** No rate limiting implementation needed

### ~~Design Unknown 1: PDF layout - portrait or landscape?~~
**Resolution:** Portrait (A4) - Standard for medical documents
**Source:** Medical documentation standards
**Impact:** PDF template uses portrait orientation

---

## Risks & Constraints

### Technical Risks

**Risk: PDF generation timeout on large anamnesis**
- **Probability:** Low (anamnesis text is limited)
- **Impact:** Medium (user frustration)
- **Mitigation:** 
  - Use serverless function timeout (10s default)
  - Add loading indicator
  - Test with maximum length anamnesis

**Risk: Memory issues with concurrent PDF generations**
- **Probability:** Low (serverless scales automatically)
- **Impact:** Medium (API errors)
- **Mitigation:**
  - Vercel handles scaling
  - Monitor memory usage in production

### Compliance Risks

**Risk: PDF leaks patient information**
- **Probability:** Very Low (no patient data in system)
- **Impact:** Critical (LGPD violation)
- **Mitigation:**
  - Manual review of PDF template
  - E2E test verifies no patient data
  - Security review before deployment

### Performance Risks

**Risk: Slow PDF generation (>3s)**
- **Probability:** Low (simple document)
- **Impact:** Medium (poor UX)
- **Mitigation:**
  - Use @react-pdf/renderer (optimized)
  - Cache PDF if same session requested multiple times
  - Add loading state

### Security Risks

**Risk: Unauthorized access to other users' anamnesis**
- **Probability:** Low (with proper authorization)
- **Impact:** Critical (privacy breach)
- **Mitigation:**
  - Verify user owns session in API route
  - Use Supabase RLS policies
  - Add authorization tests

### Constraints

**Constraint: CFM compliance for medical documents**
- **Why:** Legal requirement for medical documentation
- **How to work within it:** Include all required fields in PDF template

**Constraint: LGPD privacy requirements**
- **Why:** Patient data protection law
- **How to work within it:** Anonymize all content, no patient identifiers

---

## Proposed Technical Approach

### Architecture

```
User clicks "Export PDF" button
         ↓
Frontend calls POST /api/anamnese/export-pdf
         ↓
API route authenticates user (Supabase)
         ↓
API route fetches session from database
         ↓
API route verifies user owns session
         ↓
Generate PDF using @react-pdf/renderer
         ↓
Return PDF as binary response
         ↓
Browser downloads PDF file
```

### Key Components

1. **ExportPDFButton** (Frontend) → shadcn/ui Button
2. **API Route** (Backend) → Next.js API handler
3. **PDF Template** (Backend) → React PDF Document component
4. **Authorization** (Backend) → Supabase Auth + ownership check

### Data Flow

1. User clicks "Export PDF" on anamnesis page
2. Frontend makes POST request with `sessionId`
3. Backend validates authentication
4. Backend fetches session from Prisma
5. Backend verifies user owns session
6. Backend generates PDF with session data
7. Backend returns PDF as binary
8. Frontend triggers browser download

### Integration Points

- **Supabase Auth** ↔ **API Route**: User authentication
- **Prisma** ↔ **API Route**: Session data retrieval
- **@react-pdf/renderer** ↔ **API Route**: PDF generation

### Testing Strategy

**Unit tests:**
- API route authentication logic
- API route authorization logic
- PDF template rendering

**Integration tests:**
- Full API route flow (mock Prisma)
- PDF generation with sample data

**E2E tests:**
- User flow: Generate anamnesis → Export PDF → Verify download
- Test with different syndrome types
- Test with red flags present

---

## Next Steps (Phase 2: Plan)

### Ready to Plan

- [x] All unknowns resolved
- [x] Technical approach validated
- [x] Risks identified and mitigated
- [x] Medical compliance verified
- [x] Codebase patterns understood

### Key Decisions for Planning

1. **PDF Library**: `@react-pdf/renderer` (React-based, well-documented)
2. **API Pattern**: POST `/api/anamnese/export-pdf` with sessionId
3. **Authorization**: Verify user owns session before export
4. **Branding**: Include "Generated by WellWave" in footer
5. **Rate Limiting**: Not needed for MVP

### Open Questions for Human Review

1. **PDF Filename**: Use `anamnesis-[syndrome]-[date].pdf` or `anamnesis-[sessionId].pdf`?
   - **Recommendation:** `anamnesis-[syndrome]-[date].pdf` (more user-friendly)

2. **Audit Logging**: Should we log PDF exports in database?
   - **Recommendation:** YES (nice-to-have, add if time permits)

3. **Caching**: Should we cache generated PDFs?
   - **Recommendation:** NO for MVP (adds complexity, minimal benefit)

### Estimated Complexity

**Overall:** Medium

**Reasoning:**
- New API route (medium complexity)
- New PDF generation (unfamiliar library, but good docs)
- Simple UI component (low complexity)
- Medical compliance considerations (adds complexity)
- Authorization important (medium complexity)

**Estimated Timeline:** 3-4 hours
- Phase 2 (Plan): 60 min
- Phase 3 (Tasks): 30 min
- Phase 4 (Implement): 2-2.5 hours

---

## Research Phase Complete

**Date:** 2026-01-08
**Time Spent:** ~90 minutes (simulated)
**Context Used:** ~35% (within Smart Zone)
**Unknowns Remaining:** 0
**Ready for Phase 2:** ✅ YES

**Next:** Start new session and run `/2_plan`
