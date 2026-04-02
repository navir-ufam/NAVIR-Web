# NAVIR — Arquitetura Geral do Sistema

O NAVIR é composto por duas aplicações principais:

* Backend (API REST)
* Frontend (Interface Web)

A comunicação é feita via HTTP utilizando JSON.

---

# Visão Geral

```
Frontend (React)
        ↓
     REST API
        ↓
Backend (NestJS)
        ↓
     Database
```

---

# Componentes do Sistema

## Frontend

Responsável por:

* Interface do usuário
* Formulários
* Dashboard
* Visualização de dados
* Autenticação
* Consumo da API

Tecnologias:

* React
* TypeScript
* Vite
* Context API
* Hooks

---

## Backend

Responsável por:

* Regras de negócio
* Autenticação
* Classificação automática
* Processamento de histórico
* Controle de acesso
* API REST

Tecnologias:

* NestJS
* TypeScript
* JWT
* PostgreSQL

---

## Database

Responsável por:

* Persistência dos dados
* Relacionamentos
* Integridade
* Histórico

Banco recomendado:

PostgreSQL

---

# Estrutura do Repositório

```
navir/
 ├── backend/
 ├── frontend/
 └── docs/
```

---

# Fluxo de Autenticação

```
Frontend
   ↓
POST /auth/login
   ↓
Backend valida usuário
   ↓
JWT Token
   ↓
Frontend salva token
   ↓
Requests autenticadas
```

---

# Fluxo de Cadastro

```
Frontend Form
     ↓
POST /users
     ↓
UsersController
     ↓
UsersService
     ↓
Database
     ↓
StatusService
     ↓
Resposta API
     ↓
Frontend
```

---

# Fluxo de Atualização do Usuário

```
Frontend
   ↓
PUT /users/:id
   ↓
UsersService
   ↓
UpdatesService
   ↓
StatusService
   ↓
Database
```

---

# Fluxo de Classificação Automática

Executado quando:

* Login
* Atualização
* Envio de histórico
* Cron diário

```
StatusCron
   ↓
StatusService
   ↓
AcademicService
   ↓
Update user status
   ↓
Database
```

---

# Fluxo de Cadastro de Projeto

```
Frontend
   ↓
POST /projects
   ↓
ProjectsController
   ↓
ProjectsService
   ↓
Database
```

---

# Fluxo de Cadastro de Dispositivo WiFi

```
Frontend
   ↓
POST /devices
   ↓
DevicesService
   ↓
Database
```

---

# Fluxo de Acesso ao Laboratório

```
Biometria
   ↓
Backend valida usuário
   ↓
Status acesso
   ↓
AUTORIZADO | BLOQUEADO
```

---

# Fluxo de Dashboard

```
Frontend Dashboard
      ↓
GET /dashboard
      ↓
DashboardService
      ↓
Database
      ↓
Métricas
      ↓
Frontend
```

---

# Fluxo de Relatórios

```
Frontend
   ↓
GET /reports
   ↓
ReportsService
   ↓
Database
   ↓
CSV / PDF
   ↓
Download
```

---

# Domínios do Sistema

O backend é dividido por domínios:

* Users
* Auth
* Academic
* Projects
* Devices
* Biometric
* Status
* Updates
* Dashboard
* Reports

---

# Relacionamentos Principais

```
User
 ├── Academic (1:1)
 ├── Projects (1:N)
 ├── Devices (1:N)
 ├── Update (1:1)
 └── Biometric (1:1)
```

---

# Tipos de Usuário

Administrador

* Acesso total
* Aprovar usuários
* Converter interessado
* Ver dashboard
* Exportar relatórios

Aluno NAVIR

* Atualizar perfil
* Enviar histórico
* Projetos
* Dispositivos
* Biometria

Interessado

* Cadastro básico
* Enviar histórico
* Lattes
* Banco de talentos

---

# Status do Usuário

Status usuário:

* PENDENTE
* ATIVO
* BLOQUEADO
* INATIVO
* EGRESSO

Status acadêmico:

* REGULAR
* FINALISTA
* INATIVO
* EGRESSO

---

# Classificação Automática

Regular

```
percentual < 80%
```

Finalista

```
percentual >= 80%
```

Inativo

```
sem atualização > 6 meses
```

Egresso

```
finalista + sem atualização > 12 meses
```

---

# Atualizações Obrigatórias

Usuário deve atualizar:

* Histórico escolar
* Lattes

Atualização válida:

* Novo histórico enviado
* Lattes atualizado

Não conta:

* Foto
* Senha
* Dispositivos

---

# Segurança

Autenticação:

JWT

Proteção de rotas:

* Admin only
* Aluno only
* Auth required

---

# Comunicação Frontend → Backend

Formato:

JSON

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
