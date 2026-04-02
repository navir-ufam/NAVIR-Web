# NAVIR — Frontend Architecture

Frontend desenvolvido com:

* React
* TypeScript
* Arquitetura por features
* Services para API
* Componentes reutilizáveis

---

# Estrutura do Frontend

```
src/
 ├── pages/
 ├── components/
 ├── services/
 ├── hooks/
 ├── context/
 ├── layouts/
 ├── routes/
 ├── types/
 └── utils/
```

---

# Pages

Cada página principal do sistema.

```
pages/
 ├── login/
 ├── dashboard/
 ├── users/
 ├── profile/
 ├── projects/
 ├── devices/
 ├── reports/
 └── admin/
```

---

# Components

Componentes reutilizáveis.

```
components/
 ├── ui/
 ├── forms/
 ├── tables/
 ├── modals/
 └── layout/
```

Exemplos:

* Button
* Input
* Modal
* Table
* Card

---

# Services

Comunicação com API NestJS.

```
services/
 ├── api.ts
 ├── auth.service.ts
 ├── users.service.ts
 ├── projects.service.ts
 ├── dashboard.service.ts
 └── reports.service.ts
```

---

# Hooks

Hooks customizados.

```
hooks/
 ├── useAuth.ts
 ├── useUsers.ts
 ├── useProjects.ts
 └── useDashboard.ts
```

---

# Context

Gerenciamento de estado global.

```
context/
 ├── AuthContext.tsx
 └── AppContext.tsx
```

Responsável por:

* usuário logado
* permissões
* token JWT

---

# Layouts

Layouts da aplicação.

```
layouts/
 ├── MainLayout.tsx
 ├── AuthLayout.tsx
 └── AdminLayout.tsx
```

---

# Routes

Configuração de rotas.

```
routes/
 ├── index.tsx
 ├── private.routes.tsx
 └── public.routes.tsx
```

---

# Types

Tipagem TypeScript.

```
types/
 ├── user.ts
 ├── project.ts
 ├── academic.ts
 └── device.ts
```

---

# Utils

Funções auxiliares.

```
utils/
 ├── formatDate.ts
 ├── calculateStatus.ts
 └── validators.ts
```

---

# Fluxo Frontend

Login:

```
Login Page
   ↓
Auth Service
   ↓
API NestJS
   ↓
JWT
   ↓
Auth Context
```

---

# Fluxo de Dados

```
Page
 ↓
Hook
 ↓
Service
 ↓
API
 ↓
Backend
```

---

# Estrutura por Feature (Opcional)

Alternativa mais escalável.

```
features/
 ├── users/
 ├── projects/
 ├── dashboard/
 └── auth/
```

Exemplo:

```
users/
 ├── UsersPage.tsx
 ├── users.service.ts
 ├── users.hook.ts
 └── components/
```

---

# Comunicação com Backend

Frontend chama API:

```
GET /users
POST /projects
PUT /users/:id
DELETE /devices/:id
```

---

# Arquitetura Final

Frontend:

React
Pages
Components
Services
Hooks

Backend:

NestJS
Modules
Services
Repositories

Comunicação:

Frontend → REST API → Backend → Database
