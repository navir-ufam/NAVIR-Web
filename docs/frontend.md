# NAVIR - Frontend Architecture

Frontend construído com:

- React 19
- TypeScript
- Vite
- React Router v7 (Data Router com `createBrowserRouter` e `<RouterProvider />`)
- Roteamento protegido por perfil e estado (`ProtectedRoute`, `PublicRoute`, `AuthContext`)
- Consumo de API REST em `/api/v1` com camada de mocks (`withMock` + `VITE_USE_MOCKS`)

---

# Objetivos do Frontend

- Permitir cadastro de pesquisador, professor e interessado
- Exibir fluxo de aprovação para perfis pendentes (`/aguardando-aprovacao`)
- Entregar área interna para admin, professor e pesquisador
- Tratar login de interessado com mensagem de oportunidade (`/interessado-feedback`)
- Exibir dashboard e relatórios conforme permissão

---

# Estrutura do Projeto

```
src/
 ├── app/         (App.tsx, queryClient.ts)
 ├── pages/       (Telas agrupadas por domínio)
 ├── components/  (ui, common, layout)
 ├── features/    (Lógica específica por funcionalidade)
 ├── services/    (Integração com API REST e mocks)
 ├── hooks/       (Custom hooks)
 ├── context/     (AuthContext, ThemeContext)
 ├── routes/      (router.tsx com createBrowserRouter)
 ├── types/       (Contratos TypeScript alinhados ao backend)
 └── utils/       (Funções utilitárias)
```

---

# Páginas e Mapeamento de Rotas

```
pages/
 ├── auth/
 │    ├── login/                     -> /login
 │    ├── cadastro/                  -> /cadastro (seleção de perfil)
 │    │    ├── pesquisador/          -> /cadastro/pesquisador
 │    │    ├── professor/            -> /cadastro/professor
 │    │    └── interessado/          -> /cadastro/interessado
 │    ├── interessado-feedback/      -> /interessado-feedback
 │    ├── aguardando-aprovacao/      -> /aguardando-aprovacao
 │    └── acesso-negado/             -> /acesso-negado
 ├── dashboard/                      -> /dashboard
 ├── usuarios/                       -> /usuarios e /usuarios/:id
 ├── perfil/                         -> /perfil
 ├── projetos/                       -> /projetos, /projetos/novo, /projetos/:id/editar
 ├── dispositivos/                   -> /dispositivos
 ├── acesso-laboratorio/             -> /acesso-laboratorio
 ├── relatorios/                     -> /relatorios
 ├── curriculo/                      -> /curriculo
 ├── historico/                      -> /historico
 ├── atualizacoes/                   -> /atualizacoes
 └── configuracoes/                  -> /configuracoes
```

---

# Rotas e Permissão

Perfis internos:
- ADMIN
- PROFESSOR
- PESQUISADOR

Regras de roteamento:
- NEGADO: bloqueia acesso e redireciona para `/acesso-negado`.
- PENDENTE (pesquisador/professor): acesso limitado à tela `/aguardando-aprovacao`.
- INTERESSADO: sempre redireciona para a página `/interessado-feedback`.

---

# Services

```
services/
 ├── api.ts
 ├── auth.service.ts
 ├── usuarios.service.ts
 ├── perfil.service.ts
 ├── historico.service.ts
 ├── curriculo.service.ts
 ├── projetos.service.ts
 ├── dispositivos.service.ts
 ├── acessoLaboratorio.service.ts
 ├── dashboard.service.ts
 └── relatorios.service.ts
```

---

# Fluxos de Interface

## Login

```
Login Page
   ↓
auth.service.login
   ↓
Se interessado -> pagina de feedback
Se autorizado -> area interna por role
```

## Cadastro

```
Formulario de cadastro
   ↓
Escolha de tipo (pesquisador/professor/interessado)
   ↓
Valida campos obrigatorios por tipo
   ↓
POST /usuarios
```

## Atualizacao Academica

```
Upload de historico + atualizacao lattes
   ↓
services historico/curriculo
   ↓
refresh de status academico no contexto
```

---

# Componentes-Chave

- Tabela de usuarios com filtros por tipo, status e disponibilidade
- Formulario de aprovacao/negacao com motivo obrigatorio para negacao
- Cards de metrica para dashboard
- Tabela de projetos com indicador de disponibilidade
- Modulo de solicitacao e status de acesso ao laboratorio

---

# Tipos TypeScript Minimos

```
UserType = 'ADMIN' | 'PROFESSOR' | 'PESQUISADOR' | 'INTERESSADO'
UserState = 'PENDENTE' | 'ACEITO' | 'NEGADO' | null
AcademicStatus = 'REGULAR' | 'FINALISTA' | 'INATIVO' | 'EGRESSO' | 'DESISTENTE'
```

---

# Integracao com Backend

Exemplos de endpoints consumidos:

- POST /api/v1/auth/login
- POST /api/v1/usuarios
- PATCH /api/v1/usuarios/{id}/aprovacao
- PATCH /api/v1/usuarios/{id}/converter-para-pesquisador
- POST /api/v1/historico
- PUT /api/v1/curriculo
- GET /api/v1/dashboard
- GET /api/v1/relatorios/export?formato=csv|pdf
