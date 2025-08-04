Here's the article translated to Brazilian Portuguese:

**Erros 4xx entre microsserviços internos são geralmente um anti-padrão** e indicam problemas de design ou implementação, em vez de erros legítimos do cliente.

Por que Erros 4xx Não Fazem Sentido Internamente

**Erros 4xx representam erros do cliente** - requisições malformadas, autenticação ausente, permissões insuficientes ou requisições para recursos inexistentes. Em uma arquitetura de microsserviços internos bem projetada:

* Os serviços devem ter **contratos bem definidos** (especificações OpenAPI, arquivos proto)
* **Autenticação serviço-a-serviço** deve ser tratada no nível da infraestrutura
* **Validação de requisições** deve acontecer nas fronteiras dos serviços, não entre serviços internos confiáveis
* **Consistência de dados** deve ser mantida através do design adequado dos serviços

Quando o Serviço A chama o Serviço B internamente, o Serviço A já deveria saber:
* O contrato de API correto
* Credenciais de autenticação válidas
* Formatação adequada da requisição
* Recursos disponíveis (através de descoberta de serviços ou contratos)

Como os Erros Internos Deveriam Ser

**Erros 5xx são apropriados** para falhas internas legítimas:
* Serviço temporariamente indisponível
* Falhas de conexão com banco de dados
* Timeouts de serviços downstream
* Esgotamento de recursos

**Respostas 2xx** devem tratar resultados da lógica de negócio:
* `200` com corpo de resposta indicando estados de sucesso/falha
* `404` apenas quando o recurso genuinamente não existe (não devido a erro do chamador)
* Códigos de erro de negócio customizados nos corpos de resposta

Melhores Práticas para Comunicação Interna

**Design Contract-First**
* Defina contratos de API antecipadamente usando OpenAPI ou Protocol Buffers
* Gere bibliotecas cliente a partir dos contratos
* Versione suas APIs adequadamente

**Benefícios do Service Mesh**
* TLS mútuo automático
* Circuit breakers e tentativas automáticas
* Observabilidade e rastreamento distribuído
* Balanceamento de carga e descoberta de serviços

**Estratégia de Tratamento de Erros**
* Use respostas de erro estruturadas com códigos de erro de negócio
* Implemente lógica de retry adequada com backoff exponencial
* Registre erros com IDs de correlação para rastreamento