---
tags: [medical, compliance, cfm, lgpd, anamnesis]
summary: Medical domain knowledge and compliance patterns
relevantTo: [medical, anamnese, compliance, health, patient]
importance: 0.95
relatedFiles: [app/(dashboard)/anamnese/, lib/medical/, components/medical/]
usageStats:
  loaded: 16
  referenced: 8
  successfulFeatures: 8
---
# Medical Domain Knowledge

WellWave-specific medical patterns and compliance requirements.

---

## CFM Compliance (Resolution 2.314/2022)

### Required Anamnesis Blocks
- **QP** - Queixa Principal: Patient's main complaint in their own words
- **HDA** - Historia da Doenca Atual: Timeline, characteristics, associated symptoms
- **AP** - Antecedentes Pessoais: Medical history, surgeries, chronic conditions
- **EF** - Exame Fisico: Physical examination findings
- **HD** - Hipotese Diagnostica: Diagnostic hypothesis based on findings
- **CD** - Conduta: Treatment plan and recommendations

### Red Flag Detection
Emergency indicators that require immediate attention:
- Cardiovascular: chest pain, dyspnea, syncope
- Neurological: sudden headache, focal deficits, altered consciousness
- Trauma: mechanism of injury, vital instability
- Infection: fever with toxemia, meningeal signs

## LGPD Privacy Requirements

### Data Handling
- Patient consent required before data collection
- Data minimization principle
- Encryption at rest and in transit
- Audit trail for all access
- Right to erasure (with medical record retention exceptions)

### Retention Policies
- Medical records: 20 years minimum (CFM requirement)
- Audit logs: 5 years minimum
- Session data: 24 hours after completion

## Medical Terminology Standards

### Professional Language
- Use formal medical terminology
- Avoid colloquialisms and slang
- Standardize abbreviations (use only approved ones)
- Include ICD-10 codes when relevant

### Approved Abbreviations
QP, HDA, AP, EF, HD, CD, FC, PA, FR, TAx, SpO2, IMC, IAM, AVC, TEP, etc.

---

## Implementation Patterns

### Checkbox to Narrative
Transform structured checkbox selections into professional medical text:
1. Group by category (QP, HDA, etc.)
2. Apply narrative templates
3. Validate completeness
4. Check red flags
5. Generate formatted output

### Output Modes
- **SUMMARY**: Concise documentation for quick review
- **DETAILED**: Complete documentation for legal/audit purposes
