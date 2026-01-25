## Description

<!-- Provide a brief description of the changes in this PR -->

## Related Issue

<!-- Link to the issue this PR addresses -->
Closes #

## Type of Change

<!-- Mark the appropriate option with an "x" -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 Style/UI update (no functional changes)
- [ ] ♻️ Refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] ✅ Test update
- [ ] 🔧 Configuration change
- [ ] 🔒 Security update

## Changes Made

<!-- List the main changes made in this PR -->

- 
- 
- 

## Spec-Driven Development

<!-- If this PR implements a feature, link to the spec documents -->

- [ ] Spec exists in `specs/[feature-name]/spec.md`
- [ ] Plan generated in `specs/[feature-name]/plan.md`
- [ ] Tasks documented in `specs/[feature-name]/tasks.md`
- [ ] Implementation follows the spec and plan
- [ ] N/A - This is not a feature (bug fix, docs, etc.)

## Medical Compliance (CFM/LGPD)

<!-- ⚠️ REQUIRED if this PR affects medical features or data handling -->

- [ ] CFM Resolução 2.314/2022 reviewed (AI in medicine guidelines)
- [ ] LGPD Article 11 compliance assessed (sensitive personal data - health)
- [ ] Red flags detection validated (if applicable to clinical logic)
- [ ] Data retention policies followed (7-20 years for medical records)
- [ ] Audit trail implemented for medical data changes
- [ ] FHIR/TISS compatibility verified (if data model or export changed)
- [ ] Medical terminology accuracy verified (CID-10, CIAP-2 codes)
- [ ] N/A - No medical features or data affected

### Medical Data Changes

<!-- Describe any changes to medical data handling, storage, processing, or clinical logic -->

<!-- Example:
- Modified anamnesis template for cardiology (added chest pain red flags)
- Updated CFM compliance validator to check new mandatory fields
- Changed data retention period for deleted anamnesis records
-->

-

### Clinical Safety Review

<!-- ⚠️ CRITICAL: If red flags, clinical decision support, or patient safety features were modified -->

- [ ] Clinical logic changes reviewed by medical professional
- [ ] Red flag detection tested with clinical scenarios
- [ ] False positive/negative rates acceptable
- [ ] Emergency protocols not compromised
- [ ] N/A - No clinical safety implications

## Testing

<!-- Describe the tests you ran and how to reproduce them -->

### Test Coverage

- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing performed
- [ ] No tests needed (documentation, minor changes, etc.)

### Test Instructions

<!-- Provide step-by-step instructions for testing this PR -->

1. 
2. 
3. 

## Screenshots / Videos

<!-- If applicable, add screenshots or videos to demonstrate the changes -->

<!-- Before -->
<details>
<summary>Before</summary>

<!-- Add screenshots here -->

</details>

<!-- After -->
<details>
<summary>After</summary>

<!-- Add screenshots here -->

</details>

## Database Changes

<!-- If this PR includes database changes, describe them -->

- [ ] New migration created
- [ ] Seed data updated
- [ ] Data model documentation updated
- [ ] Migration tested locally
- [ ] No database changes

## Breaking Changes

<!-- List any breaking changes and migration steps -->

- [ ] No breaking changes
- [ ] Breaking changes (describe below)

<!-- If there are breaking changes, describe them and provide migration steps -->

## Checklist

<!-- Verify that you have completed the following -->

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
- [ ] I have checked my code and corrected any misspellings
- [ ] I have updated the README if needed
- [ ] Build passes locally (`pnpm build`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Formatting is correct (`pnpm format:check`)

## Security Considerations

<!-- If this PR has security implications, describe them -->

- [ ] No security implications
- [ ] Security review needed (describe below)

<!-- Describe security considerations if any -->

### Healthcare-Specific Security

<!-- ⚠️ REQUIRED if this PR handles PHI/PII or medical data -->

- [ ] PHI/PII data encrypted in transit (HTTPS enforced)
- [ ] PHI/PII data encrypted at rest (database encryption)
- [ ] Minimum necessary principle applied (data minimization)
- [ ] Access controls verified (RBAC for medical data)
- [ ] Sensitive data not logged or exposed in errors
- [ ] SQL injection prevention verified (Prisma ORM used)
- [ ] XSS prevention verified (input sanitization)
- [ ] CSRF protection verified (for state-changing operations)
- [ ] N/A - No healthcare data involved

### Privacy & Consent

- [ ] Patient consent requirements verified (LGPD Article 7)
- [ ] Data subject rights implemented (access, rectification, deletion)
- [ ] Data retention period documented and enforced
- [ ] Third-party data sharing documented (if applicable)
- [ ] N/A - No privacy implications

## Performance Considerations

<!-- If this PR affects performance, describe the impact -->

- [ ] No performance impact
- [ ] Performance tested (describe results below)

## Deployment Notes

<!-- Any special considerations for deployment -->

- [ ] Environment variables added/changed (update .env.example)
- [ ] Database migration required
- [ ] Third-party service configuration needed
- [ ] No special deployment steps

## Additional Context

<!-- Add any other context about the PR here -->

## Post-Merge Checklist

<!-- Tasks to complete after merging -->

- [ ] Update production environment variables (if needed)
- [ ] Run database migrations in staging/production
- [ ] Monitor error tracking (Sentry)
- [ ] Update documentation site (if applicable)
- [ ] Announce changes to team (if breaking changes)
