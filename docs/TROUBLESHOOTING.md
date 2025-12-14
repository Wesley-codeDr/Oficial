# Troubleshooting Guide

This guide covers common issues you might encounter while developing or deploying WellWave and their solutions.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Database Issues](#database-issues)
- [Build Issues](#build-issues)
- [Runtime Issues](#runtime-issues)
- [Authentication Issues](#authentication-issues)
- [Deployment Issues](#deployment-issues)
- [Testing Issues](#testing-issues)
- [Performance Issues](#performance-issues)

## Installation Issues

### pnpm command not found

**Problem**: `bash: pnpm: command not found`

**Solution**:
```bash
npm install -g pnpm
# or
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Dependencies installation fails

**Problem**: `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`

**Solution**:
```bash
# Remove node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Wrong Node version

**Problem**: Compatibility errors with Node.js version

**Solution**:
```bash
# Check your Node version (should be 18+)
node --version

# Use nvm to switch versions
nvm install 20
nvm use 20
```

## Database Issues

### Prisma Client not generated

**Problem**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
pnpm prisma generate
```

### Database connection refused

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# Make sure Docker is running
docker ps

# Start the database
./scripts/docker-db.sh start

# Or check if the database is using a different port
# Update DATABASE_URL in .env if needed
```

### Migration fails

**Problem**: `Error: P3009: Failed to create database`

**Solution**:
```bash
# Reset the database (WARNING: deletes all data)
pnpm db:reset

# Or manually drop and recreate
./scripts/docker-db.sh reset
pnpm prisma migrate dev
```

### Connection pool exhausted

**Problem**: `Error: Prepared statement already exists`

**Solution**:
```bash
# Add connection pooling to DATABASE_URL
# In production, use PgBouncer:
DATABASE_URL="postgresql://...?pgbouncer=true&connection_limit=1"
```

## Build Issues

### Build fails with TypeScript errors

**Problem**: `Type error: ...`

**Solution**:
```bash
# Run type check to see all errors
pnpm typecheck

# Check for missing type definitions
pnpm add -D @types/[package-name]
```

### Build fails with memory issues

**Problem**: `FATAL ERROR: Reached heap limit Allocation failed`

**Solution**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

### Prisma generate fails during build

**Problem**: `PrismaClientInitializationError`

**Solution**:
```bash
# Ensure DATABASE_URL is set
echo $DATABASE_URL

# Generate Prisma client before build
pnpm prisma generate
pnpm build
```

## Runtime Issues

### Environment variables not loaded

**Problem**: `undefined` values for environment variables

**Solution**:
```bash
# Check if .env file exists
ls -la .env

# For Next.js, restart dev server after .env changes
# CTRL+C then pnpm dev

# For client-side access, use NEXT_PUBLIC_ prefix
NEXT_PUBLIC_API_URL=https://...
```

### 404 on API routes

**Problem**: `404 Not Found` on `/api/*` endpoints

**Solution**:
- Check route file is named `route.ts` (not `index.ts`)
- Verify directory structure: `app/api/[endpoint]/route.ts`
- Restart development server
- Check Next.js logs for build errors

### Middleware not running

**Problem**: Middleware doesn't execute on routes

**Solution**:
```typescript
// middleware.ts
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### Session/Auth not persisting

**Problem**: User gets logged out on page refresh

**Solution**:
- Check Supabase configuration is correct
- Verify cookies are not being blocked
- Check browser console for errors
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set

## Authentication Issues

### Supabase Auth not working locally

**Problem**: Authentication fails in development

**Solution**:
```bash
# Check Supabase credentials
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Verify Supabase project settings
# - Email confirmation should be disabled for development
# - Check redirect URLs include http://localhost:3000
```

### JWT token expired

**Problem**: `Error: JWT expired`

**Solution**:
- This is expected after 1 hour (default)
- Implement token refresh logic
- Or reduce session duration in Supabase settings

### CORS errors

**Problem**: `Access-Control-Allow-Origin error`

**Solution**:
- Check Supabase CORS settings
- Add your domain to allowed origins
- In development, add `http://localhost:3000`

## Deployment Issues

### Vercel deployment fails

**Problem**: Build fails on Vercel

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify `pnpm` is selected as package manager
4. Check Node.js version matches locally

### Database migrations not applied

**Problem**: Production database schema out of sync

**Solution**:
```bash
# Use the Prisma migrations workflow
# In Vercel, add a build command:
pnpm prisma migrate deploy && pnpm build
```

### Environment variables not working in production

**Problem**: Features work locally but not in production

**Solution**:
- Check Vercel environment variable settings
- Ensure variables are set for Production environment
- Redeploy after adding new variables
- Verify NEXT_PUBLIC_ prefix for client-side variables

## Testing Issues

### E2E tests fail

**Problem**: Playwright tests timeout or fail

**Solution**:
```bash
# Install browsers
pnpm playwright install

# Run with headed mode to see what's happening
pnpm test:e2e:ui

# Increase timeout in playwright.config.ts
timeout: 60000,
```

### Tests can't connect to database

**Problem**: `Error: Can't reach database server`

**Solution**:
```bash
# Set test database URL
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test"

# Or use a separate test database
./scripts/docker-db.sh start
pnpm prisma migrate dev
```

### Mock issues with Vitest

**Problem**: Mocks not working as expected

**Solution**:
```typescript
// Use vi.mock before imports
vi.mock('@/lib/prisma', () => ({
  prisma: {
    // mock implementation
  }
}))
```

## Performance Issues

### Slow page loads

**Problem**: Pages take long to load

**Solution**:
1. Run bundle analyzer: `pnpm build:analyze`
2. Check for large dependencies
3. Use dynamic imports for heavy components
4. Optimize images with next/image

### Slow database queries

**Problem**: API endpoints respond slowly

**Solution**:
```bash
# Enable query logging in Prisma
# Add to schema.prisma
generator client {
  provider = "prisma-client-js"
  log = ["query", "info", "warn", "error"]
}

# Check for missing indexes
# Add indexes in schema.prisma:
@@index([field_name])
```

### Memory leaks in development

**Problem**: Dev server gets slow over time

**Solution**:
```bash
# Restart dev server regularly
# Or disable turbopack if issues persist:
pnpm next dev
```

## Getting More Help

If you're still experiencing issues:

1. **Check Documentation**
   - README.md
   - docs/DATABASE.md
   - docs/VERCEL.md
   - docs/ARCHITECTURE.md

2. **Search Issues**
   - Check [GitHub Issues](https://github.com/Wesley-codeDr/Oficial/issues)
   - Search for similar problems

3. **Ask for Help**
   - Open a new GitHub Issue
   - Include error messages and logs
   - Describe steps to reproduce

4. **Check Service Status**
   - [Vercel Status](https://www.vercel-status.com/)
   - [Supabase Status](https://status.supabase.com/)
   - [OpenAI Status](https://status.openai.com/)

## Quick Commands Reference

```bash
# Reset everything (nuclear option)
rm -rf node_modules .next pnpm-lock.yaml
pnpm install
./scripts/docker-db.sh reset
pnpm prisma migrate dev
pnpm dev

# Check system health
pnpm typecheck
pnpm lint
pnpm test
pnpm build

# Database operations
pnpm db:reset      # Reset database
pnpm db:seed       # Seed data
pnpm db:studio     # Open Prisma Studio

# Docker operations
./scripts/docker-db.sh status
./scripts/docker-db.sh logs
./scripts/docker-db.sh restart
```

## Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| P1001 | Can't reach database | Check DATABASE_URL and Docker |
| P2002 | Unique constraint failed | Check for duplicate data |
| P2025 | Record not found | Verify record exists |
| ECONNREFUSED | Connection refused | Start database service |
| ELIFECYCLE | Command failed | Check command syntax and dependencies |

## Known Issues

### Playwright on ARM64 Macs
- Some browsers may not work on M1/M2 Macs
- Use Chromium which has ARM64 support

### Turbopack Dev Issues
- If experiencing issues with Turbo, use: `next dev` instead of `next dev --turbo`

### Hot Reload Not Working
- Check if you have too many files open
- Restart dev server
- Check file system watcher limits on Linux
