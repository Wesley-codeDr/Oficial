# Guia de Implementação - WellWave

## Visão Geral

Este guia fornece instruções detalhadas para implementar features no WellWave seguindo o workflow de Spec-Driven Development.

## Pré-requisitos

Antes de começar qualquer implementação, certifique-se de que:

- [ ] Você leu e entendeu `memory/constitution.md`
- [ ] Você tem uma especificação aprovada (`specs/[feature]/spec.md`)
- [ ] Você tem um plano de implementação (`specs/[feature]/plan.md`)
- [ ] Você tem um breakdown de tarefas (`specs/[feature]/tasks.md`)
- [ ] Seu ambiente de desenvolvimento está configurado

## Workflow de Implementação

### Passo 1: Preparação

```bash
# 1. Verificar pré-requisitos
./scripts/check-prerequisites.sh

# 2. Criar branch de feature
git checkout -b feature/nome-da-feature

# 3. Atualizar dependências
pnpm install
```

### Passo 2: Setup da Feature

```bash
# 1. Criar estrutura da feature (se ainda não existe)
./scripts/setup-plan.sh nome-da-feature

# 2. Ler a especificação
cat specs/nome-da-feature/spec.md

# 3. Gerar plano (se ainda não existe)
# Usar comando /speckit.plan no Cursor

# 4. Gerar tarefas (se ainda não existe)
# Usar comando /speckit.tasks no Cursor
```

### Passo 3: Implementação Seguindo Tasks.md

#### Aprovação de Especificação

Antes de implementar:
1. Verifique que `spec.md` foi revisado e aprovado
2. Confirme que `plan.md` está completo e validado
3. Verifique que `tasks.md` tem todas as tarefas definidas

#### Ordem de Implementação

Siga estritamente a ordem definida em `tasks.md`:
1. Tarefas sem dependências podem ser feitas em paralelo
2. Respeite as dependências entre tarefas
3. Tarefas marcadas com `[P]` podem ser executadas em paralelo

#### Abordagem TDD

Quando `tasks.md` especifica TDD:
1. Escreva testes ANTES de escrever código
2. Execute testes e veja falharem
3. Implemente o mínimo necessário para passar
4. Refatore mantendo testes passando

### Passo 4: Validação

```bash
# 1. Lint
pnpm lint

# 2. Type check
pnpm typecheck

# 3. Formatar código
pnpm format

# 4. Executar testes
pnpm test
pnpm test:e2e

# 5. Build
pnpm build
```

### Passo 5: Documentação

Atualize a documentação conforme definido em `tasks.md`:
- Atualize README.md se houver mudanças de funcionalidade
- Atualize API docs em `docs/api/` se houver mudanças de API
- Atualize data model em `specs/[feature]/data-model.md` se houver mudanças de schema
- Adicione comentários em código complexo

### Passo 6: Pull Request

Antes de abrir PR:
1. Verifique que todos os testes passam
2. Verifique que não há erros de lint
3. Verifique que o build é bem-sucedido
4. Atualize a descrição da PR com:
   - Link para a especificação
   - Resumo das mudanças
   - Screenshots para UI changes
   - Instruções de teste
   - Breaking changes (se houver)

## Padrões de Código

### TypeScript

- Use tipos explícitos para todas as funções
- Evite `any` - use `unknown` ou tipos genéricos se necessário
- Use `zod` para validação em tempo de execução
- Siga convenções de nomenclatura do TypeScript

### React

- Use componentes funcionais
- Use hooks em vez de classes
- Prefer Server Components (RSC) quando possível
- Minimize 'use client' directives
- Use prop types ou TypeScript para validação

### Next.js

- Use App Router padrões
- Use Server Actions para mutations
- Use API routes para endpoints HTTP
- Implemente proper error boundaries
- Use Suspense para async operations

### Prisma

- Siga as convenções de nomenclatura do Prisma
- Use migrations em vez de db push para mudanças de schema
- Documente migrations com nomes descritivos
- Teste migrations localmente antes de fazer push

## Testes

### Testes Unitários

```typescript
// Exemplo com Vitest
import { describe, it, expect } from 'vitest'

describe('minhaFunção', () => {
  it('deve fazer X', () => {
    const result = minhaFunção(input)
    expect(result).toEqual(expected)
  })
})
```

### Testes E2E

```typescript
// Exemplo com Playwright
import { test, expect } from '@playwright/test'

test('fluxo de usuário', async ({ page }) => {
  await page.goto('/')
  await page.click('button')
  await expect(page).toHaveTitle('Expected Title')
})
```

### Cobertura de Testes

- Mínimo: 80% de cobertura
- Crítico: 95%+ para código core
- Use `pnpm test:coverage` para verificar

## Debugging

### Logs

Use `console.log` ou structured logging para debugging:

```typescript
console.log('Debug info', { variable, data })
```

Para produção, use Sentry:
```typescript
import * as Sentry from '@sentry/nextjs'
Sentry.captureException(error)
```

### Debugging de Backend

```bash
# Logs do Next.js
pnpm dev

# Logs do Prisma
DEBUG="prisma:query" pnpm dev
```

### Debugging de Frontend

- Use Chrome DevTools
- React DevTools para inspect componentes
- Network tab para debugging de API calls

## Boas Práticas

### Performance

- Use React.memo para componentes puros
- Use useMemo/useCallback para memoização
- Otimize queries do Prisma com selects
- Use lazy loading para componentes pesados

### Segurança

- Nunca exponha secrets no client-side
- Use environment variables para dados sensíveis
- Implemente proper error handling
- Valide todos os inputs (usando zod)
- Use rate limiting para APIs públicas

### Manutenibilidade

- Escreva código auto-documentado
- Adicione comentários para lógica complexa
- Siga DRY (Don't Repeat Yourself)
- Separe concerns (UI, lógica, dados)
- Use constantes para valores mágicos

## Troubleshooting

### Problemas Comuns

**Erro de build:**
```bash
# Limpe cache e rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

**Erro de migration:**
```bash
# Resete e recrie migrations
pnpm prisma migrate reset
```

**Testes falhando:**
```bash
# Rode em modo watch para debugging
pnpm test --watch

# Rode apenas um arquivo
pnpm test path/to/test.spec.ts
```

### Pedindo Ajuda

1. Verifique este guia
2. Verifique `docs/TROUBLESHOOTING.md`
3. Verifique `README.md`
4. Abra uma issue no GitHub
5. Entre no chat da equipe

## Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Checklist Final

Antes de considerar uma feature completa:

- [ ] Todos os testes passam (unit + E2E)
- [ ] Cobertura de testes >= 80%
- [ ] Sem erros de lint
- [ ] Typecheck sem erros
- [ ] Build de produção bem-sucedido
- [ ] Documentação atualizada
- [ ] Spec atualizada se necessário
- [ ] Code review aprovado
- [ ] PR merged e deploy realizado

