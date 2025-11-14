---
title: HTTP Codes vs RESTful APIs pt-BR
description: Análise
sidebar:
  order: 1
---

## Melhores Práticas de Códigos de Status HTTP para Design de APIs RESTful

### Sumário

1. Categorias de Códigos de Status HTTP
2. Códigos de Status Informativos 1xx
3. Códigos de Status de Sucesso 2xx
4. Códigos de Status de Redirecionamento 3xx
5. Códigos de Status de Erro do Cliente 4xx
6. Códigos de Status de Erro do Servidor 5xx
7. Árvores de Decisão para Escolha de Códigos de Status
8. Erros Comuns e Antipadrões
9. Padrões de Tratamento de Erros
10. Códigos de Status de Autenticação/Autorização
11. Melhores Práticas da Indústria
12. Exemplos de Respostas JSON
13. Padrões RFC e Referências

---

### Categorias de Códigos de Status HTTP {#categorias}

Os códigos de status HTTP são divididos em cinco categorias baseadas no primeiro dígito:

- **1xx (Informativo)**: Comunica informações do protocolo de transferência
- **2xx (Sucesso)**: Indica que a requisição do cliente foi aceita com sucesso
- **3xx (Redirecionamento)**: Indica que o cliente deve executar ações adicionais para completar a requisição
- **4xx (Erro do Cliente)**: Aponta para erros cometidos pelo cliente
- **5xx (Erro do Servidor)**: O servidor assume a responsabilidade por estes códigos de erro

---

### Códigos de Status Informativos 1xx {#1xx}

#### 100 Continue

- **Caso de Uso**: O cliente deve continuar com a requisição
- **Quando Usar**: Para requisições grandes onde você deseja validar cabeçalhos antes de enviar o corpo
- **Exemplo**: Upload de arquivos onde você verifica autorização primeiro

#### 101 Switching Protocols

- **Caso de Uso**: O servidor está mudando protocolos (ex: HTTP para WebSocket)
- **Quando Usar**: Cenários de upgrade de protocolo
- **Exemplo**: Handshake do WebSocket

#### 102 Processing (WebDAV)

- **Caso de Uso**: O servidor recebeu e está processando a requisição
- **Quando Usar**: Operações de longa duração para prevenir timeout do cliente
- **Exemplo**: Operações de processamento de arquivos grandes

#### 103 Early Hints

- **Caso de Uso**: Retorna alguns cabeçalhos de resposta antes da resposta final
- **Quando Usar**: Para permitir pré-carregamento de recursos
- **Exemplo**: Enviando cabeçalhos Link para pré-carregamento de recursos

---

### Códigos de Status de Sucesso 2xx {#2xx}

#### 200 OK

- **Caso de Uso**: A requisição foi bem-sucedida
- **Quando Usar**:
  - GET: Recurso recuperado com sucesso
  - PUT: Recurso atualizado com sucesso
  - POST: Ação completada com sucesso (mas nenhum recurso criado)
- **Exemplo JSON**:

```json
{
  "id": 123,
  "nome": "João Silva",
  "email": "joao@exemplo.com"
}
```

#### 201 Created

- **Caso de Uso**: Recurso criado com sucesso
- **Quando Usar**: Requisições POST que criam novos recursos
- **Cabeçalhos Obrigatórios**: Cabeçalho Location com URI do novo recurso
- **Exemplo JSON**:

```json
HTTP/1.1 201 Created
Location: /api/usuarios/123
Content-Type: application/json

{
  "id": 123,
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "criado_em": "2023-01-01T12:00:00Z"
}
```

#### 202 Accepted

- **Caso de Uso**: Requisição aceita mas ainda não processada
- **Quando Usar**: Operações assíncronas, processamento em lote
- **Melhor Prática**: Incluir endpoint de monitoramento de status
- **Exemplo JSON**:

```json
{
  "mensagem": "Requisição aceita para processamento",
  "url_status": "/api/jobs/456/status",
  "conclusao_estimada": "2023-01-01T12:05:00Z"
}
```

#### 204 No Content

- **Caso de Uso**: Requisição bem-sucedida mas sem conteúdo para retornar
- **Quando Usar**: Operações DELETE, PUT ou PATCH sem corpo de resposta
- **Importante**: NÃO deve incluir corpo de mensagem

#### 206 Partial Content

- **Caso de Uso**: Entrega de recurso parcial
- **Quando Usar**: Requisições de range para arquivos grandes
- **Cabeçalhos Obrigatórios**: Cabeçalho Content-Range

---

### Códigos de Status de Redirecionamento 3xx {#3xx}

#### 301 Moved Permanently

- **Caso de Uso**: Recurso movido permanentemente para nova URI
- **Quando Usar**: Versionamento de API, mudanças permanentes de URL
- **Cabeçalhos Obrigatórios**: Cabeçalho Location com nova URI
- **Melhor Prática**: Raramente usado em APIs devido a estratégias de versionamento

#### 302 Found

- **Caso de Uso**: Recurso temporariamente movido
- **Quando Usar**: Redirecionamentos temporários
- **Observação**: O método pode mudar para GET em alguns clientes

#### 303 See Other

- **Caso de Uso**: Resposta disponível em URI diferente via GET
- **Quando Usar**: Após POST para redirecionar para representação do recurso
- **Melhor Prática**: Preferido sobre 302 para padrão POST-redirect-GET

#### 304 Not Modified

- **Caso de Uso**: Recurso não alterado desde a última requisição
- **Quando Usar**: Requisições condicionais com If-Modified-Since ou If-None-Match
- **Obrigatório**: Cabeçalhos ETag ou Last-Modified

#### 307 Temporary Redirect

- **Caso de Uso**: Redirecionamento temporário preservando método HTTP
- **Quando Usar**: Quando o método não deve mudar (ao contrário do 302)
- **Melhor Prática**: Use em vez de 302 para métodos não-GET

#### 308 Permanent Redirect

- **Caso de Uso**: Redirecionamento permanente preservando método HTTP
- **Quando Usar**: Quando o método não deve mudar (ao contrário do 301)
- **Melhor Prática**: Use em vez de 301 para métodos não-GET

---

### Códigos de Status de Erro do Cliente 4xx {#4xx}

#### 400 Bad Request

- **Caso de Uso**: Erro genérico do cliente
- **Quando Usar**: Sintaxe de requisição malformada, parâmetros inválidos
- **Exemplo JSON**:

```json
{
  "erro": {
    "codigo": "BAD_REQUEST",
    "mensagem": "Formato de requisição inválido",
    "detalhes": [
      {
        "campo": "email",
        "mensagem": "Formato de email inválido"
      }
    ]
  }
}
```

#### 401 Unauthorized

- **Caso de Uso**: Autenticação necessária ou falhou
- **Quando Usar**: Credenciais de autenticação ausentes ou inválidas
- **Cabeçalhos Obrigatórios**: Cabeçalho WWW-Authenticate
- **Observação**: Semanticamente significa "não autenticado"
- **Exemplo JSON**:

```json
{
  "erro": {
    "codigo": "UNAUTHORIZED",
    "mensagem": "Autenticação necessária",
    "detalhes": "Por favor, forneça credenciais de autenticação válidas"
  }
}
```

#### 403 Forbidden

- **Caso de Uso**: Acesso negado (autenticado mas não autorizado)
- **Quando Usar**: Usuário não tem permissão para o recurso
- **Diferença do 401**: Identidade do cliente é conhecida mas o acesso é negado
- **Exemplo JSON**:

```json
{
  "erro": {
    "codigo": "FORBIDDEN",
    "mensagem": "Acesso negado",
    "detalhes": "Permissões insuficientes para acessar este recurso"
  }
}
```

#### 404 Not Found

- **Caso de Uso**: Recurso não encontrado
- **Quando Usar**:
  - Recurso não existe
  - Endpoint não existe
  - Ocultar existência do recurso de usuários não autorizados
- **Exemplo JSON**:

```json
{
  "erro": {
    "codigo": "NOT_FOUND",
    "mensagem": "Recurso não encontrado",
    "detalhes": "O recurso solicitado não existe"
  }
}
```

#### 405 Method Not Allowed

- **Caso de Uso**: Método HTTP não suportado para o recurso
- **Quando Usar**: Usando POST em recurso somente leitura, DELETE em recurso imutável
- **Cabeçalhos Obrigatórios**: Cabeçalho Allow listando métodos suportados
- **Exemplo JSON**:

```json
HTTP/1.1 405 Method Not Allowed
Allow: GET, POST

{
  "erro": {
    "codigo": "METHOD_NOT_ALLOWED",
    "mensagem": "Método não permitido",
    "metodos_permitidos": ["GET", "POST"]
  }
}
```

#### 406 Not Acceptable

- **Caso de Uso**: Servidor não pode produzir tipo de conteúdo solicitado
- **Quando Usar**: Cabeçalho Accept especifica tipo de mídia não suportado
- **Exemplo JSON**:

```json
{
  "erro": {
    "codigo": "NOT_ACCEPTABLE",
    "mensagem": "Tipo de conteúdo solicitado não suportado",
    "tipos_suportados": ["application/json", "application/xml"]
  }
}
```

#### 408 Request Timeout

- **Caso de Uso**: Servidor expirou esperando pela requisição
- **Quando Usar**: Cliente demorou muito para enviar requisição completa
- **Melhor Prática**: Inclua cabeçalho Retry-After se apropriado

#### 409 Conflict

- **Caso de Uso**: Requisição conflita com estado atual do recurso
- **Quando Usar**:
  - Falhas de bloqueio otimista
  - Conflitos de estado do recurso
  - Criação de recurso duplicado
- **Exemplo JSON**:

```json
{
  "erro": {
    "codigo": "CONFLICT",
    "mensagem": "Conflito de recurso",
    "detalhes": "Recurso foi modificado por outra requisição"
  }
}
```

#### 410 Gone

- **Caso de Uso**: Recurso permanentemente removido
- **Quando Usar**: Recurso intencionalmente removido e não retornará
- **Diferença do 404**: Indica explicitamente remoção permanente

#### 412 Precondition Failed

- **Caso de Uso**: Pré-condições nos cabeçalhos de requisição não atendidas
- **Quando Usar**: Condições If-Match, If-None-Match, If-Modified-Since falham
- **Uso Comum**: Controle de concorrência otimista

#### 413 Content Too Large

- **Caso de Uso**: Entidade de requisição maior que limites do servidor
- **Quando Usar**: Uploads de arquivos excedendo limites de tamanho
- **Melhor Prática**: Inclua cabeçalho Retry-After se temporário

#### 415 Unsupported Media Type

- **Caso de Uso**: Formato de entidade de requisição não suportado
- **Quando Usar**: Cabeçalho Content-Type especifica formato não suportado
- **Exemplo JSON**:

```json
{
  "erro": {
    "codigo": "UNSUPPORTED_MEDIA_TYPE",
    "mensagem": "Tipo de mídia não suportado",
    "tipos_suportados": ["application/json", "application/xml"]
  }
}
```

#### 422 Unprocessable Entity

- **Caso de Uso**: Requisição bem formada mas semanticamente inválida
- **Quando Usar**: Erros de validação, violações de regras de negócio
- **Exemplo JSON**:

```json
{
  "erro": {
    "codigo": "UNPROCESSABLE_ENTITY",
    "mensagem": "Falha na validação",
    "detalhes": [
      {
        "campo": "idade",
        "mensagem": "Deve estar entre 0 e 120"
      },
      {
        "campo": "email",
        "mensagem": "Deve ser único"
      }
    ]
  }
}
```

#### 429 Too Many Requests

- **Caso de Uso**: Limite de taxa excedido
- **Quando Usar**: Cliente excedeu limites de taxa de requisições
- **Cabeçalhos Obrigatórios**: Cabeçalho Retry-After
- **Exemplo JSON**:

```json
HTTP/1.1 429 Too Many Requests
Retry-After: 3600

{
  "erro": {
    "codigo": "RATE_LIMIT_EXCEEDED",
    "mensagem": "Limite de taxa excedido",
    "repetir_apos": 3600,
    "limite": 100,
    "restante": 0
  }
}
```

---

### Códigos de Status de Erro do Servidor 5xx {#5xx}

#### 500 Internal Server Error

- **Caso de Uso**: Erro genérico do servidor
- **Quando Usar**: Condições inesperadas do servidor
- **Melhor Prática**: Registre detalhes internamente, retorne mensagem genérica ao cliente
- **Exemplo JSON**:

```json
{
  "erro": {
    "codigo": "INTERNAL_SERVER_ERROR",
    "mensagem": "Ocorreu um erro inesperado",
    "detalhes": "Por favor, tente novamente mais tarde"
  }
}
```

#### 501 Not Implemented

- **Caso de Uso**: Servidor não suporta funcionalidade solicitada
- **Quando Usar**: Funcionalidade ainda não implementada
- **Melhor Prática**: Indique possível disponibilidade futura

#### 502 Bad Gateway

- **Caso de Uso**: Servidor atuando como gateway recebeu resposta inválida
- **Quando Usar**: Erros de servidor upstream em microserviços
- **Melhor Prática**: Distinga de 500 para depuração

#### 503 Service Unavailable

- **Caso de Uso**: Servidor temporariamente indisponível
- **Quando Usar**: Manutenção, sobrecarga, interrupções temporárias
- **Cabeçalhos Obrigatórios**: Cabeçalho Retry-After quando possível
- **Exemplo JSON**:

```json
HTTP/1.1 503 Service Unavailable
Retry-After: 1800

{
  "erro": {
    "codigo": "SERVICE_UNAVAILABLE",
    "mensagem": "Serviço temporariamente indisponível",
    "repetir_apos": 1800
  }
}
```

#### 504 Gateway Timeout

- **Caso de Uso**: Timeout do gateway esperando resposta upstream
- **Quando Usar**: Servidor upstream demorou muito para responder
- **Melhor Prática**: Configure valores de timeout apropriados

---

### Árvores de Decisão para Escolha de Códigos de Status {#arvores-decisao}

#### Árvore de Decisão Primária

```
Requisição Recebida
├─► Problema de Autenticação? → 401 Unauthorized
│   ↓
├─► Problema de Autorização? → 403 Forbidden
│   ↓
├─► Recurso Não Encontrado? → 404 Not Found
│   ↓
├─► Método Não Permitido? → 405 Method Not Allowed
│   ↓
├─► Formato da Requisição Válido?
│   ├─► Não → 400 Bad Request
│   ├─► Tipo de Mídia Não Suportado → 415 Unsupported Media Type
│   ├─► Conteúdo Muito Grande → 413 Content Too Large
│   └─► Sim ↓
│
├─► Validação Passou?
│   ├─► Não → 422 Unprocessable Entity
│   └─► Sim ↓
│
├─► Conflito de Recurso? → 409 Conflict
│   ↓
├─► Limite de Taxa? → 429 Too Many Requests
│   ↓
├─► Erro do Servidor? → 500/502/503/504
│   ↓
└─► Sucesso
    ├─► Recurso Criado? → 201 Created
    ├─► Sem Conteúdo? → 204 No Content
    ├─► Aceito para Processamento? → 202 Accepted
    └─► Sucesso Padrão → 200 OK
```

#### Árvore de Decisão de Resposta de Sucesso

```
Requisição Bem-Sucedida
├─► Você criou um novo recurso?
│   ├─► Sim → 201 Created (com cabeçalho Location)
│   └─► Não ↓
│
├─► Você tem conteúdo para retornar?
│   ├─► Não → 204 No Content
│   └─► Sim ↓
│
├─► O processamento é assíncrono?
│   ├─► Sim → 202 Accepted
│   └─► Não ↓
│
└─► 200 OK
```

#### Árvore de Decisão de Resposta de Erro

```
Erro Ocorreu
├─► É um erro do cliente?
│   ├─► Autenticação ausente/inválida → 401 Unauthorized
│   ├─► Permissão negada → 403 Forbidden
│   ├─► Recurso não encontrado → 404 Not Found
│   ├─► Método não suportado → 405 Method Not Allowed
│   ├─► Formato de requisição inválido → 400 Bad Request
│   ├─► Validação falhou → 422 Unprocessable Entity
│   ├─► Limite de taxa excedido → 429 Too Many Requests
│   └─► Conflito de recurso → 409 Conflict
│
└─► É um erro do servidor?
    ├─► Servidor sobrecarregado/manutenção → 503 Service Unavailable
    ├─► Erro de gateway/proxy → 502 Bad Gateway
    ├─► Timeout do gateway → 504 Gateway Timeout
    ├─► Funcionalidade não implementada → 501 Not Implemented
    └─► Erro inesperado → 500 Internal Server Error
```

---

### Erros Comuns e Antipadrões {#erros-comuns}

#### 1. Usar 200 OK para Tudo

❌ **Errado**:

```json
HTTP/1.1 200 OK
{
  "sucesso": false,
  "erro": "Usuário não encontrado"
}
```

✅ **Correto**:

```json
HTTP/1.1 404 Not Found
{
  "erro": {
    "codigo": "NOT_FOUND",
    "mensagem": "Usuário não encontrado"
  }
}
```

#### 2. Retornar 404 para Problemas de Autorização

❌ **Errado**: Usar 404 para ocultar recursos de usuários não autorizados em todos os casos
✅ **Correto**: Use 401 para problemas de autenticação, 403 para problemas de autorização

#### 3. Não Distinguir Entre 401 e 403

❌ **Errado**: Usar 401 para todos os cenários de acesso negado
✅ **Correto**:

- 401: Autenticação necessária/falhou
- 403: Autenticado mas não autorizado

#### 4. Usar 500 para Erros de Validação

❌ **Errado**: Retornar 500 para falhas de validação de lógica de negócio
✅ **Correto**: Use 400 para erros de formato, 422 para erros de validação

#### 5. Não Incluir Cabeçalhos Obrigatórios

❌ **Errado**:

```http
HTTP/1.1 405 Method Not Allowed
```

✅ **Correto**:

```http
HTTP/1.1 405 Method Not Allowed
Allow: GET, POST
```

#### 6. Formato de Resposta de Erro Inconsistente

❌ **Errado**: Formatos de erro diferentes entre endpoints
✅ **Correto**: Estrutura de resposta de erro padronizada

#### 7. Expor Detalhes Internos de Implementação

❌ **Errado**:

```json
{
  "erro": "Falha na conexão com banco de dados: Timeout na conexão na linha 47"
}
```

✅ **Correto**:

```json
{
  "erro": {
    "codigo": "INTERNAL_SERVER_ERROR",
    "mensagem": "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
  }
}
```

---

### Padrões de Tratamento de Erros {#tratamento-erros}

#### Estrutura de Resposta de Erro Padrão

Baseado na RFC 7807 (Problem Details for HTTP APIs):

```json
{
  "erro": {
    "tipo": "https://exemplo.com/errors/validation-failed",
    "titulo": "Validação Falhou",
    "status": 422,
    "detalhe": "O corpo da requisição contém dados inválidos",
    "instancia": "/usuarios/criar",
    "erros": [
      {
        "campo": "email",
        "mensagem": "Formato de email inválido",
        "codigo": "INVALID_EMAIL"
      },
      {
        "campo": "idade",
        "mensagem": "Deve estar entre 0 e 120",
        "codigo": "INVALID_RANGE"
      }
    ]
  }
}
```

#### Padrão de Erro do Google Cloud

```json
{
  "erro": {
    "codigo": 400,
    "mensagem": "Requisição inválida",
    "status": "INVALID_ARGUMENT",
    "detalhes": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "motivo": "INVALID_EMAIL",
        "dominio": "exemplo.com",
        "metadados": {
          "campo": "email",
          "valor": "email-invalido"
        }
      }
    ]
  }
}
```

#### Padrão de Erro da Microsoft

```json
{
  "erro": {
    "codigo": "InvalidRequest",
    "mensagem": "A requisição é inválida",
    "alvo": "email",
    "detalhes": [
      {
        "codigo": "InvalidEmailFormat",
        "mensagem": "O formato do email é inválido",
        "alvo": "email"
      }
    ],
    "erro_interno": {
      "codigo": "ValidationError",
      "mensagem": "Falha na validação do email"
    }
  }
}
```

#### Padrão de Erro Mínimo

```json
{
  "erro": {
    "codigo": "VALIDATION_FAILED",
    "mensagem": "Falha na validação da requisição",
    "detalhes": [
      {
        "campo": "email",
        "mensagem": "Formato de email inválido"
      }
    ]
  }
}
```

---

### Códigos de Status de Autenticação/Autorização {#codigos-auth}

#### Fluxo de Autenticação

1. **401 Unauthorized**: Autenticação ausente ou inválida
2. **403 Forbidden**: Autenticação válida mas permissões insuficientes
3. **200 OK**: Autenticação bem-sucedida com token válido

#### Cenários Comuns de Autenticação

###### Autenticação Ausente

```json
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="api"

{
  "erro": {
    "codigo": "AUTHENTICATION_REQUIRED",
    "mensagem": "Autenticação necessária",
    "detalhes": "Por favor, forneça um token de acesso válido"
  }
}
```

###### Token Inválido

```json
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="invalid_token"

{
  "erro": {
    "codigo": "INVALID_TOKEN",
    "mensagem": "Token de acesso inválido",
    "detalhes": "O token fornecido está expirado ou inválido"
  }
}
```

###### Permissões Insuficientes

```json
HTTP/1.1 403 Forbidden

{
  "erro": {
    "codigo": "INSUFFICIENT_PERMISSIONS",
    "mensagem": "Acesso negado",
    "detalhes": "Você não tem permissão para acessar este recurso"
  }
}
```

#### Códigos Específicos do OAuth 2.0

- **401**: Token de acesso inválido ou expirado
- **403**: Token válido mas escopo insuficiente
- **400**: Formato de requisição inválido
- **429**: Limite de taxa excedido

---

### Melhores Práticas da Indústria {#melhores-praticas}

#### Diretrizes da API do Google

1. Use códigos de status HTTP padrão
2. Retorne informações de erro detalhadas no corpo da resposta
3. Inclua códigos de erro legíveis por máquina
4. Forneça mensagens de erro acionáveis
5. Use formato de resposta de erro consistente

#### Diretrizes da API REST da Microsoft

1. Use códigos de status HTTP apropriados
2. Forneça informações de erro tanto legíveis por humanos quanto por máquinas
3. Inclua IDs de correlação para depuração
4. Suporte erros parciais em operações em lote
5. Use formato de resposta de erro padrão

#### Melhores Práticas Gerais

1. **Seja Consistente**: Use os mesmos códigos de status para cenários similares
2. **Seja Específico**: Use o código de status mais específico disponível
3. **Seja Útil**: Forneça mensagens de erro acionáveis
4. **Seja Seguro**: Não exponha detalhes internos de implementação
5. **Siga Padrões**: Siga especificações HTTP
6. **Seja Cacheável**: Considere implicações de cache dos códigos de status

#### Melhores Práticas de Limitação de Taxa

```json
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640995200

{
  "erro": {
    "codigo": "RATE_LIMIT_EXCEEDED",
    "mensagem": "Limite de taxa excedido",
    "repetir_apos": 3600,
    "limite": 100,
    "janela": 3600
  }
}
```

---

### Exemplos de Respostas JSON {#exemplos-json}

#### Respostas de Sucesso

###### Sucesso de Requisição GET

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "criado_em": "2023-01-01T12:00:00Z"
}
```

###### Sucesso de Requisição POST (Criado)

```json
HTTP/1.1 201 Created
Location: /api/usuarios/123
Content-Type: application/json

{
  "id": 123,
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "criado_em": "2023-01-01T12:00:00Z"
}
```

###### Sucesso de Requisição PUT (Atualizado)

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "nome": "João Santos",
  "email": "joao.santos@exemplo.com",
  "atualizado_em": "2023-01-01T12:30:00Z"
}
```

###### Sucesso de Requisição DELETE

```json
HTTP/1.1 204 No Content
```

#### Respostas de Erro

###### Erro de Validação (422)

```json
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "erro": {
    "codigo": "VALIDATION_FAILED",
    "mensagem": "Falha na validação da requisição",
    "detalhes": [
      {
        "campo": "email",
        "mensagem": "Email é obrigatório",
        "codigo": "REQUIRED_FIELD"
      },
      {
        "campo": "idade",
        "mensagem": "Idade deve estar entre 0 e 120",
        "codigo": "INVALID_RANGE"
      }
    ]
  }
}
```

###### Erro de Autenticação (401)

```json
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="api"
Content-Type: application/json

{
  "erro": {
    "codigo": "AUTHENTICATION_REQUIRED",
    "mensagem": "Autenticação necessária",
    "detalhes": "Por favor, forneça um token de acesso válido"
  }
}
```

###### Erro de Limite de Taxa (429)

```json
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
Content-Type: application/json

{
  "erro": {
    "codigo": "RATE_LIMIT_EXCEEDED",
    "mensagem": "Limite de taxa excedido",
    "repetir_apos": 3600,
    "limite": 100,
    "restante": 0,
    "resetar_em": "2023-01-01T13:00:00Z"
  }
}
```

###### Erro do Servidor (500)

```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "erro": {
    "codigo": "INTERNAL_SERVER_ERROR",
    "mensagem": "Ocorreu um erro inesperado",
    "detalhes": "Por favor, tente novamente mais tarde ou contate o suporte",
    "timestamp": "2023-01-01T12:00:00Z",
    "trace_id": "abc123"
  }
}
```

---

### Padrões RFC e Referências {#padroes-rfc}

#### RFCs Primárias de HTTP

1. **RFC 9110**: Semântica HTTP (atual)
2. **RFC 7231**: HTTP/1.1 Semântica e Conteúdo (substituída pela 9110)
3. **RFC 2616**: HTTP/1.1 (obsoleta, referência histórica)
4. **RFC 6585**: Códigos de Status HTTP Adicionais
5. **RFC 7807**: Problem Details for HTTP APIs

#### Registros de Códigos de Status

- **Registro de Códigos de Status HTTP da IANA**: Registro oficial de códigos de status HTTP
- **Grupo de Trabalho HTTP**: Especificações e atualizações atuais

#### Especificações Principais

1. **Classes de Códigos de Status** (RFC 9110 Seção 15):

   - 1xx: Informativo
   - 2xx: Sucesso
   - 3xx: Redirecionamento
   - 4xx: Erro do Cliente
   - 5xx: Erro do Servidor

2. **Comportamento de Cache** (RFC 7234):

   - 200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501: Cacheáveis por padrão
   - 302, 307: Cacheáveis com cabeçalhos de cache explícitos
   - 4xx, 5xx: Geralmente não cacheáveis

3. **Comportamento Específico por Método**:
   - GET: 200 para sucesso, 404 para não encontrado
   - POST: 201 para criado, 200 para processado
   - PUT: 200 para atualizado, 201 para criado
   - DELETE: 204 para removido, 404 para não encontrado

#### Diretrizes de Implementação

1. **Idempotência**: GET, PUT, DELETE devem ser idempotentes
2. **Segurança**: GET, HEAD, OPTIONS devem ser seguros (sem efeitos colaterais)
3. **Cache**: Considere comportamento de cache ao escolher códigos de status
4. **Segurança**: Use códigos apropriados para evitar vazamento de informações

---

### Conclusão

Este guia abrangente fornece uma referência completa para implementar códigos de status HTTP em APIs RESTful. Principais pontos-chave:

1. **Use códigos de status específicos** em vez de genéricos
2. **Siga padrões estabelecidos** de grandes empresas de tecnologia
3. **Forneça respostas de erro consistentes** com informações acionáveis
4. **Considere implicações de segurança** ao escolher códigos de status
5. **Inclua cabeçalhos apropriados** para cada código de status
6. **Teste minuciosamente** para garantir comportamento correto dos códigos de status

Ao seguir essas melhores práticas e diretrizes, você pode criar APIs robustas e amigáveis que se comunicam efetivamente com clientes e proporcionam excelente experiência ao desenvolvedor.

---

## Anti-Padrões de Códigos de Status HTTP para Arquitetura RESTful: Guia Completo para Equipes de Desenvolvimento Brasileiras

### Resumo Executivo

Este guia técnico abrangente examina os anti-padrões mais críticos relacionados ao uso inadequado de códigos de status HTTP em APIs RESTful, fornecendo orientação específica para arquitetos de solução, líderes técnicos e equipes de desenvolvimento no Brasil. O documento aborda violações de especificação, implicações de segurança, considerações de desempenho e padrões de governança empresarial.

### 1. Fundamentos da Arquitetura RESTful e Códigos de Status HTTP

#### 1.1 Princípios Fundamentais REST

**Representational State Transfer (REST)** é um estilo arquitetural que define um conjunto de restrições para criar serviços web escaláveis e manuteníveis. Os princípios fundamentais incluem:

- **Sem Estado (Stateless)**: Cada requisição deve conter todas as informações necessárias para processamento
- **Interface Uniforme**: Uso consistente de métodos HTTP (GET, POST, PUT, PATCH, DELETE)
- **Arquitetura em Camadas**: Suporte para componentes intermediários (proxies, gateways, caches)
- **Recursos Identificáveis**: Cada recurso deve ter uma URI única e bem definida

#### 1.2 Categorias de Códigos de Status HTTP

**1xx - Informacional**: Comunica informações do protocolo de transferência
**2xx - Sucesso**: Indica que a requisição do cliente foi aceita com sucesso
**3xx - Redirecionamento**: Indica que o cliente deve tomar ação adicional
**4xx - Erro do Cliente**: Aponta problemas na requisição enviada pelo cliente
**5xx - Erro do Servidor**: Indica responsabilidade do servidor pelos erros

### 2. Anti-Padrões Críticos de Códigos de Status HTTP

#### 2.1 Anti-Padrão "Sempre 200" (Always 200)

**Problema**: Usar HTTP 200 OK para todas as respostas, independentemente do resultado real, incorporando informações de erro no corpo da resposta.

**Por que está errado**:

- Viola semânticas HTTP e princípios REST
- Força clientes a analisar o corpo da resposta para determinar sucesso/falha
- Quebra mecanismos de cache HTTP
- Impede tratamento adequado de erros pela infraestrutura HTTP
- Cria mecanismos proprietários de sinalização de erro que reduzem interoperabilidade

**Exemplo de má prática**:

```kotlin
// INCORRETO - Sempre retorna 200 OK
@GetMapping("/usuarios/{id}")
fun buscarUsuario(@PathVariable id: Long): ResponseEntity<Map<String, Any>> {
    return try {
        val usuario = usuarioService.buscarPorId(id)
        ResponseEntity.ok(mapOf(
            "status" to "sucesso",
            "dados" to usuario
        ))
    } catch (e: UsuarioNaoEncontradoException) {
        // MAL: Retorna 200 para erro
        ResponseEntity.ok(mapOf(
            "status" to "erro",
            "codigo" to "USUARIO_NAO_ENCONTRADO",
            "mensagem" to "Usuário não existe"
        ))
    }
}
```

**Abordagem correta**:

```kotlin
// CORRETO - Usa códigos de status apropriados
@GetMapping("/usuarios/{id}")
fun buscarUsuario(@PathVariable id: Long): ResponseEntity<Any> {
    return try {
        val usuario = usuarioService.buscarPorId(id)
        ResponseEntity.ok(usuario) // 200 OK para sucesso
    } catch (e: UsuarioNaoEncontradoException) {
        // BOM: Retorna 404 para recurso não encontrado
        ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf(
            "erro" to "USUARIO_NAO_ENCONTRADO",
            "mensagem" to "Usuário não existe",
            "detalhes" to "Nenhum usuário encontrado com o identificador fornecido",
            "timestampErro" to Instant.now()
        ))
    }
}
```

#### 2.2 Anti-Padrão "500 Genérico" (Generic 500)

**Problema**: Usar HTTP 500 Internal Server Error para todas as condições de erro, incluindo erros do lado do cliente.

**Uso correto por categoria**:

```kotlin
@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleBadRequest(ex: IllegalArgumentException): ResponseEntity<ErrorResponse> {
        // 400: Erro de sintaxe da requisição
        return ResponseEntity.badRequest().body(
            ErrorResponse("REQUISICAO_MALFORMADA", ex.message)
        )
    }

    @ExceptionHandler(UsuarioNaoEncontradoException::class)
    fun handleNotFound(ex: UsuarioNaoEncontradoException): ResponseEntity<ErrorResponse> {
        // 404: Recurso não encontrado
        return ResponseEntity.notFound().build()
    }

    @ExceptionHandler(AccessDeniedException::class)
    fun handleForbidden(ex: AccessDeniedException): ResponseEntity<ErrorResponse> {
        // 403: Acesso negado
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
            ErrorResponse("ACESSO_NEGADO", "Permissões insuficientes")
        )
    }
}

data class ErrorResponse(
    val codigo: String,
    val mensagem: String,
    val idRequisicao: String? = null,
    val timestamp: Instant = Instant.now()
)
```

#### 2.3 Anti-Padrões de Tunelamento

**Tunelamento GET**: Usar GET para operações com efeitos colaterais

```kotlin
// INCORRETO - GET com efeitos colaterais
@GetMapping("/usuarios/{id}/deletar")
fun deletarUsuario(@PathVariable id: Long) {
    usuarioService.deletar(id)
}

// CORRETO - DELETE para remoção
@DeleteMapping("/usuarios/{id}")
fun deletarUsuario(@PathVariable id: Long): ResponseEntity<Void> {
    usuarioService.deletar(id)
    return ResponseEntity.noContent().build() // 204 No Content
}
```

### 3. Uso Correto dos Códigos de Status HTTP

#### 3.1 Códigos 2xx de Sucesso

```kotlin
@RestController
@RequestMapping("/api/v1/pedidos")
class PedidoController(private val pedidoService: PedidoService) {

    // 200 OK - Requisição bem-sucedida com corpo de resposta
    @GetMapping("/{id}")
    fun buscarPedido(@PathVariable id: Long): ResponseEntity<Pedido> {
        val pedido = pedidoService.buscarPorId(id)
        return ResponseEntity.ok(pedido)
    }

    // 201 Created - Recurso criado com sucesso (deve incluir header Location)
    @PostMapping
    fun criarPedido(@Valid @RequestBody novoPedido: NovoPedidoRequest): ResponseEntity<Pedido> {
        val pedido = pedidoService.criar(novoPedido)
        val uri = URI.create("/api/v1/pedidos/${pedido.id}")
        return ResponseEntity.created(uri).body(pedido)
    }

    // 202 Accepted - Requisição aceita para processamento assíncrono
    @PostMapping("/{id}/processar")
    fun processarPedido(@PathVariable id: Long): ResponseEntity<Map<String, Any>> {
        val idProcessamento = pedidoService.iniciarProcessamento(id)
        return ResponseEntity.accepted().body(mapOf(
            "idProcessamento" to idProcessamento,
            "status" to "PROCESSAMENTO_INICIADO",
            "urlAcompanhamento" to "/api/v1/processamentos/$idProcessamento"
        ))
    }

    // 204 No Content - Operação bem-sucedida sem corpo de resposta
    @DeleteMapping("/{id}")
    fun deletarPedido(@PathVariable id: Long): ResponseEntity<Void> {
        pedidoService.deletar(id)
        return ResponseEntity.noContent().build()
    }
}
```

#### 3.2 Códigos 4xx de Erro do Cliente

```kotlin
@RestController
class AutenticacaoController(private val authService: AuthService) {

    @PostMapping("/login")
    fun login(@Valid @RequestBody credenciais: CredenciaisLogin): ResponseEntity<Any> {
        return try {
            val token = authService.autenticar(credenciais)
            ResponseEntity.ok(mapOf("token" to token, "tipo" to "Bearer"))
        } catch (e: CredenciaisInvalidasException) {
            // 401 Unauthorized - Credenciais inválidas
            ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .header("WWW-Authenticate", "Bearer realm=\"api\"")
                .body(mapOf(
                    "erro" to "CREDENCIAIS_INVALIDAS",
                    "mensagem" to "Email ou senha incorretos"
                ))
        }
    }

    // 409 Conflict - Conflito com estado atual do recurso
    @PostMapping("/usuarios")
    fun criarUsuario(@Valid @RequestBody novoUsuario: NovoUsuarioRequest): ResponseEntity<Any> {
        return try {
            val usuario = usuarioService.criar(novoUsuario)
            ResponseEntity.status(HttpStatus.CREATED).body(usuario)
        } catch (e: EmailJaExisteException) {
            ResponseEntity.status(HttpStatus.CONFLICT).body(mapOf(
                "erro" to "EMAIL_JA_EXISTE",
                "mensagem" to "Já existe um usuário com este endereço de email",
                "recursoConflitante" to "/usuarios/email/${novoUsuario.email}"
            ))
        }
    }

    // 429 Too Many Requests - Limite de taxa excedido
    @GetMapping("/api-publica/cotacao")
    fun obterCotacao(): ResponseEntity<Any> {
        val limite = rateLimitService.verificarLimite(getClientIP())

        return if (limite.permitido) {
            val cotacao = cotacaoService.obterCotacaoAtual()
            ResponseEntity.ok(cotacao)
        } else {
            ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .header("Retry-After", limite.tempoEspera.toString())
                .header("X-RateLimit-Limit", limite.limitePorHora.toString())
                .body(mapOf(
                    "erro" to "LIMITE_EXCEDIDO",
                    "mensagem" to "Limite de requisições por hora excedido",
                    "tentarNovamenteEm" to limite.tempoEspera
                ))
        }
    }
}
```

### 4. Implicações de Segurança

#### 4.1 Riscos de Divulgação de Informações

```kotlin
// BOM - Mensagem genérica com ID para rastreamento
@ExceptionHandler(SQLException::class)
fun handleSqlException(ex: SQLException): ResponseEntity<Any> {
    val idRequisicao = gerarIdUnicoRequisicao()

    // Log completo para investigação interna
    logger.error("Erro de banco de dados [ID: $idRequisicao]", ex)

    // Resposta genérica para o cliente
    return ResponseEntity.internalServerError().body(mapOf(
        "erro" to "ERRO_INTERNO",
        "mensagem" to "Ocorreu um erro interno no sistema",
        "idRequisicao" to idRequisicao,
        "suporte" to "Entre em contato com o suporte técnico informando o ID da requisição"
    ))
}
```

#### 4.2 Monitoramento de Segurança

```kotlin
@Component
class SecurityMonitoringService {

    @EventListener
    fun monitorarPadroesAtaque(event: HttpResponseEvent) {
        when (event.statusCode) {
            401 -> detectarTentativasBruteForce(event)
            404 -> detectarEnumeracaoRecursos(event)
            403 -> detectarEscalonamentoPrivilegio(event)
            429 -> detectarPossibilidadeDoS(event)
        }
    }

    private fun detectarTentativasBruteForce(event: HttpResponseEvent) {
        val tentativas = contarTentativas401PorIP(event.clientIP, Duration.ofMinutes(5))

        if (tentativas > LIMITE_TENTATIVAS_LOGIN) {
            alertService.enviarAlerta(
                TipoAlerta.BRUTE_FORCE_DETECTADO,
                "Múltiplas tentativas de autenticação falharam para IP: ${event.clientIP}",
                mapOf(
                    "ip" to event.clientIP,
                    "tentativas" to tentativas,
                    "endpoint" to event.endpoint
                )
            )

            // Implementar bloqueio temporário de IP
            firewallService.bloquearTemporariamente(event.clientIP, Duration.ofHours(1))
        }
    }
}
```

### 5. Considerações de Performance e Cache

#### 5.1 Uso Correto para Cache

```kotlin
@RestController
class ProdutoController {

    @GetMapping("/produtos/{id}")
    fun obterProduto(
        @PathVariable id: Long,
        @RequestHeader(value = "If-None-Match", required = false) ifNoneMatch: String?,
        @RequestHeader(value = "If-Modified-Since", required = false) ifModifiedSince: String?
    ): ResponseEntity<Any> {

        val produto = produtoService.buscarPorId(id)
        val etag = calcularETag(produto)
        val ultimaModificacao = produto.ultimaModificacao

        // Verificar se o cliente já tem a versão mais recente
        if (clienteTemVersaoAtualizada(etag, ifNoneMatch, ultimaModificacao, ifModifiedSince)) {
            // 304 Not Modified - Economiza largura de banda
            return ResponseEntity.notModified()
                .eTag(etag)
                .lastModified(ultimaModificacao)
                .cacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic())
                .build()
        }

        // 200 OK com dados atualizados e headers de cache
        return ResponseEntity.ok()
            .eTag(etag)
            .lastModified(ultimaModificacao)
            .cacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic())
            .body(produto)
    }
}
```

### 6. Considerações Específicas para o Mercado Brasileiro

#### 6.1 Conformidade com LGPD (Lei Geral de Proteção de Dados)

```kotlin
@RestController
@RequestMapping("/api/v1/dados-pessoais")
class DadosPessoaisController(
    private val dadosService: DadosPessoaisService,
    private val auditService: AuditLGPDService
) {

    @GetMapping("/usuario/{id}")
    @PreAuthorize("hasRole('USER') and #id == authentication.name or hasRole('ADMIN')")
    fun obterDadosPessoais(
        @PathVariable id: Long,
        authentication: Authentication
    ): ResponseEntity<Any> {

        // Auditar acesso aos dados pessoais (obrigação LGPD)
        auditService.registrarAcessoDados(
            usuarioSolicitante = authentication.name,
            usuarioAlvo = id,
            tipoAcesso = "CONSULTA_DADOS_PESSOAIS",
            finalidade = "FORNECIMENTO_SERVICO",
            baseJuridica = "CONSENTIMENTO"
        )

        return try {
            val dados = dadosService.obterDadosAnonimizados(id)

            ResponseEntity.ok()
                .header("X-LGPD-Compliant", "true")
                .header("X-Data-Processing-Purpose", "FORNECIMENTO_SERVICO")
                .body(dados)

        } catch (e: AcessoNegadoException) {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body(mapOf(
                "erro" to "ACESSO_NEGADO_LGPD",
                "mensagem" to "Acesso aos dados pessoais negado conforme LGPD",
                "direitosLGPD" to "Para exercer seus direitos LGPD, entre em contato com dpo@empresa.com.br"
            ))
        }
    }

    @DeleteMapping("/usuario/{id}")
    @PreAuthorize("#id == authentication.name or hasRole('ADMIN')")
    fun exercerDireitoEsquecimento(
        @PathVariable id: Long,
        authentication: Authentication
    ): ResponseEntity<Any> {

        auditService.registrarExercicioDireito(
            usuario = id,
            direito = "DIREITO_ESQUECIMENTO",
            solicitadoPor = authentication.name
        )

        return try {
            dadosService.anonimizarDados(id)

            // 204 No Content - Dados anonimizados com sucesso
            ResponseEntity.noContent()
                .header("X-LGPD-Action", "ANONIMIZACAO_EXECUTADA")
                .header("X-Retention-Policy", "DADOS_ANONIMIZADOS_CONFORME_LGPD")
                .build()

        } catch (e: ProcessoAnonimizacaoException) {
            ResponseEntity.status(HttpStatus.ACCEPTED).body(mapOf(
                "status" to "PROCESSAMENTO_INICIADO",
                "mensagem" to "Solicitação de anonimização aceita e será processada",
                "prazoExecucao" to "15 dias úteis conforme LGPD",
                "protocoloSolicitacao" to e.protocoloProcessamento
            ))
        }
    }
}
```

#### 6.2 Open Banking Brasileiro

```kotlin
@RestController
@RequestMapping("/open-banking/v1")
class OpenBankingController(
    private val openBankingService: OpenBankingService,
    private val bacenComplianceService: BacenComplianceService
) {

    @GetMapping("/accounts/{accountId}")
    fun obterContaBancaria(
        @PathVariable accountId: String,
        @RequestHeader("Authorization") authorizationHeader: String,
        @RequestHeader("x-fapi-auth-date") fapiAuthDate: String,
        @RequestHeader("x-fapi-customer-ip-address") customerIpAddress: String
    ): ResponseEntity<Any> {

        return try {
            // Validar conformidade BACEN
            bacenComplianceService.validarCabecalhosFAPI(authorizationHeader, fapiAuthDate, customerIpAddress)

            val conta = openBankingService.obterDadosConta(accountId)

            ResponseEntity.ok()
                .header("x-fapi-interaction-id", UUID.randomUUID().toString())
                .header("x-response-time", Instant.now().toString())
                .body(conta)

        } catch (e: ContaNaoEncontradaException) {
            // 404 para conta não encontrada - conforme especificação BACEN
            ResponseEntity.notFound()
                .header("x-fapi-interaction-id", UUID.randomUUID().toString())
                .build()

        } catch (e: ConsentimentoInvalidoException) {
            // 403 para consentimento inválido - padrão Open Banking Brasil
            ResponseEntity.status(HttpStatus.FORBIDDEN).body(mapOf(
                "errors" to listOf(mapOf(
                    "code" to "CONSENT_INVALID",
                    "title" to "Consentimento inválido",
                    "detail" to "O consentimento fornecido não é válido para esta operação"
                ))
            ))

        } catch (e: RateLimitExceededException) {
            // 429 com headers específicos do BACEN
            ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .header("Retry-After", "60")
                .header("x-rate-limit-limit", "100")
                .header("x-rate-limit-remaining", "0")
                .body(mapOf(
                    "errors" to listOf(mapOf(
                        "code" to "TOO_MANY_REQUESTS",
                        "title" to "Limite de requisições excedido",
                        "detail" to "Limite de 100 requisições por minuto foi excedido"
                    ))
                ))
        }
    }
}
```

### 7. Padrões de Governança Empresarial

#### 7.1 Anotação para Governança de APIs

```kotlin
@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class GovernancaAPI(
    val nivel: NivelGovernanca = NivelGovernanca.PADRAO,
    val codigosStatusObrigatorios: Array<HttpStatus> = [
        HttpStatus.OK, HttpStatus.BAD_REQUEST,
        HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN,
        HttpStatus.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR
    ],
    val documentacaoObrigatoria: Boolean = true,
    val monitoramentoObrigatorio: Boolean = true
)

enum class NivelGovernanca {
    BASICO,    // APIs internas simples
    PADRAO,    // APIs de negócio padrão
    CRITICO,   // APIs críticas para o negócio
    PUBLICO    // APIs expostas externamente
}
```

#### 7.2 Validador de Conformidade

```kotlin
object CodeReviewValidator {

    data class ValidacaoResultado(
        val conforme: Boolean,
        val violacoes: List<ViolacaoGovernanca>
    )

    data class ViolacaoGovernanca(
        val tipo: TipoViolacao,
        val descricao: String,
        val gravidade: Gravidade,
        val sugestaoCorrecao: String
    )

    enum class TipoViolacao {
        CODIGO_STATUS_INADEQUADO,
        ESTRUTURA_RESPOSTA_INCORRETA,
        DOCUMENTACAO_AUSENTE,
        TRATAMENTO_ERRO_INADEQUADO,
        VIOLACAO_SEGURANCA
    }

    fun validarConformidadeAPI(controller: Class<*>): ValidacaoResultado {
        val violacoes = mutableListOf<ViolacaoGovernanca>()

        controller.declaredMethods.forEach { metodo ->
            validarMetodoHTTP(metodo, violacoes)
            validarTratamentoExcecoes(metodo, violacoes)
            validarDocumentacao(metodo, violacoes)
        }

        return ValidacaoResultado(
            conforme = violacoes.none { it.gravidade == Gravidade.CRITICA },
            violacoes = violacoes
        )
    }
}
```

### 8. Monitoramento e Observabilidade

#### 8.1 Métricas de Códigos de Status

```kotlin
@Component
class MetricasAPIService {

    private val meterRegistry: MeterRegistry = Metrics.globalRegistry

    private val contadorStatusCode = Counter.builder("api.requests.total")
        .description("Total de requisições por código de status")
        .register(meterRegistry)

    private val tempoResposta = Timer.builder("api.response.time")
        .description("Tempo de resposta das APIs")
        .register(meterRegistry)

    @EventListener
    fun registrarMetricaResposta(event: HttpResponseEvent) {
        contadorStatusCode.increment(
            Tags.of(
                Tag.of("status_code", event.statusCode.toString()),
                Tag.of("endpoint", event.endpoint),
                Tag.of("method", event.method)
            )
        )

        tempoResposta.record(
            event.tempoResposta,
            Tags.of(
                Tag.of("endpoint", event.endpoint),
                Tag.of("status_category", obterCategoriaStatus(event.statusCode))
            )
        )
    }
}
```

### 9. Estratégias de Teste

#### 9.1 Testes de Contrato para Códigos de Status

```kotlin
@SpringBootTest
class ContratoStatusCodesTest {

    @Test
    fun `deve retornar 200 para busca de usuario existente`() {
        val usuarioId = 123L
        mockUsuarioExistente(usuarioId)

        val resposta = restTemplate.getForEntity("/usuarios/$usuarioId", Usuario::class.java)

        assertThat(resposta.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(resposta.body?.id).isEqualTo(usuarioId)
    }

    @Test
    fun `deve retornar 404 para usuario inexistente`() {
        val usuarioIdInexistente = 999L

        val resposta = restTemplate.exchange(
            "/usuarios/$usuarioIdInexistente",
            HttpMethod.GET,
            null,
            String::class.java
        )

        assertThat(resposta.statusCode).isEqualTo(HttpStatus.NOT_FOUND)
    }

    @Test
    fun `deve retornar 201 com Location header ao criar usuario`() {
        val novoUsuario = NovoUsuarioRequest("João Silva", "joao@empresa.com.br")

        val resposta = restTemplate.postForEntity("/usuarios", novoUsuario, Usuario::class.java)

        assertThat(resposta.statusCode).isEqualTo(HttpStatus.CREATED)
        assertThat(resposta.headers.location).isNotNull()
        assertThat(resposta.headers.location?.path).matches("/usuarios/\\d+")
    }

    @Test
    fun `deve retornar 409 ao tentar criar usuario com email duplicado`() {
        val emailExistente = "existente@empresa.com.br"
        mockUsuarioComEmailExistente(emailExistente)
        val novoUsuario = NovoUsuarioRequest("Outro Usuário", emailExistente)

        val resposta = restTemplate.exchange(
            "/usuarios",
            HttpMethod.POST,
            HttpEntity(novoUsuario),
            String::class.java
        )

        assertThat(resposta.statusCode).isEqualTo(HttpStatus.CONFLICT)
    }
}
```

#### 9.2 Testes de Segurança

```kotlin
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class SegurancaStatusCodesTest {

    @Test
    fun `deve retornar 401 para requisicoes sem autenticacao`() {
        val resposta = restTemplate.exchange(
            "/usuarios/perfil",
            HttpMethod.GET,
            null,
            String::class.java
        )

        assertThat(resposta.statusCode).isEqualTo(HttpStatus.UNAUTHORIZED)
        assertThat(resposta.headers["WWW-Authenticate"]).isNotNull()
    }

    @Test
    fun `deve retornar 403 para usuario autenticado sem permissoes`() {
        val tokenUsuarioComum = gerarTokenUsuario(perfil = "USER")
        val headers = HttpHeaders().apply {
            setBearerAuth(tokenUsuarioComum)
        }

        val resposta = restTemplate.exchange(
            "/admin/usuarios",
            HttpMethod.GET,
            HttpEntity<Any>(headers),
            String::class.java
        )

        assertThat(resposta.statusCode).isEqualTo(HttpStatus.FORBIDDEN)
    }

    @Test
    fun `nao deve vazar informacoes sensiveis em erros 500`() {
        mockServicoParaFalhar()

        val resposta = restTemplate.exchange(
            "/usuarios/1",
            HttpMethod.GET,
            null,
            String::class.java
        )

        assertThat(resposta.statusCode).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR)

        val erro = objectMapper.readValue(resposta.body, ErrorResponse::class.java)
        assertThat(erro.mensagem).doesNotContain("SQLException")
        assertThat(erro.mensagem).doesNotContain("password")
        assertThat(erro.idRequisicao).isNotNull()
    }
}
```

### 10. Lista de Verificação para Code Review

#### 10.1 Checklist de Design de API

**Design de Recursos**

- [ ] Recursos usam substantivos, não verbos
- [ ] Nomenclatura plural consistente para coleções
- [ ] Uso adequado dos métodos HTTP (GET, POST, PUT, PATCH, DELETE)
- [ ] Códigos de status HTTP apropriados (200, 201, 400, 401, 404, 500)

**Estrutura de Requisição/Resposta**

- [ ] Headers de Content-Type definidos corretamente
- [ ] Validação de entrada implementada
- [ ] Respostas de erro seguem formato padrão
- [ ] Paginação implementada para grandes datasets

#### 10.2 Checklist de Segurança

**Autenticação e Autorização**

- [ ] Tokens JWT validados adequadamente
- [ ] Implementação OAuth 2.0 segue padrões
- [ ] Chaves de API protegidas e rotacionadas regularmente
- [ ] Controle de acesso baseado em funções (RBAC) implementado

**Proteção de Dados**

- [ ] Dados sensíveis não expostos em URLs
- [ ] HTTPS obrigatório para todos os endpoints
- [ ] Sanitização de entrada previne ataques de injeção
- [ ] Rate limiting implementado

#### 10.3 Checklist de Performance

**Otimização**

- [ ] Consultas de banco otimizadas (índices, planos de consulta)
- [ ] Estratégia de cache implementada
- [ ] Compressão de resposta habilitada (gzip)
- [ ] Processamento assíncrono para operações demoradas

#### 10.4 Checklist de Qualidade de Código

**Padrões de Implementação**

- [ ] Tratamento adequado de erros e logging
- [ ] Testes unitários cobrem caminhos críticos
- [ ] Testes de integração validam contratos de API
- [ ] Código segue guias de estilo organizacionais
- [ ] Documentação atualizada e precisa

### 11. Padrões de Implementação para Equipes Brasileiras

#### 11.1 Estrutura Padrão de Resposta

```kotlin
data class RespostaPadrao<T>(
    val dados: T? = null,
    val sucesso: Boolean = true,
    val mensagem: String? = null,
    val timestamp: Instant = Instant.now(),
    val idRequisicao: String = UUID.randomUUID().toString()
)

data class RespostaErro(
    val codigo: String,
    val mensagem: String,
    val detalhes: String? = null,
    val campoErros: Map<String, String>? = null,
    val timestamp: Instant = Instant.now(),
    val idRequisicao: String = UUID.randomUUID().toString(),
    val urlDocumentacao: String? = null
)
```

#### 11.2 Padrões de Nomenclatura Brasileiros

```kotlin
// Endpoints seguindo convenções brasileiras
@RestController
@RequestMapping("/api/v1")
class EmpresaController {

    @GetMapping("/empresas/{cnpj}")
    fun buscarPorCnpj(@PathVariable cnpj: String): ResponseEntity<Empresa>

    @GetMapping("/ceps/{cep}")
    fun buscarEnderecoPorCep(@PathVariable cep: String): ResponseEntity<Endereco>

    @GetMapping("/estados")
    fun listarEstadosBrasileiros(): ResponseEntity<List<Estado>>

    @GetMapping("/municipios/{uf}")
    fun listarMunicipiosPorUF(@PathVariable uf: String): ResponseEntity<List<Municipio>>

    @PostMapping("/pagamentos/pix")
    fun processarPagamentoPix(@RequestBody pagamento: PagamentoPix): ResponseEntity<RespostaPagamento>
}
```

#### 11.3 Integração com Sistemas Brasileiros

```kotlin
// Integração com APIs brasileiras (Correios, Receita Federal, etc.)
@Service
class IntegracaoReceitalFederalService {

    fun consultarCnpj(cnpj: String): ResponseEntity<Any> {
        return try {
            val empresa = receitaFederalClient.consultarCnpj(cnpj)
            ResponseEntity.ok(empresa)
        } catch (e: CNPJNaoEncontradoException) {
            ResponseEntity.notFound().build()
        } catch (e: ServicoIndisponivelException) {
            // 503 Service Unavailable - Serviço da Receita Federal indisponível
            ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(mapOf(
                "erro" to "SERVICO_RF_INDISPONIVEL",
                "mensagem" to "Serviço da Receita Federal temporariamente indisponível",
                "tentarNovamenteEm" to "5 minutos"
            ))
        }
    }
}
```

### 12. Decisões Arquiteturais e Diagramas

#### 12.1 Árvore de Decisão para Códigos de Status

```
Operação foi executada com sucesso?
├── SIM
│   ├── Recurso foi criado? → 201 Created
│   ├── Operação sem retorno? → 204 No Content
│   ├── Processamento assíncrono? → 202 Accepted
│   └── Operação padrão → 200 OK
└── NÃO
    ├── Erro do cliente?
    │   ├── Dados malformados? → 400 Bad Request
    │   ├── Não autenticado? → 401 Unauthorized
    │   ├── Sem permissão? → 403 Forbidden
    │   ├── Recurso não encontrado? → 404 Not Found
    │   ├── Método não permitido? → 405 Method Not Allowed
    │   ├── Conflito de dados? → 409 Conflict
    │   ├── Dados inválidos semanticamente? → 422 Unprocessable Entity
    │   └── Limite excedido? → 429 Too Many Requests
    └── Erro do servidor?
        ├── Erro interno? → 500 Internal Server Error
        ├── Não implementado? → 501 Not Implemented
        ├── Gateway com problema? → 502 Bad Gateway
        ├── Serviço indisponível? → 503 Service Unavailable
        └── Timeout de gateway? → 504 Gateway Timeout
```

#### 12.2 Fluxograma de Tratamento de Erros

```
Exceção capturada
├── É exceção de validação?
│   ├── SIM → 400 Bad Request
│   └── Contém detalhes de campo? → Incluir fieldErrors
├── É exceção de segurança?
│   ├── Não autenticado → 401 Unauthorized
│   ├── Sem permissão → 403 Forbidden
│   └── Token expirado → 401 com refresh_token_required
├── É exceção de negócio?
│   ├── Recurso não encontrado → 404 Not Found
│   ├── Conflito de estado → 409 Conflict
│   ├── Regra de negócio violada → 422 Unprocessable Entity
│   └── Rate limit excedido → 429 Too Many Requests
├── É exceção de infraestrutura?
│   ├── Banco indisponível → 503 Service Unavailable
│   ├── Timeout → 504 Gateway Timeout
│   └── Serviço externo com falha → 502 Bad Gateway
└── Exceção não mapeada → 500 Internal Server Error
```

### 13. Configurações de Produção

#### 13.1 Configuração de API Gateway

```yaml
# Configuração Nginx para APIs brasileiras
server {
    listen 443 ssl http2;
    server_name api.empresa.com.br;

    # Configurações SSL/TLS
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Headers de segurança
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";

    # Rate limiting específico por status code
    location /api/ {
        # Rate limiting mais rigoroso para endpoints que retornam 401/403
        limit_req_zone $binary_remote_addr zone=auth:10m rate=10r/m;
        limit_req zone=auth burst=5 nodelay;

        # Configuração para diferentes status codes
        location ~* "401|403" {
            access_log /var/log/nginx/security_events.log;
            limit_req zone=auth burst=2 nodelay;
        }

        proxy_pass http://backend-api;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Request-ID $request_id;
    }
}
```

#### 13.2 Configuração de Monitoramento

```yaml
# Prometheus config para métricas de API
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - 'api_rules.yml'

scrape_configs:
  - job_name: 'api-brasileira'
    static_configs:
      - targets: ['api:8080']
    metrics_path: /actuator/prometheus
    scrape_interval: 10s

# Alertas específicos para códigos de status
groups:
  - name: api.status_codes
    rules:
      - alert: HighErrorRate
        expr: (rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])) > 0.01
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: 'Taxa de erro 5xx alta na API'
          description: 'Taxa de erro 5xx é {{ $value }} por mais de 2 minutos'

      - alert: HighClientErrorRate
        expr: (rate(http_requests_total{status=~"4.."}[5m]) / rate(http_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: 'Taxa de erro 4xx alta na API'
          description: 'Taxa de erro 4xx é {{ $value }} - possível problema na documentação ou validação'
```

### 14. Conclusões e Recomendações

#### 14.1 Resumo dos Anti-Padrões Críticos

1. **Anti-Padrão "Sempre 200"**: O mais prejudicial para arquiteturas RESTful, quebra contratos HTTP e impede cache adequado
2. **Uso Genérico do 500**: Confunde responsabilidades e dificulta debugging
3. **Tunelamento de Métodos**: Viola princípios REST e semânticas HTTP
4. **Confusão 401/403**: Compromete segurança e experiência do usuário
5. **Vazamento de Informações**: Expõe detalhes internos através de códigos de erro

#### 14.2 Melhores Práticas para Implementação

**Para Arquitetos de Solução:**

1. Estabelecer padrões de códigos de status em nível empresarial
2. Implementar validação automatizada de conformidade em pipelines CI/CD
3. Projetar monitoramento e alertas baseados em padrões de status codes
4. Criar frameworks reutilizáveis de tratamento de erro

**Para Líderes Técnicos:**

1. Usar matrizes de decisão de códigos de status para implementação consistente
2. Implementar suítes abrangentes de teste de tratamento de erro
3. Projetar estratégias de degradação baseadas em códigos de status
4. Aplicar códigos de status adequados em todos os endpoints da API

**Para Equipes de Desenvolvimento:**

1. Seguir guias de estilo específicos para APIs RESTful brasileiras
2. Implementar logging e auditoria conforme LGPD
3. Usar terminologia técnica brasileira consistente
4. Considerar integrações com sistemas nacionais (PIX, CNPJ, CEP)

#### 14.3 Fatores Críticos de Sucesso

- **Implementação consistente** em todas as APIs empresariais
- **Documentação abrangente** e treinamento de desenvolvedores
- **Validação automatizada** de conformidade
- **Avaliações regulares de segurança** de padrões de tratamento de erro
- **Monitoramento de performance** vinculado ao uso de códigos de status

#### 14.4 Considerações para o Contexto Brasileiro

- **Conformidade LGPD** em tratamento de dados e auditoria
- **Integração Open Banking** seguindo padrões BACEN
- **Terminologia técnica** adaptada para equipes brasileiras
- **Considerações regionais** para performance e CDN
- **Padrões regulatórios** específicos do mercado brasileiro

#### 14.5 Próximos Passos

1. **Avaliação atual**: Auditar APIs existentes usando este framework
2. **Priorização de melhorias**: Focar em violações críticas de segurança e performance
3. **Implementação incremental**: Abordar anti-padrões identificados gradualmente
4. **Monitoramento contínuo**: Estabelecer KPIs baseados em códigos de status
5. **Melhoria contínua**: Revisão regular e refinamento de práticas

---

## HTTP 204 vs 200: Guia Completo para Coleções Vazias em APIs RESTful

**HTTP 200 OK com arrays vazios emerge como o claro vencedor** baseado em especificações oficiais, consenso da indústria e benefícios práticos de implementação. Embora HTTP 204 No Content ofereça economia mínima de largura de banda, ele cria complexidade desnecessária e viola princípios fundamentais do HTTP quando usado incorretamente para respostas JSON.

A pesquisa revela que **grandes provedores de API escolhem esmagadoramente 200 OK com arrays vazios**, com o GitHub até mesmo normalizando automaticamente respostas 204 para arrays vazios em seu SDK. Esta abordagem alinha-se com semânticas HTTP, princípios arquiteturais REST e proporciona experiência superior ao desenvolvedor em todos os contextos de implementação.

### Especificações HTTP estabelecem limites semânticos claros

**RFC 9110 separa definitivamente os dois códigos de status**: HTTP 204 No Content NÃO DEVE incluir qualquer corpo de mensagem e termina imediatamente após os cabeçalhos, enquanto HTTP 200 OK DEVE incluir conteúdo (que pode ter comprimento zero). Isso cria uma distinção crítica entre "nenhum conteúdo" (204) versus "conteúdo que por acaso está vazio" (200).

Para coleções vazias, **um array vazio `[]` constitui conteúdo válido** em termos HTTP. RFC 9110 Seção 6.4.2 afirma explicitamente que requisições GET com status 200 devem retornar "uma representação do recurso alvo." Uma coleção vazia ainda é uma representação do recurso coleção - ela existe e pode ser acessada, simplesmente não contém itens.

**Usar 204 com corpos de resposta JSON viola a especificação HTTP**. A RFC proíbe explicitamente corpos de mensagem com respostas 204, tornando padrões comuns como retornar `{"data": []}` com status 204 tecnicamente não-conformes. Esta violação de especificação cria comportamento imprevisível entre diferentes clientes e servidores HTTP.

### Líderes da indústria convergem em práticas consistentes

**Análise de grandes provedores de API revela consenso notável**. GitHub, Microsoft Graph API, Stripe, AWS, Twitter e Slack todos implementam HTTP 200 com arrays vazios para coleções vazias. A API Graph da Microsoft retorna consistentemente respostas estruturadas como `{"@odata.context": "...", "value": []}` com status 200, enquanto o Stripe mantém sua estrutura padrão de objeto lista com arrays `data` vazios.

A abordagem do GitHub é particularmente instrutiva - sua documentação afirma explicitamente: _"Alguns endpoints respondem com 204 No Content em vez de array vazio quando não há dados. Nesse caso, retorne um array vazio."_ Seu SDK Octokit normaliza automaticamente qualquer resposta 204 para arrays vazios, demonstrando o reconhecimento da indústria de que **consistência supera pureza teórica**.

O padrão entre todos os grandes provedores enfatiza **simplicidade do cliente e estruturas de resposta previsíveis**. A resposta vazia do Stripe mantém a mesma forma de objeto que respostas populadas, o Twitter preserva metadados de paginação, e a Microsoft inclui informações de contexto OData mesmo para resultados vazios.

### Princípios arquiteturais REST suportam representação de coleção

**A dissertação REST de Roy Fielding estabelece fundamento teórico** para tratar coleções vazias como representações válidas de recursos. A restrição arquitetural de "manipulação de recursos através de representações" explicitamente suporta coleções vazias tendo representação, com Fielding notando que "um recurso pode mapear para o conjunto vazio."

Especialistas REST e praticantes da indústria consistentemente recomendam 200 OK para coleções vazias. A autoridade em design de APIs Arnaud Lauret (API Handyman) descobriu que **51% dos desenvolvedores de API preferem 200 OK para coleções vazias**, comparado a 24% preferindo 204 e 25% escolhendo 404. O raciocínio centra-se em manter consistência semântica - o recurso coleção existe e é acessível independentemente de seu conteúdo.

**Usar 404 Not Found para coleções vazias representa um anti-padrão claro**, conflitando "recurso não existe" com "recurso existe mas não contém itens." Isso viola o princípio fundamental REST de que identidade de recurso permanece independente do conteúdo.

### Padrões de implementação revelam vantagens práticas

**Exemplos de código em linguagens de programação demonstram benefícios consistentes** da abordagem 200. Implementações de frameworks universalmente suportam 200 com arrays vazios como comportamento padrão:

```python
# Flask - Manipulação natural de array vazio
@app.route('/usuarios')
def obter_usuarios():
    usuarios = consultar_usuarios()  # Retorna []
    return jsonify(usuarios), 200  # Consistente independente do conteúdo
```

```javascript
// Express - Manipulação uniforme de resposta
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await obterUsuariosDoBanco();
  res.status(200).json(usuarios); // Mesmo caminho de código para vazio ou populado
});
```

**Manipulação no lado cliente revela a carga de complexidade das respostas 204**. A API fetch do JavaScript requer lógica especial para status 204:

```javascript
// Manipulação complexa necessária para 204
if (response.status === 204) {
  return []; // Deve criar manualmente array vazio
} else if (response.ok) {
  return await response.json(); // Análise normal
}

// Manipulação simples com 200
return response.ok ? await response.json() : [];
```

**Padrões de frameworks consistentemente favorecem 200 com arrays vazios**. Spring Boot, .NET Core, Rails e outros naturalmente retornam 200 para operações bem-sucedidas com coleções vazias, requerendo configuração explícita para alcançar comportamento 204.

### Análise de performance mostra impacto mínimo de largura de banda

**Diferenças de largura de banda provam ser negligíveis na prática**. Respostas HTTP 204 contêm apenas cabeçalhos (200-500 bytes), enquanto respostas 200 com arrays JSON vazios adicionam meramente 2-50 bytes. Estudos de performance concluem que essas diferenças são "geralmente negligíveis em aplicações do mundo real."

**Comportamento de cache favorece fortemente respostas 200**. CloudFlare afirma explicitamente que NÃO fazem cache de respostas 204, enquanto AWS CloudFront fornece suporte limitado. Ambas CDNs oferecem capacidades completas de cache para respostas 200, potencialmente fornecendo maiores benefícios de performance que economias mínimas de largura de banda do 204.

**Comportamento do navegador cria complicações de debug com respostas 204**. Navegar para URLs retornando 204 no Chrome, Firefox e Safari resulta em requisições "canceladas" ou "abortadas" nas ferramentas de desenvolvedor, complicando workflows de teste e debug de API.

### Considerações de experiência do desenvolvedor provam ser decisivas

**Dados de pesquisa revelam forte preferência do desenvolvedor por consistência**. Quando perguntados sobre manipulação de coleção vazia, desenvolvedores consistentemente citam "lógica simplificada do cliente" e "mesmo código de manipulação se lista está vazia ou populada" como vantagens primárias da abordagem 200.

**Compatibilidade de biblioteca cliente varia significativamente**. Embora a maioria dos clientes HTTP manipulem ambos códigos de status, respostas 200 funcionam uniformemente através de todas as bibliotecas sem requerer manipulação de caso especial. Bibliotecas populares como Axios requerem verificação explícita de status para respostas 204: `response.status === 204 ? {} : response.data`.

**Padrões de manipulação de erro tornam-se mais complexos com códigos de status mistos**. APIs usando 204 para resultados vazios forçam clientes a manipular respostas bem-sucedidas diferentemente, quebrando o princípio de manipulação uniforme para operações bem-sucedidas.

### Estratégias de documentação OpenAPI e teste

**Recomendações da especificação OpenAPI 3.0 fortemente suportam 200 com arrays vazios**. Melhores práticas incluem exemplos explícitos mostrando arrays vazios e definições consistentes de schema:

```yaml
responses:
  '200':
    description: Lista de usuários (pode estar vazia)
    content:
      application/json:
        schema:
          type: array
          items:
            $ref: '#/components/schemas/Usuario'
        example: [] # Exemplo explícito de array vazio
```

**Estratégias de teste beneficiam-se de estruturas de resposta consistentes**. Suítes de teste podem validar schemas de resposta uniformemente sem lógica de ramificação para respostas vazias versus populadas. Testes de integração tornam-se mais simples quando as mesmas asserções funcionam independentemente da contagem de resultados.

### Considerações de performance e largura de banda em contexto

**Ambientes móveis e com restrição de largura de banda mostram resultados mistos**. Embora respostas 204 eliminem overhead de análise JSON, a economia de largura de banda (2-50 bytes) empalidecem comparado aos padrões típicos de uso de dados móveis. Compressão HTTP reduz ainda mais o impacto prático de estruturas JSON vazias.

**APIs de alto volume podem beneficiar-se de 204 em contextos específicos**. APIs internas processando milhões de requisições diárias poderiam alcançar economias cumulativas significativas de largura de banda, mas apenas quando complexidade do cliente pode ser gerenciada através de implementação controlada.

### Recomendações claras baseadas em evidência

**Para APIs públicas e a maioria dos casos de uso: Use HTTP 200 com arrays vazios**. Esta abordagem fornece:

- Consistência semântica com especificações HTTP
- Alinhamento com padrões da indústria
- Implementação simplificada do cliente
- Melhor suporte de cache CDN
- Experiência consistente do desenvolvedor
- Compatibilidade de framework

**Reserve HTTP 204 para operações de escrita sem valores de retorno**:

```http
DELETE /api/usuarios/123 → 204 No Content
PUT /api/usuarios/123 → 204 No Content (se nenhum corpo de resposta necessário)
```

**Padrão de implementação para coleções**:

```json
{
  "dados": [],
  "meta": {
    "total_registros": 0,
    "pagina": 1,
    "por_pagina": 20
  }
}
```

**Nunca use 404 para coleções vazias** - reserve para recursos realmente ausentes onde o endpoint ou recurso específico não existe.

### Conclusão

A evidência esmagadoramente suporta **HTTP 200 OK com arrays vazios para coleções vazias em APIs RESTful**. Esta abordagem satisfaz semânticas HTTP, segue princípios arquiteturais REST, alinha-se com consenso da indústria, simplifica implementação e fornece experiência superior ao desenvolvedor. Embora HTTP 204 ofereça apelo teórico e economia mínima de largura de banda, considerações práticas fazem 200 a escolha clara para design de API consistente, manutenível e amigável ao usuário.

O insight chave é que **coleções são recursos com representações, mesmo quando vazias**. Uma coleção vazia não é "nenhum conteúdo" - é conteúdo que por acaso está vazio, tornando 200 OK a escolha semanticamente correta e praticamente superior.

---

**Sobre este Documento**

Este guia serve como documentação viva que deve ser atualizada regularmente conforme a tecnologia evolui e as necessidades organizacionais mudam, mantendo as equipes brasileiras alinhadas com as melhores práticas internacionais adaptadas ao contexto local.

Este guia técnico foi desenvolvido especificamente para equipes de desenvolvimento brasileiras, considerando aspectos culturais, regulamentares e técnicos do mercado nacional. Combina melhores práticas internacionais com adaptações para o contexto brasileiro, fornecendo orientação prática e acionável para implementação de APIs RESTful robustas e conformes.

_Fontes: Mozilla MDN, RFC 9110, APIs do Google Cloud, Diretrizes da API REST da Microsoft, REST API Tutorial e várias melhores práticas da indústria._
