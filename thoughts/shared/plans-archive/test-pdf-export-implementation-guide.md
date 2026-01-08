# Implementation Guide: Export Anamnesis to PDF

**Feature ID:** test-pdf-export
**Purpose**: Detailed code patterns and examples for Phase 4 implementation
**Created:** 2026-01-08

---

## Overview

This guide provides **exact code patterns** from the WellWave codebase to follow when implementing the PDF export feature. Use these patterns as templates to ensure consistency with the existing codebase.

---

## Table of Contents

1. [API Route Pattern](#api-route-pattern)
2. [Zod Validation Pattern](#zod-validation-pattern)
3. [Supabase Auth Pattern](#supabase-auth-pattern)
4. [TanStack Query Hook Pattern](#tanstack-query-hook-pattern)
5. [React Component Pattern](#react-component-pattern)
6. [Toast Notification Pattern](#toast-notification-pattern)
7. [Test Pattern](#test-pattern)
8. [Prisma Pattern](#prisma-pattern)

---

## 1. API Route Pattern

### Existing Pattern: `app/api/complaints/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { ComplaintListQuerySchema } from '@/lib/validation/complaints'

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Request Validation (Zod)
    const query = Object.fromEntries(request.nextUrl.searchParams.entries())
    const parsedQuery = ComplaintListQuerySchema.safeParse(query)

    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: 'Invalid query', details: parsedQuery.error.issues },
        { status: 400 }
      )
    }

    // 3. Business Logic
    const { limit = 100, offset = 0 } = parsedQuery.data

    const records = await prisma.chief_complaints.findMany({
      where: { is_active: true },
      skip: offset,
      take: limit,
    })

    // 4. Success Response
    return NextResponse.json({ data: records, total: records.length })

  } catch (error) {
    // 5. Error Handling
    console.error('Error listing complaints:', error)
    return NextResponse.json(
      { error: 'Failed to list complaints' },
      { status: 500 }
    )
  }
}
```

### Apply to PDF Export Route

**File**: `app/api/anamnese/export-pdf/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { ExportPdfRequestSchema } from '@/lib/validations/anamnese'
import { AnamnesisPdfDocument } from '@/lib/pdf/anamnesis-template'
import { renderToStream } from '@react-pdf/renderer'

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication
    const user = await getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      )
    }

    // 2. Request Validation (Zod)
    const body = await request.json()
    const { sessionId } = ExportPdfRequestSchema.parse(body)

    // 3. Fetch Session
    const session = await prisma.anamnesisSession.findUnique({
      where: { id: sessionId },
      include: { syndrome: true, user: true },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' }, 
        { status: 404 }
      )
    }

    // 4. Authorization
    if (session.userId !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' }, 
        { status: 403 }
      )
    }

    // 5. Generate PDF
    const pdfStream = await renderToStream(
      <AnamnesisPdfDocument session={session} />
    )

    // 6. Return PDF with headers
    const filename = `anamnesis-${session.syndrome.name.toLowerCase()}.pdf`

    return new Response(pdfStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })

  } catch (error) {
    // 7. Error Handling
    console.error('Error generating PDF:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'PDF generation failed' },
      { status: 500 }
    )
  }
}
```

---

## 2. Zod Validation Pattern

### Existing Pattern: `lib/validation/complaints.ts`

```typescript
import { z } from 'zod'

// Define schema
export const ComplaintListQuerySchema = z
  .object({
    limit: z.coerce.number().int().min(1).max(500).optional(),
    offset: z.coerce.number().int().min(0).optional(),
    group: z.enum([...]).optional(),
  })
  .strict()

// Infer TypeScript type
export type ComplaintListQuery = z.infer<typeof ComplaintListQuerySchema>

// Validate function
export function validateComplaintQuery(input: unknown) {
  return ComplaintListQuerySchema.safeParse(input)
}
```

### Apply to PDF Export

**File**: `lib/validations/anamnese.ts`

```typescript
import { z } from 'zod'

// Request schema
export const ExportPdfRequestSchema = z
  .object({
    sessionId: z.string().cuid('Invalid session ID format'),
  })
  .strict()

// Infer type
export type ExportPdfRequest = z.infer<typeof ExportPdfRequestSchema>
```

---

## 3. Supabase Auth Pattern

### Existing Pattern: `lib/supabase/server.ts`

```typescript
export async function getUser() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    throw new Error('UNAUTHORIZED')
  }
  return user
}
```

### Usage in API Route

```typescript
import { getUser } from '@/lib/supabase/server'

// Option 1: Check and return 401
const user = await getUser()
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

// Option 2: Require auth (throws error)
const user = await requireAuth()
```

---

## 4. TanStack Query Hook Pattern

### Existing Pattern: `hooks/use-complaints.ts`

```typescript
'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchComplaint, fetchComplaints } from '@/lib/services/complaints-api'

// Query Key
const complaintsQueryKey = (params?: any) => [
  'complaints',
  params?.group ?? null,
  params?.limit ?? null,
] as const

// Query Hook
export function useComplaints(params?: any) {
  return useQuery({
    queryKey: complaintsQueryKey(params),
    queryFn: () => fetchComplaints(params),
  })
}

// Mutation Hook
export function useComplaint() {
  return useMutation({
    mutationFn: (id: string) => fetchComplaint(id),
    onSuccess: (data) => {
      console.log('Success:', data)
    },
    onError: (error) => {
      console.error('Error:', error)
    },
  })
}
```

### Apply to PDF Export Hook

**File**: `components/anamnese/ExportPDFButton/useExportPdf.ts`

```typescript
'use client'

import { useMutation } from '@tanstack/react-query'
import type { ExportPdfRequest } from '@/lib/validations/anamnese'

interface ExportPdfParams {
  sessionId: string
}

export function useExportPdf() {
  return useMutation({
    mutationKey: ['export-pdf'],
    mutationFn: async ({ sessionId }: ExportPdfParams) => {
      const response = await fetch('/api/anamnese/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to export PDF')
      }

      // Download PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'anamnesis.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
  })
}
```

---

## 5. React Component Pattern

### Existing Pattern: `components/anamnese/copy-button.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant={copied ? 'default' : 'outline'}
      size="sm"
      onClick={handleCopy}
      disabled={!text}
      className={cn(copied && 'bg-green-600 hover:bg-green-600', className)}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Copiar
        </>
      )}
    </Button>
  )
}
```

### Apply to ExportPDFButton

**File**: `components/anamnese/ExportPDFButton/ExportPDFButton.tsx`

```typescript
'use client'

import { FileDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useExportPdf } from './useExportPdf'
import { useToast } from '@/hooks/use-toast'

interface ExportPDFButtonProps {
  sessionId: string
  syndrome: string
  disabled?: boolean
}

export function ExportPDFButton({ 
  sessionId, 
  syndrome, 
  disabled = false 
}: ExportPDFButtonProps) {
  const { mutate: exportPdf, isPending } = useExportPdf()
  const { toast } = useToast()

  const handleExport = () => {
    exportPdf({ sessionId }, {
      onSuccess: () => {
        toast({
          title: 'Sucesso',
          description: 'PDF exportado com sucesso!',
        })
      },
      onError: (error: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: error.message || 'Erro ao exportar PDF',
        })
      },
    })
  }

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isPending}
      variant="outline"
      size="default"
      aria-label="Exportar anamnese como PDF"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Gerando PDF...
        </>
      ) : (
        <>
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </>
      )}
    </Button>
  )
}
```

---

## 6. Toast Notification Pattern

### Existing Pattern: `hooks/use-toast.ts`

```typescript
'use client'

import * as React from 'react'

export function useToast() {
  const [state, setState] = React.useState({ toasts: [] })

  const toast = ({ title, description, variant = 'default' }) => {
    // Dispatch toast action
  }

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => { /* ... */ },
  }
}
```

### Usage in Component

```typescript
import { useToast } from '@/hooks/use-toast'

export function MyComponent() {
  const { toast } = useToast()

  const handleSuccess = () => {
    toast({
      title: 'Sucesso',
      description: 'Operação realizada com sucesso!',
    })
  }

  const handleError = (error: Error) => {
    toast({
      variant: 'destructive',
      title: 'Erro',
      description: error.message || 'Algo deu errado.',
    })
  }

  return <Button onClick={handleSuccess}>Click me</Button>
}
```

---

## 7. Test Pattern

### Existing Pattern: `tests/unit/generate-narrative.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { generateNarrative } from '@/lib/anamnese/generate-narrative'

// Test data factory
const createCheckbox = (overrides = {}) => ({
  id: overrides.id || 'cb-1',
  category: overrides.category || 'QP',
  displayText: overrides.displayText || 'Test symptom',
  narrativeText: overrides.narrativeText || 'test narrative',
  isRedFlag: overrides.isRedFlag || false,
})

describe('generateNarrative', () => {
  it('should return empty string when no checkboxes selected', () => {
    const result = generateNarrative([], 'SUMMARY')
    expect(result).toBe('')
  })

  it('should generate summary text for single checkbox', () => {
    const checkboxes = [
      createCheckbox({
        narrativeText: 'dor precordial',
      }),
    ]

    const result = generateNarrative(checkboxes, 'SUMMARY')

    expect(result).toContain('dor precordial')
  })
})
```

### Apply to API Route Tests

**File**: `app/api/anamnese/export-pdf/route.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { POST } from './route'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'

// Mock dependencies
vi.mock('@/lib/db/prisma')
vi.mock('@/lib/supabase/server')
vi.mock('@/lib/pdf/anamnesis-template')

describe('POST /api/anamnese/export-pdf', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 401 when user is not authenticated', async () => {
    vi.mocked(getUser).mockResolvedValue(null)

    const request = new Request('http://localhost:3000/api/anamnese/export-pdf', {
      method: 'POST',
      body: JSON.stringify({ sessionId: 'test-id' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Authentication required')
  })

  it('should return 400 for invalid request body', async () => {
    vi.mocked(getUser).mockResolvedValue({ id: 'user-1' })

    const request = new Request('http://localhost:3000/api/anamnese/export-pdf', {
      method: 'POST',
      body: JSON.stringify({ invalid: 'data' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid request body')
  })

  it('should return 404 for non-existent session', async () => {
    vi.mocked(getUser).mockResolvedValue({ id: 'user-1' })
    vi.mocked(prisma.anamnesisSession.findUnique).mockResolvedValue(null)

    const request = new Request('http://localhost:3000/api/anamnese/export-pdf', {
      method: 'POST',
      body: JSON.stringify({ sessionId: 'cltest123' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.error).toBe('Session not found')
  })

  it('should return 403 for unauthorized session access', async () => {
    vi.mocked(getUser).mockResolvedValue({ id: 'user-1' })
    vi.mocked(prisma.anamnesisSession.findUnique).mockResolvedValue({
      id: 'cltest123',
      userId: 'user-2', // Different user
      syndrome: { name: 'Dor Torácica' },
    })

    const request = new Request('http://localhost:3000/api/anamnese/export-pdf', {
      method: 'POST',
      body: JSON.stringify({ sessionId: 'cltest123' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.error).toBe('Access denied')
  })
})
```

### Apply to Component Tests

**File**: `components/anamnese/ExportPDFButton/ExportPDFButton.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ExportPDFButton } from './ExportPDFButton'
import { useExportPdf } from './useExportPdf'

vi.mock('./useExportPdf')

describe('ExportPDFButton', () => {
  const mockExportPdf = vi.fn()

  beforeEach(() => {
    vi.mocked(useExportPdf).mockReturnValue({
      mutate: mockExportPdf,
      isPending: false,
    })
  })

  it('should render button with correct text and icon', () => {
    render(
      <ExportPDFButton sessionId="test-id" syndrome="Dor Torácica" />
    )

    expect(screen.getByText('Exportar PDF')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Exportar anamnese como PDF'
    )
  })

  it('should call exportPdf when clicked', () => {
    render(
      <ExportPDFButton sessionId="test-id" syndrome="Dor Torácica" />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockExportPdf).toHaveBeenCalledWith(
      { sessionId: 'test-id' },
      expect.any(Object)
    )
  })

  it('should show loading state when exporting', () => {
    vi.mocked(useExportPdf).mockReturnValue({
      mutate: mockExportPdf,
      isPending: true,
    })

    render(
      <ExportPDFButton sessionId="test-id" syndrome="Dor Torácica" />
    )

    expect(screen.getByText('Gerando PDF...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

---

## 8. Prisma Pattern

### Existing Query Pattern

```typescript
import { prisma } from '@/lib/db/prisma'

// Find unique with relations
const session = await prisma.anamnesisSession.findUnique({
  where: { id: sessionId },
  include: { 
    syndrome: true, 
    user: true,
  },
})

// Find many with filters
const sessions = await prisma.anamnesisSession.findMany({
  where: { 
    userId: user.id,
    createdAt: { gte: startDate },
  },
  include: { syndrome: true },
  orderBy: { createdAt: 'desc' },
  take: 10,
})
```

### Apply to PDF Export

```typescript
const session = await prisma.anamnesisSession.findUnique({
  where: { id: sessionId },
  include: { 
    syndrome: { select: { name: true } },
    user: { select: { email: true } },
  },
})

if (!session) {
  return NextResponse.json(
    { error: 'Session not found' }, 
    { status: 404 }
  )
}
```

---

## Import Paths Reference

| Purpose | Path |
|---------|------|
| Prisma Client | `@/lib/db/prisma` |
| Supabase Auth | `@/lib/supabase/server` |
| UI Components | `@/components/ui/button`, `@/components/ui/toast` |
| Validation | `@/lib/validations/[name]` |
| Utilities | `@/lib/utils` |
| Icons | `lucide-react` |
| Hooks | `@/hooks/use-toast`, `@/hooks/use-[name]` |
| TanStack Query | `@tanstack/react-query` |

---

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| API Routes | `app/api/[resource]/[action]/route.ts` | `app/api/anamnese/export-pdf/route.ts` |
| Components | `components/[domain]/[Component]/[Component].tsx` | `components/anamnese/ExportPDFButton/ExportPDFButton.tsx` |
| Hooks | `hooks/use-[name].ts` | `hooks/use-export-pdf.ts` |
| Utils | `lib/[category]/[name].ts` | `lib/pdf/anamnesis-template.tsx` |
| Tests | `[file].test.ts` or `[file].test.tsx` | `route.test.ts`, `ExportPDFButton.test.tsx` |

---

## Common Patterns Summary

### Error Handling
```typescript
try {
  // Operation
} catch (error) {
  console.error('Error:', error)
  return NextResponse.json(
    { error: 'User-friendly message' },
    { status: 500 }
  )
}
```

### Response Format
```typescript
// Success
return NextResponse.json({ data: result }, { status: 200 })

// Error
return NextResponse.json({ error: message }, { status: code })
```

### Async/Await
```typescript
export async function POST(request: NextRequest) {
  const user = await getUser()
  const session = await prisma.anamnesisSession.findUnique(...)
  
  // Always use await for async operations
}
```

---

## Next Steps

1. **Copy patterns** from this guide into your implementation files
2. **Follow file structure** defined in tasks.md
3. **Run tests** after each task: `pnpm vitest run`
4. **Fix until tests pass** (validation loop)
5. **Deploy** to verify

---

**Good luck with Phase 4 implementation!** 🚀

---

**Document Created**: 2026-01-08  
**Total Patterns**: 8  
**Status**: Ready for use
