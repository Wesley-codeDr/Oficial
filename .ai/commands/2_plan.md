# Phase 2: Plan (`/2_plan`)
**Goal**: Design architecture and create implementation plan

---

## 🎯 Objectives

By the end of this phase, you should have:
1. ✅ Complete feature specification (`spec.md`)
2. ✅ Detailed implementation plan (`plan.md`)
3. ✅ Architecture design documented
4. ✅ Data model defined
5. ✅ API contracts specified (if applicable)
6. ✅ FACTS validation passed
7. ✅ **Human approval received** 🚦

---

## 📋 Prerequisites

Before starting this phase:
- [x] Phase 1 (Research) completed
- [x] `specs/[feature]/research.md` exists
- [x] `memory/constitution.md` read and understood
- [x] Medical compliance verified (if applicable)
- [x] Context budget: 20-40% (Smart Zone)
- [x] Fresh session started (after Phase 1 compaction)

---

## 🔍 Step-by-Step Process

### **Step 1: Load Required Context (5 min)**

**Load these files**:
```
✅ CLAUDE.md (already loaded)
✅ memory/constitution.md
✅ specs/[feature]/research.md
```

**Optional (only if needed)**:
```
⚡ MODULE_GUIDELINES.md (if medical/domain-specific)
⚡ Similar feature specs (for patterns)
```

**Verify context budget**: Should be ~30-35% after loading

---

### **Step 2: Write Feature Specification (30 min)**

**Create** `specs/[feature]/spec.md`:

```markdown
# Feature Specification: [Feature Name]

## Overview
[High-level description of the feature]

**Feature Type**: [New Feature / Enhancement / Refactor]
**Priority**: [High / Medium / Low]
**Estimated Complexity**: [Simple / Medium / Complex]

---

## Problem Statement

### Current Situation
[What's the problem or gap?]

### Desired Outcome
[What do we want to achieve?]

### User Impact
[How does this affect users?]

---

## User Stories

### Story 1: [Title]
**As a** [user type]
**I want to** [action]
**So that** [benefit]

**Acceptance Criteria**:
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

### Story 2: [Title]
[Repeat format]

---

## Functional Requirements

### Core Functionality
1. **[Requirement]**: [Description]
   - **Input**: [What user provides]
   - **Processing**: [What system does]
   - **Output**: [What user gets]

2. **[Requirement]**: [Description]

### Edge Cases
- **Case**: [Description] → **Handling**: [How to handle]

### Error Handling
- **Error**: [Type] → **Message**: [User-facing message]

---

## Non-Functional Requirements

### Performance
- **Response time**: [Target] (e.g., <200ms)
- **Throughput**: [Target] (e.g., 100 req/s)
- **Scalability**: [Considerations]

### Security
- **Authentication**: [Requirements]
- **Authorization**: [Who can access what]
- **Data Protection**: [LGPD compliance]
- **Medical Compliance**: [CFM requirements]

### Usability
- **Accessibility**: [WCAG standards]
- **Mobile**: [Responsive design requirements]
- **Browser Support**: [Minimum versions]

### Reliability
- **Uptime**: [Target] (e.g., 99.9%)
- **Error Rate**: [Acceptable rate]
- **Recovery**: [Disaster recovery plan]

---

## Constraints

### Technical Constraints
- [Constraint]: [Description and impact]

### Business Constraints
- [Constraint]: [Description and impact]

### Medical/Legal Constraints
- [Constraint]: [Description and impact]

---

## Dependencies

### Internal Dependencies
- [Feature/Component]: [Why dependent]

### External Dependencies
- [Package/Service]: [Version] - [Why needed]

---

## Success Metrics

### Quantitative Metrics
- [Metric]: [Target value]

### Qualitative Metrics
- [Metric]: [How to measure]

---

## Out of Scope

Things explicitly NOT included in this feature:
- [Item 1]
- [Item 2]

---

## Open Questions

Questions requiring human input:
1. [Question]?
2. [Question]?
```

---

### **Step 3: Generate Implementation Plan (20 min)**

**Use existing `/speckit.plan` command**:

```
/speckit.plan

Context for plan generation:
- Technology: [Specific technologies to use]
- Architecture: [Specific patterns to follow]
- Integration: [How it integrates with existing features]

Additional considerations:
- [Specific consideration from research]
- [Specific consideration from research]
```

**This generates** `specs/[feature]/plan.md` with:
- System architecture
- Technology stack
- Data model
- API design
- Implementation phases
- Testing strategy

---

### **Step 4: Refine Architecture Design (15 min)**

**Enhance** `plan.md` with additional architectural details:

```markdown
## Detailed Architecture

### Component Diagram
```
[Component A] → [Component B] → [Component C]
     ↓              ↓              ↓
[Service X]   [Service Y]   [Database]
```

### Sequence Diagram (Key Flows)

**User Flow 1: [Action]**
```
User → Frontend → API Route → Service → Database → Response
```

### State Management
- **Global State**: [What goes in Zustand]
  - [State 1]: [Purpose]
  - [State 2]: [Purpose]

- **Local State**: [What stays in components]
  - [State 1]: [Purpose]

### Caching Strategy
- [What to cache]: [Where] - [TTL]

---

## Data Model Details

### Prisma Schema Changes
```prisma
model [ModelName] {
  id        String   @id @default(cuid())
  field1    String
  field2    Int
  // ... existing fields ...
  
  // New fields
  newField1 String?
  newField2 Json?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Database Migrations
1. **Migration 1**: [Description]
   - Add: [Fields]
   - Modify: [Fields]
   - Index: [Fields]

### Data Relationships
- [Model A] → [Model B]: [Relationship type]

---

## API Design

### New Endpoints

#### `POST /api/[feature]/[action]`
**Purpose**: [Description]

**Request**:
```typescript
{
  field1: string;
  field2: number;
}
```

**Response** (Success - 200):
```typescript
{
  success: true;
  data: {
    id: string;
    result: string;
  }
}
```

**Response** (Error - 400):
```typescript
{
  success: false;
  error: string;
}
```

**Authentication**: Required (Supabase Auth)
**Authorization**: [Role required]

#### `GET /api/[feature]/[resource]`
[Repeat format]

---

## Component Structure

### New Components
```
components/[domain]/
├── [Component1]/
│   ├── [Component1].tsx         # Main component
│   ├── [Component1].test.tsx    # Tests
│   └── index.ts                 # Exports
├── [Component2]/
│   └── ...
```

### Component Props
```typescript
interface Component1Props {
  prop1: string;
  prop2: number;
  onAction?: () => void;
}
```

---

## Testing Strategy

### Unit Tests
- **What to test**:
  - [Function/Component]: [Test cases]
  
- **Tools**: Vitest
- **Coverage Target**: 80%

### Integration Tests
- **What to test**:
  - [API route]: [Test scenarios]
  
- **Tools**: Vitest + MSW (mocking)

### E2E Tests
- **User flows**:
  - Flow 1: [Description]
  - Flow 2: [Description]
  
- **Tools**: Playwright
```

---

### **Step 5: FACTS Validation (20 min)**

**Validate plan against FACTS criteria**:

#### **F - Feasibility**
```markdown
## Feasibility Analysis

### Technical Feasibility
- [x] We have the required tech stack (Next.js 16, Prisma 6, etc.)
- [x] All dependencies are available and compatible
- [x] No blocking technical limitations

### Resource Feasibility
- [x] Timeline is realistic: [X days/weeks]
- [x] Complexity matches team capability
- [x] No external blockers

### Risks
- [Risk]: [Mitigation strategy]
```

#### **A - Alignment**
```markdown
## Alignment Check

### Constitution Alignment
- [x] Follows Spec-Driven Development principles
- [x] Maintains code quality standards
- [x] Uses approved tech stack
- [x] Follows existing architecture patterns

### Architecture Alignment
- [x] Integrates cleanly with existing features
- [x] Uses established patterns (e.g., Zustand for state)
- [x] Follows project structure conventions
- [x] No architectural debt introduced

### Reference Examples
Similar patterns in codebase:
- [Feature]: [Location] - [How it's similar]
```

#### **C - Completeness**
```markdown
## Completeness Check

### All Requirements Covered
- [x] User Story 1: [How addressed in plan]
- [x] User Story 2: [How addressed in plan]
- [x] All edge cases handled
- [x] Error handling defined
- [x] Non-functional requirements addressed

### Nothing Missing
- [x] Authentication/Authorization specified
- [x] Data validation defined
- [x] Performance considerations included
- [x] Medical compliance addressed (if applicable)
```

#### **T - Testability**
```markdown
## Testability Assessment

### Can We Test This?
- [x] Unit tests: [What can be unit tested]
- [x] Integration tests: [What can be integration tested]
- [x] E2E tests: [User flows to test]

### Test Data
- Mock data defined: [Yes/No]
- Test fixtures needed: [List]

### Measurable Acceptance Criteria
- [x] All acceptance criteria are testable
- [x] Success metrics are measurable
```

#### **S - Security**
```markdown
## Security Assessment

### OWASP Top 10 Considerations
- [x] Injection: [How protected]
- [x] Broken Authentication: [How protected]
- [x] Sensitive Data Exposure: [How protected]
- [x] XML External Entities (XXE): [N/A or How protected]
- [x] Broken Access Control: [How protected]
- [x] Security Misconfiguration: [How protected]
- [x] Cross-Site Scripting (XSS): [How protected]
- [x] Insecure Deserialization: [How protected]
- [x] Using Components with Known Vulnerabilities: [How protected]
- [x] Insufficient Logging & Monitoring: [How protected]

### Medical/Legal Compliance
- [x] CFM compliance verified (if medical feature)
- [x] LGPD compliance verified (patient data)
- [x] Data encryption at rest and in transit
- [x] Audit trail implemented

### Authentication & Authorization
- [x] Supabase Auth integration
- [x] Role-based access control (if needed)
- [x] Token validation on all protected routes
```

**All FACTS must pass** ✅ before proceeding

---

### **Step 6: Document Open Questions (5 min)**

```markdown
## Open Questions for Human Review

### Design Decisions Needed
1. **[Decision Topic]**
   - Option A: [Description] - Pros: [X] / Cons: [Y]
   - Option B: [Description] - Pros: [X] / Cons: [Y]
   - **Recommendation**: [Option] because [reasoning]

### Business Logic Clarifications
1. [Question requiring business input]?
2. [Question requiring business input]?

### Medical/Legal Review
1. [Question requiring compliance review]?
```

---

## 🚦 MANDATORY CHECKPOINT: Human Approval

**Before proceeding to Phase 3**, present plan to human:

```
Planning phase complete for [feature]! ✅

Specification created:
- [User story count] user stories
- [Requirement count] functional requirements
- All non-functional requirements addressed
- [Constraint count] constraints documented

Implementation plan generated:
- Architecture: [Brief description]
- Tech stack: [Key technologies]
- Data model: [Brief description]
- API design: [Endpoint count] endpoints
- Testing: [Test strategy summary]

FACTS validation passed:
✅ Feasibility - Technically viable
✅ Alignment - Matches constitution & architecture
✅ Completeness - All requirements covered
✅ Testability - Comprehensive test strategy
✅ Security - CFM/LGPD compliant

Estimated timeline: [X days/weeks]
Estimated complexity: [Simple/Medium/Complex]

Open questions:
1. [Question 1]
2. [Question 2]

📄 Full specification: specs/[feature]/spec.md
📄 Implementation plan: specs/[feature]/plan.md

**🚦 APPROVAL REQUIRED BEFORE PHASE 3**

Do you approve this plan?
- If yes: Ready to proceed to Phase 3 (Tasks)
- If no: What needs to be changed?
```

**Wait for explicit approval** before continuing

---

## ✅ Phase 2 Completion Checklist

Before moving to Phase 3:

- [ ] `specs/[feature]/spec.md` created and complete
- [ ] `specs/[feature]/plan.md` generated and refined
- [ ] All user stories documented
- [ ] Functional requirements specified
- [ ] Non-functional requirements addressed
- [ ] Architecture designed
- [ ] Data model defined
- [ ] API contracts specified
- [ ] Testing strategy documented
- [ ] FACTS validation passed (all 5 criteria)
- [ ] Open questions documented
- [ ] **🚦 HUMAN APPROVAL RECEIVED**
- [ ] Context budget: Still in Smart Zone (20-40%)
- [ ] Progress saved

---

## 🚦 Transition to Phase 3

**After receiving approval**:

1. **Update progress**:
```markdown
# Save to thoughts/shared/progress/[feature].md
- Planning phase completed: [date]
- Approval received from: [name]
- Key architectural decisions: [Summary]
- Ready for Phase 3: Yes
```

2. **Summary message**:
```
Plan approved! Moving to Phase 3 (Tasks).

Next: Break down plan into actionable tasks.

Starting new session for context compaction.

When ready:
- Load: .ai/commands/3_tasks.md
- Run: /3_tasks
```

3. **End session for compaction**
4. **User starts new session and runs**: `/3_tasks`

---

## 🛠️ Tools & Commands

### **Spec-Kit Integration**
```
/speckit.plan - Generates plan.md from spec.md
```

### **FACTS Validation Template**
Use the checklist above to systematically validate

### **Librarian Agent** (if needed)
```
Use for: External API documentation, framework best practices
```

---

## 🎓 Tips & Best Practices

✅ **Be specific** - Vague specs lead to vague implementations
✅ **Think edge cases** - They're where bugs hide
✅ **Follow patterns** - Don't reinvent if similar exists
✅ **Validate early** - FACTS saves rework later
✅ **Document decisions** - Future maintainers will thank you
✅ **Get approval** - Don't skip the checkpoint

❌ **Don't skip FACTS** - Catches problems before coding
❌ **Don't assume understanding** - Ask questions
❌ **Don't over-engineer** - Simplest solution wins
❌ **Don't ignore compliance** - Medical/legal is non-negotiable

---

## 📚 Reference Files

- **Quick Reference**: `.ai/RPI_QUICKSTART.md`
- **Core Rules**: `CLAUDE.md`
- **Previous Phase**: `.ai/commands/1_research.md`
- **Next Phase**: `.ai/commands/3_tasks.md`
- **Project Principles**: `memory/constitution.md`

---

**Version**: 3.0.0 | **Last Updated**: 2026-01-08
**Estimated Time**: 90 minutes
**Context Budget**: 20-40% (Smart Zone)
**Critical**: Human approval REQUIRED before Phase 3
