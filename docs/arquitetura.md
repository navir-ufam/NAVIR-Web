# NAVIR - Arquitetura Geral do Sistema

O NAVIR e composto por duas aplicacoes principais:

- Backend (API REST em NestJS)
- Frontend (Interface Web em React)

A comunicacao entre as camadas ocorre por HTTP/JSON.

---

# Visao Geral

```
Frontend (React + Vite)
        ↓
     REST API
        ↓
Backend (NestJS)
        ↓
PostgreSQL
```

---

# Componentes do Sistema

## Frontend

Responsavel por:

- Interface dos perfis (admin, professor, pesquisador)
- Fluxos de cadastro e autenticacao
- Gestao de perfil, projetos, dispositivos e solicitacoes
- Dashboards e exportacao de relatorios

## Backend

Responsavel por:

- Regras de negocio e validacoes
- Autenticacao e autorizacao por tipo de usuario
- Processamento de historico escolar
- Classificacao academica automatica
- Integracao com persistencia e jobs (cron diario)

## Banco de Dados

Responsavel por:

- Persistencia relacional
- Integridade e historico de atualizacoes
- Consultas para dashboard e relatorios

---

# Estrutura do Repositorio

```
NAVIR-Web/
 ├── src/
 │   ├── backend/
 │   └── frontend/
 └── docs/
```

---

# Fluxos Principais

## Fluxo de Autenticacao

```
Frontend
   ↓
POST /api/v1/auth/login
   ↓
AuthService valida credenciais e estado
   ↓
JWT (quando permitido)
   ↓
Frontend persiste sessao
```

Regra critica:
- Usuario NEGADO nao autentica (403).

## Fluxo de Cadastro

```
Frontend Form
   ↓
POST /api/v1/usuarios
   ↓
UsersService
   ↓
Database + notificacao interna
```

Comportamento por tipo:
- Pesquisador/Professor: criados como PENDENTE (aguardam aprovacao).
- Interessado: sem estado, salvo no banco de talentos, com mensagem de acompanhamento.

## Fluxo de Atualizacao Academica

```
POST /api/v1/historico
   ↓
ParserHistorico
   ↓
DadosAcademicosService
   ↓
UpdatesService
   ↓
StatusAcademicoService
```

## Fluxo de Classificacao Automatica

Executado em:
- login
- envio de historico
- atualizacao de lattes
- cron diario

```
StatusScheduler
   ↓
StatusService
   ↓
UsersRepository
```

Regra de classificacao:
- REGULAR: percentual concluido < 80%
- FINALISTA: percentual concluido >= 80%
- INATIVO: sem atualizacao por 6 meses (3 meses se disponivel)
- EGRESSO: finalista sem atualizacao por 2 meses de inatividade ou marcacao manual
- DESISTENTE: apenas marcacao manual

## Fluxo de Projetos e Disponibilidade

```
POST /api/v1/projetos
   ↓
ProjectsService
   ↓
Status de projeto (ATIVO/FINALIZADO)
   ↓
Recalculo de disponibilidade do pesquisador
```

## Fluxo de Acesso ao Laboratorio

```
Pesquisador solicita acesso
   ↓
POST /api/v1/acesso-laboratorio/solicitacoes
   ↓
Admin autoriza/bloqueia
   ↓
Status: AUTORIZADO | BLOQUEADO
```

Observacao:
- O sistema nao armazena biometria, apenas status de autorizacao.

---

# Dominios do Backend

- auth
- usuarios
- perfis
- dados-academicos
- curriculos
- historico
- projetos
- dispositivos
- acesso-laboratorio
- status-academico
- dashboard
- relatorios
- notificacoes

---

# Tipos de Usuario e Permissoes

- ADMIN: controle total, aprovacao/negacao, conversao de interessado, dashboard e relatorios.
- PROFESSOR: visualizacao de orientandos, projetos e buscas por habilidades/disponibilidade.
- PESQUISADOR: perfil, projetos, historico, lattes, dispositivos e solicitacao de acesso.
- INTERESSADO: cadastro basico e atualizacao de historico/lattes para banco de talentos.

---

# Seguranca

- JWT para autenticacao.
- Guards de role para permissao por tipo de usuario.
- Guard de estado para bloquear acesso de usuario NEGADO.

---

# Padroes de Integracao

- Contratos da API em JSON.
- Versao de rota em /api/v1.
- Eventos internos para notificacoes e processos assincronos.

Exemplo:

```
GET /users
POST /projects
PUT /users/:id
DELETE /devices/:id
```

---

# Arquitetura Final

```
Frontend (React)
      ↓
 REST API (HTTP)
      ↓
Backend (NestJS)
      ↓
Database (PostgreSQL)
```

---

# Escalabilidade Futura

Possíveis expansões:

* Integração API Lattes
* Logs de acesso
* Logs WiFi
* Notificações
* Upload de arquivos
* Microserviços
* Worker de processamento
* WebSocket para dashboard
