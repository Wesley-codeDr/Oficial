# Guia de Migração do Frontend - WellWave

> **LEIA COMPLETAMENTE ANTES DE EXECUTAR**
> Este guia garante que você não perca nenhum trabalho feito até agora.

---

## Quando Usar Este Guia

Use este guia quando:
- Você terminou de desenvolver o frontend no Google AI Studio
- Está satisfeito com o design e funcionalidades
- Quer trazer tudo para o projeto oficial WellWave

---

## Pré-Requisitos

Antes de começar, certifique-se de que:

1. **Frontend está atualizado no GitHub**
   - Verifique: https://github.com/Wesley-codeDr/Oficial-frontend-
   - Todos os arquivos estão commitados

2. **Projeto Oficial está funcionando**
   ```bash
   cd /Users/wesleywillian/Oficial/Oficial
   pnpm dev
   ```
   - Acesse http://localhost:3000 e confirme que funciona

3. **Não há mudanças não salvas**
   ```bash
   git status
   ```
   - Se houver mudanças, faça commit ou stash

---

## Texto para Colar no Claude

Quando estiver pronto para migrar, copie e cole **EXATAMENTE** este texto no Claude:

---

### OPÇÃO 1: Migração Completa (Recomendado)

```
Quero executar a migração do frontend do Google AI Studio para o projeto WellWave.

CONTEXTO:
- Frontend está em: https://github.com/Wesley-codeDr/Oficial-frontend-
- Projeto oficial está em: /Users/wesleywillian/Oficial/Oficial
- Documentação completa está em: docs/frontend-integration.md
- Tasks detalhadas estão em: specs/frontend-migration/tasks.md

INSTRUÇÕES:
1. Primeiro, faça backup criando uma branch: git checkout -b backup-pre-migration
2. Volte para a branch principal: git checkout 1-wellwave-mvp
3. Clone o frontend em /tmp para referência
4. Execute as tasks em ordem, conforme specs/frontend-migration/tasks.md
5. Após cada fase, faça commit
6. No final, rode pnpm typecheck e pnpm test
7. Se tudo passar, faça deploy: vercel deploy --prod

IMPORTANTE:
- NÃO modifique: /app/api/*, /middleware.ts, /prisma/schema.prisma, /lib/ai/*, /lib/db/*
- Mantenha componentes de /components/auth/* e /components/chat/* intactos
- Use componentes shadcn/ui existentes
- Se algo quebrar, podemos reverter com: git checkout backup-pre-migration

Comece pela Fase 1 (Preparação) e me avise antes de cada commit.
```

---

### OPÇÃO 2: Migração Parcial (Apenas Visual)

```
Quero migrar apenas os componentes visuais do frontend do Google AI Studio.

CONTEXTO:
- Frontend está em: https://github.com/Wesley-codeDr/Oficial-frontend-
- Projeto oficial está em: /Users/wesleywillian/Oficial/Oficial

INSTRUÇÕES:
1. Crie branch de backup: git checkout -b backup-pre-migration
2. Volte para main: git checkout 1-wellwave-mvp
3. Migre apenas:
   - Sidebar (components/layout/sidebar.tsx)
   - Header (components/layout/header.tsx)
   - AppShell (components/layout/app-shell.tsx)
4. Atualize o layout do dashboard
5. NÃO mexa nos protocolos médicos por enquanto

Comece e me avise do progresso.
```

---

### OPÇÃO 3: Apenas Protocolos Médicos

```
Quero migrar apenas os protocolos médicos do frontend do Google AI Studio.

CONTEXTO:
- Frontend está em: https://github.com/Wesley-codeDr/Oficial-frontend-
- Projeto oficial está em: /Users/wesleywillian/Oficial/Oficial

INSTRUÇÕES:
1. Crie branch de backup
2. Extraia do App.tsx:
   - Definição das 10 síndromes → lib/medical/syndromes.ts
   - Função getProtocolData → lib/medical/protocols.ts
   - Função getStructuredReferences → lib/medical/references.ts
   - Função getCategoryContext → lib/medical/clinical-context.ts
3. Crie types em types/medical.ts
4. NÃO mexa no layout visual por enquanto

Comece e me avise do progresso.
```

---

## Verificação de Segurança

Após a migração, verifique:

```bash
# 1. TypeScript sem erros
pnpm typecheck

# 2. Testes passando
pnpm test

# 3. Build funciona
pnpm build

# 4. Aplicação roda
pnpm dev
# Acesse http://localhost:3000 e teste:
# - Login funciona?
# - Dashboard carrega?
# - Anamnese funciona?
# - Chat funciona?
# - Tema dark/light funciona?
```

---

## Se Algo Der Errado

### Reverter Tudo
```bash
git checkout backup-pre-migration
git branch -D 1-wellwave-mvp
git checkout -b 1-wellwave-mvp
pnpm install
pnpm dev
```

### Reverter Último Commit
```bash
git reset --soft HEAD~1
```

### Ver Histórico
```bash
git log --oneline -10
```

---

## Checklist Pós-Migração

- [ ] Login/Logout funcionando
- [ ] Navegação entre páginas funcionando
- [ ] Dashboard exibe síndromes
- [ ] Criar anamnese funciona
- [ ] Red flags aparecem corretamente
- [ ] Texto narrativo é gerado
- [ ] Copiar texto funciona
- [ ] Chat com IA funciona
- [ ] Histórico de sessões funciona
- [ ] Tema dark/light funciona
- [ ] Responsivo em mobile
- [ ] Deploy em produção funcionando

---

## Arquivos de Referência

| Documento | Caminho | Descrição |
|-----------|---------|-----------|
| Documentação Completa | `docs/frontend-integration.md` | Tudo sobre a migração |
| Especificação | `specs/frontend-migration/spec.md` | Requisitos formais |
| Lista de Tasks | `specs/frontend-migration/tasks.md` | 36 tarefas detalhadas |
| Plano Claude | `.claude/plans/quiet-seeking-firefly.md` | Plano de execução |

---

## Dúvidas Frequentes

**P: Vou perder o chat com IA?**
R: Não. O chat está em `/components/chat/*` e `/app/api/*` que não serão modificados.

**P: Vou perder a autenticação?**
R: Não. A autenticação está em `/middleware.ts` e `/components/auth/*` que não serão modificados.

**P: Vou perder os dados do banco?**
R: Não. O Prisma schema e dados em Supabase não serão tocados.

**P: Posso fazer a migração em partes?**
R: Sim. Use as opções 2 ou 3 acima para migrar parcialmente.

**P: E se eu mudar o frontend depois?**
R: Atualize o repo `Oficial-frontend-` e execute a migração novamente.

---

**Documento criado em**: 2024-12-11
**Para uso quando você decidir migrar o frontend**
