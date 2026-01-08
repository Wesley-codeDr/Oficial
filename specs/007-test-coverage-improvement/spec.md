# Specification: Test Coverage Improvement

**Feature ID:** 007
**Created:** 2026-01-08
**Status:** Draft
**Version:** 1.0.0
**Author:** Development Team
**Last Updated:** 2026-01-08

> **Spec-Kit Compliance:** This specification follows the [GitHub Spec-Kit](https://github.com/github/spec-kit) standards for Spec-Driven Development.

---

## Overview

This specification defines a comprehensive plan to improve the test coverage of the Wavewell Oficial codebase from the current ~4% to a target of 70%+ for critical paths.

### Problem Statement

The current test coverage is critically low:
- **Unit tests**: 7.3% coverage (4 of 55 lib modules)
- **Component tests**: 0% coverage (0 of 90 components)
- **API route tests**: 0% coverage (0 of 8 routes)
- **E2E tests**: 50% functional (13 tests skipped due to missing auth fixture)

This poses significant risks:
1. **Patient Safety**: Red flag detection system is untested
2. **Security**: Authentication module has no tests
3. **Reliability**: Core features may break without detection
4. **Maintainability**: Refactoring is risky without test safety net

### Proposed Solution

Implement a phased testing strategy:
1. **Phase 1**: Unblock E2E tests with authentication fixture
2. **Phase 2**: Add unit tests for critical business logic
3. **Phase 3**: Add API route integration tests
4. **Phase 4**: Add React component tests

### Goals

- [ ] Achieve 70%+ coverage for critical business logic (auth, red flags, chat)
- [ ] Achieve 50%+ coverage for all library modules
- [ ] Implement all 13 currently skipped E2E tests
- [ ] Add component tests for 15+ critical UI components
- [ ] Establish CI/CD coverage thresholds

### Non-Goals

- 100% coverage (diminishing returns)
- Testing static data files (`data/*.ts`)
- Visual regression testing (can be added later)
- Performance/load testing (separate initiative)

---

## User Stories

### User Story 1: Developer Confidence

**As a** developer,
**I want to** have comprehensive test coverage,
**So that** I can refactor and add features without fear of breaking existing functionality.

**Acceptance Criteria:**
- [ ] Running `pnpm test` catches regressions
- [ ] Coverage report shows 70%+ for critical paths
- [ ] Tests run in CI/CD pipeline

### User Story 2: Patient Safety Assurance

**As a** medical professional using the system,
**I want to** trust that red flag detection works correctly,
**So that** I don't miss critical patient symptoms.

**Acceptance Criteria:**
- [ ] Red flag detector has 90%+ test coverage
- [ ] All known red flag patterns have test cases
- [ ] False positive/negative rates are documented

### User Story 3: Authentication Security

**As a** system administrator,
**I want to** know authentication is thoroughly tested,
**So that** patient data remains secure.

**Acceptance Criteria:**
- [ ] All auth flows have integration tests
- [ ] Rate limiting is tested
- [ ] Password validation is tested
- [ ] Session management is tested

### User Story 4: E2E User Journeys

**As a** QA engineer,
**I want to** run complete user journey tests,
**So that** I can verify the system works end-to-end.

**Acceptance Criteria:**
- [ ] Login → Anamnese → Chat flow is tested
- [ ] All 13 skipped tests are implemented
- [ ] Tests run against multiple browsers

---

## Requirements

### Functional Requirements

**FR-001:** Authentication Testing
- Description: Comprehensive tests for authentication module
- Input: User credentials, tokens, sessions
- Output: Test results covering login, register, password reset, rate limiting
- Priority: Must

**FR-002:** Red Flag Detection Testing
- Description: Tests for medical red flag pattern matching
- Input: Clinical symptoms and checkbox data
- Output: Correct red flag identification with known test cases
- Priority: Must

**FR-003:** Chat API Testing
- Description: Integration tests for conversation management
- Input: API requests for CRUD operations
- Output: Correct responses, error handling, data persistence
- Priority: Must

**FR-004:** Complaint Search Testing
- Description: Tests for fuzzy search and filtering
- Input: Search queries, filter parameters
- Output: Accurate search results, correct ordering
- Priority: Should

**FR-005:** E2E Authentication Fixture
- Description: Playwright fixture for authenticated tests
- Input: Test user credentials
- Output: Authenticated browser context for E2E tests
- Priority: Must

**FR-006:** Component Testing Infrastructure
- Description: Setup for React component unit tests
- Input: Component props, user interactions
- Output: Rendered output, event handling verification
- Priority: Should

**FR-007:** API Route Testing
- Description: Integration tests for all 8 API routes
- Input: HTTP requests with various payloads
- Output: Correct responses, status codes, error handling
- Priority: Should

**FR-008:** Validation Schema Testing
- Description: Tests for Zod validation schemas
- Input: Valid and invalid data
- Output: Correct validation results, error messages
- Priority: Should

### Non-Functional Requirements

**NFR-001:** Performance
- Test suite runs in < 5 minutes for unit tests
- E2E suite runs in < 15 minutes
- No flaky tests (retry tolerance < 1%)

**NFR-002:** Maintainability
- Tests follow AAA pattern (Arrange, Act, Assert)
- Test files co-located with source or in `tests/` directory
- Mocks are reusable and well-documented

**NFR-003:** CI/CD Integration
- Tests run on every PR
- Coverage reports generated automatically
- Minimum coverage thresholds enforced

**NFR-004:** Documentation
- Test patterns documented in TESTING.md
- Mock setup instructions provided
- Coverage report interpretation guide

---

## Constraints & Assumptions

### Technical Constraints

- Vitest for unit/integration tests (already configured)
- Playwright for E2E tests (already configured)
- Must work with Next.js App Router
- Must mock Supabase and Prisma for isolation

### Business Constraints

- Tests must not slow down development velocity
- Focus on high-risk areas first
- Balance coverage with implementation effort

### Assumptions

- Test database can be mocked (no real DB in tests)
- AI/LLM responses can be mocked
- Authentication tokens can be generated for testing

---

## Dependencies

### External Dependencies

| Dependency | Purpose | Version | Status |
|------------|---------|---------|--------|
| Vitest | Unit testing | 4.0.16 | Installed |
| Playwright | E2E testing | 1.57.0 | Installed |
| @testing-library/react | Component testing | 16.3.1 | Installed |
| @testing-library/jest-dom | DOM matchers | 6.9.1 | Installed |
| msw | API mocking | TBD | Required |

### Internal Dependencies

| Feature/System | Description | Status |
|----------------|-------------|--------|
| Authentication | Must understand auth flow | Complete |
| Database schema | Must understand data model | Complete |
| API routes | Must understand endpoints | Complete |

---

## Test Architecture

### Directory Structure

```
tests/
├── setup.ts                    # Global test setup
├── fixtures/
│   ├── auth.ts                 # Auth fixture for E2E
│   ├── database.ts             # DB mocking utilities
│   └── ai.ts                   # AI response mocks
├── mocks/
│   ├── prisma.ts               # Prisma client mock
│   ├── supabase.ts             # Supabase client mock
│   └── openai.ts               # OpenAI SDK mock
├── unit/
│   ├── auth/
│   │   └── actions.test.ts     # Auth actions tests
│   ├── anamnese/
│   │   ├── red-flag-detector.test.ts
│   │   └── narrative-templates.test.ts
│   ├── services/
│   │   ├── complaintSearch.test.ts
│   │   └── extraction.test.ts
│   └── validation/
│       ├── complaints.test.ts
│       └── ebm.test.ts
├── integration/
│   ├── api/
│   │   ├── chat.test.ts
│   │   ├── complaints.test.ts
│   │   └── health.test.ts
│   └── db/
│       └── complaints.test.ts
├── components/
│   ├── auth/
│   │   ├── login-form.test.tsx
│   │   └── register-form.test.tsx
│   ├── chat/
│   │   ├── chat-interface.test.tsx
│   │   └── message-bubble.test.tsx
│   └── medical/
│       ├── red-flag-alert.test.tsx
│       └── heart-score-calculator.test.tsx
└── e2e/
    ├── auth.spec.ts            # Existing + enhanced
    ├── anamnese.spec.ts        # Unblock skipped tests
    ├── chat.spec.ts            # Unblock skipped tests
    └── complete-flow.spec.ts   # Full user journey
```

### Mocking Strategy

```typescript
// tests/mocks/prisma.ts
import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

export const prismaMock = mockDeep<PrismaClient>()

// tests/mocks/supabase.ts
export const supabaseMock = {
  auth: {
    getUser: vi.fn(),
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
  },
  from: vi.fn(() => ({
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  })),
}

// tests/fixtures/auth.ts (Playwright)
import { test as base } from '@playwright/test'

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    // Set auth cookies/tokens
    await page.context().addCookies([
      { name: 'sb-access-token', value: 'test-token', domain: 'localhost', path: '/' }
    ])
    await use(page)
  },
})
```

---

## Phase 1: E2E Authentication Fixture

### Objective
Unblock 13 skipped E2E tests by creating authentication fixture.

### Test Cases to Implement

| Test File | Test Name | Status |
|-----------|-----------|--------|
| anamnese.spec.ts | Should display syndrome selection | Skipped → Implement |
| anamnese.spec.ts | Should display checkboxes for selected syndrome | Skipped → Implement |
| anamnese.spec.ts | Should generate narrative from checkboxes | Skipped → Implement |
| anamnese.spec.ts | Should detect and display red flags | Skipped → Implement |
| anamnese.spec.ts | Should switch between output modes | Skipped → Implement |
| anamnese.spec.ts | Should copy text to clipboard | Skipped → Implement |
| anamnese.spec.ts | Should save session to history | Skipped → Implement |
| chat.spec.ts | Should display chat list | Skipped → Implement |
| chat.spec.ts | Should create new conversation | Skipped → Implement |
| chat.spec.ts | Should show medical disclaimer | Skipped → Implement |
| chat.spec.ts | Should send message and receive AI response | Skipped → Implement |
| chat.spec.ts | Should display typing indicator | Skipped → Implement |
| chat.spec.ts | Should show citations | Skipped → Implement |

### Implementation

```typescript
// tests/fixtures/auth.ts
import { test as base, Page, BrowserContext } from '@playwright/test'

type AuthFixtures = {
  authenticatedContext: BrowserContext
  authenticatedPage: Page
}

export const test = base.extend<AuthFixtures>({
  authenticatedContext: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: {
        cookies: [
          {
            name: 'sb-localhost-auth-token',
            value: JSON.stringify({
              access_token: 'test-access-token',
              refresh_token: 'test-refresh-token',
              user: {
                id: 'test-user-id',
                email: 'test@example.com',
                role: 'authenticated'
              }
            }),
            domain: 'localhost',
            path: '/',
          }
        ],
        origins: []
      }
    })
    await use(context)
    await context.close()
  },

  authenticatedPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage()
    await use(page)
  },
})

export { expect } from '@playwright/test'
```

---

## Phase 2: Critical Unit Tests

### 2.1 Authentication Module (`lib/auth/actions.ts`)

**Target Coverage:** 80%+

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Login validation | Valid/invalid credentials | Must |
| Register validation | Email format, password strength | Must |
| Password reset flow | Token generation, validation | Must |
| Rate limiting | Block after N failed attempts | Must |
| Session management | Token refresh, expiry | Should |
| Zod schema validation | All auth schemas | Must |

```typescript
// tests/unit/auth/actions.test.ts
describe('Authentication Actions', () => {
  describe('login', () => {
    it('should validate email format', async () => {
      const result = await login({ email: 'invalid', password: 'test' })
      expect(result.error).toContain('email')
    })

    it('should enforce minimum password length', async () => {
      const result = await login({ email: 'test@test.com', password: '123' })
      expect(result.error).toContain('password')
    })

    it('should rate limit after 5 failed attempts', async () => {
      for (let i = 0; i < 5; i++) {
        await login({ email: 'test@test.com', password: 'wrong' })
      }
      const result = await login({ email: 'test@test.com', password: 'wrong' })
      expect(result.error).toContain('rate limit')
    })
  })

  describe('register', () => {
    it('should require strong password', async () => {
      const result = await register({
        email: 'test@test.com',
        password: 'weak',
        confirmPassword: 'weak'
      })
      expect(result.error).toContain('password')
    })

    it('should validate password confirmation', async () => {
      const result = await register({
        email: 'test@test.com',
        password: 'Strong123!',
        confirmPassword: 'Different123!'
      })
      expect(result.error).toContain('match')
    })
  })
})
```

### 2.2 Red Flag Detection (`lib/anamnese/red-flag-detector.ts`)

**Target Coverage:** 90%+ (Patient Safety Critical)

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Pattern matching | All known red flag patterns | Must |
| Synonym handling | Medical term synonyms | Must |
| False positives | Common benign patterns | Must |
| False negatives | Known edge cases | Must |
| Severity scoring | Correct severity assignment | Should |
| Localization | Portuguese medical terms | Must |

```typescript
// tests/unit/anamnese/red-flag-detector.test.ts
describe('Red Flag Detector', () => {
  describe('detectRedFlags', () => {
    it('should detect "dor torácica" as cardiac red flag', () => {
      const result = detectRedFlags(['dor torácica intensa'])
      expect(result).toContainEqual(
        expect.objectContaining({
          category: 'cardiac',
          severity: 'high'
        })
      )
    })

    it('should detect "cefaleia súbita" as neurological red flag', () => {
      const result = detectRedFlags(['cefaleia de início súbito'])
      expect(result).toContainEqual(
        expect.objectContaining({
          category: 'neurological',
          severity: 'high'
        })
      )
    })

    it('should NOT flag "dor muscular leve" as red flag', () => {
      const result = detectRedFlags(['dor muscular leve após exercício'])
      expect(result).toHaveLength(0)
    })

    // Test all 48 EBM complaints have proper red flag mappings
    describe('EBM complaint coverage', () => {
      const ebmComplaints = [
        'Dor Torácica',
        'Dispneia',
        'Cefaleia',
        // ... all 48 complaints
      ]

      ebmComplaints.forEach(complaint => {
        it(`should have red flags defined for "${complaint}"`, () => {
          const config = getRedFlagConfig(complaint)
          expect(config).toBeDefined()
          expect(config.patterns.length).toBeGreaterThan(0)
        })
      })
    })
  })
})
```

### 2.3 Complaint Search Service (`lib/services/complaintSearchService.ts`)

**Target Coverage:** 70%+

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Exact match | Find by exact name | Must |
| Fuzzy match | Typo tolerance | Must |
| Synonym search | Medical synonyms | Should |
| Category filter | Filter by category | Should |
| Sorting | Relevance, alphabetical | Should |
| Edge cases | Empty query, special chars | Must |

```typescript
// tests/unit/services/complaintSearch.test.ts
describe('Complaint Search Service', () => {
  describe('search', () => {
    it('should find exact match', () => {
      const results = searchComplaints('Dor Torácica')
      expect(results[0].name).toBe('Dor Torácica')
    })

    it('should handle typos with fuzzy matching', () => {
      const results = searchComplaints('Dor Toracica') // missing accent
      expect(results[0].name).toBe('Dor Torácica')
    })

    it('should find by synonym', () => {
      const results = searchComplaints('chest pain')
      expect(results).toContainEqual(
        expect.objectContaining({ name: 'Dor Torácica' })
      )
    })

    it('should return empty array for no matches', () => {
      const results = searchComplaints('xyznonexistent')
      expect(results).toHaveLength(0)
    })
  })
})
```

---

## Phase 3: API Route Testing

### Routes to Test

| Route | Method | Description | Priority |
|-------|--------|-------------|----------|
| `/api/chat/conversations` | GET | List conversations | Must |
| `/api/chat/conversations` | POST | Create conversation | Must |
| `/api/chat/conversations/[id]` | DELETE | Delete conversation | Must |
| `/api/chat/conversations/[id]/messages` | GET | Get messages | Must |
| `/api/chat/conversations/[id]/messages` | POST | Send message | Must |
| `/api/complaints` | GET | List complaints | Should |
| `/api/complaints/[id]` | GET | Get complaint | Should |
| `/api/health` | GET | Health check | Should |

```typescript
// tests/integration/api/chat.test.ts
import { createMocks } from 'node-mocks-http'

describe('Chat API', () => {
  describe('POST /api/chat/conversations', () => {
    it('should create a new conversation', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { title: 'Test Conversation' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(201)
      expect(JSON.parse(res._getData())).toHaveProperty('id')
    })

    it('should require authentication', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { title: 'Test' },
        headers: {} // No auth header
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(401)
    })
  })

  describe('POST /api/chat/conversations/[id]/messages', () => {
    it('should send a message and get AI response', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        query: { id: 'test-conversation-id' },
        body: { content: 'What are the red flags for chest pain?' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toHaveProperty('response')
    })
  })
})
```

---

## Phase 4: Component Testing

### Components to Test

| Component | Priority | Test Focus |
|-----------|----------|------------|
| `login-form.tsx` | Must | Form validation, submission |
| `register-form.tsx` | Must | Validation, password strength |
| `chat-interface.tsx` | Must | Message display, sending |
| `message-bubble.tsx` | Should | Rendering, citations |
| `AutoRedFlagAlert.tsx` | Must | Alert display, severity |
| `HeartScoreCalculator.tsx` | Must | Calculation accuracy |
| `AnamnesisView.tsx` | Should | Checkbox handling |
| `ComplaintDetailPanel.tsx` | Should | Data display |
| `GlassPanel.tsx` | Could | Visual rendering |

```typescript
// tests/components/auth/login-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '@/components/auth/login-form'

describe('LoginForm', () => {
  it('should render email and password fields', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('should show validation error for invalid email', async () => {
    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' }
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
    })
  })

  it('should call onSubmit with valid credentials', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })
})

// tests/components/medical/heart-score-calculator.test.tsx
describe('HeartScoreCalculator', () => {
  it('should calculate correct HEART score', () => {
    render(<HeartScoreCalculator />)

    // Select all high-risk options
    fireEvent.click(screen.getByLabelText(/highly suspicious/i))
    fireEvent.click(screen.getByLabelText(/significant ST depression/i))
    fireEvent.click(screen.getByLabelText(/age >= 65/i))
    fireEvent.click(screen.getByLabelText(/3 or more risk factors/i))
    fireEvent.click(screen.getByLabelText(/elevated troponin/i))

    expect(screen.getByText(/score: 10/i)).toBeInTheDocument()
    expect(screen.getByText(/high risk/i)).toBeInTheDocument()
  })

  it('should show low risk for score 0-3', () => {
    render(<HeartScoreCalculator />)

    // Select all low-risk options
    fireEvent.click(screen.getByLabelText(/non-specific/i))
    fireEvent.click(screen.getByLabelText(/normal/i))
    fireEvent.click(screen.getByLabelText(/age < 45/i))
    fireEvent.click(screen.getByLabelText(/no risk factors/i))
    fireEvent.click(screen.getByLabelText(/normal troponin/i))

    expect(screen.getByText(/low risk/i)).toBeInTheDocument()
  })
})
```

---

## Success Criteria

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Overall coverage | ~4% | 50%+ | Pending |
| Critical path coverage | ~10% | 70%+ | Pending |
| E2E tests passing | 50% | 100% | Pending |
| Skipped tests | 13 | 0 | Pending |
| Component tests | 0 | 15+ | Pending |
| API route tests | 0 | 8 | Pending |

### Definition of Done

- [ ] All 13 skipped E2E tests implemented and passing
- [ ] Authentication module has 80%+ coverage
- [ ] Red flag detector has 90%+ coverage
- [ ] All 8 API routes have integration tests
- [ ] 15+ critical components have unit tests
- [ ] CI/CD enforces minimum coverage thresholds
- [ ] TESTING.md documentation created

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Flaky tests | High | Medium | Use stable selectors, proper waits |
| Slow test suite | Medium | Medium | Parallel execution, selective testing |
| Mock complexity | Medium | High | Well-documented mock utilities |
| Auth token issues | High | Medium | Proper fixture isolation |
| AI response variability | Medium | Low | Mock AI responses in tests |

---

## Open Questions

- [x] Which auth token format does Supabase use? → JWT in cookies
- [ ] Should we use real database for integration tests?
- [ ] What's the acceptable E2E test runtime threshold?
- [ ] Should red flag tests use production patterns or test data?

---

## References

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [Existing test files](../tests/)
- [Coverage analysis report](./analysis.md)

---

## Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-08 | 1.0.0 | Initial specification | Development Team |
