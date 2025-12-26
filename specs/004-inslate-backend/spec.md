# Feature Specification: Inslate Backend - NestJS + Fastify

## Overview

Criação de um backend dedicado usando **NestJS** com **Fastify** como servidor HTTP para o serviço Inslate. Este backend será responsável por fornecer APIs RESTful de alta performance, integrando-se com o banco de dados PostgreSQL existente (via Prisma) e os serviços do Supabase.

O backend será desenvolvido como um serviço standalone que pode ser executado independentemente do frontend Next.js, permitindo escalabilidade e manutenção separadas.

## Problem Statement

O projeto precisa de uma camada de backend independente para escalar APIs, consolidar regras de negócio e reduzir acoplamento com o frontend. O modelo atual concentra responsabilidade em rotas do Next.js, o que limita governança de APIs, observabilidade e evolução para multi-serviço.

## Solution Summary

Implementar um serviço backend dedicado com NestJS + Fastify, integrado ao Prisma e Supabase, com padrões de autenticação, rate limiting, documentação OpenAPI e observabilidade via Sentry.

## Goals

- Criar uma API backend robusta e escalável usando NestJS com Fastify
- Integrar com o banco de dados PostgreSQL existente via Prisma
- Implementar autenticação e autorização usando Supabase
- Garantir alta performance com Fastify (mais rápido que Express)
- Manter compatibilidade com a arquitetura existente do projeto
- Implementar monitoramento e logging com Sentry
- Fornecer documentação automática da API (Swagger/OpenAPI)

## User Stories

### Story 1: Desenvolvedor - Configuração do Backend
**As a** desenvolvedor  
**I want** um backend NestJS configurado com Fastify  
**So that** posso desenvolver APIs de alta performance

**Acceptance Criteria:**
- [ ] Backend NestJS inicializado com Fastify adapter
- [ ] Configuração de ambiente (dev, test, prod)
- [ ] Integração com Prisma para acesso ao banco de dados
- [ ] Integração com Supabase para autenticação
- [ ] Configuração de CORS e segurança
- [ ] Logging e monitoramento com Sentry

### Story 2: Desenvolvedor - Estrutura Modular
**As a** desenvolvedor  
**I want** uma estrutura modular e organizada  
**So that** posso manter e escalar o código facilmente

**Acceptance Criteria:**
- [ ] Estrutura de módulos seguindo padrões NestJS
- [ ] Separação de concerns (controllers, services, repositories)
- [ ] DTOs (Data Transfer Objects) para validação
- [ ] Guards para autenticação e autorização
- [ ] Interceptors para transformação de respostas
- [ ] Exception filters para tratamento de erros

### Story 3: API Consumer - Endpoints RESTful
**As a** consumidor da API  
**I want** endpoints RESTful bem documentados  
**So that** posso integrar facilmente com o frontend

**Acceptance Criteria:**
- [ ] Endpoints seguindo convenções REST
- [ ] Documentação automática com Swagger/OpenAPI
- [ ] Validação de entrada com class-validator
- [ ] Respostas padronizadas (sucesso/erro)
- [ ] Códigos HTTP apropriados
- [ ] Paginação para listagens

### Story 4: Sistema - Performance e Escalabilidade
**As a** sistema  
**I want** alta performance e escalabilidade  
**So that** posso atender múltiplos clientes simultaneamente

**Acceptance Criteria:**
- [ ] Fastify como servidor HTTP (mais rápido que Express)
- [ ] Conexões de banco otimizadas
- [ ] Cache quando apropriado
- [ ] Rate limiting implementado
- [ ] Health check endpoints
- [ ] Métricas de performance

## Functional Requirements

1. **Configuração Base**
   - Backend NestJS inicializado com Fastify adapter
   - Configuração de variáveis de ambiente (.env compartilhado)
   - Suporte a múltiplos ambientes (development, test, production)
   - Scripts de build e execução (`pnpm dev`, `pnpm build`, `pnpm start`)
   - Porta configurável (padrão: 3001)
   - Health check endpoint básico (`/health`)

2. **Integração com Banco de Dados**
   - Integração com Prisma Client existente
   - Reutilização do schema Prisma atual (Patient, Anamnese)
   - Suporte a migrations do Prisma
   - Connection pooling otimizado

3. **Autenticação e Autorização**
   - Integração com Supabase Auth
   - Guards para proteger rotas
   - Validação de tokens JWT
   - Suporte a roles/permissões

4. **APIs RESTful**
   - CRUD completo para entidades existentes
   - Endpoints para Patient
   - Endpoints para Anamnese
   - Validação de dados de entrada
   - Tratamento de erros padronizado

5. **Documentação**
   - Swagger/OpenAPI configurado
   - Documentação automática dos endpoints
   - Exemplos de requisições/respostas
   - Schema de validação documentado

6. **Monitoramento e Logging**
   - Integração com Sentry (mesmo DSN do projeto principal)
   - Logging estruturado (usar logger do NestJS)
   - Health check endpoints (`/health`, `/health/db`, `/health/supabase`)
   - Métricas de performance (tempo de resposta, uso de memória)
   - Request/Response logging com interceptor

## Non-Functional Requirements

- **Performance**: 
  - Tempo de resposta < 200ms para 95% das requisições
  - Suporte a pelo menos 1000 requisições/segundo
  - Uso de Fastify para melhor performance

- **Security**: 
  - Validação de entrada em todos os endpoints
  - Proteção contra SQL injection (via Prisma)
  - CORS configurado adequadamente
  - Rate limiting implementado
  - Headers de segurança (helmet)

- **Scalability**: 
  - Arquitetura modular permitindo escalabilidade horizontal
  - Connection pooling otimizado
  - Suporte a múltiplas instâncias

- **Maintainability**: 
  - Código bem documentado
  - Testes unitários e de integração
  - Estrutura modular e organizada
  - TypeScript para type safety

- **Reliability**: 
  - Tratamento de erros robusto
  - Retry logic para operações críticas
  - Health checks para monitoramento
  - Logging adequado para debugging

## Technical Constraints

- Deve usar **NestJS** como framework
- Deve usar **Fastify** como servidor HTTP (não Express)
- Deve integrar com **Prisma** existente (não criar novo ORM)
- Deve usar **TypeScript** para type safety
- Deve seguir padrões e convenções do NestJS
- Deve manter compatibilidade com o banco PostgreSQL existente
- Deve usar **pnpm** como gerenciador de pacotes (consistente com o projeto)

## Dependencies

### Core
- **@nestjs/core**: Framework principal NestJS
- **@nestjs/common**: Utilitários comuns do NestJS
- **@nestjs/platform-fastify**: Adapter Fastify para NestJS (não Express)
- **fastify**: Servidor HTTP Fastify
- **reflect-metadata**: Necessário para decorators do TypeScript

### Database & ORM
- **@prisma/client**: Cliente Prisma existente (compartilhado com projeto Next.js)
- **prisma**: CLI Prisma para migrations (compartilhado)

### Authentication
- **@supabase/supabase-js**: Cliente Supabase para autenticação

### Validation & Transformation
- **class-validator**: Validação de DTOs
- **class-transformer**: Transformação de objetos

### Documentation
- **@nestjs/swagger**: Documentação Swagger/OpenAPI

### Monitoring & Logging
- **@sentry/nestjs**: Integração Sentry para NestJS
- **@sentry/node**: SDK Sentry para Node.js

### Configuration
- **@nestjs/config**: Gerenciamento de configuração e variáveis de ambiente

### Security & Performance
- **@nestjs/throttler**: Rate limiting
- **@fastify/helmet**: Headers de segurança (via plugin Fastify)
- **@fastify/cors**: Configuração CORS (via plugin Fastify)

### Development
- **@nestjs/cli**: CLI do NestJS para scaffolding
- **typescript**: TypeScript
- **ts-node**: Executar TypeScript diretamente
- **tsconfig-paths**: Suporte a path aliases

## Success Criteria

- API operando com latencia p95 < 200ms em endpoints criticos.
- Documentacao OpenAPI publicada e versionada.
- Observabilidade ativa com alertas de erros e desempenho.

## Risks and Mitigations

- **Risco:** aumento de complexidade operacional.  
  **Mitigacao:** scripts de deploy e monitoramento padrao.
- **Risco:** duplicacao de regras entre frontend e backend.  
  **Mitigacao:** consolidar regras criticas no backend e expor contratos claros.

## Out of Scope

- Migração de dados existentes
- Mudanças no schema do Prisma (usar schema existente)
- Frontend (já existe no Next.js)
- Deploy e infraestrutura (será tratado separadamente)
- Testes E2E completos (foco em unitários e integração)

## Success Metrics

- Backend inicializado e rodando localmente
- Integração com Prisma funcionando
- Integração com Supabase Auth funcionando
- Documentação Swagger acessível
- Health check respondendo corretamente
- Tempo de resposta < 200ms para endpoints principais
- Cobertura de testes > 70%

## Architecture Overview

### Estrutura de Diretórios

O backend será criado como um **subdiretório** do projeto principal, permitindo compartilhar recursos (Prisma schema, env vars) enquanto mantém separação de código:

```
Wavewell/Oficial/
├── inslate-backend/            # Backend NestJS (NOVO)
│   ├── src/
│   │   ├── main.ts            # Bootstrap da aplicação
│   │   ├── app.module.ts      # Módulo raiz
│   │   ├── config/            # Configurações
│   │   │   ├── database.config.ts
│   │   │   ├── swagger.config.ts
│   │   │   └── sentry.config.ts
│   │   ├── common/            # Recursos compartilhados
│   │   │   ├── guards/       # Guards de autenticação/autorização
│   │   │   ├── interceptors/ # Interceptors
│   │   │   ├── filters/      # Exception filters
│   │   │   ├── decorators/   # Custom decorators
│   │   │   └── dto/          # DTOs compartilhados
│   │   ├── modules/
│   │   │   ├── patient/      # Módulo Patient
│   │   │   │   ├── patient.controller.ts
│   │   │   │   ├── patient.service.ts
│   │   │   │   ├── patient.module.ts
│   │   │   │   └── dto/
│   │   │   ├── anamnese/     # Módulo Anamnese
│   │   │   │   ├── anamnese.controller.ts
│   │   │   │   ├── anamnese.service.ts
│   │   │   │   ├── anamnese.module.ts
│   │   │   │   └── dto/
│   │   │   ├── auth/         # Módulo de autenticação
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── guards/
│   │   │   │   └── strategies/
│   │   │   └── health/       # Health checks
│   │   │       ├── health.controller.ts
│   │   │       └── health.module.ts
│   │   └── prisma/           # Serviço Prisma
│   │       └── prisma.service.ts
│   ├── test/                  # Testes
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── nest-cli.json          # Configuração NestJS CLI
│   ├── tsconfig.json          # Configuração TypeScript
│   ├── tsconfig.build.json    # TypeScript para build
│   ├── package.json           # Dependências do backend
│   └── .env.example           # Exemplo de variáveis de ambiente
├── prisma/                     # Schema Prisma (COMPARTILHADO)
│   └── schema.prisma
├── .env                        # Variáveis de ambiente (COMPARTILHADO)
└── ... (resto do projeto Next.js)
```

### Decisões Arquiteturais

1. **Subdiretório vs Monorepo**: Backend como subdiretório para facilitar compartilhamento de recursos
2. **Prisma Compartilhado**: Usar o mesmo schema Prisma do projeto principal
3. **Env Compartilhado**: Compartilhar variáveis de ambiente relevantes
4. **Modularidade**: Estrutura modular seguindo padrões NestJS
5. **Separação de Concerns**: Controllers, Services, e Repositories bem separados

## Integration Points

1. **Prisma**: 
   - Usar o mesmo schema Prisma (`prisma/schema.prisma`)
   - Compartilhar o mesmo `@prisma/client` gerado
   - Usar a mesma `DATABASE_URL` e `SHADOW_DATABASE_URL`
   - Backend executará `prisma generate` durante build

2. **Supabase**: 
   - Usar as mesmas credenciais (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
   - Mesma configuração de autenticação
   - Validar tokens JWT do Supabase

3. **Sentry**: 
   - Usar o mesmo DSN do projeto principal
   - DSN: `https://893edabca7965e86e06718dbfcba0166@o4510188708691968.ingest.us.sentry.io/4510497457831936`
   - Configuração similar com `tracesSampleRate: 1` em dev
   - Integração via `@sentry/nestjs`

4. **Environment Variables**: 
   - Compartilhar `.env` na raiz do projeto
   - Variáveis adicionais específicas do backend:
     - `INSLATE_BACKEND_PORT=3001` (porta padrão do backend)
     - `INSLATE_BACKEND_HOST=0.0.0.0` (host padrão)
     - `INSLATE_BACKEND_ENV=development|production|test`

5. **Docker Compose**: 
   - Backend pode ser adicionado ao `docker-compose.yml` existente
   - Compartilhar a mesma rede Docker com PostgreSQL

## Notes

### Decisões Técnicas

- **Backend como Subdiretório**: O backend será criado em `inslate-backend/` dentro do projeto principal, permitindo compartilhar recursos enquanto mantém separação de código
- **Fastify vs Express**: Fastify foi escolhido por ser ~2x mais rápido que Express, especialmente para APIs de alta carga e baixa latência
- **Estrutura Modular**: A estrutura modular do NestJS facilitará manutenção, testes e escalabilidade
- **Documentação Swagger**: Será essencial para integração com o frontend Next.js e outros consumidores
- **Porta Padrão**: Backend rodará na porta `3001` por padrão (Next.js usa `3000`)

### Considerações Futuras

- **GraphQL**: Considerar implementar GraphQL no futuro se necessário
- **WebSockets**: Fastify suporta WebSockets nativamente, útil para real-time features
- **Microserviços**: A estrutura modular facilita migração para microserviços no futuro
- **Deploy Separado**: Backend pode ser deployado separadamente do frontend (ex: Railway, Render, AWS)

### Compatibilidade

- **Node.js**: Requer Node.js >= 18.x
- **TypeScript**: Usar TypeScript 5.x (compatível com projeto principal)
- **pnpm**: Usar pnpm como gerenciador de pacotes (consistente com projeto)
- **Prisma**: Compatível com Prisma 7.x usado no projeto

### Segurança

- **Helmet**: Usar `@fastify/helmet` para headers de segurança
- **CORS**: Configurar CORS adequadamente para permitir apenas origens confiáveis
- **Rate Limiting**: Implementar rate limiting para prevenir abuso
- **Validação**: Validar todas as entradas com `class-validator`
- **SQL Injection**: Prisma previne SQL injection automaticamente
