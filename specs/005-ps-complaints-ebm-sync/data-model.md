# Data Model: ps-complaints-ebm-sync

**Feature Name:** ps-complaints-ebm-sync
**Feature Number:** 005
**Date:** 2026-01-05
**Version:** 1.0.0

## Overview

This feature reuses existing complaint tables and stores structured EBM content in JSON. Sync metadata is stored alongside the EBM payload to support conflict detection and auditability.

## Database Schema

### Existing Prisma Models (current)

```prisma
model chief_complaints {
  id            String   @id
  group_id      String
  code          String   @unique
  name_pt       String
  definition    String?
  synonyms      String[]
  icd10_codes   String[]
  is_active     Boolean  @default(true)
  additional_data Json?
  updated_at    DateTime
}

model chief_complaint_groups {
  id          String @id
  code        String @unique
  name_pt     String
  order_index Int
  is_active   Boolean @default(true)
}
```

### JSON Payload (additional_data)

```json
{
  "metadata": {
    "subtitle": "Short description",
    "riskLevel": "high",
    "severity": 5,
    "ageTargets": ["adult"],
    "isTopForAdult": true,
    "isTopForChild": false,
    "isFastTrack": false,
    "chips": [],
    "searchTerms": [],
    "bodySystem": [],
    "relatedSymptoms": [],
    "commonMisconceptions": [],
    "searchWeight": 1
  },
  "extendedContentEBM": {
    "redFlags": [],
    "diagnosticoDiferencial": [],
    "condutaInicial": "",
    "calculadoras": [],
    "ebmVersion": "1.0",
    "lastEBMReview": "2026-01-05",
    "brazilianGuidelines": [],
    "ebmReferences": []
  },
  "sync": {
    "contentHash": "sha256:...",
    "lastSyncedAt": "2026-01-05T00:00:00Z",
    "syncSource": "obsidian"
  }
}
```

## TypeScript Types

- `ComplaintExtendedContentEBM` in `lib/types/medical.ts`
- `EBMCitation`, `MedicationRecommendation`, `RedFlag`, `DifferentialDiagnosis`

## Validation

- `scripts/sync/validate.ts` for frontmatter and base fields
- `scripts/sync/utils/ebm-validator.ts` for EBM payload
