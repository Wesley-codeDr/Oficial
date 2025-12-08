# Cursor Rules - Guia de Uso

Este diretório contém as regras que o Cursor seguirá ao trabalhar neste projeto.

## Arquivo Principal

- `.cursorrules` - Regras principais do projeto (na raiz)

## Como Funciona

O Cursor lê automaticamente o arquivo `.cursorrules` na raiz do projeto e usa essas regras para guiar suas sugestões e implementações.

## Regras Principais

### 1. Spec-Driven Development Obrigatório
- **NUNCA** implemente código sem uma especificação aprovada
- **SEMPRE** verifique se `spec.md`, `plan.md` e `tasks.md` existem antes de codificar
- **SEMPRE** siga a ordem: Spec → Plan → Tasks → Code

### 2. Validações Obrigatórias
Antes de qualquer código:
- [ ] Constitution lida
- [ ] Spec existe e foi lida
- [ ] Plan existe e foi lido
- [ ] Tasks existem e foram lidas

### 3. Estrutura de Arquivos
- Respeite os caminhos definidos em `tasks.md`
- Siga a arquitetura definida em `plan.md`
- Não crie arquivos fora da estrutura sem atualizar a spec

## Comandos Úteis

### Criar Nova Feature
```bash
./scripts/setup-plan.sh nome-da-feature
```

### Verificar Pré-requisitos
```bash
./scripts/check-prerequisites.sh
```

### Comandos no Cursor
- `/speckit.plan` - Gerar plano de implementação
- `/speckit.tasks` - Gerar breakdown de tarefas
- `/speckit.implement` - Executar implementação

## Quando o Cursor Deve Alertar

O Cursor deve alertar o usuário quando:
1. Tentar implementar sem spec
2. Tentar mudar código fora da spec
3. Tentar pular etapas do workflow
4. Tentar criar arquivos fora da estrutura definida

## Exceções

A única exceção para implementar sem spec é:
- Correções de bugs críticos (mas devem ser documentadas depois)

## Fluxo Ideal

```
Usuário: "Quero implementar X"
  ↓
Cursor: Verifica se spec existe
  ↓
Se NÃO existe:
  → Alerta usuário
  → Sugere criar spec
  → Oferece ajuda
  ↓
Se existe:
  → Lê spec.md
  → Verifica plan.md
  → Verifica tasks.md
  → Implementa seguindo tasks.md
```

## Dicas

1. **Sempre comece pela spec** - É mais rápido no longo prazo
2. **Atualize specs quando necessário** - Não tente contornar
3. **Siga as tarefas na ordem** - Respeite dependências
4. **Use os templates** - Eles guiam a estrutura correta

## Troubleshooting

### "O Cursor não está seguindo as regras"
- Verifique se `.cursorrules` está na raiz do projeto
- Reinicie o Cursor
- Verifique se o arquivo está formatado corretamente

### "Quero fazer uma mudança rápida"
- Mesmo mudanças rápidas devem seguir o workflow
- Use os templates para criar specs rapidamente
- O tempo investido em spec economiza tempo depois

