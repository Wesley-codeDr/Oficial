# Phase 1: Research (`/1_research`)
**Goal**: Gather all context, resolve unknowns, validate technical approach

---

## 🎯 Objectives

By the end of this phase, you should have:
1. ✅ Complete understanding of the feature requirements
2. ✅ All unknowns identified and resolved
3. ✅ Technical approach validated
4. ✅ Risks and constraints documented
5. ✅ Codebase patterns understood
6. ✅ Medical compliance verified (if applicable)
7. ✅ Research findings documented in `specs/[feature]/research.md`

---

## 📋 Prerequisites

Before starting this phase:
- [ ] Feature name defined
- [ ] Directory structure created: `./scripts/setup-plan.sh [feature-name]`
- [ ] Initial requirements understood (even if vague)
- [ ] Context budget: 20-40% (Smart Zone)

---

## 🔍 Step-by-Step Process

### **Step 1: Initial Context Gathering (10 min)**

**Load these files**:
```
✅ CLAUDE.md (already loaded)
✅ memory/constitution.md
✅ AGENTS.md
```

**Understand the request**:
- What is the user asking for?
- What problem does this solve?
- Who are the users?
- What are the success criteria?

**Document in** `specs/[feature]/research.md`:
```markdown
# Research: [Feature Name]

## User Request
[Original request from user]

## Problem Statement
[What problem are we solving?]

## Success Criteria
[How do we know it's successful?]
```

---

### **Step 2: Codebase Analysis (20 min)**

**Use the `codebase-analyzer` sub-agent**:

```
Use task tool with:
  subagent_type: "explore"
  description: "Analyze codebase for [feature] patterns"
  prompt: "
    Search the WellWave codebase for patterns related to [feature].
    
    Find:
    1. Similar existing features
    2. Relevant components and utilities
    3. Database models that might be affected
    4. API routes that might be involved
    5. Existing tests we can learn from
    
    For each finding, provide:
    - File path
    - Brief description
    - How it relates to [feature]
    - Patterns we should follow
    
    Return a structured analysis I can use in research.md
  "
```

**Document findings**:
```markdown
## Codebase Analysis

### Similar Features
- [Feature name]: [Location] - [How it's relevant]

### Affected Components
- [Component]: [Path] - [Impact]

### Database Models
- [Model]: [Tables affected]

### API Routes
- [Route]: [Path] - [Modification needed]

### Test Patterns
- [Test type]: [Location] - [Approach to follow]
```

---

### **Step 3: Medical Compliance Check (15 min)** *If medical feature*

**Use the `medical-validator` sub-agent**:

```
Use task tool with:
  subagent_type: "explore"
  description: "Validate medical compliance for [feature]"
  prompt: "
    Analyze [feature] for CFM and LGPD compliance.
    
    Check:
    1. Is patient data involved? → LGPD requirements
    2. Is medical documentation generated? → CFM requirements
    3. Are there red flags to detect? → Safety requirements
    4. Does it need EBM references? → Evidence-based medicine
    5. Medical terminology standards to follow
    
    Load: app/(dashboard)/anamnese/MODULE_GUIDELINES.md
    
    Return compliance checklist and requirements.
  "
```

**Document compliance**:
```markdown
## Medical Compliance

### CFM Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]

### LGPD Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]

### Red Flags
- [Flag]: [Detection method]

### EBM References Needed
- [Topic]: [Source]
```

---

### **Step 4: Technology & Dependencies (10 min)**

**Identify technical requirements**:

```markdown
## Technology Stack

### Frontend
- Components needed: [List]
- State management: [Zustand stores affected]
- UI library: [shadcn/ui components]

### Backend
- API routes needed: [List]
- Database changes: [Prisma schema updates]

### External Dependencies
- New packages needed: [List with versions]
- Existing packages to use: [List]

### Infrastructure
- Supabase features needed: [Auth, Storage, etc.]
- Vercel features needed: [Edge functions, etc.]
```

---

### **Step 5: FAR Pattern - Resolve Unknowns (20 min)**

**FIND** all unknowns:
```markdown
## Unknowns

### Technical Unknowns
1. [Unknown]: [Why unknown?]
2. [Unknown]: [Why unknown?]

### Business Unknowns
1. [Unknown]: [Why unknown?]
2. [Unknown]: [Why unknown?]

### Design Unknowns
1. [Unknown]: [Why unknown?]
2. [Unknown]: [Why unknown?]
```

**ANALYZE** each unknown:
- Why is this unknown?
- What information do we need?
- Who/what can provide answers?
- How critical is this for proceeding?

**RESOLVE** using:

1. **Codebase exploration**:
   ```
   Use explore agent to search for patterns
   ```

2. **External documentation**:
   ```
   Use librarian agent to fetch docs:
     - Next.js 16 documentation
     - Prisma 6 documentation
     - Supabase documentation
     - Medical compliance guidelines
   ```

3. **Reverse prompting**:
   ```
   Ask user better questions:
   - "Should [feature] handle [scenario]?"
   - "What should happen when [edge case]?"
   - "Who has access to [feature]?"
   ```

4. **Human consultation**:
   ```
   Flag for human input:
   - Design decisions
   - Business logic
   - Medical compliance edge cases
   ```

**Update unknowns section**:
```markdown
## Unknowns (Resolved)

### ~~Technical Unknown 1~~
**Resolution**: [How it was resolved]
**Source**: [Codebase / Docs / Human]
**Impact**: [How this affects implementation]
```

**Goal**: NO unknowns remain

---

### **Step 6: Risk Assessment (10 min)**

```markdown
## Risks & Constraints

### Technical Risks
- **Risk**: [Description]
  - **Probability**: High/Medium/Low
  - **Impact**: High/Medium/Low
  - **Mitigation**: [Strategy]

### Compliance Risks
- **Risk**: [Medical/legal compliance issue]
  - **Impact**: [Consequence]
  - **Mitigation**: [Strategy]

### Performance Risks
- **Risk**: [Performance concern]
  - **Impact**: [User experience]
  - **Mitigation**: [Strategy]

### Security Risks
- **Risk**: [Security vulnerability]
  - **Impact**: [Data breach, etc.]
  - **Mitigation**: [Strategy]

### Constraints
- [Constraint]: [Why? How to work within it?]
```

---

### **Step 7: Technical Approach Validation (15 min)**

**Propose technical approach**:
```markdown
## Proposed Technical Approach

### Architecture
[High-level description of how this will work]

### Key Components
1. **[Component]**: [Purpose] → [Technology]
2. **[Component]**: [Purpose] → [Technology]

### Data Flow
1. [Step 1]: [What happens]
2. [Step 2]: [What happens]
3. [Step 3]: [What happens]

### Integration Points
- [System A] ↔ [System B]: [How they connect]

### Testing Strategy
- Unit tests: [What to test]
- E2E tests: [User flows to test]
```

**Validate against constitution**:
- [ ] Follows existing architecture patterns?
- [ ] Uses approved tech stack?
- [ ] Maintains code quality standards?
- [ ] Testable approach?

---

### **Step 8: Documentation & Handoff (10 min)**

**Complete research.md**:
```markdown
## Next Steps (Phase 2: Plan)

### Ready to Plan
- [x] All unknowns resolved
- [x] Technical approach validated
- [x] Risks identified and mitigated
- [x] Medical compliance verified (if applicable)
- [x] Codebase patterns understood

### Key Decisions for Planning
1. [Decision]: [Options considered] → [Recommendation]
2. [Decision]: [Options considered] → [Recommendation]

### Open Questions for Human Review
1. [Question requiring human decision]
2. [Question requiring human decision]

### Estimated Complexity
**Overall**: [Simple / Medium / Complex]
**Reasoning**: [Why?]

**Estimated Timeline**: [X days/weeks]
```

**Save progress**:
```markdown
# Save to thoughts/shared/progress/[feature].md
- Research phase completed: [date]
- Key findings: [Summary]
- Context used: [Estimate %]
- Ready for Phase 2: Yes
```

---

## ✅ Phase 1 Completion Checklist

Before moving to Phase 2:

- [ ] `specs/[feature]/research.md` created and complete
- [ ] All unknowns resolved (no "???" remaining)
- [ ] Technical approach validated
- [ ] Risks documented with mitigation strategies
- [ ] Medical compliance checked (if applicable)
- [ ] Codebase patterns understood
- [ ] Dependencies identified
- [ ] Open questions flagged for human review
- [ ] Context budget: Still in Smart Zone (20-40%)
- [ ] Progress saved to `thoughts/shared/progress/[feature].md`

---

## 🚦 Transition to Phase 2

**Before ending this session**:

1. **Summary message to user**:
```
Research phase complete for [feature]! ✅

Key findings:
- [Finding 1]
- [Finding 2]
- [Finding 3]

Risks identified:
- [Risk 1]: [Mitigation]
- [Risk 2]: [Mitigation]

Technical approach:
[Brief description]

Open questions for you:
1. [Question 1]
2. [Question 2]

📄 Full research documented in: specs/[feature]/research.md

Ready to proceed to Phase 2 (Planning)?
- Load: .ai/commands/2_plan.md
- Run: /2_plan

Starting new session for context compaction.
```

2. **End session for compaction**
3. **User starts new session and runs**: `/2_plan`

---

## 🛠️ Tools & Sub-Agents

### **Codebase Analyzer** (explore agent)
```
Use for: Understanding existing patterns
Best for: Similar features, component structure, test patterns
```

### **Medical Validator** (explore agent)
```
Use for: CFM/LGPD compliance checking
Best for: Medical features, patient data handling
```

### **Librarian** (librarian agent)
```
Use for: External documentation
Best for: Framework docs, library usage, API references
```

### **Reverse Prompting**
```
Use for: Asking better questions
Best for: Business logic, edge cases, user workflows
```

---

## 🎓 Tips & Best Practices

✅ **Be thorough** - 90 minutes well spent saves days of rework
✅ **Document everything** - Future you will thank current you
✅ **Use sub-agents** - They're cheap and effective
✅ **Ask questions** - Better to ask than assume
✅ **Validate early** - Check with human before investing in wrong direction
✅ **Stay in Smart Zone** - Don't load unnecessary context

❌ **Don't rush** - Skipping research causes failures
❌ **Don't assume** - Ask if unsure
❌ **Don't skip medical compliance** - It's legally required
❌ **Don't leave unknowns** - Resolve everything now

---

## 📚 Reference Files

- **Quick Reference**: `.ai/RPI_QUICKSTART.md`
- **Core Rules**: `CLAUDE.md`
- **Navigation**: `AGENTS.md`
- **Project Principles**: `memory/constitution.md`
- **Next Phase**: `.ai/commands/2_plan.md`

---

**Version**: 3.0.0 | **Last Updated**: 2026-01-08
**Estimated Time**: 90 minutes
**Context Budget**: 20-40% (Smart Zone)
