# GitHub Actions - CI/CD

Este documento descreve os workflows do GitHub Actions configurados no projeto Wavewell Oficial.

## 📋 Workflows Disponíveis

### 1. CI (Continuous Integration)

**Arquivo**: `.github/workflows/ci.yml`

**Trigger**: 
- Push para `main`, `master` ou `develop`
- Pull Requests para `main`, `master` ou `develop`

**Jobs**:
- **lint-and-typecheck**: Executa ESLint e verificação de tipos TypeScript
- **prisma-validate**: Valida o schema do Prisma e verifica formatação
- **build**: Gera Prisma Client e faz build do Next.js

**Duração estimada**: ~3-5 minutos

### 2. Code Quality

**Arquivo**: `.github/workflows/code-quality.yml`

**Trigger**:
- Push para `main`, `master` ou `develop`
- Pull Requests para `main`, `master` ou `develop`
- Manual (`workflow_dispatch`)

**Jobs**:
- **check-formatting**: Verifica formatação de `package.json` e schema Prisma
- **check-dependencies**: Verifica dependências desatualizadas e vulnerabilidades

**Duração estimada**: ~2-3 minutos

### 3. Prisma Migrate Check

**Arquivo**: `.github/workflows/prisma-migrate.yml`

**Trigger**:
- Push para `main` ou `master` quando há mudanças em `prisma/schema.prisma` ou `prisma/migrations/**`
- Pull Requests para `main` ou `master` com mudanças no Prisma
- Manual (`workflow_dispatch`)

**Jobs**:
- **check-migrations**: Valida schema e verifica status das migrations

**Duração estimada**: ~1-2 minutos

**Nota**: Este workflow requer `DATABASE_URL` configurado como secret para verificar migrations. Em PRs de forks, o check é pulado.

### 4. Security

**Arquivo**: `.github/workflows/security.yml`

**Trigger**:
- Push para `main`, `master` ou `develop`
- Pull Requests para `main`, `master` ou `develop`
- Semanalmente (segundas-feiras às 00:00 UTC)
- Manual (`workflow_dispatch`)

**Jobs**:
- **dependency-review**: Revisa dependências em Pull Requests
- **audit**: Executa auditoria de segurança e verifica vulnerabilidades

**Duração estimada**: ~2-3 minutos

### 5. Release

**Arquivo**: `.github/workflows/release.yml`

**Trigger**:
- Push de tags `v*` (ex: `v1.0.0`)
- Manual (`workflow_dispatch`) com input de versão

**Jobs**:
- **create-release**: Cria release no GitHub com build validado

**Duração estimada**: ~3-5 minutos

## 🔧 Configuração

### Secrets Necessários

Configure os seguintes secrets no GitHub (Settings > Secrets and variables > Actions):

#### Obrigatórios para Build

- `DATABASE_URL`: Connection string do banco de dados (para gerar Prisma Client)
- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave pública do Supabase

#### Opcionais

- `SUPABASE_SERVICE_ROLE_KEY`: Chave de serviço do Supabase (para migrations em produção)

### Como Configurar Secrets

1. Acesse o repositório no GitHub
2. Vá em **Settings > Secrets and variables > Actions**
3. Clique em **New repository secret**
4. Adicione cada secret com seu valor

**⚠️ Importante**: 
- Secrets são criptografados e não podem ser visualizados após criação
- Use secrets diferentes para diferentes ambientes se necessário
- Nunca commite secrets no código

## 🚀 Uso dos Workflows

### Executar Manualmente

Alguns workflows podem ser executados manualmente:

1. Acesse a aba **Actions** no GitHub
2. Selecione o workflow desejado
3. Clique em **Run workflow**
4. Selecione a branch e clique em **Run workflow**

### Verificar Status

- **Badge de Status**: Adicione ao README:
  ```markdown
  ![CI](https://github.com/USERNAME/REPO/workflows/CI/badge.svg)
  ```

- **Actions Tab**: Veja todos os runs em **Actions** no GitHub

### Troubleshooting

#### Build Falha

**Erro**: "Prisma Client not generated"
- **Solução**: Verifique se `DATABASE_URL` está configurado como secret

**Erro**: "Module not found"
- **Solução**: Verifique se todas as dependências estão no `package.json`

#### Lint Falha

**Erro**: "ESLint errors"
- **Solução**: Execute `pnpm lint` localmente e corrija os erros

#### Type Check Falha

**Erro**: "Type errors"
- **Solução**: Execute `pnpm exec tsc --noEmit` localmente e corrija os erros

#### Prisma Validate Falha

**Erro**: "Prisma schema validation failed"
- **Solução**: Execute `pnpm prisma validate` localmente e corrija o schema

## 📊 Status Checks

Os workflows criam status checks que podem ser configurados como required para merge:

1. Vá em **Settings > Branches**
2. Adicione ou edite a branch protection rule
3. Marque os seguintes checks como required:
   - ✅ `lint-and-typecheck`
   - ✅ `prisma-validate`
   - ✅ `build`

## 🔄 Integração com Vercel

Os workflows do GitHub Actions trabalham em conjunto com o Vercel:

1. **CI**: Valida código antes do merge
2. **Vercel**: Faz deploy automático após merge
3. **Release**: Cria release após tag, Vercel faz deploy da versão

### Deploy Automático

O Vercel detecta automaticamente:
- Push para branch principal → Deploy de produção
- Pull Request → Deploy de preview

## 📝 Adicionar Novos Workflows

Para adicionar novos workflows:

1. Crie arquivo `.yml` em `.github/workflows/`
2. Siga a estrutura dos workflows existentes
3. Use `pnpm` como gerenciador de pacotes
4. Use Node.js 22
5. Use `pnpm/action-setup@v4` para configurar pnpm

### Exemplo de Workflow Básico

```yaml
name: My Workflow

on:
  push:
    branches: [main]

jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm run my-script
```

## 🎯 Boas Práticas

1. **Sempre teste localmente** antes de fazer push
2. **Use `--frozen-lockfile`** no CI para garantir builds reproduzíveis
3. **Configure branch protection** para exigir status checks
4. **Mantenha workflows simples** e focados
5. **Use cache** quando possível para acelerar builds
6. **Documente mudanças** nos workflows

## 📚 Recursos

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [pnpm GitHub Action](https://github.com/pnpm/action-setup)
- [Node.js GitHub Action](https://github.com/actions/setup-node)
- [Prisma CI/CD Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs do workflow no GitHub
2. Execute os comandos localmente para reproduzir o erro
3. Consulte a documentação acima
4. Abra uma issue no repositório

---

**Última atualização**: Configurado para Next.js 16, Prisma 7, pnpm 10

