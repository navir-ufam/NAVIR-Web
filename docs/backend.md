# NAVIR — Backend Architecture

Backend desenvolvido com NestJS usando:

* Arquitetura Modular
* Separação por Domínio
* Camadas (Controller, Service, Repository)
* Banco relacional

---

# Estrutura do Backend

```
src/
 ├── modules/
 ├── common/
 ├── database/
 └── main.ts
```

---

# Modules

Cada módulo representa um domínio do sistema.

```
modules/
 ├── users/
 ├── auth/
 ├── academic/
 ├── projects/
 ├── devices/
 ├── biometric/
 ├── status/
 ├── updates/
 ├── dashboard/
 └── reports/
```

---

# Users Module

Responsável por:

* Cadastro
* Aprovação
* Conversão interessado → aluno
* Bloqueio
* Edição

```
users/
 ├── users.controller.ts
 ├── users.service.ts
 ├── users.repository.ts
 ├── users.entity.ts
 ├── users.module.ts
 └── dto/
```

---

# Auth Module

Autenticação do sistema.

```
auth/
 ├── auth.controller.ts
 ├── auth.service.ts
 ├── jwt.strategy.ts
 ├── guards/
 └── auth.module.ts
```

Responsável por:

* Login
* JWT
* Proteção de rotas
* Roles
* Permissões

---

# Academic Module

Dados acadêmicos do usuário.

```
academic/
 ├── academic.service.ts
 ├── academic.entity.ts
 ├── parser.service.ts
 └── academic.module.ts
```

Responsável por:

* coeficiente
* período
* carga horária
* percentual
* curso

---

# Projects Module

Usuário pode ter múltiplos projetos.

```
projects/
 ├── projects.controller.ts
 ├── projects.service.ts
 ├── projects.repository.ts
 ├── projects.entity.ts
 └── projects.module.ts
```

Relacionamento:

User 1:N Projects

---

# Devices Module

Controle de dispositivos WiFi.

```
devices/
 ├── devices.controller.ts
 ├── devices.service.ts
 ├── devices.entity.ts
 └── devices.module.ts
```

---

# Biometric Module

Controle de acesso ao laboratório.

```
biometric/
 ├── biometric.controller.ts
 ├── biometric.service.ts
 ├── biometric.entity.ts
 └── biometric.module.ts
```

---

# Status Module

Classificação automática.

```
status/
 ├── status.service.ts
 ├── status.cron.ts
 ├── status.enum.ts
 └── status.module.ts
```

Status:

* REGULAR
* FINALISTA
* INATIVO
* EGRESSO

---

# Updates Module

Controle de atualização obrigatória.

```
updates/
 ├── updates.service.ts
 ├── updates.entity.ts
 └── updates.module.ts
```

---

# Dashboard Module

Métricas administrativas.

```
dashboard/
 ├── dashboard.controller.ts
 ├── dashboard.service.ts
 └── dashboard.module.ts
```

---

# Reports Module

Exportação de relatórios.

```
reports/
 ├── reports.controller.ts
 ├── reports.service.ts
 └── reports.module.ts
```

---

# Relacionamentos

```
User
 ├── Academic (1:1)
 ├── Projects (1:N)
 ├── Devices (1:N)
 ├── Update (1:1)
 └── Biometric (1:1)
```

---

# Fluxo do Sistema

Cadastro:

```
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

---

# Recalculo de Status

Executado:

* login
* atualização
* envio histórico
* cron diário

```
StatusCron
  ↓
StatusService
  ↓
UsersRepository
```
