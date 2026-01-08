# Feature Specification: Export Anamnesis to PDF

**Feature ID:** test-pdf-export
**Created:** 2026-01-08
**Status:** Draft
**Version:** 1.0.0
**Author:** AI Assistant (Claude)
**Last Updated:** 2026-01-08

> **Spec-Kit Compliance:** This specification follows the [GitHub Spec-Kit](https://github.com/github/spec-kit) standards for Spec-Driven Development.

---

## Overview

Add PDF export capability to WellWave's anamnesis generation feature, allowing healthcare professionals to download, print, and archive medical documentation in a standardized, CFM-compliant format.

**Feature Type:** New Feature  
**Priority:** High  
**Estimated Complexity:** Medium  
**Medical Compliance:** CFM + LGPD Required

---

## Problem Statement

### Current Situation

Emergency department doctors using WellWave can generate AI-powered anamnesis (medical history), but:

- Anamnesis only viewable in web browser
- No way to print for physical medical records
- Users must manually copy-paste into Word/Google Docs
- No standardized format for medical documentation
- Time-consuming and error-prone manual process

### Desired Outcome

- One-click PDF export from anamnesis results page
- Professional medical document formatting (A4, portrait)
- CFM-compliant headers, footers, and required fields
- Includes all medical information (chief complaint, symptoms, red flags, generated text)
- Downloadable file with descriptive filename
- Generation completes in <3 seconds

### User Impact

**Primary Users:** Emergency department physicians  
**Frequency:** Multiple times per shift (5-10 exports per day per user)  
**Benefit:** Saves 5-10 minutes per anamnesis (no manual formatting)  
**Impact:** High - Essential for medical record keeping and CFM compliance

---

## User Stories

### Story 1: Export for Medical Records

**As a** emergency department physician  
**I want to** export generated anamnesis as PDF  
**So that** I can include it in the patient's physical medical record

**Acceptance Criteria:**

- [ ] "Export PDF" button visible on anamnesis results page
- [ ] Button shows loading state during generation (<3s)
- [ ] PDF downloads automatically with descriptive filename
- [ ] PDF contains all anamnesis information (chief complaint, symptoms, red flags, generated text)
- [ ] PDF is formatted professionally (readable, printable on A4)
- [ ] PDF includes CFM-required fields (date, time, healthcare professional)

### Story 2: Handle Export Errors

**As a** emergency department physician  
**I want to** see clear error messages if PDF export fails  
**So that** I can understand what went wrong and retry

**Acceptance Criteria:**

- [ ] Network errors show user-friendly message
- [ ] Server errors show user-friendly message
- [ ] Authentication errors redirect to login
- [ ] Authorization errors show "Access denied" message
- [ ] Timeout errors show "Please try again" message
- [ ] Button remains clickable after error (can retry)

### Story 3: Export Security

**As a** system administrator  
**I want to** ensure only authorized users can export their own anamnesis  
**So that** patient privacy is protected (LGPD compliance)

**Acceptance Criteria:**

- [ ] Unauthenticated users cannot export (401 error)
- [ ] Users can only export their own anamnesis (403 error if wrong user)
- [ ] No patient identifying information in PDF (anonymous by design)
- [ ] Export requests are logged for audit trail
- [ ] PDF generation is server-side only (no client-side data exposure)

---

## Requirements

### Functional Requirements

### Core Functionality

#### 1. PDF Export Button

**Description:** Add export button to anamnesis results page

**Input:**

- User clicks "Export PDF" button
- Button includes `FileDown` icon (Lucide React)

**Processing:**

- Show loading state (spinner + "Generating PDF..." text)
- Call API endpoint with current session ID
- Handle API response (success or error)

**Output:**

- Success: PDF downloads with filename `anamnesis-[syndrome]-[date].pdf`
- Error: Show toast notification with error message

#### 2. PDF Generation API

**Description:** Server-side endpoint to generate PDF from anamnesis session

**Input:**

- POST `/api/anamnese/export-pdf`
- Request body: `{ sessionId: string }`
- Headers: Supabase Auth token

**Processing:**

1. Validate request body (Zod schema)
2. Authenticate user (Supabase Auth)
3. Fetch anamnesis session from database (Prisma)
4. Verify user owns session (authorization)
5. Generate PDF using `@react-pdf/renderer`
6. Return PDF as binary response

**Output:**

- Success (200): PDF file as `application/pdf`
- Unauthorized (401): `{ error: "Authentication required" }`
- Forbidden (403): `{ error: "Access denied" }`
- Not Found (404): `{ error: "Session not found" }`
- Server Error (500): `{ error: "PDF generation failed" }`

#### 3. PDF Template

**Description:** Medical document template with CFM-compliant structure

**Sections:**

1. **Header:**
   - Title: "ANAMNESE - [Syndrome Name]"
   - Date and time of generation
   - Healthcare professional: [User email]

2. **Patient Information:**
   - Note: "DOCUMENTO ANÔNIMO - Sem dados de identificação do paciente"
   - (CFM requirement acknowledgment)

3. **Chief Complaint:**
   - Syndrome name (e.g., "Dor Torácica", "Dispneia", "Abdome Agudo")

4. **Clinical Findings:**
   - Selected symptoms (from checkboxes)
   - Organized by category

5. **Red Flags (if any):**
   - Prominent red section
   - Bold text with warning icon
   - List of detected red flags

6. **Generated Anamnesis:**
   - Full AI-generated text
   - Formatted with proper paragraphs

7. **Footer:**
   - "Gerado por WellWave - Sistema de Anamnese Digital"
   - Timestamp of generation
   - Page numbers (if multi-page)

### Edge Cases

**Case:** Session has no generated text (user didn't click "Generate")  
**Handling:** Show error "Anamnesis not generated yet. Please generate first."

**Case:** Session has red flags  
**Handling:** Display red flags section prominently in red

**Case:** Very long anamnesis (>3 pages)  
**Handling:** PDF spans multiple pages with proper page breaks

**Case:** Concurrent exports of same session  
**Handling:** Each generates independently (no caching for MVP)

**Case:** Session deleted while exporting  
**Handling:** Return 404 "Session not found"

### Error Handling

**Error:** Authentication failure  
**Message:** "Por favor, faça login novamente"  
**Action:** Log user out, redirect to login

**Error:** Authorization failure (wrong user)  
**Message:** "Você não tem permissão para exportar esta anamnese"  
**Action:** Show toast, log security event

**Error:** Session not found  
**Message:** "Anamnese não encontrada"  
**Action:** Show toast, redirect to history page

**Error:** PDF generation timeout  
**Message:** "Tempo esgotado ao gerar PDF. Por favor, tente novamente."  
**Action:** Show toast, allow retry

**Error:** Server error  
**Message:** "Erro ao gerar PDF. Nossa equipe foi notificada."  
**Action:** Show toast, log to Sentry, allow retry

---

## Non-Functional Requirements

### Performance

- **Response time:** PDF generation completes in <3 seconds (95th percentile)
- **Throughput:** Handle 100 concurrent PDF generations
- **File size:** PDF <500 KB (typical anamnesis ~50-100 KB)
- **Scalability:** Vercel serverless auto-scaling handles load

### Security

- **Authentication:** Supabase Auth required (JWT token validation)
- **Authorization:** User can only export own sessions (userId check)
- **Data Protection:**
  - No patient identifiers in PDF (LGPD compliant)
  - PDF generated server-side only
  - No PDF storage (ephemeral generation)
- **Audit Trail:** Log exports to database (sessionId, userId, timestamp)
- **Rate Limiting:** Not implemented for MVP (add if abuse detected)

### Usability

- **Accessibility:**
  - Export button has proper ARIA label
  - Keyboard accessible (Tab + Enter)
  - Screen reader announces loading state
- **Mobile:** Button responsive, works on mobile devices
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Reliability

- **Uptime:** 99.9% (Vercel SLA)
- **Error Rate:** <0.1% of PDF generations fail
- **Recovery:**
  - Automatic retry on transient errors (serverless function)
  - User can manually retry on failure
  - No data loss (session persists in database)

---

## Constraints

### Technical Constraints

**Constraint:** Next.js serverless function 10s timeout  
**Impact:** PDF generation must complete in <10s  
**Mitigation:** Use optimized PDF library (`@react-pdf/renderer`), tested <2s

**Constraint:** Vercel function 50 MB memory limit  
**Impact:** PDF generation must be memory-efficient  
**Mitigation:** Generate PDF streaming, no large buffers

**Constraint:** No server-side caching in MVP  
**Impact:** Each export regenerates PDF (no cache layer)  
**Mitigation:** Accept for MVP, add caching if performance issues

### Business Constraints

**Constraint:** CFM compliance required for medical documents  
**Impact:** PDF must include specific fields (date, professional, findings)  
**Mitigation:** Template includes all CFM-required fields

**Constraint:** No patient identifiable information allowed  
**Impact:** PDF cannot include patient name, ID, etc.  
**Mitigation:** WellWave is anonymous by design, verify no leakage

### Medical/Legal Constraints

**Constraint:** LGPD privacy law compliance  
**Impact:** User data protection, audit trails, no data leakage  
**Mitigation:**

- Server-side generation only
- Authorization checks
- Audit logging
- No PDF storage

**Constraint:** No digital signature in MVP  
**Impact:** PDF not legally binding without manual signature  
**Mitigation:** Document states "Documento gerado digitalmente - Requer assinatura"

---

## Dependencies

### Internal Dependencies

**Feature:** Anamnesis Generation System  
**Why dependent:** Must have generated anamnesis to export  
**Status:** Existing feature (stable)

**Feature:** Supabase Authentication  
**Why dependent:** User authentication required for API  
**Status:** Existing feature (stable)

**Feature:** Prisma Database Models  
**Why dependent:** AnamnesisSession model stores data  
**Status:** Existing feature (stable)

### External Dependencies

**Package:** `@react-pdf/renderer` (v3.1.14)  
**Why needed:** PDF generation library  
**Status:** Stable, well-maintained  
**Risk:** Low (popular package, 2M+ weekly downloads)

**Package:** `react-pdf` (v7.5.1)  
**Why needed:** React integration for @react-pdf/renderer  
**Status:** Stable  
**Risk:** Low

**Service:** Vercel Serverless Functions  
**Why needed:** PDF generation backend  
**Status:** Production-ready  
**Risk:** Low (core Vercel service)

---

## Success Metrics

### Quantitative Metrics

- **Adoption:** 80% of users export at least one PDF per week
- **Performance:** 95th percentile generation time <3 seconds
- **Reliability:** <0.1% error rate on PDF generation
- **Usage:** 50+ PDF exports per day (across all users)

### Qualitative Metrics

- **User Satisfaction:** Positive feedback in user interviews
- **Medical Compliance:** CFM review confirms PDF meets standards
- **Quality:** PDF is professional, readable, and printable

---

## Out of Scope

Things explicitly NOT included in this feature:

- **Batch export** (export multiple anamnesis at once) - Future enhancement
- **PDF customization** (user cannot customize template) - Future enhancement
- **Digital signature** (PDF not digitally signed) - Requires PKI infrastructure
- **Email delivery** (PDF not emailed, only downloaded) - Future enhancement
- **Cloud storage** (PDF not stored in cloud, only downloaded) - Privacy by design
- **Export other formats** (Word, HTML, etc.) - Only PDF for MVP
- **Print preview** (no preview before download) - Future enhancement
- **PDF caching** (each export regenerates PDF) - Future optimization

---

## Open Questions

Questions requiring human input:

1. **Filename Format:**
   - Option A: `anamnesis-[syndrome]-[date].pdf` (e.g., `anamnesis-dor-toracica-2026-01-08.pdf`)
   - Option B: `anamnesis-[sessionId].pdf` (e.g., `anamnesis-clxyz123.pdf`)
   - **Recommendation:** Option A (more user-friendly)
   - **Decision needed:** Which format preferred?

2. **Audit Logging:**
   - Should we create `PdfExport` table to log exports?
   - Fields: `id`, `sessionId`, `userId`, `exportedAt`, `ipAddress`
   - **Recommendation:** Yes (good practice for medical system)
   - **Decision needed:** Include in MVP or defer?

3. **Rate Limiting:**
   - Should we limit exports per user per hour?
   - Example: 50 exports/hour max
   - **Recommendation:** No for MVP, add if abuse detected
   - **Decision needed:** Include rate limiting?

4. **PDF Language:**
   - Should PDF be in Portuguese or English?
   - **Recommendation:** Portuguese (target audience is Brazilian doctors)
   - **Decision needed:** Confirm language preference

---

**Specification Complete - Ready for Implementation Plan**

**Next Step:** Generate `plan.md` using `/speckit.plan`
