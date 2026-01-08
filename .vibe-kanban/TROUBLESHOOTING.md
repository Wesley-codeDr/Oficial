# Troubleshooting - Vibe Kanban

## Erro: ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND

### Problema

```
ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND  No package.json (or package.yaml, or package.json5) was found in "/private/var/folders/.../vibe-kanban/worktrees/..."
```

### Causa

O Vibe Kanban cria worktrees temporários (diretórios temporários) para cada tentativa de tarefa. Esses diretórios não contêm o `package.json` do projeto, causando erro quando o Vibe Kanban tenta executar comandos `pnpm` nesses diretórios.

### Soluções

#### Solução 1: Desabilitar Execução Automática (Recomendado)

**No Vibe Kanban:**
1. Vá em Configurações → Executores
2. Desabilite a execução automática de comandos
3. Use o Vibe Kanban apenas para visualização e gerenciamento de tarefas

**Execute comandos no terminal do projeto:**
```bash
cd /Users/wesleywillian/Oficial/Oficial
pnpm kanban:migrate
pnpm kanban:sync
pnpm dev
```

#### Solução 2: Usar Script Wrapper

Se você precisar que o Vibe Kanban execute comandos:

1. **Configure o executor no Vibe Kanban:**
   - Vá em Configurações → Executores → Cursor Agent CLI
   - Configure o caminho do executor para:
   ```
   /Users/wesleywillian/Oficial/Oficial/scripts/kanban/pnpm-wrapper.sh
   ```

2. **O wrapper detecta worktrees e redireciona automaticamente:**
   - Detecta se está em um worktree temporário
   - Redireciona para o diretório raiz do projeto
   - Executa o comando pnpm no diretório correto

#### Solução 3: Configurar Diretório de Trabalho Manualmente

**No Vibe Kanban, ao criar uma task attempt:**
1. Configure o diretório de trabalho para:
   ```
   /Users/wesleywillian/Oficial/Oficial
   ```
2. Não use worktrees temporários

### Prevenção

Para evitar esse erro no futuro:

1. **Use o Vibe Kanban principalmente para visualização:**
   - Visualizar tarefas
   - Gerenciar status (mover entre colunas)
   - Organizar por labels e filtros

2. **Execute comandos no terminal do projeto:**
   - Sempre execute comandos `pnpm` no diretório raiz do projeto
   - Use scripts do projeto: `pnpm kanban:migrate`, `pnpm kanban:sync`, etc.

3. **Sincronize periodicamente:**
   ```bash
   # No terminal do projeto
   pnpm kanban:sync
   ```

### Verificação

Para verificar se está no diretório correto:

```bash
# Verificar diretório atual
pwd

# Deve mostrar:
# /Users/wesleywillian/Oficial/Oficial

# Verificar se package.json existe
ls package.json

# Deve mostrar:
# package.json
```

### Referências

- [Documentação Completa](../docs/VIBE_KANBAN.md)
- [Configuração do Projeto](./config.json)
- [README](./README.md)

