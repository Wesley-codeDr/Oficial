# Padrões de Código - WellWave

## Visão Geral

Este documento define os padrões de código e convenções que devem ser seguidos no projeto WellWave.

## Princípios Fundamentais

### 1. Clareza acima de tudo

Código deve ser legível e compreensível:
- Use nomes descritivos
- Evite abreviações não-obvias
- Escreva código que conta uma história
- Comente apenas quando necessário

### 2. Consistência

Siga padrões estabelecidos:
- Use estilos consistentes em todo o código
- Siga convenções da linguagem/framework
- Use padrões de projeto conhecidos

### 3. Simplicidade

Mantenha o código simples:
- Evite over-engineering
- Prefer soluções diretas
- Evite abstrações desnecessárias

## Padrões TypeScript

### Tipagem

```typescript
// ✅ BOM - Tipagem explícita
function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

// ❌ RUIM - Tipo any
function calculateTotal(price: any, quantity: any): any {
  return price * quantity
}

// ✅ BOM - Interfaces para objetos
interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

// ❌ RUIM - Tipo inline complexo
function processUser(user: { id: string; name: string; email: string; createdAt: Date }) {
  // ...
}
```

### Enums vs Const Objects

```typescript
// ✅ BOM - Const objects
const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const

type UserRole = typeof UserRole[keyof typeof UserRole]

// ❌ EVITAR - Enums
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}
```

### Tipos Genéricos

```typescript
// ✅ BOM - Generics bem nomeados
function createResponse<T>(data: T, status: number): ApiResponse<T> {
  return { data, status }
}

// ❌ RUIM - Genéricos genéricos
function createResponse<T>(data: T, s: number): Response<T> {
  return { data, s }
}
```

## Padrões React

### Componentes

```typescript
// ✅ BOM - Componente funcional com TypeScript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn btn-${variant}`}>
      {label}
    </button>
  )
}

// ❌ RUIM - Sem tipagem
export function Button({ label, onClick, variant, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
```

### Hooks Customizados

```typescript
// ✅ BOM - Hook com nome descritivo
function useUserSession(userId: string) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSession() {
      try {
        const data = await api.getSession(userId)
        setSession(data)
      } catch (error) {
        console.error('Failed to fetch session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [userId])

  return { session, isLoading }
}

// ❌ RUIM - Hook sem propósito claro
function useData(id: string) {
  const [data, setData] = useState(null)
  // ...
}
```

### Server vs Client Components

```typescript
// ✅ BOM - Server Component (padrão)
export async function UserProfile({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({ where: { id: userId } })

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// ✅ BOM - Client Component apenas quando necessário
'use client'

export function InteractiveButton() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

## Padrões Next.js

### API Routes

```typescript
// ✅ BOM - API route com validação e error handling
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createItemSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = createItemSchema.parse(body)

    const item = await prisma.item.create({ data: validated })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 })
    }

    console.error('Error creating item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ❌ RUIM - Sem validação e error handling
export async function POST(req: NextRequest) {
  const body = await req.json()
  const item = await prisma.item.create({ data: body })
  return NextResponse.json(item)
}
```

### Server Actions

```typescript
// ✅ BOM - Server action com validação
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const createItemSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
})

export async function createItem(formData: FormData) {
  const validated = createItemSchema.parse({
    name: formData.get('name'),
    price: Number(formData.get('price')),
  })

  await prisma.item.create({ data: validated })
  revalidatePath('/items')
}

// ❌ RUIM - Sem validação
'use server'

export async function createItem(formData: FormData) {
  await prisma.item.create({
    data: {
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
    },
  })
}
```

## Padrões Prisma

### Queries

```typescript
// ✅ BOM - Query com seleção explícita
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    name: true,
    email: true,
    createdAt: true,
  },
})

// ❌ RUIM - Query sem seleção (pode ser lento)
const user = await prisma.user.findUnique({
  where: { id: userId },
})
```

### Migrations

```bash
# ✅ BOM - Migration com nome descritivo
pnpm prisma migrate dev --name add_user_preferences

# ❌ RUIM - Migration genérica
pnpm prisma migrate dev --name migration1
```

## Padrões de Error Handling

### Try-Catch

```typescript
// ✅ BOM - Error handling específico
async function processPayment(amount: number) {
  try {
    const result = await paymentService.charge(amount)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof InsufficientFundsError) {
      return { success: false, error: 'Insufficient funds' }
    }
    if (error instanceof PaymentGatewayError) {
      Sentry.captureException(error)
      return { success: false, error: 'Payment gateway error' }
    }
    throw error // Re-throw unexpected errors
  }
}

// ❌ RUIM - Error handling genérico
async function processPayment(amount: number) {
  try {
    return await paymentService.charge(amount)
  } catch (error) {
    console.log(error)
    return null
  }
}
```

## Padrões de Naming

### Variáveis e Funções

```typescript
// ✅ BOM - Descritivo
const isAuthenticated = checkAuthentication()
const hasPermission = userHasPermission(userId, 'admin')
function calculateTotalAmount(items: Item[]): number { }

// ❌ RUIM - Não descritivo
const auth = check()
const perm = userHas(userId, 'admin')
function calc(items: Item[]): number { }
```

### Componentes

```typescript
// ✅ BOM - PascalCase, descritivo
export function UserList() { }
export function UserProfile() { }
export function SearchBar() { }

// ❌ RUIM - Não PascalCase ou genérico
export function userList() { }
export function Component() { }
export function Thing() { }
```

### Files e Diretórios

```
✅ BOM:
components/user/UserList.tsx
components/auth/AuthProvider.tsx
lib/utils/formatDate.ts

❌ RUIM:
components/UserList.tsx
components/AuthProvider.tsx
lib/format.ts
```

## Padrões de Performance

### Memoization

```typescript
// ✅ BOM - Memo para componentes puros
export const ExpensiveComponent = memo(({ data }: { data: Data }) => {
  return <div>{/* ... */}</div>
})

// ✅ BOM - useCallback para callbacks
function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return <button onClick={handleClick}>Click me</button>
}
```

### Lazy Loading

```typescript
// ✅ BOM - Lazy loading de componentes pesados
const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HeavyChart data={data} />
    </Suspense>
  )
}
```

## Padrões de Testes

### Testes Descritivos

```typescript
// ✅ BOM - Nomes descritivos
describe('calculateTotalAmount', () => {
  it('should return 0 for empty cart', () => {
    expect(calculateTotalAmount([])).toBe(0)
  })

  it('should sum prices correctly for multiple items', () => {
    expect(calculateTotalAmount([
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ])).toBe(35)
  })
})

// ❌ RUIM - Nomes genéricos
describe('calc', () => {
  it('works', () => { })
  it('also works', () => { })
})
```

## Padrões de Comentários

### Quando Comentar

```typescript
// ✅ BOM - Comentar lógica complexa não-obvia
// Calculate effective tax rate using progressive bracket system
// Reference: Brazilian tax law article 43, section II
function calculateTax(income: number): number {
  // Complex calculation...
}

// ❌ RUIM - Comentar código óbvio
// Set x to 5
const x = 5

// ❌ RUIM - Código comentado morto
// const oldImplementation = () => { /* ... */ }
```

### JSDoc

```typescript
// ✅ BOM - JSDoc para funções públicas
/**
 * Calculates the total amount including tax and discount.
 *
 * @param subtotal - The subtotal before tax and discount
 * @param taxRate - The tax rate as a decimal (e.g., 0.1 for 10%)
 * @param discount - Optional discount amount
 * @returns The final total amount
 *
 * @example
 * ```typescript
 * calculateTotal(100, 0.1, 10) // Returns 100
 * ```
 */
function calculateTotal(subtotal: number, taxRate: number, discount = 0): number {
  return subtotal * (1 + taxRate) - discount
}
```

## Anti-Patterns a Evitar

### 1. Early Returns vs Nested Ifs

```typescript
// ✅ BOM - Early returns
function processUser(user: User | null): ProcessedUser | null {
  if (!user) return null
  if (!user.isActive) return null
  if (!user.hasPermission) return null

  return transformUser(user)
}

// ❌ RUIM - Nested ifs
function processUser(user: User | null): ProcessedUser | null {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        return transformUser(user)
      }
    }
  }
  return null
}
```

### 2. Magic Numbers

```typescript
// ✅ BOM - Constants
const MAX_LOGIN_ATTEMPTS = 5
const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes

if (attempts > MAX_LOGIN_ATTEMPTS) {
  // ...
}

// ❌ RUIM - Magic numbers
if (attempts > 5) {
  // ...
}
```

### 3. DRY Violations

```typescript
// ✅ BOM - Função reutilizável
function formatDate(date: Date, locale = 'pt-BR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// ❌ RUIM - Código duplicado
const date1 = new Intl.DateTimeFormat('pt-BR', { /* ... */ }).format(d1)
const date2 = new Intl.DateTimeFormat('pt-BR', { /* ... */ }).format(d2)
```

## Checklist de Code Review

Antes de aprovar código, verifique:
- [ ] Código segue padrões de tipagem
- [ ] Nomes são descritivos
- [ ] Não há magic numbers
- [ ] Código está bem formatado
- [ ] Não há código comentado
- [ ] Error handling está implementado
- [ ] Performance foi considerada
- [ ] Testes cobrem os casos importantes
- [ ] Comentários explicam lógica complexa
- [ ] Código é DRY (não duplicado)

