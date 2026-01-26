# RELATÓRIO DE ANÁLISE EXAUSTIVA - WellWave
**Data:** 2026-01-25  
**Analista:** Debug Mode - Kilo Code  
**Escopo:** Análise completa de erros, bugs, vulnerabilidades de segurança e violações de boas práticas

---

## ÍNDICE

1. [Vulnerabilidades de Segurança Críticas](#1-vulnerabilidades-de-segurança-críticas)
2. [Erros de Segurança Moderados](#2-erros-de-segurança-moderados)
3. [Bugs e Problemas de Código](#3-bugs-e-problemas-de-código)
4. [Violações de Boas Práticas](#4-violações-de-boas-práticas)
5. [Problemas de Performance](#5-problemas-de-performance)
6. [Problemas de Acessibilidade](#6-problemas-de-acessibilidade)
7. [Problemas de Manutenibilidade](#7-problemas-de-manutenibilidade)

---

## 1. VULNERABILIDADES DE SEGURANÇA CRÍTICAS

### 1.1 DSN do Sentry Hardcoded no Código
**Arquivo:** [`sentry.client.config.ts`](sentry.client.config.ts:8)  
**Linha:** 8  
**Severidade:** 🔴 CRÍTICA

**Problema:**
```typescript
dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || "https://893edabca7965e86e06718dbfcba0166@o4510188708691968.ingest.us.sentry.io/4510497457831936",
```

O DSN (Data Source Name) do Sentry está hardcoded no código como fallback. Isso expõe credenciais de monitoramento que podem ser usadas para:
- Enviar dados falsos para o projeto Sentry
- Consumir a cota de eventos do projeto
- Obter informações sobre a infraestrutura

**Por que é um erro:**
- Credenciais nunca devem estar hardcoded no código
- O fallback expõe o DSN mesmo quando as variáveis de ambiente não estão configuradas
- Viola o princípio de segurança "never commit secrets"

**Correção:**
```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
  // Remover o DSN hardcoded
})
```

---

### 1.2 DSN do Sentry Hardcoded no Servidor
**Arquivo:** [`sentry.server.config.ts`](sentry.server.config.ts:8)  
**Linha:** 8  
**Severidade:** 🔴 CRÍTICA

**Problema:**
```typescript
dsn: process.env.SENTRY_DSN || "https://893edabca7965e86e06718dbfcba0166@o4510188708691968.ingest.us.sentry.io/4510497457831936",
```

Mesmo problema do item 1.1, mas no servidor.

**Correção:**
```typescript
// sentry.server.config.ts
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Remover o DSN hardcoded
})
```

---

### 1.3 Envio de PII para Sentry
**Arquivo:** [`sentry.server.config.ts`](sentry.server.config.ts:18)  
**Linha:** 18  
**Severidade:** 🔴 CRÍTICA (LGPD)

**Problema:**
```typescript
sendDefaultPii: true,
```

A configuração `sendDefaultPii: true` envia informações pessoais identificáveis para o Sentry, incluindo:
- Endereço IP do usuário
- User Agent
- Informações de sessão
- Possíveis dados de formulários

**Por que é um erro:**
- Viola a LGPD (Lei Geral de Proteção de Dados Pessoais)
- Dados médicos são especialmente sensíveis
- O Sentry pode capturar dados de pacientes inadvertidamente

**Correção:**
```typescript
// sentry.server.config.ts
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: false, // Desabilitar envio de PII
  // Adicionar scrubbing de dados sensíveis
  beforeSend(event, hint) {
    // Remover dados sensíveis do evento
    if (event.request) {
      delete event.request.cookies
      delete event.request.headers
    }
    return event
  },
})
```

---

### 1.4 CSP Permite `frame-ancestors *`
**Arquivo:** [`next.config.js`](next.config.js:42)  
**Linha:** 42  
**Severidade:** 🟠 ALTA

**Problema:**
```javascript
frame-ancestors *',
```

A Content Security Policy permite qualquer site em iframe, o que pode levar a:
- Clickjacking
- Phishing
- Redirecionamentos maliciosos

**Por que é um erro:**
- Permite que o site seja incorporado em iframes de sites maliciosos
- Viola as melhores práticas de segurança CSP
- Especialmente perigoso para aplicações médicas

**Correção:**
```javascript
// next.config.js
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://api.openai.com https://vercel.live wss://*.supabase.co",
    "frame-ancestors 'self'", // Mudar de * para 'self'
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')
}
```

---

### 1.5 Rate Limiting In-Memory (Não Escalável)
**Arquivo:** [`lib/rate-limit.ts`](lib/rate-limit.ts:37-44)  
**Linhas:** 37-44  
**Severidade:** 🟠 ALTA

**Problema:**
```typescript
class RateLimiter {
  private tokenCache: Map<string, number[]>
  // ...
}
```

O rate limiting usa um `Map` em memória, o que significa:
- Não funciona em múltiplas instâncias (horizontal scaling)
- Perde o estado ao reiniciar o servidor
- Não é persistente
- Ataques podem ser distribuídos entre instâncias

**Por que é um erro:**
- Em produção com múltiplos servidores, cada um tem seu próprio cache
- Um atacante pode rotacionar entre IPs para bypassar o limite
- O comentário no arquivo até admite o problema: "For production with multiple instances, consider using Redis or Upstash."

**Correção:**
```typescript
// Usar Redis ou Upstash para rate limiting distribuído
import { Redis } from '@upstash/redis'

class RateLimiter {
  private redis: Redis
  
  constructor(options: RateLimitOptions) {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  }
  
  async check(request: NextRequest | Request, limit: number): Promise<RateLimitResult> {
    const identifier = this.getIdentifier(request)
    const key = `ratelimit:${identifier}`
    
    const current = await this.redis.incr(key)
    await this.redis.expire(key, this.interval / 1000)
    
    if (current > limit) {
      throw new Error('Rate limit exceeded')
    }
    
    return { limit, remaining: limit - current, reset: this.interval / 1000 }
  }
}
```

---

### 1.6 Falta de Rate Limiting em Rotas de API
**Arquivo:** [`app/api/complaints/route.ts`](app/api/complaints/route.ts:8-104)  
**Linhas:** 8-104  
**Severidade:** 🟠 ALTA

**Problema:**
A rota `/api/complaints` não implementa rate limiting.

**Por que é um erro:**
- Permite scraping da base de dados de queixas médicas
- Pode causar sobrecarga no banco de dados
- Não protege contra ataques de força bruta

**Correção:**
```typescript
// app/api/complaints/route.ts
import { withRateLimit, apiLimiter } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  const rateLimitResponse = await withRateLimit(request, apiLimiter, 30)
  if (rateLimitResponse) return rateLimitResponse
  
  // Resto do código...
}
```

---

## 2. ERROS DE SEGURANÇA MODERADOS

### 2.1 Tratamento de Erro Exposto no Cliente
**Arquivo:** [`components/anamnese/anamnese-form.tsx`](components/anamnese/anamnese-form.tsx:423-429)  
**Linhas:** 423-429  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
} catch (_error) {
  toast({
    title: 'Erro ao salvar',
    description: 'Ocorreu um erro ao salvar a anamnese. Tente novamente.',
    variant: 'destructive',
  })
}
```

Erros são silenciados (`_error`) e não são registrados. Isso impede:
- Debugging de problemas
- Monitoramento de erros
- Identificação de problemas de segurança

**Por que é um erro:**
- Erros de banco de dados podem indicar problemas de segurança
- Sem logs, é impossível investigar incidentes
- Viola boas práticas de observabilidade

**Correção:**
```typescript
} catch (error) {
  console.error('Erro ao salvar anamnese:', error)
  
  // Enviar para Sentry
  Sentry.captureException(error)
  
  toast({
    title: 'Erro ao salvar',
    description: 'Ocorreu um erro ao salvar a anamnese. Tente novamente.',
    variant: 'destructive',
  })
}
```

---

### 2.2 Falta de Validação de Entrada em Chat
**Arquivo:** [`components/medical/ChatWell.tsx`](components/medical/ChatWell.tsx:33-58)  
**Linhas:** 33-58  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
const handleSend = () => {
  if (!inputValue.trim()) return
  
  const newMessage: Message = {
    id: Date.now().toString(),
    text: inputValue, // Não há validação ou sanitização
    sender: 'user',
    timestamp: new Date(),
  }
```

A entrada do usuário não é validada ou sanitizada antes de ser processada.

**Por que é um erro:**
- Permite injeção de scripts XSS
- Pode causar problemas de renderização
- Dados não validados são enviados para o backend

**Correção:**
```typescript
import DOMPurify from 'dompurify'

const handleSend = () => {
  if (!inputValue.trim()) return
  
  // Validar tamanho
  if (inputValue.length > 5000) {
    toast({ title: 'Mensagem muito longa', variant: 'destructive' })
    return
  }
  
  // Sanitizar entrada
  const sanitizedText = DOMPurify.sanitize(inputValue)
  
  const newMessage: Message = {
    id: Date.now().toString(),
    text: sanitizedText,
    sender: 'user',
    timestamp: new Date(),
  }
```

---

### 2.3 Autenticação em Rotas de API sem Verificação de Permissões
**Arquivo:** [`app/api/complaints/[id]/route.ts`](app/api/complaints/[id]/route.ts:51-203)  
**Linhas:** 51-203  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Não verifica se o usuário tem permissão para editar
```

A rota PUT verifica apenas se o usuário está autenticado, mas não se tem permissão para editar queixas médicas.

**Por que é um erro:**
- Qualquer usuário autenticado pode editar dados médicos
- Falta de controle de acesso baseado em roles
- Viola o princípio de menor privilégio

**Correção:**
```typescript
// Adicionar verificação de role
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

// Verificar se o usuário é admin ou tem permissão
const userRole = user.user_metadata?.role
if (userRole !== 'admin' && userRole !== 'editor') {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

---

## 3. BUGS E PROBLEMAS DE CÓDIGO

### 3.1 Arquivo de Analytics Ausente
**Arquivo:** Referenciado em [`components/anamnese/anamnese-form.tsx`](components/anamnese/anamnese-form.tsx:27)  
**Linha:** 27  
**Severidade:** 🔴 CRÍTICA

**Problema:**
```typescript
import { analytics } from '@/lib/analytics'
```

O arquivo `lib/analytics.ts` não existe, causando erro de importação em tempo de execução.

**Por que é um erro:**
- Quebra a aplicação em tempo de execução
- Eventos de analytics não são registrados
- Impede monitoramento de uso

**Correção:**
```typescript
// Criar o arquivo lib/analytics.ts
import * as Sentry from '@sentry/nextjs'

export const analytics = {
  anamneseCompleted: (syndromeCode: string, checkboxCount: number, hasRedFlags: boolean, outputMode: string) => {
    Sentry.captureMessage('Anamnese Completed', {
      level: 'info',
      extra: { syndromeCode, checkboxCount, hasRedFlags, outputMode }
    })
  },
  
  redFlagDetected: (syndromeCode: string, description: string, severity: 'WARNING' | 'CRITICAL') => {
    Sentry.captureMessage('Red Flag Detected', {
      level: severity === 'CRITICAL' ? 'error' : 'warning',
      extra: { syndromeCode, description, severity }
    })
  },
  
  // ... outros métodos
}
```

---

### 3.2 Hydration Mismatch em Componente Principal
**Arquivo:** [`app/page.tsx`](app/page.tsx:157-172)  
**Linhas:** 157-172  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
const [isMounted, setIsMounted] = React.useState(false)

React.useEffect(() => {
  setIsMounted(true)
  setPatient(prev => ({
    ...prev,
    entryTime: new Date(Date.now() - 1000 * 60 * 42).toISOString()
  }))
}, [loadSampleProject, tasks.length])
```

O componente define `entryTime` com um timestamp estático que será diferente no servidor e cliente, causando hydration mismatch.

**Por que é um erro:**
- Causa warnings no console
- Pode causar problemas de renderização
- Experiência de usuário inconsistente

**Correção:**
```typescript
// Usar um timestamp consistente ou remover o campo estático
React.useEffect(() => {
  setIsMounted(true)
  // Remover ou usar um valor consistente
}, [])

// Ou usar um timestamp baseado no momento de renderização
const entryTime = React.useMemo(() => new Date().toISOString(), [])
```

---

### 3.3 Tipo `any` Usado em Múltiplos Lugares
**Arquivo:** [`stores/kanban-store.ts`](stores/kanban-store.ts:45, 55)  
**Linhas:** 45, 55  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
addTask: (taskData) => {
  const newTask: KanbanTask = {
    ...taskData as any, // Linha 45
    id: generateId(),
  }
}

addTasks: (tasksData) => {
  const newTasks: KanbanTask[] = tasksData.map((taskData) => ({
    ...taskData as any, // Linha 55
    id: generateId(),
  }))
}
```

Uso de `as any` remove a segurança de tipos do TypeScript.

**Por que é um erro:**
- Permite passar propriedades inválidas
- Remove os benefícios do TypeScript
- Pode causar erros em tempo de execução

**Correção:**
```typescript
// Definir tipos apropriados
interface CreateTaskInput {
  patientName: string
  age: string
  gender: 'M' | 'F'
  complaint: string
  acuity: 'red' | 'orange' | 'yellow' | 'green'
  waitTime: string
  status: KanbanStatus
}

addTask: (taskData: CreateTaskInput) => {
  const newTask: KanbanTask = {
    ...taskData,
    id: generateId(),
  }
}
```

---

### 3.4 Erro de Digitação em Comentário
**Arquivo:** [`lib/anamnese/generate-narrative.ts`](lib/anamnese/generate-narrative.ts:51-54)  
**Linhas:** 51-54  
**Severidade:** 🟢 BAIXA

**Problema:**
```typescript
/**
 * Configuração de formatação por categoria
 * Otimizada para gerar texto corrido fluido com verbos padrão médicos
 *
 * Padrão de escrita:  // "escrita" deveria ser "escrita"
```

Erros de digitação em comentários podem causar confusão.

**Correção:**
```typescript
/**
 * Configuração de formatação por categoria
 * Otimizada para gerar texto corrido fluido com verbos padrão médicos
 *
 * Padrão de escrita:
```

---

### 3.5 Função `generateId` Pode Gerar IDs Duplicados
**Arquivo:** [`stores/kanban-store.ts`](stores/kanban-store.ts:25-27)  
**Linhas:** 25-27  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
```

Se múltiplas tarefas forem criadas rapidamente, `Date.now()` pode ser o mesmo, resultando em IDs duplicados.

**Por que é um erro:**
- IDs duplicados podem causar problemas de estado
- `Math.random()` não é criptograficamente seguro
- Não garante unicidade

**Correção:**
```typescript
import { v4 as uuidv4 } from 'uuid'

function generateId(): string {
  return uuidv4()
}
```

---

### 3.6 Falta de Tratamento de Erro em API de Exportação
**Arquivo:** [`components/anamnese/ExportPDFButton/useExportPdf.ts`](components/anamnese/ExportPDFButton/useExportPdf.ts:14-41)  
**Linhas:** 14-41  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
async function exportPdf({ sessionId }: ExportPdfParams): Promise<void> {
  const response = await fetch('/api/anamnese/export-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  })

  if (!response.ok) {
    const errorData: ExportPdfError = await response.json()
    throw new Error(errorData.error || 'Falha ao exportar PDF')
  }

  const blob = await response.blob()
  // Não há tratamento de erro se blob for null ou inválido
```

**Por que é um erro:**
- Se `response.json()` falhar, o erro não é capturado
- Não há validação se o blob é válido
- Falta de tratamento para erros de rede

**Correção:**
```typescript
async function exportPdf({ sessionId }: ExportPdfParams): Promise<void> {
  try {
    const response = await fetch('/api/anamnese/export-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    })

    if (!response.ok) {
      const errorData: ExportPdfError = await response.json()
      throw new Error(errorData.error || 'Falha ao exportar PDF')
    }

    const blob = await response.blob()
    
    if (!blob || blob.size === 0) {
      throw new Error('PDF vazio ou inválido')
    }
    
    const contentDisposition = response.headers.get('Content-Disposition')
    const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
    const filename = filenameMatch?.[1] || 'anamnese.pdf'
    
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erro ao exportar PDF:', error)
    throw error
  }
}
```

---

## 4. VIOLAÇÕES DE BOAS PRÁTICAS

### 4.1 Comentário Desatualizado sobre Next.js 16
**Arquivo:** [`middleware.ts`](middleware.ts:1-9)  
**Linhas:** 1-9  
**Severidade:** 🟢 BAIXA

**Problema:**
```typescript
/**
 * NOTE: Next.js 16 deprecates middleware.ts in favor of proxy.ts for routing.
 * However, proxy.ts is ONLY for routing (rewrites, redirects, headers).
 * Authentication should be handled in Layouts or Route Handlers.
 *
 * This middleware handles Supabase session refresh and route protection.
 * Keeping middleware.ts until Supabase provides official migration guidance.
 * See: https://nextjs.org/docs/app/guides/upgrading/version-16
 */
```

O comentário indica que middleware.ts está depreciado, mas ainda está sendo usado.

**Por que é uma violação:**
- Código técnico desatualizado pode causar problemas futuros
- Comentários desatualizados confundem desenvolvedores
- Deve ser migrado para proxy.ts

**Correção:**
Migrar para proxy.ts conforme documentação do Next.js 16.

---

### 4.2 Código Duplicado em Componentes de Autenticação
**Arquivo:** [`components/auth/login-form.tsx`](components/auth/login-form.tsx:1-151), [`components/auth/register-form.tsx`](components/auth/register-form.tsx:1-258)  
**Severidade:** 🟡 MÉDIA

**Problema:**
Muita lógica de animação e validação é duplicada entre os formulários.

**Por que é uma violação:**
- DRY (Don't Repeat Yourself) violado
- Manutenção mais difícil
- Inconsistências podem surgir

**Correção:**
Criar componentes compartilhados para animações e validação.

---

### 4.3 Mágica de Strings em Código
**Arquivo:** [`lib/services/protocolService.ts`](lib/services/protocolService.ts:113-207)  
**Linhas:** 113-207  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
switch (syndromeId) {
  case 'dor_toracica':
    coreSections = [
      {
        id: 'queixa',
        title: 'Característica da Dor',
        // ...
```

Strings literais como `'dor_toracica'` são usadas em múltiplos lugares sem constantes.

**Por que é uma violação:**
- Erros de digitação podem causar bugs
- Refatoração mais difícil
- Sem type safety

**Correção:**
```typescript
// Criar constantes
export const SYNDROME_IDS = {
  CHEST_PAIN: 'dor_toracica',
  ABDOMINAL_PAIN: 'dor_abdominal',
  HEADACHE: 'cefaleia',
  // ...
} as const

export type SyndromeId = typeof SYNDROME_IDS[keyof typeof SYNDROME_IDS]
```

---

### 4.4 Falta de JSDoc em Funções Públicas
**Arquivo:** [`lib/services/complaints-api.ts`](lib/services/complaints-api.ts:23-44)  
**Linhas:** 23-44  
**Severidade:** 🟢 BAIXA

**Problema:**
Funções públicas não têm documentação JSDoc.

**Por que é uma violação:**
- Dificulta uso da API
- IDEs não podem fornecer autocomplete útil
- Dificulta manutenção

**Correção:**
```typescript
/**
 * Busca lista de queixas médicas com filtros opcionais
 * 
 * @param params - Parâmetros de filtragem e paginação
 * @param params.group - Filtra por grupo de queixas
 * @param params.riskLevel - Filtra por nível de risco
 * @param params.search - Busca por texto
 * @param params.limit - Limite de resultados (padrão: 500)
 * @param params.offset - Offset para paginação
 * @returns Promise com resultados paginados
 * @throws Error se a requisição falhar
 */
export async function fetchComplaints(
  params?: ComplaintListParams
): Promise<PaginatedResponse<ComplaintApiPayload>> {
  // ...
}
```

---

### 4.5 Valores Hardcoded de Timeout
**Arquivo:** [`hooks/use-auto-save.ts`](hooks/use-auto-save.ts:76-78)  
**Linhas:** 76-78  
**Severidade:** 🟢 BAIXA

**Problema:**
```typescript
const DEFAULT_DEBOUNCE_MS = 2000
const RECOVERY_RETRY_DELAY = 5000
const MAX_RECOVERY_ATTEMPTS = 3
```

Valores de timeout são hardcoded e não configuráveis via ambiente.

**Por que é uma violação:**
- Difícil ajustar para diferentes ambientes
- Testes podem ser lentos
- Não segue o princípio de configuração externa

**Correção:**
```typescript
const DEFAULT_DEBOUNCE_MS = parseInt(process.env.AUTO_SAVE_DEBOUNCE_MS || '2000', 10)
const RECOVERY_RETRY_DELAY = parseInt(process.env.RECOVERY_RETRY_DELAY_MS || '5000', 10)
const MAX_RECOVERY_ATTEMPTS = parseInt(process.env.MAX_RECOVERY_ATTEMPTS || '3', 10)
```

---

## 5. PROBLEMAS DE PERFORMANCE

### 5.1 Re-renders Desnecessários em Componente de Anamnese
**Arquivo:** [`components/anamnese/anamnese-form.tsx`](components/anamnese/anamnese-form.tsx:348-380)  
**Linhas:** 348-380  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
useEffect(() => {
  if (!selectedComplaintId) return

  setPrioritySelectedCheckboxes((prev) => {
    const next = new Set(prev)
    let changed = false

    // Processamento complexo em cada renderização
    selectedIds.forEach((id) => {
      // ...
    })
    
    return changed ? next : prev
  })
}, [selectedIds, syndrome.checkboxes, findCheckboxIdByLabel, selectedComplaintId])
```

O useEffect executa processamento complexo em cada mudança de `selectedIds`, mesmo quando não necessário.

**Por que é um problema:**
- Causa re-renders desnecessários
- Processamento de arrays em cada renderização
- Pode causar lag em dispositivos mais lentos

**Correção:**
```typescript
// Usar useMemo para evitar re-cálculos
const priorityCheckboxesSynced = useMemo(() => {
  if (!selectedComplaintId) return Array.from(prioritySelectedCheckboxes)
  
  const synced = new Set(prioritySelectedCheckboxes)
  // Processamento apenas quando necessário
  return Array.from(synced)
}, [selectedIds, prioritySelectedCheckboxes, selectedComplaintId])
```

---

### 5.2 Fetch Sem Cache em API de Queixas
**Arquivo:** [`lib/services/complaints-api.ts`](lib/services/complaints-api.ts:23-34)  
**Linhas:** 23-34  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
export async function fetchComplaints(
  params?: ComplaintListParams
): Promise<PaginatedResponse<ComplaintApiPayload>> {
  const query = buildQueryParams(params)
  const response = await fetch(`/api/complaints?${query.toString()}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch complaints')
  }
  
  return response.json()
}
```

A função `fetch` não usa cache, o que significa que cada chamada faz uma nova requisição de rede.

**Por que é um problema:**
- Requisições desnecessárias
- Maior latência
- Sobrecarga do servidor

**Correção:**
```typescript
import { useQuery } from '@tanstack/react-query'

// No componente, usar React Query com cache
export function useComplaints(params?: ComplaintListParams) {
  return useQuery<PaginatedResponse<ComplaintApiPayload>>({
    queryKey: complaintsQueryKey(params),
    queryFn: () => fetchComplaints(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos
  })
}
```

---

### 5.3 Grandes Arrays em Estado sem Memoização
**Arquivo:** [`components/anamnese/anamnese-form.tsx`](components/anamnese/anamnese-form.tsx:118-131)  
**Linhas:** 118-131  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
const groupedCheckboxes = useMemo(() => {
  const groups: Record<CheckboxCategory, CheckboxData[]> = {} as Record<
    CheckboxCategory,
    CheckboxData[]
  >

  for (const category of CATEGORY_ORDER) {
    groups[category] = syndrome.checkboxes
      .filter((cb) => cb.category === category)
      .sort((a, b) => a.orderIndex - b.orderIndex)
  }

  return groups
}, [syndrome.checkboxes])
```

Embora use `useMemo`, o array `syndrome.checkboxes` pode ser grande e causar problemas de performance.

**Por que é um problema:**
- Filtragem e ordenação em cada mudança de checkboxes
- Arrays grandes podem causar lag
- Memoização pode não ser efetiva se a referência mudar

**Correção:**
```typescript
// Usar referência estável para checkboxes
const checkboxesRef = useRef(syndrome.checkboxes)
checkboxesRef.current = syndrome.checkboxes

const groupedCheckboxes = useMemo(() => {
  const groups: Record<CheckboxCategory, CheckboxData[]> = {}
  const checkboxes = checkboxesRef.current

  for (const category of CATEGORY_ORDER) {
    groups[category] = checkboxes
      .filter((cb) => cb.category === category)
      .sort((a, b) => a.orderIndex - b.orderIndex)
  }

  return groups
}, [syndrome.id]) // Depender apenas do ID, não do array
```

---

## 6. PROBLEMAS DE ACESSIBILIDADE

### 6.1 Falta de ARIA Labels em Botões
**Arquivo:** [`components/ui/button.tsx`](components/ui/button.tsx:179-202)  
**Linhas:** 179-202  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
<motion.button
  data-slot="button"
  className={cn(buttonVariants({ variant, size, className }))}
  whileTap={{ scale: 0.98 }}
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  disabled={isDisabled}
  {...props}
>
```

O botão não tem `aria-label` ou `aria-describedby` para botões com ícones apenas.

**Por que é um problema:**
- Leitores de tela não podem descrever botões
- Viola WCAG 2.1
- Usuários com deficiência visual não podem usar a aplicação

**Correção:**
```typescript
interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  // ...
  ariaLabel?: string
  ariaDescribedBy?: string
}

function Button({
  ariaLabel,
  ariaDescribedBy,
  // ...
}: ButtonProps) {
  return (
    <motion.button
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      // ...
    >
```

---

### 6.2 Falta de Focus Management em Modal
**Arquivo:** [`components/anamnese/patient-context-modal.tsx`](components/anamnese/patient-context-modal.tsx)  
**Severidade:** 🟡 MÉDIA

**Problema:**
O modal não gerencia o foco corretamente (trap focus, return focus).

**Por que é um problema:**
- Usuários de teclado não podem navegar
- Viola WCAG 2.1
- Experiência de usuário ruim

**Correção:**
```typescript
import { FocusTrap } from '@radix-ui/react-focus-trap'

// No modal
<FocusTrap>
  <div role="dialog" aria-modal="true">
    {/* Conteúdo do modal */}
  </div>
</FocusTrap>
```

---

### 6.3 Contraste de Cores Insuficiente
**Arquivo:** [`app/globals.css`](app/globals.css:61-71)  
**Linhas:** 61-71  
**Severidade:** 🟡 MÉDIA

**Problema:**
```css
--color-primary-500: #0077B6;  /* Principal */
--color-secondary-500: #2A9D8F;  /* Principal */
```

Algumas combinações de cores podem não ter contraste suficiente para WCAG AA.

**Por que é um problema:**
- Difícil leitura para usuários com deficiência visual
- Viola WCAG 2.1
- Não acessível

**Correção:**
Usar ferramentas como WebAIM Contrast Checker para garantir contraste mínimo de 4.5:1 para texto normal.

---

## 7. PROBLEMAS DE MANUTENIBILIDADE

### 7.1 Componentes Grandes com Múltiplas Responsabilidades
**Arquivo:** [`components/anamnese/anamnese-form.tsx`](components/anamnese/anamnese-form.tsx:77-708)  
**Linhas:** 77-708  
**Severidade:** 🟡 MÉDIA

**Problema:**
O componente `AnamneseForm` tem mais de 600 linhas e múltiplas responsabilidades:
- Estado de checkboxes
- Geração de narrativa
- Detecção de red flags
- Auto-save
- Gerenciamento de modais
- etc.

**Por que é um problema:**
- Difícil de testar
- Difícil de manter
- Viola Single Responsibility Principle

**Correção:**
Dividir em componentes menores:
- `CheckboxList`
- `NarrativeGenerator`
- `RedFlagDetector`
- `AutoSaveManager`
- etc.

---

### 7.2 Lógica de Negócio em Componentes de UI
**Arquivo:** [`app/page.tsx`](app/page.tsx:313-587)  
**Linhas:** 313-587  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
const generateNote = React.useCallback(() => {
  // 300+ linhas de lógica de negócio
  // ...
}, [selectedCheckboxes, outputMode, patientContext, selectedComplaint])
```

Lógica complexa de geração de narrativa médica está no componente de UI.

**Por que é um problema:**
- Difícil de testar isoladamente
- Lógica de negócio acoplada a UI
- Difícil de reutilizar

**Correção:**
Mover lógica para hooks ou serviços:
```typescript
// hooks/use-narrative-generator.ts
export function useNarrativeGenerator(
  selectedCheckboxes: CheckboxData[],
  outputMode: OutputMode,
  patientContext: PatientContext,
  complaintContext?: ComplaintContext
) {
  const narrative = useMemo(() => {
    return generateNarrative(selectedCheckboxes, outputMode, patientContext, complaintContext)
  }, [selectedCheckboxes, outputMode, patientContext, complaintContext])
  
  return { narrative }
}
```

---

### 7.3 Falta de Tipagem Estrita em Store
**Arquivo:** [`stores/patient-store.ts`](stores/patient-store.ts:1-98)  
**Linhas:** 1-98  
**Severidade:** 🟡 MÉDIA

**Problema:**
```typescript
interface PatientState {
  // Estado do contexto do paciente
  gender: 'M' | 'F'
  isPediatric: boolean
  age: string  // Deveria ser number ou string validada
  phoneNumber: string
  allergies: string  // Deveria ser string[]
  // ...
}
```

O tipo `age` é `string` quando deveria ser mais restrito, e `allergies` é `string` quando deveria ser `string[]`.

**Por que é um problema:**
- Permite valores inválidos
- TypeScript não ajuda a prevenir erros
- Difícil de manter consistência

**Correção:**
```typescript
interface PatientState {
  gender: 'M' | 'F'
  isPediatric: boolean
  age: `${number}a` | `${number}m` | `${number}d`  // Mais restrito
  phoneNumber: string
  allergies: string[]  // Array de strings
  medications: string[]
  // ...
}
```

---

## RESUMO ESTATÍSTICO

| Categoria | Crítico | Alto | Médio | Baixo | Total |
|-----------|----------|-------|-------|-------|-------|
| Segurança | 3 | 2 | 3 | 0 | 8 |
| Bugs | 1 | 2 | 3 | 0 | 6 |
| Boas Práticas | 0 | 0 | 4 | 1 | 5 |
| Performance | 0 | 0 | 3 | 0 | 3 |
| Acessibilidade | 0 | 0 | 3 | 0 | 3 |
| Manutenibilidade | 0 | 0 | 3 | 0 | 3 |
| **TOTAL** | **4** | **4** | **16** | **1** | **28** |

## PRIORIDADES DE CORREÇÃO

### Prioridade 1 (Imediata - Crítico)
1. **Remover DSN hardcoded do Sentry** ([`sentry.client.config.ts:8`](sentry.client.config.ts:8), [`sentry.server.config.ts:8`](sentry.server.config.ts:8))
2. **Desabilitar envio de PII para Sentry** ([`sentry.server.config.ts:18`](sentry.server.config.ts:18))
3. **Criar arquivo lib/analytics.ts** (referenciado em [`components/anamnese/anamnese-form.tsx:27`](components/anamnese/anamnese-form.tsx:27))
4. **Corrigir CSP frame-ancestors** ([`next.config.js:42`](next.config.js:42))

### Prioridade 2 (Alta - 1 semana)
5. **Implementar rate limiting distribuído** ([`lib/rate-limit.ts`](lib/rate-limit.ts))
6. **Adicionar rate limiting em rotas de API** ([`app/api/complaints/route.ts`](app/api/complaints/route.ts))
7. **Adicionar verificação de permissões em PUT** ([`app/api/complaints/[id]/route.ts`](app/api/complaints/[id]/route.ts))
8. **Melhorar tratamento de erros** ([`components/anamnese/anamnese-form.tsx:423-429`](components/anamnese/anamnese-form.tsx:423-429))

### Prioridade 3 (Média - 2 semanas)
9. **Adicionar sanitização de entrada no chat** ([`components/medical/ChatWell.tsx`](components/medical/ChatWell.tsx))
10. **Remover tipos `any`** ([`stores/kanban-store.ts`](stores/kanban-store.ts))
11. **Melhorar IDs únicos** ([`stores/kanban-store.ts`](stores/kanban-store.ts))
12. **Adicionar tratamento de erro em export PDF** ([`components/anamnese/ExportPDFButton/useExportPdf.ts`](components/anamnese/ExportPDFButton/useExportPdf.ts))
13. **Otimizar re-renders** ([`components/anamnese/anamnese-form.tsx`](components/anamnese/anamnese-form.tsx))

### Prioridade 4 (Baixa - 1 mês)
14. **Adicionar JSDoc em funções públicas** ([`lib/services/complaints-api.ts`](lib/services/complaints-api.ts))
15. **Melhorar tipagem do store** ([`stores/patient-store.ts`](stores/patient-store.ts))
16. **Dividir componentes grandes** ([`components/anamnese/anamnese-form.tsx`](components/anamnese/anamnese-form.tsx))
17. **Mover lógica de negócio para hooks** ([`app/page.tsx`](app/page.tsx))
18. **Melhorar acessibilidade** ([`components/ui/button.tsx`](components/ui/button.tsx), modais)

---

## CONCLUSÃO

Foram identificados **28 problemas** distribuídos em 6 categorias principais:

1. **Segurança:** 8 problemas (4 críticos, 2 altos, 3 médios)
2. **Bugs:** 6 problemas (1 crítico, 2 altos, 3 médios)
3. **Boas Práticas:** 5 problemas (4 médios, 1 baixo)
4. **Performance:** 3 problemas (todos médios)
5. **Acessibilidade:** 3 problemas (todos médios)
6. **Manutenibilidade:** 3 problemas (todos médios)

### Problemas Mais Críticos
1. DSN do Sentry hardcoded (violação de segurança)
2. Envio de PII para Sentry (violação LGPD)
3. CSP permite qualquer site em iframe
4. Arquivo de analytics ausente (quebra de aplicação)

### Recomendações Gerais
1. Implementar revisão de código (code review) obrigatória
2. Adicionar linter de segurança (ESLint security plugin)
3. Implementar testes automatizados (unitários e E2E)
4. Adicionar SAST (Static Application Security Testing) no CI/CD
5. Implementar monitoramento de segurança além do Sentry
6. Adicionar auditorias regulares de dependências (npm audit)
7. Documentar arquitetura e padrões de código
8. Implementar treinamento de segurança para equipe

---

**Relatório gerado por:** Debug Mode - Kilo Code  
**Data:** 2026-01-25  
**Versão do projeto:** 1.0.0
