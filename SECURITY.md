# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to the project maintainers. You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include in Your Report

Please include the following information in your report:

1. **Type of issue** (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
2. **Full paths of source file(s)** related to the manifestation of the issue
3. **Location of the affected source code** (tag/branch/commit or direct URL)
4. **Step-by-step instructions** to reproduce the issue
5. **Proof-of-concept or exploit code** (if possible)
6. **Impact of the issue**, including how an attacker might exploit it

### Security Best Practices for This Project

When contributing to or deploying this project, please follow these security guidelines:

1. **Environment Variables**: 
   - Never commit `.env` files or secrets to version control
   - Use `.env.example` as a template
   - Rotate keys regularly in production
   - Keep `SUPABASE_SERVICE_ROLE_KEY` and `OPENAI_API_KEY` strictly server-side

2. **Database Security**:
   - Always use connection pooling in production (`?pgbouncer=true`)
   - Enable SSL for database connections (`sslmode=require`)
   - Use prepared statements (Prisma handles this automatically)
   - Implement Row-Level Security (RLS) in Supabase

3. **Authentication**:
   - Leverage Supabase Auth built-in protections
   - Implement proper session management
   - Use HTTPS in production only
   - Enable CSRF protection

4. **API Security**:
   - Implement rate limiting for all API routes
   - Validate all input data with Zod schemas
   - Sanitize user inputs before database operations
   - Use proper CORS configuration

5. **Dependencies**:
   - Regularly run `pnpm audit` to check for vulnerabilities
   - Keep dependencies up to date
   - Review security advisories for critical packages
   - Use `pnpm audit fix` to automatically fix vulnerabilities when possible

6. **Medical Data Compliance**:
   - This system handles medical data - ensure HIPAA/LGPD compliance
   - Implement audit logging for all data access
   - Encrypt sensitive data at rest and in transit
   - Follow CFM (Conselho Federal de Medicina) guidelines for medical records

## Security Headers

The application should implement the following security headers in production:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';
```

## Known Security Considerations

### Medical Data Handling
- All patient data must be handled according to Brazilian LGPD and medical council regulations
- Implement proper audit trails for all data access and modifications
- Ensure data retention and deletion policies comply with regulations

### Third-Party Services
- **OpenAI API**: Patient data sent to OpenAI for chat features - review data processing agreement
- **Sentry**: Error tracking may contain sensitive context - configure data scrubbing
- **Vercel**: Ensure proper environment variable configuration in deployment

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release security patches as soon as possible

## Attribution

We appreciate security researchers who responsibly disclose vulnerabilities. With your permission, we will:
- Credit you in the security advisory
- Add you to our security hall of fame (if we create one)
- Provide a small token of appreciation for significant findings
