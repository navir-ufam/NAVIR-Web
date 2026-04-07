# NAVIR - Frontend Architecture

Frontend construido com:

- React
- TypeScript
- Vite
- Roteamento protegido por perfil
- Consumo de API REST em /api/v1

---

# Objetivos do Frontend

- Permitir cadastro de pesquisador, professor e interessado
- Exibir fluxo de aprovacao para perfis pendentes
- Entregar area interna para admin, professor e pesquisador
- Tratar login de interessado com mensagem de oportunidade
- Exibir dashboard e relatorios conforme permissao

---

# Estrutura Sugerida

```
src/
 ├── app/
 ├── pages/
 ├── components/
 ├── features/
 ├── services/
 ├── hooks/
 ├── context/
 ├── routes/
 ├── types/
 └── utils/
```

---

# Paginas Principais

```
pages/
 ├── auth/login/
 ├── auth/cadastro/
 ├── auth/interessado-feedback/
 ├── dashboard/
 ├── usuarios/
 ├── perfil/
 ├── projetos/
 ├── dispositivos/
 ├── acesso-laboratorio/
 └── relatorios/
```

---

# Rotas e Permissao

Perfis internos:
- ADMIN
- PROFESSOR
- PESQUISADOR

Regras de roteamento:
- NEGADO: bloqueia acesso e mostra erro de autorizacao.
- PENDENTE (pesquisador/professor): acesso limitado a tela de aguardando aprovacao.
- INTERESSADO: sempre redireciona para pagina de mensagem de oportunidade.

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
