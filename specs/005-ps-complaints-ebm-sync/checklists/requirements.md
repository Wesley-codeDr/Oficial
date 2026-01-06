# Requirements Checklist

## Functional Requirements
- [ ] Complaint catalog stored in DB (not static TS) and exposed via API
- [ ] EBM references stored and surfaced in app
- [ ] Bidirectional sync agent (Obsidian <-> DB)
- [ ] Conflict detection and manual merge path
- [ ] Validation gates for frontmatter and EBM schema

## Non-Functional Requirements
- [ ] Sync latency target met
- [ ] Audit log for complaint updates
- [ ] LGPD/CFM compliance preserved
- [ ] Fallback behavior when sync agent is offline

## User Stories
- [ ] Obsidian edit reflects in app
- [ ] App update reflects in Obsidian
- [ ] Clinician sees references and review date

## Acceptance Criteria
- [ ] High-risk complaints have >= 1 Brazilian reference
- [ ] No silent conflicts; 409 or conflict note created
- [ ] `sync:validate` and EBM validation pass
