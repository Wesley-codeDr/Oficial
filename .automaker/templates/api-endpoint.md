# API Endpoint Template

## Endpoint: {{name}}

### Route Configuration
- **Path**: `/api/{{path}}`
- **Methods**: {{methods}}
- **Auth Required**: {{auth}}

### Security Checklist
- [ ] Input validation with Zod
- [ ] SQL injection prevention (Prisma ORM)
- [ ] Rate limiting configured
- [ ] CORS headers set
- [ ] Auth middleware applied
- [ ] Audit logging enabled

### Request Schema

```typescript
const requestSchema = z.object({
  // Define schema
})
```

### Response Schema

```typescript
const responseSchema = z.object({
  // Define schema
})
```

### Error Handling
- [ ] Proper HTTP status codes
- [ ] Consistent error format
- [ ] No sensitive data in errors
- [ ] Logging configured

### Testing
- [ ] Happy path tests
- [ ] Error case tests
- [ ] Auth tests
- [ ] Rate limit tests

---

## Implementation Notes

{{notes}}
