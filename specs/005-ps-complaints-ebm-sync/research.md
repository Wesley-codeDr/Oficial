# Research Document: ps-complaints-ebm-sync

**Feature Name:** ps-complaints-ebm-sync
**Feature Number:** 005
**Date:** 2026-01-05
**Status:** Draft

## Overview

Goal is to seed the complaint catalog with Brazilian and international EBM references, prioritizing high-risk complaints.

## Objectives

- [x] Confirm initial reference URLs for high-risk complaints
- [ ] Expand Brazilian sources for remaining high-risk complaints
- [ ] Map every complaint to >= 1 Brazilian guideline + 1 international reference (where available)

## Confirmed References (Starter Set)

Brazilian (confirmed URLs):
- SBC: Diretriz Brasileira de Atendimento a Dor Toracica na Unidade de Emergencia 2025
  - https://abccardiol.org/article/diretriz-brasileira-de-atendimento-a-dor-toracica-na-unidade-de-emergencia-2025/
- SBC: Diretriz Brasileira de Hipertensao Arterial 2025
  - https://abccardiol.org/article/diretriz-brasileira-de-hipertensao-arterial-2025/
- ILAS: Algoritmos de Sepse (PDF)
  - https://ilas.org.br/wp-content/uploads/2022/02/algoritmos.pdf
- ILAS: Guia de Antibioticoterapia Empirica (PDF)
  - https://ilas.org.br/wp-content/uploads/2022/02/guia-antibioticoterapia-empirica.pdf

International (confirmed URLs):
- Surviving Sepsis Campaign 2021 (DOI)
  - https://doi.org/10.1007/s00134-021-06506-y
- WHO: Guidelines for the Management of Snakebite Envenoming
  - https://www.who.int/publications/i/item/9789241515641
- Brain Trauma Foundation Guidelines
  - https://braintrauma.org/guidelines
- GOLD 2025 Report
  - https://goldcopd.org/2025-gold-report/
- GINA Reports
  - https://ginasthma.org/gina-reports/
- WSES 2020 Appendicitis Guidelines
  - https://link.springer.com/article/10.1186/s13017-020-00306-3
- WSES 2017 Small Bowel Obstruction Guidelines
  - https://link.springer.com/article/10.1186/s13017-017-0159-2
- WSES 2019 Acute Pancreatitis Guidelines
  - https://link.springer.com/article/10.1186/s13017-019-0247-0

## Mapping (High-Risk Complaints Seeded)

- CV_CHEST_PAIN_ACS, CV_CHEST_PAIN_TYPICAL -> SBC chest pain guideline (2025)
- CV_HYPERTENSIVE_CRISIS -> SBC hypertension guideline (2025)
- INF_SEPSIS -> ILAS algorithms + antibiotic guide; SSC 2021
- TOX_SNAKE_BITE -> WHO snakebite guideline
- TR_HEAD_INJURY -> Brain Trauma Foundation
- RC_COPD_EXACERBATION -> GOLD 2025
- GI_APPENDICITIS -> WSES 2020 appendicitis
- GI_BOWEL_OBSTRUCTION -> WSES 2017 small bowel obstruction
- GI_PANCREATITIS -> WSES 2019 pancreatitis

## Next Brazilian Targets (URLs to confirm)

- SBDCV/SBN: AVC guidelines (NC_STROKE_ACUTE)
- SBPT: COPD/asthma/pneumonia guidelines (RC_*)
- FEBRASGO: ectopic pregnancy, vaginal bleeding, labor (OBG_*)
- SBU: renal colic, testicular torsion (GU_*)
- MS: acidentes por animais peconhentos manual (TOX_SNAKE_BITE)
- AMIB/ABRAMEDE: sepsis/trauma protocols

## Open Questions

- Which paid sources (UpToDate/DynaMed) are allowed for citations?
- Who is the clinical reviewer and review cadence?
- Minimum citation depth per complaint (1 vs 2+ references)?

## References

- `specs/005-ps-complaints-ebm-sync/references-sources.md`
- `docs/OBSIDIAN_SYNC.md`
- `docs/PILOT_WORKFLOW.md`
- `lib/types/medical.ts`
