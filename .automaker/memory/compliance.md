---
tags: [compliance, security, audit, lgpd, cfm]
summary: Compliance and security patterns for healthcare applications
relevantTo: [security, audit, privacy, data, legal]
importance: 0.9
relatedFiles: [lib/medical/cfmCompliance.ts, prisma/schema.prisma]
usageStats:
  loaded: 16
  referenced: 8
  successfulFeatures: 8
---
# Compliance Patterns

Security and regulatory compliance patterns for WellWave.

---

## Security Checklist

### Input Validation
- [ ] Zod schemas for all API inputs
- [ ] SQL injection prevention (Prisma ORM only)
- [ ] XSS prevention (React automatic escaping)
- [ ] CSRF tokens on mutations

### Authentication
- [ ] Supabase Auth integration
- [ ] Session management
- [ ] Role-based access control (RBAC)
- [ ] CRM validation for medical users

### Data Protection
- [ ] Encryption at rest (database)
- [ ] Encryption in transit (HTTPS)
- [ ] Sensitive data masking in logs
- [ ] Audit trail for all operations

## Audit Logging Pattern

```typescript
// Always log medical operations
await createAuditLog({
  userId: session.user.id,
  action: 'ANAMNESE_CREATED',
  resourceType: 'AnamneseSession',
  resourceId: session.id,
  metadata: {
    syndromeId,
    redFlagsDetected: redFlags.length > 0
  },
  ipAddress: request.ip
})
```

## Rate Limiting

- API endpoints: 100 requests/minute
- Auth endpoints: 10 requests/minute
- Export endpoints: 10 requests/hour
- AI endpoints: 30 requests/minute

## Error Handling

### Never expose:
- Stack traces in production
- Database structure
- Internal IDs
- User enumeration hints

### Always include:
- Request ID for debugging
- Generic user-friendly message
- Proper HTTP status codes
