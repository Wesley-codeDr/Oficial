# Development Container - WellWave

Este diretório contém a configuração para o VS Code DevContainer, que fornece um ambiente de desenvolvimento consistente e isolado.

## Stack Tecnológica

- **Frontend**: Next.js 16.1+, React 19.2+, TypeScript 5.x
- **Database**: PostgreSQL 16 (Supabase) com Prisma ORM 6.19+
- **UI**: Tailwind CSS 4.x, Radix UI, Framer Motion
- **State**: Zustand, React Query v5
- **Validation**: Zod 4.x, React Hook Form
- **Testing**: Vitest, Playwright
- **Package Manager**: pnpm

## Como Usar

### Pré-requisitos

- Docker Desktop instalado e rodando
- VS Code com extensão "Dev Containers" instalada
- Git

### Abrir em DevContainer

1. Clone o repositório
2. Abra o projeto no VS Code
3. Pressione `F1` (ou `Ctrl/Cmd+Shift+P`)
4. Digite "Dev Containers: Reopen in Container"
5. Selecione "WellWave Development Container"

### Primeiro Uso

Ao abrir o container pela primeira vez:

1. O Docker irá construir a imagem (pode demorar alguns minutos)
2. O `postCreateCommand` será executado automaticamente:
   - `pnpm install` - Instala dependências
   - `pnpm prisma generate` - Gera cliente Prisma

### Setup do Banco de Dados

O banco de dados PostgreSQL está incluído no DevContainer e inicia automaticamente:

```bash
# Verificar status do banco
docker ps

# Conectar ao banco
docker exec -it wellwave-db-1 psql -U postgres -d wellwave
```

## Serviços Disponíveis

### App Container

- Node.js LTS + pnpm
- Todas as dependências instaladas
- Volume montado para workspace
- Acesso ao banco de dados

### Database Container

- PostgreSQL 16
- Porta 5434 exposta
- Volume persistente para dados
- Health check configurado

## Portas

| Porta | Serviço | Descrição |
|--------|----------|-------------|
| 3000 | Next.js | Servidor de desenvolvimento |
| 5555 | Prisma Studio | Interface visual do banco |
| 5434 | PostgreSQL | Banco de dados |

## Comandos Úteis

### Dentro do Container

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Executar testes
pnpm test

# Executar testes E2E
pnpm test:e2e

# Abrir Prisma Studio
pnpm prisma studio

# Executar migrations
pnpm prisma migrate dev

# Ver logs do banco
docker logs wellwave-db-1

# Reiniciar o banco
docker restart wellwave-db-1
```

### Fora do Container

```bash
# Reconstruir o container
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Ver logs do container
docker-compose logs app
docker-compose logs db

# Acessar shell do container
docker-compose exec app zsh

# Resetar banco de dados
docker-compose down -v
docker-compose up -d
```

## Extensões VS Code

As seguintes extensões são instaladas automaticamente no DevContainer:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- TypeScript Nightly
- GitLens
- GitHub Copilot
- Vitest Explorer
- Playwright

## Configurações

As seguintes configurações do VS Code são aplicadas automaticamente:

- Format on save habilitado
- Prettier como formatter padrão
- ESLint fix on save
- TypeScript SDK do workspace
- Tailwind CSS class regex customizado

## Variáveis de Ambiente

O DevContainer usa variáveis de ambiente do host local:

```bash
# No seu .env local, estas variáveis serão passadas para o container
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY
```

Nota: A `DATABASE_URL` é sobrescrita automaticamente para apontar para o banco de dados do container.

## Troubleshooting

### Container não inicia

```bash
# Verificar logs do Docker
docker-compose logs

# Reconstruir container
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Banco de dados não conecta

```bash
# Verificar se o banco está rodando
docker ps

# Verificar logs do banco
docker logs wellwave-db-1

# Reiniciar o banco
docker restart wellwave-db-1
```

### Volume cheio

```bash
# Limpar volumes não usados
docker volume prune

# Resetar completamente (ATENÇÃO: apaga dados)
docker-compose down -v
docker-compose up -d
```

### Dependências não instalam

```bash
# Dentro do container, limpar e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Performance

O DevContainer é otimizado para performance:

- Volume cached para workspace
- Node.js LTS instalado diretamente
- pnpm para instalação rápida de dependências
- Build cache do Docker

## Customização

Para customizar o DevContainer:

1. Edite `.devcontainer/Dockerfile` para mudar a imagem base ou instalar ferramentas
2. Edite `.devcontainer/docker-compose.yml` para adicionar/remover serviços
3. Edite `.devcontainer/devcontainer.json` para mudar configurações do VS Code

## Vantagens

- ✅ Ambiente consistente para todos os desenvolvedores
- ✅ Sem necessidade de instalar Node.js/PostgreSQL localmente
- ✅ Dependências isoladas
- ✅ Fácil de replicar e resetar
- ✅ Todas as ferramentas pré-configuradas

## Estrutura do Projeto

```bash
Oficial/
├── app/              # Next.js 16 App Router (NÃO src/)
├── components/       # React components
├── lib/             # Business logic e utilities
├── prisma/          # Prisma schema e migrations (6.19+)
└── specs/           # Feature specifications
```

**IMPORTANTE**: O projeto usa `app/` diretamente na raiz, NÃO `src/app/`.

## Comandos Principais

```bash
# Development
pnpm dev              # Dev server com Turbo
pnpm build            # Production build
pnpm typecheck        # Type checking

# Database (Prisma 6.19+)
pnpm db:generate      # Generate Prisma Client
pnpm db:push          # Push schema
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Prisma Studio
pnpm db:reset         # Reset database

# Testing
pnpm test             # Vitest unit tests
pnpm test:e2e         # Playwright E2E tests
```

## Recursos

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Documentation](https://docs.docker.com/)
- [Dev Containers Features](https://github.com/devcontainers/features)

---

**Última atualização**: Janeiro 2026
**Stack**: Next.js 16.1+ | React 19.2+ | TypeScript 5.x | Prisma 6.19+
**Estrutura**: app/ (App Router) | components/ | lib/ | prisma/
