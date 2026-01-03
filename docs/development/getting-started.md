# Getting Started - Guia de Primeiros Passos

> **Versão**: 2.0
> **Última Atualização**: Janeiro 2026
> **Tempo Estimado**: 15-20 minutos

## Visão Geral

Este guia ajuda você a configurar o ambiente de desenvolvimento do WellWave/Oficial localmente.

## Pré-requisitos

### Software Obrigatório

- **Node.js**: 20+ (LTS)
- **pnpm**: 9+ (gerenciador de pacotes)
- **Docker**: Para banco de dados local
- **Git**: Para controle de versão

### Verificar Instalação

```bash
# Verificar versões
node --version    # Deve ser 20+
pnpm --version    # Deve ser 9+
docker --version  # Qualquer versão recente
git --version     # Qualquer versão recente

# Ou usar o script automático
./scripts/check-prerequisites.sh
```

### Instalar Dependências (se necessário)

```bash
# Node.js via nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# pnpm
npm install -g pnpm

# Docker Desktop
# Baixe em: https://www.docker.com/products/docker-desktop
```

## Setup Completo Passo-a-Passo

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/Oficial.git
cd Oficial
```

### 2. Instalar Dependências

```bash
pnpm install
```

Isso irá:

- Instalar todas as dependências do `package.json`
- Executar `postinstall` que gera o Prisma Client automaticamente
- Configurar husky para git hooks (se aplicável)

### 3. Configurar Variáveis de Ambiente

**Opção A: Script Interativo (Recomendado)**

```bash
./scripts/setup-database.sh
# Escolha opção 1 (Desenvolvimento Local)
```

**Opção B: Manual**

```bash
# Copiar template
cp env.template .env

# Editar .env
nano .env  # ou use seu editor favorito
```

Configuração mínima para desenvolvimento local:

```bash
# ---- DATABASE (Local) ----
DATABASE_URL="postgresql://postgres:devpassword@localhost:5432/postgres"
SHADOW_DATABASE_URL="postgresql://postgres:devpassword@localhost:5433/postgres_shadow"

# ---- ENVIRONMENT ----
NODE_ENV="development"

# ---- SUPABASE (Opcional em dev, obrigatório para auth) ----
NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-anon-key"
SUPABASE_SERVICE_ROLE_KEY="sua-service-role-key"
```

### 4. Iniciar Banco de Dados Local

```bash
# Iniciar containers PostgreSQL
./scripts/docker-db.sh start

# Verificar se está rodando
./scripts/docker-db.sh status
```

Isso criará:

- `ww_postgres` na porta 5432 (banco principal)
- `ww_postgres_shadow` na porta 5433 (banco para migrations)

### 5. Configurar Prisma e Database

```bash
# Gerar Prisma Client
pnpm db:generate

# Aplicar migrations
pnpm db:migrate

# (Opcional) Popular com dados de teste
pnpm db:seed
```

### 6. Iniciar Servidor de Desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em:

- **Frontend**: <http://localhost:3000>
- **API**: <http://localhost:3000/api>

### 7. Verificar Instalação

Abra o navegador em `http://localhost:3000` e você deve ver a página inicial do WellWave.

**Verificações Adicionais:**

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Testes (se aplicável)
pnpm test
```

## Comandos Úteis

### Desenvolvimento

```bash
pnpm dev                    # Servidor dev com Turbo
pnpm build                  # Build de produção
pnpm start                  # Servidor de produção
pnpm build:analyze          # Analisar bundle size
```

### Qualidade de Código

```bash
pnpm lint                   # ESLint
pnpm lint:fix               # ESLint com auto-fix
pnpm typecheck              # TypeScript type checking
pnpm format                 # Prettier format
pnpm format:check           # Prettier check apenas
```

### Database

```bash
pnpm db:generate            # Gera Prisma Client
pnpm db:push                # Push schema (sem migration)
pnpm db:migrate             # Cria e aplica migration
pnpm db:seed                # Popula banco
pnpm db:studio              # Prisma Studio (GUI)
```

### Docker

```bash
./scripts/docker-db.sh start     # Inicia containers
./scripts/docker-db.sh stop      # Para containers
./scripts/docker-db.sh restart   # Reinicia
./scripts/docker-db.sh logs      # Ver logs
./scripts/docker-db.sh status    # Ver status
./scripts/docker-db.sh reset     # Reset completo (CUIDADO!)
```

### Testes

```bash
pnpm test                   # Vitest (unit tests)
pnpm test:ui                # Vitest UI
pnpm test:coverage          # Coverage report
pnpm test:e2e               # Playwright (E2E)
pnpm test:e2e:ui            # Playwright UI
```

## Estrutura de Pastas

```bash
Oficial/
├── app/                    # Next.js 16 App Router
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Rotas autenticadas
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── medical/          # Componentes médicos
├── lib/                  # Business logic
│   ├── supabase/        # Cliente Supabase
│   └── utils/           # Utilities
├── prisma/              # Prisma ORM
│   ├── schema.prisma    # Schema
│   └── migrations/      # Migrations
├── public/              # Assets estáticos
├── styles/              # Estilos globais
└── docs/                # Documentação
```

## Próximos Passos

Após setup completo:

1. **Explorar a Documentação**
   - [ARCHITECTURE.md](../ARCHITECTURE.md) - Arquitetura do sistema
   - [DATABASE.md](../DATABASE.md) - Configuração de banco
   - [CODING_STANDARDS.md](./coding-standards.md) - Padrões de código

2. **Entender o Workflow**
   - Leia sobre [Spec-Driven Development](../SPEC_KIT_IMPLEMENTATION.md)
   - Veja exemplos em `specs/`

3. **Configurar IDE**
   - Instale extensões do ESLint e Prettier
   - Configure formatação automática ao salvar
   - Habilite TypeScript strict mode no editor

4. **Começar a Desenvolver**
   - Crie uma branch: `git checkout -b feature/minha-feature`
   - Siga o workflow de specs (`specs/[feature]/spec.md`)
   - Submeta PR quando pronto

## Troubleshooting Comum

### "Cannot find module '@prisma/client'"

```bash
pnpm db:generate
```

### "Can't reach database server"

```bash
# Verificar se Docker está rodando
./scripts/docker-db.sh status

# Reiniciar containers
./scripts/docker-db.sh restart
```

### "Port 3000 already in use"

```bash
# Encontrar processo
lsof -ti:3000

# Matar processo
kill -9 $(lsof -ti:3000)

# Ou usar porta diferente
PORT=3001 pnpm dev
```

### Erros de TypeScript

```bash
# Limpar cache e rebuildar
rm -rf .next node_modules
pnpm install
pnpm typecheck
```

### Build muito lento

```bash
# Verificar uso de memória
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

## Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Suporte

Se encontrar problemas:

1. Consulte [TROUBLESHOOTING.md](../TROUBLESHOOTING.md)
2. Verifique [GitHub Issues](https://github.com/seu-usuario/Oficial/issues)
3. Abra uma nova issue com detalhes do erro

---

**Próximo**: [Coding Standards](./coding-standards.md)
