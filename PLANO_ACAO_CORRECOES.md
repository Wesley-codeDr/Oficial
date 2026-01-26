# Plano de Ação - Correções Pendentes WellWave
**Data:** 2026-01-26  
**Status:** Pendente de Execução

---

## RESUMO

Total de problemas identificados: 28  
Problemas corrigidos: 11 (39%)  
Problemas pendentes: 16 (57%)  
Problemas em andamento: 1 (4%)

---

## FASE 1: Prioridade Média (Próximos 2-3 dias)

### 1. Melhorar tratamento de erros com logging

**Arquivos afetados:**
- `components/anamnese/anamnese-form.tsx`
- `lib/services/complaints-api.ts`

**Ação necessária:**
- Substituir catch blocks que silenciam erros por logging apropriado
- Adicionar captura de erros no Sentry
- Adicionar mensagens de erro informativas para o usuário

**Exemplo de correção:**
```typescript
// Antes
try {
  await someOperation()
} catch (_error) {
  // Erro silenciado
}

// Depois
try {
  await someOperation()
} catch (error) {
  console.error('Erro ao realizar operação:', error)
  Sentry.captureException(error)
  return { error: 'Erro ao processar solicitação. Tente novamente.' }
}
```

**Prioridade:** Alta  
**Tempo estimado:** 2-3 horas

---

### 2. Corrigir erros de TypeScript em app/page.tsx

**Arquivo afetado:** `app/page.tsx`

**Problema:** Erro de compilação TypeScript com `setNoteBlocks` esperando `KanbanTask[]` mas recebendo `NoteBlock[]`

**Ação necessária:**
- Harmonizar tipos entre o kanban store e o componente
- Criar um adaptador de tipos se necessário

**Exemplo de correção:**
```typescript
// Se o componente precisa de NoteBlock[], mas o store usa KanbanTask[]
const noteBlocksToKanbanTasks = (blocks: NoteBlock[]): KanbanTask[] => {
  return blocks.map(block => ({
    id: block.id,
    title: block.content,
    // ... mapear campos
  }))
}

// Usar o adaptador
setNoteBlocks(noteBlocksToKanbanTasks(noteBlocks))
```

**Prioridade:** Alta  
**Tempo estimado:** 1-2 horas

---

### 3. Remover tipos `any` do código

**Arquivos afetados:**
- `stores/kanban-store.ts` (linhas 45, 55)

**Ação necessária:**
- Definir tipos apropriados para o store
- Remover todas as ocorrências de `as any`

**Exemplo de correção:**
```typescript
// Antes
const tasks = data as any

// Depois
interface KanbanTaskData {
  id: string
  title: string
  // ... outros campos
}
const tasks = data as KanbanTaskData
```

**Prioridade:** Média  
**Tempo estimado:** 2-3 horas

---

### 4. Melhorar IDs únicos (usar UUID)

**Arquivos afetados:**
- `stores/kanban-store.ts`
- `lib/utils.ts`

**Problema:** `generateId()` usa `Date.now() + Math.random()`, pode gerar colisões

**Ação necessária:**
- Implementar função de geração de UUID
- Substituir todas as ocorrências de `Date.now() + Math.random()`

**Exemplo de correção:**
```typescript
// Antes
export function generateId() {
  return Date.now() + Math.random().toString(36).substring(2)
}

// Depois
export function generateId(): string {
  return crypto.randomUUID()
}

// Fallback para ambientes sem crypto.randomUUID
export function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
```

**Prioridade:** Média  
**Tempo estimado:** 1-2 horas

---

### 5. Adicionar tratamento de erro em export PDF

**Arquivo afetado:** `components/anamnese/ExportPDFButton/useExportPdf.ts`

**Ação necessária:**
- Validar se blob é válido antes de tentar criar URL
- Adicionar tratamento de erro apropriado
- Adicionar feedback visual para o usuário

**Exemplo de correção:**
```typescript
// Antes
const blob = await generatePDF()
const url = URL.createObjectURL(blob)

// Depois
const blob = await generatePDF()
if (!blob || blob.size === 0) {
  throw new Error('Falha ao gerar PDF: arquivo vazio')
}

const url = URL.createObjectURL(blob)
```

**Prioridade:** Média  
**Tempo estimado:** 1-2 horas

---

### 6. Otimizar re-renders com useMemo

**Arquivo afetado:** `components/anamnese/anamnese-form.tsx`

**Ação necessária:**
- Identificar processamento complexo de arrays
- Memoizar processamento com `useMemo`
- Reduzir re-renders desnecessários

**Exemplo de correção:**
```typescript
// Antes
const filteredItems = items.filter(item => item.category === selectedCategory)

// Depois
const filteredItems = useMemo(
  () => items.filter(item => item.category === selectedCategory),
  [items, selectedCategory]
)
```

**Prioridade:** Média  
**Tempo estimado:** 3-4 horas

---

## FASE 2: Prioridade Baixa (Próxima semana)

### 7. Implementar cache em requisições de API

**Arquivo afetado:** `lib/services/complaints-api.ts`

**Ação necessária:**
- Implementar cache com React Query ou similar
- Configurar tempo de expiração do cache
- Adicionar invalidação de cache quando necessário

**Exemplo de correção:**
```typescript
import { useQuery } from '@tanstack/react-query'

export function useComplaints() {
  return useQuery({
    queryKey: ['complaints'],
    queryFn: fetchComplaints,
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos
  })
}
```

**Prioridade:** Baixa  
**Tempo estimado:** 4-5 horas

---

### 8. Adicionar JSDoc em funções públicas

**Arquivos afetados:**
- `lib/services/complaints-api.ts`
- `lib/utils.ts`
- `hooks/use-auto-save.ts`

**Ação necessária:**
- Adicionar JSDoc com descrição, parâmetros e retorno
- Seguir padrões de documentação

**Exemplo de correção:**
```typescript
/**
 * Busca todas as queixas principais do banco de dados
 * 
 * @returns Promise com array de queixas principais
 * @throws Error se a requisição falhar
 * 
 * @example
 * const complaints = await fetchComplaints()
 */
export async function fetchComplaints(): Promise<ChiefComplaint[]> {
  // ...
}
```

**Prioridade:** Baixa  
**Tempo estimado:** 3-4 horas

---

### 9. Melhorar tipagem do store

**Arquivo afetado:** `stores/patient-store.ts`

**Ação necessária:**
- Definir tipos apropriados e consistentes
- Corrigir `age` para ser `number` em vez de `string`
- Corrigir `allergies` para ser `string[]` em vez de `string`

**Exemplo de correção:**
```typescript
// Antes
interface PatientData {
  age: string
  allergies: string
}

// Depois
interface PatientData {
  age: number
  allergies: string[]
}
```

**Prioridade:** Baixa  
**Tempo estimado:** 2-3 horas

---

### 10. Dividir componentes grandes

**Arquivo afetado:** `components/anamnese/anamnese-form.tsx` (600+ linhas)

**Ação necessária:**
- Identificar responsabilidades distintas no componente
- Extrair componentes menores e mais focados
- Melhorar legibilidade e manutenibilidade

**Exemplo de correção:**
```typescript
// Extrair componentes
- AnamneseHeader.tsx
- AnamneseCategories.tsx
- AnamneseCheckboxes.tsx
- AnamneseFooter.tsx
```

**Prioridade:** Baixa  
**Tempo estimado:** 6-8 horas

---

### 11. Mover lógica de negócio para hooks/serviços

**Arquivo afetado:** `app/page.tsx`

**Ação necessária:**
- Identificar lógica de negócio no componente
- Extrair para hooks ou serviços
- Melhorar separação de responsabilidades

**Exemplo de correção:**
```typescript
// Extrair hook
export function useNoteBlocks(initialBlocks: NoteBlock[]) {
  const [noteBlocks, setNoteBlocks] = useState<NoteBlock[]>(initialBlocks)
  
  const addNoteBlock = useCallback((block: NoteBlock) => {
    setNoteBlocks(prev => [...prev, block])
  }, [])
  
  return { noteBlocks, setNoteBlocks, addNoteBlock }
}
```

**Prioridade:** Baixa  
**Tempo estimado:** 4-5 horas

---

### 12. Adicionar ARIA labels em botões

**Arquivo afetado:** `components/ui/button.tsx`

**Ação necessária:**
- Adicionar `aria-label` quando botão não tem texto
- Melhorar acessibilidade para usuários de leitores de tela

**Exemplo de correção:**
```typescript
// Antes
<Button icon={<Icon />}>Ação</Button>

// Depois
<Button icon={<Icon />} aria-label="Executar ação">Ação</Button>

// Para botões apenas com ícone
<Button icon={<Icon />} aria-label="Fechar" />
```

**Prioridade:** Baixa  
**Tempo estimado:** 2-3 horas

---

### 13. Adicionar focus management em modais

**Arquivo afetado:** `components/anamnese/patient-context-modal.tsx`

**Ação necessária:**
- Implementar focus trap no modal
- Restaurar foco ao fechar modal
- Melhorar acessibilidade

**Exemplo de correção:**
```typescript
import { useFocusTrap } from '@/lib/hooks/use-focus-trap'

function PatientContextModal() {
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(modalRef)
  
  // ...
}
```

**Prioridade:** Baixa  
**Tempo estimado:** 3-4 horas

---

### 14. Melhorar contraste de cores

**Arquivos afetados:**
- `app/globals.css`
- `app/liquid-glass-2026.css`

**Ação necessária:**
- Verificar contraste de cores com ferramentas
- Ajustar cores para atender WCAG AA
- Documentar paleta de cores acessível

**Exemplo de correção:**
```css
/* Antes */
.button {
  background-color: #e0e0e0;
  color: #ffffff;
}

/* Depois - melhor contraste */
.button {
  background-color: #1a1a1a;
  color: #ffffff;
}
```

**Prioridade:** Baixa  
**Tempo estimado:** 2-3 horas

---

### 15. Mover valores hardcoded para configuração

**Arquivos afetados:**
- `hooks/use-auto-save.ts`
- `lib/services/complaints-api.ts`

**Ação necessária:**
- Identificar valores hardcoded
- Mover para variáveis de ambiente ou arquivo de configuração
- Documentar configurações

**Exemplo de correção:**
```typescript
// Antes
const AUTO_SAVE_DELAY = 3000

// Depois
const AUTO_SAVE_DELAY = parseInt(
  process.env.NEXT_PUBLIC_AUTO_SAVE_DELAY || '3000',
  10
)
```

**Prioridade:** Baixa  
**Tempo estimado:** 2-3 horas

---

### 16. Atualizar comentários desatualizados

**Arquivo afetado:** `middleware.ts`

**Ação necessária:**
- Atualizar comentário sobre Next.js 16
- Refletir versão atual do Next.js (15.5+)

**Exemplo de correção:**
```typescript
// Antes
// Next.js 16 middleware

// Depois
// Next.js 15.5+ middleware
```

**Prioridade:** Baixa  
**Tempo estimado:** 30 minutos

---

### 17. Remover código duplicado em autenticação

**Arquivos afetados:**
- `components/auth/login-form.tsx`
- `components/auth/register-form.tsx`

**Ação necessária:**
- Identificar código duplicado
- Extrair lógica comum para hook ou utilitário
- Melhorar manutenibilidade

**Exemplo de correção:**
```typescript
// Extrair hook
export function useAuthForm(initialState: AuthState) {
  const [state, setState] = useState<AuthState>(initialState)
  
  const handleSubmit = useCallback(async (formData: FormData) => {
    // lógica comum
  }, [])
  
  return { state, setState, handleSubmit }
}
```

**Prioridade:** Baixa  
**Tempo estimado:** 3-4 horas

---

### 18. Definir constantes para strings mágicas

**Arquivo afetado:** `lib/services/protocolService.ts`

**Ação necessária:**
- Identificar strings literais usadas diretamente no código
- Definir constantes ou enums
- Melhorar manutenibilidade

**Exemplo de correção:**
```typescript
// Antes
if (status === 'pending') { ... }

// Depois
const ProtocolStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
} as const

if (status === ProtocolStatus.PENDING) { ... }
```

**Prioridade:** Baixa  
**Tempo estimado:** 2-3 horas

---

## CRONOGRAMA DE EXECUÇÃO

### Semana 1 (Fase 1 - Prioridade Média)
- Dia 1-2: Melhorar tratamento de erros com logging
- Dia 2-3: Corrigir erros de TypeScript em app/page.tsx
- Dia 3-4: Remover tipos `any` do código
- Dia 4-5: Melhorar IDs únicos (usar UUID)
- Dia 5: Adicionar tratamento de erro em export PDF
- Dia 5-7: Otimizar re-renders com useMemo

### Semana 2-3 (Fase 2 - Prioridade Baixa)
- Implementar cache em requisições de API
- Adicionar JSDoc em funções públicas
- Melhorar tipagem do store
- Dividir componentes grandes
- Mover lógica de negócio para hooks/serviços

### Semana 4 (Fase 3 - Acessibilidade)
- Adicionar ARIA labels em botões
- Adicionar focus management em modais
- Melhorar contraste de cores

### Semana 5 (Fase 4 - Manutenibilidade)
- Mover valores hardcoded para configuração
- Atualizar comentários desatualizados
- Remover código duplicado em autenticação
- Definir constantes para strings mágicas

---

## TEMPO TOTAL ESTIMADO

- Fase 1 (Prioridade Média): 10-18 horas
- Fase 2 (Prioridade Baixa): 19-28 horas
- Fase 3 (Acessibilidade): 7-10 horas
- Fase 4 (Manutenibilidade): 8-11 horas

**Total:** 44-67 horas (aproximadamente 6-9 dias de trabalho)

---

## RECURSOS NECESSÁRIOS

- Desenvolvedor Frontend (React, TypeScript)
- Conhecimento de Next.js 15.5+
- Conhecimento de Prisma ORM
- Conhecimento de Supabase Auth
- Ferramentas de teste de acessibilidade
- Ferramentas de verificação de contraste de cores

---

## CRITÉRIOS DE SUCESSO

- [ ] Todos os problemas de TypeScript resolvidos
- [ ] Todos os tipos `any` removidos
- [ ] Todos os erros silenciados substituídos por logging apropriado
- [ ] Todos os IDs únicos usando UUID
- [ ] Todos os componentes grandes divididos em partes menores
- [ ] Toda lógica de negócio movida para hooks/serviços
- [ ] Todos os botões com ARIA labels apropriados
- [ ] Todos os modais com focus management
- [ ] Todas as cores atendendo WCAG AA
- [ ] Todos os valores hardcoded movidos para configuração
- [ ] Todos os comentários atualizados
- [ ] Todo código duplicado removido
- [ ] Todas as strings mágicas substituídas por constantes

---

## PRÓXIMOS PASSOS

1. Priorizar Fase 1 (Prioridade Média) para os próximos 2-3 dias
2. Revisar progresso diariamente e ajustar cronograma se necessário
3. Testar todas as correções após implementação
4. Atualizar documentação conforme necessário
5. Realizar code review antes de mesclar alterações

---

**Assinado:** Kilo Code - Debug Mode  
**Data:** 2026-01-26  
**Versão:** 1.0
