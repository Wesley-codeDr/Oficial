# WellWave - Sistema de Anamnese Digital para Emergências

[![CI](https://github.com/Wesley-codeDr/Oficial/actions/workflows/ci.yml/badge.svg)](https://github.com/Wesley-codeDr/Oficial/actions/workflows/ci.yml)
[![Code Quality](https://github.com/Wesley-codeDr/Oficial/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Wesley-codeDr/Oficial/actions/workflows/code-quality.yml)
[![Security](https://github.com/Wesley-codeDr/Oficial/actions/workflows/security.yml/badge.svg)](https://github.com/Wesley-codeDr/Oficial/actions/workflows/security.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748.svg)](https://www.prisma.io/)
[![pnpm](https://img.shields.io/badge/pnpm-9.0-F69220.svg)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

WellWave é um sistema médico avançado para geração automática de anamneses (históricos médicos) em ambientes de pronto-socorro. O sistema transforma checkboxes simples em documentação clínica completa, juridicamente robusta e 100% compatível com as normas do Conselho Federal de Medicina (CFM).

## Funcionalidades Principais

- **Anamnese Digital**: Geração de texto médico a partir de checkboxes
- **Detecção de Red Flags**: Alertas automáticos para sinais críticos
- **Chat EBM**: Assistente de IA para consultas baseadas em evidências
- **3 Síndromes Suportadas**: Dor Torácica, Dispneia, Abdome Agudo
- **Modo Resumido/Detalhado**: Adapte o output ao seu workflow
- **Histórico de Sessões**: Acesse anamneses anteriores

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind CSS 4, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase) + Prisma ORM 6
- **Auth**: Supabase Auth
- **AI**: Vercel AI SDK + OpenAI GPT-4
- **State Management**: Zustand + TanStack Query
- **Monitoring**: Sentry
- **Testing**: Vitest (unit tests), Playwright (E2E)

---

Projeto desenvolvido usando **Spec-Driven Development** com o [GitHub Spec-Kit](https://github.com/github/spec-kit).

## 📋 Sobre Spec-Driven Development

Spec-Driven Development é uma metodologia que enfatiza a criação de especificações detalhadas antes da codificação, garantindo que assistentes de IA possam gerar código de alta qualidade alinhado aos requisitos do projeto.

## 🚀 Início Rápido

### 0. Gerenciador de Pacotes

Este projeto usa **pnpm** como gerenciador de pacotes padrão. Certifique-se de ter o pnpm instalado:

```bash
npm install -g pnpm
```

Ou siga as [instruções oficiais do pnpm](https://pnpm.io/installation).

**⚠️ Importante**: Este projeto está configurado para usar apenas pnpm. Não use npm ou yarn.

### 1. Configurar Banco de Dados

Este projeto usa **PostgreSQL** com **Prisma** como ORM e **Supabase** para serviços adicionais.

#### Desenvolvimento Local (Docker)

**Passo 1: Iniciar banco de dados local**
```bash
# Iniciar containers PostgreSQL
./scripts/docker-db.sh start
```

**Passo 2: Configurar .env**
```bash
# Script interativo
./scripts/setup-database.sh
# Escolha opção 1 (Desenvolvimento Local)

# Ou manualmente
cp env.template .env
# Descomente a DATABASE_URL local no .env
```

**Passo 3: Gerar cliente Prisma e aplicar schema**
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

#### Produção (Supabase + Vercel)

**Passo 1: Configurar .env**
```bash
./scripts/setup-database.sh
# Escolha opção 2 (Produção)
```

**Passo 2: Configurar variáveis no Vercel**
- Vá em Settings > Environment Variables
- Adicione todas as variáveis do `.env`
- Configure para Production e Preview

**⚠️ Importante:**
- Use sempre `?pgbouncer=true&sslmode=require` na `DATABASE_URL` em produção
- Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no client-side

Para mais detalhes, consulte [`docs/DATABASE.md`](docs/DATABASE.md).

### 2. Verificar Pré-requisitos

```bash
./scripts/check-prerequisites.sh
```

Este script verifica se você tem todas as ferramentas necessárias instaladas.

### 3. Criar uma Nova Feature

Para criar uma nova especificação de feature:

```bash
./scripts/setup-plan.sh nome-da-feature
```

Ou use o alias:

```bash
./scripts/create-new-feature.sh nome-da-feature
```

Isso criará a estrutura de diretórios em `specs/nome-da-feature/` com os templates necessários.

### 4. Workflow de Desenvolvimento

#### Passo 1: Escrever a Especificação

Edite `specs/[feature-name]/spec.md` com os requisitos da feature:
- User stories
- Requisitos funcionais e não-funcionais
- Restrições técnicas
- Métricas de sucesso

#### Passo 2: Gerar Plano de Implementação

Use o comando `/speckit.plan` no Claude Code para gerar o plano de implementação baseado na especificação:

```
/speckit.plan

Vamos usar [tecnologia] para implementar esta feature. 
[Detalhes adicionais sobre stack tecnológica]
```

Isso gerará ou atualizará `specs/[feature-name]/plan.md` com:
- Arquitetura do sistema
- Stack tecnológica
- Modelo de dados
- Design de API
- Fases de implementação

#### Passo 3: Gerar Breakdown de Tarefas

Use o comando `/speckit.tasks` para gerar a lista de tarefas:

```
/speckit.tasks
```

Isso criará `specs/[feature-name]/tasks.md` com:
- Tarefas organizadas por user story
- Dependências entre tarefas
- Marcadores de execução paralela `[P]`
- Caminhos de arquivos para implementação

#### Passo 4: Implementar

Use o comando `/speckit.implement` para executar a implementação:

```
/speckit.implement
```

O agente irá:
- Validar pré-requisitos (constitution, spec, plan, tasks)
- Executar tarefas na ordem correta
- Respeitar dependências e execução paralela
- Seguir abordagem TDD quando definida

## 📁 Estrutura do Projeto

```
.
├── app/                         # Next.js 16 App Router (raiz)
│   ├── (auth)/                 # Rotas públicas (login, signup)
│   ├── (dashboard)/            # Rotas protegidas (dashboard)
│   │   ├── anamnese/          # Gerador de anamnese
│   │   ├── chat/              # Chat EBM
│   │   └── history/           # Histórico de sessões
│   ├── api/                    # API Routes
│   ├── layout.tsx              # Layout raiz
│   └── page.tsx                # Página inicial
├── components/                  # Componentes React (raiz)
│   ├── ui/                     # shadcn/ui components
│   ├── medical/                # Componentes médicos
│   └── layout/                 # Componentes de layout
├── lib/                        # Bibliotecas e utilitários (raiz)
│   ├── ai/                     # Integração LLM
│   ├── db/                     # Prisma client
│   ├── templates/              # Templates médicos
│   └── utils/                  # Helpers
├── stores/                     # Zustand state management
├── hooks/                      # Custom React hooks
├── types/                      # TypeScript types
├── memory/
│   └── constitution.md         # Princípios e regras do projeto
├── specs/                      # Especificações Spec-Kit
│   └── [feature-name]/
│       ├── spec.md             # Especificação da feature
│       ├── plan.md             # Plano de implementação
│       ├── tasks.md            # Breakdown de tarefas
│       ├── research.md         # Pesquisa técnica (opcional)
│       ├── data-model.md       # Modelo de dados (opcional)
│       └── contracts/          # Contratos de API (opcional)
├── scripts/                    # Scripts de automação
│   ├── check-prerequisites.sh  # Verifica pré-requisitos
│   ├── setup-plan.sh          # Cria nova feature
│   ├── setup-database.sh      # Configura banco de dados
│   └── docker-db.sh           # Gerencia banco local Docker
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── seed.ts                # Seed de dados
├── docs/                       # Documentação técnica
│   ├── PRD.md                 # Product Requirements Document
│   ├── ARCHITECTURE.md        # Arquitetura do sistema
│   ├── DATABASE.md            # Documentação do banco
│   └── VERCEL.md              # Guia de deploy
├── templates/                  # Templates Spec-Kit
│   ├── spec-template.md       # Template de especificação
│   ├── plan-template.md       # Template de plano
│   └── tasks-template.md      # Template de tarefas
├── CLAUDE.md                   # Configuração do Claude
├── README.md                   # Este arquivo
└── package.json                # Dependências e scripts
```

**Nota**: O diretório `src/` existe mas contém apenas alguns componentes legados. A estrutura principal está em `app/`, `components/` e `lib/` na raiz do projeto.

## 🎯 Comandos Disponíveis

### Comandos do Spec-Kit

- `/speckit.plan` - Gera plano de implementação a partir da especificação
- `/speckit.tasks` - Gera breakdown de tarefas a partir do plano
- `/speckit.implement` - Executa implementação seguindo as tarefas

### Scripts Shell

- `./scripts/check-prerequisites.sh` - Verifica pré-requisitos
- `./scripts/setup-database.sh` - Configura banco de dados e Supabase
- `./scripts/docker-db.sh {start|stop|restart|logs|status|reset}` - Gerencia banco local Docker
- `./scripts/setup-plan.sh [feature-name]` - Cria nova feature
- `./scripts/create-new-feature.sh [feature-name]` - Alias para setup-plan.sh

### Comandos de Desenvolvimento

```bash
pnpm dev              # Inicia servidor de desenvolvimento (Turbopack)
pnpm build            # Build de produção
pnpm start            # Inicia servidor de produção
pnpm typecheck        # Verificação de tipos TypeScript
pnpm lint             # Executa ESLint
pnpm format           # Formata código com Prettier
```

### Comandos de Teste

```bash
pnpm vitest run       # Executa testes unitários (55 tests)
pnpm test             # Executa testes em modo watch
pnpm test:coverage    # Executa testes com cobertura
pnpm playwright test  # Executa testes E2E
pnpm test:e2e:ui      # Executa E2E com UI interativa
```

### Comandos de Análise

```bash
pnpm build:analyze    # Analisa bundle size (abre relatório no browser)
pnpm audit            # Auditoria de segurança das dependências
```

### Comandos Prisma

- `pnpm prisma generate` - Gera o cliente Prisma
- `pnpm prisma migrate dev` - Cria e aplica migrations
- `pnpm prisma db push` - Aplica o schema diretamente ao banco
- `pnpm prisma studio` - Abre o Prisma Studio (interface visual)
- `pnpm db:seed` - Popula banco com dados iniciais (síndromes, checkboxes)

## 🔧 Regras do Cursor

Este projeto inclui regras específicas para o Cursor IDE que garantem o uso correto do Spec-Driven Development:

- **`.cursorrules`** - Regras principais que o Cursor segue automaticamente
- **`.cursor/README.md`** - Guia de uso das regras
- **`.cursor/DEVELOPMENT.md`** - Guia completo de desenvolvimento

### Regra de Ouro
```
SEM ESPECIFICAÇÃO → SEM CÓDIGO
```

O Cursor está configurado para:
- ✅ Sempre verificar se specs existem antes de implementar
- ✅ Alertar quando tentar implementar sem spec
- ✅ Seguir a ordem: Spec → Plan → Tasks → Code
- ✅ Respeitar a arquitetura definida no plan.md
- ✅ Executar tarefas na ordem correta do tasks.md

## 🚀 Deploy no Vercel

O projeto está configurado para deploy automático no Vercel:

- **Projeto**: [oficial](https://vercel.com/wesley-codedrs-projects/oficial)
- **Documentação**: `docs/VERCEL.md` - Guia completo de configuração e deploy

### Configuração Rápida

1. Conecte o repositório Git no Vercel Dashboard
2. Configure as variáveis de ambiente (veja `docs/VERCEL.md`)
3. O deploy será feito automaticamente a cada push

### Variáveis de Ambiente Necessárias

- `DATABASE_URL` - Connection string do Supabase (com PgBouncer)
- `NEXT_PUBLIC_SUPABASE_URL` - URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave pública do Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Chave de serviço do Supabase (server-side only)

Veja `docs/VERCEL.md` para detalhes completos.

## 🔄 CI/CD com GitHub Actions

O projeto está configurado com GitHub Actions para CI/CD:

- **CI**: Validação automática (lint, typecheck, build) em cada PR
- **Code Quality**: Verificação de formatação e dependências
- **Security**: Auditoria de segurança e revisão de dependências
- **Prisma**: Validação de schema e migrations
- **Release**: Criação automática de releases

**Documentação**: `docs/GITHUB_ACTIONS.md` - Guia completo dos workflows

### Workflows Disponíveis

- `ci.yml` - CI básico (lint, typecheck, build)
- `code-quality.yml` - Verificação de qualidade de código
- `prisma-migrate.yml` - Validação de migrations do Prisma
- `security.yml` - Auditoria de segurança
- `release.yml` - Criação de releases

## 📚 Recursos

- [GitHub Spec-Kit Repository](https://github.com/github/spec-kit)
- [Spec-Driven Development Guide](https://github.com/github/spec-kit/blob/main/README.md)
- `.cursor/DEVELOPMENT.md` - Guia detalhado de desenvolvimento
- `docs/DATABASE.md` - Guia completo de configuração do banco de dados
- `docs/VERCEL.md` - Guia completo de configuração e deploy no Vercel
- `docs/GITHUB_ACTIONS.md` - Guia completo de CI/CD com GitHub Actions

## 🤝 Contribuindo

Ao trabalhar em novas features:

1. Sempre comece com uma especificação (`spec.md`)
2. Gere o plano de implementação (`plan.md`)
3. Crie o breakdown de tarefas (`tasks.md`)
4. Implemente seguindo as tarefas
5. Teste e documente

## 📝 Notas

- Todas as features devem seguir a `constitution.md`
- Especificações devem ser aprovadas antes da implementação
- Use TDD quando apropriado
- Mantenha a documentação atualizada
