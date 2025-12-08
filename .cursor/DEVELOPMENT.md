# Guia de Desenvolvimento - Wavewell Oficial

## 🚨 Regra de Ouro

```
SEM ESPECIFICAÇÃO → SEM CÓDIGO
```

## 📋 Workflow Obrigatório

### Passo 1: Criar Especificação
```bash
./scripts/setup-plan.sh nome-da-feature
```

Edite `specs/nome-da-feature/spec.md` com:
- User stories
- Requisitos funcionais
- Requisitos não-funcionais
- Restrições técnicas

### Passo 2: Gerar Plano
No Cursor, use:
```
/speckit.plan
```

Isso gera `specs/nome-da-feature/plan.md` com:
- Arquitetura
- Stack tecnológica
- Modelo de dados
- Design de API

### Passo 3: Gerar Tarefas
No Cursor, use:
```
/speckit.tasks
```

Isso gera `specs/nome-da-feature/tasks.md` com:
- Tarefas ordenadas
- Dependências
- Caminhos de arquivos

### Passo 4: Implementar
No Cursor, use:
```
/speckit.implement
```

O Cursor irá:
- Validar pré-requisitos
- Executar tarefas na ordem
- Respeitar dependências
- Seguir TDD quando aplicável

## ✅ Checklist Antes de Codificar

- [ ] `memory/constitution.md` foi lido
- [ ] `specs/[feature]/spec.md` existe e foi aprovado
- [ ] `specs/[feature]/plan.md` existe e foi validado
- [ ] `specs/[feature]/tasks.md` existe e está completo
- [ ] Entendi a arquitetura do plan
- [ ] Entendi a ordem das tarefas
- [ ] Verifiquei as dependências

## 🛠️ Comandos Úteis

### Gerenciador de Pacotes

Este projeto usa **pnpm**. Sempre use pnpm para:
- Instalar dependências: `pnpm install`
- Adicionar pacotes: `pnpm add [package]`
- Executar scripts: `pnpm run [script]`
- Remover pacotes: `pnpm remove [package]`

### Scripts Shell
```bash
# Verificar pré-requisitos
./scripts/check-prerequisites.sh

# Criar nova feature
./scripts/setup-plan.sh minha-feature
```

### Comandos Cursor
```
/speckit.plan          # Gerar plano
/speckit.tasks         # Gerar tarefas
/speckit.implement     # Implementar
```

## 📁 Estrutura de Arquivos

```
specs/
└── [feature-name]/
    ├── spec.md        # ⚠️ OBRIGATÓRIO
    ├── plan.md        # ⚠️ OBRIGATÓRIO
    ├── tasks.md       # ⚠️ OBRIGATÓRIO
    └── contracts/     # Opcional
```

## ⚠️ O Que NÃO Fazer

❌ **NÃO** implemente código sem spec
❌ **NÃO** pule etapas do workflow
❌ **NÃO** crie arquivos fora da estrutura definida
❌ **NÃO** ignore dependências entre tarefas
❌ **NÃO** faça mudanças arquiteturais sem atualizar plan.md

## ✅ O Que Fazer

✅ **SEMPRE** comece pela especificação
✅ **SEMPRE** siga a ordem: Spec → Plan → Tasks → Code
✅ **SEMPRE** atualize specs quando necessário
✅ **SEMPRE** siga a arquitetura do plan.md
✅ **SEMPRE** respeite as tarefas do tasks.md

## 🔄 Quando Precisar Mudar Código

1. **PARE** a implementação
2. **ATUALIZE** `spec.md` primeiro
3. **ATUALIZE** `plan.md` se necessário
4. **ATUALIZE** `tasks.md` se necessário
5. **ENTÃO** continue a implementação

## 🎯 Prioridades

1. **ESPECIFICAÇÃO** (Prioridade Máxima)
2. **PLANO** (Antes de qualquer código)
3. **TAREFAS** (Guia a implementação)
4. **CÓDIGO** (Último na ordem)

## 💡 Dicas

- **Investir tempo em spec economiza tempo depois**
- **Specs bem escritas = código melhor**
- **Seguir o workflow = menos bugs**
- **Documentação atualizada = manutenção mais fácil**

## 🆘 Problemas Comuns

### "Quero fazer uma mudança rápida"
→ Mesmo mudanças rápidas devem seguir o workflow. Use templates para criar specs rapidamente.

### "O Cursor não está seguindo as regras"
→ Verifique se `.cursorrules` está na raiz. Reinicie o Cursor.

### "A spec está desatualizada"
→ Atualize a spec primeiro, depois o código.

## 📚 Referências

- `memory/constitution.md` - Princípios do projeto
- `CLAUDE.md` - Configuração do Claude
- `.cursorrules` - Regras do Cursor
- `README.md` - Documentação geral

