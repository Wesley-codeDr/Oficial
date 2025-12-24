# Tratamento de erros

Este documento define um padrão recomendado para respostas de erro das APIs.

## Formato sugerido

```json
{
  "error": {
    "code": "AUTH_REQUIRED",
    "message": "Sessão inválida ou expirada.",
    "requestId": "req_01J8Q7..."
  }
}
```

## Convenções

- `code` deve ser curto e estável.
- `message` deve ser claro para o usuário final.
- `requestId` ajuda na investigação em logs.

## Status HTTP

- `400` Erro de validação
- `401` Não autenticado
- `403` Sem permissão
- `404` Não encontrado
- `429` Rate limit
- `500` Erro interno inesperado
