# NAVIR - Backend Architecture

Backend desenvolvido com NestJS seguindo:

- Arquitetura modular por dominio
- Camadas (Controller, Service, Repository)
- Regras centralizadas em services de dominio
- Persistencia relacional em PostgreSQL

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

# Modulos Principais

```
modules/
 ├── auth/
 ├── usuarios/
 ├── perfis/
 ├── dados-academicos/
 ├── curriculos/
 ├── historico/
 ├── projetos/
 ├── dispositivos/
 ├── acesso-laboratorio/
 ├── status-academico/
 ├── dashboard/
 ├── relatorios/
 └── notificacoes/
```

---

# Auth Module

Responsavel por:

- Login e emissao de JWT
- Validacao de estado de usuario
- Guards por role (ADMIN, PROFESSOR, PESQUISADOR)

Regra critica:
- Usuario com estado NEGADO nao autentica.

---

# Usuarios Module

Responsavel por:

- Cadastro inicial (pesquisador/professor/interessado)
- Fluxo de aprovacao (ACEITAR/NEGAR)
- Conversao interessado -> pesquisador
- Bloqueio e manutencao cadastral

Estados de usuario:
- PENDENTE
- ACEITO
- NEGADO

Observacao:
- INTERESSADO nao possui estado.

---

# Dados Academicos + Historico

Responsavel por:

- Parser do historico escolar
- Persistencia de curso, modalidade, matricula, periodo e coeficiente
- Calculo de percentual concluido
- Atualizacao de datas para classificacao

---

# Projetos Module

Responsavel por:

- Cadastro e atualizacao de projetos
- Finalizacao automatica por data
- Sinalizacao de disponibilidade quando nao houver projeto ativo

Regra:
- Tipos PIBIC/PIBIT exigem codigo_projeto.

---

# Dispositivos Module

Responsavel por:

- Cadastro de dispositivo por pesquisador
- Ativacao/Inativacao por administrador

Status:
- PENDENTE
- ATIVO
- INATIVO

---

# Acesso Laboratorio Module

Responsavel por:

- Receber solicitacoes de acesso
- Permitir autorizacao ou bloqueio pelo admin

Status:
- PENDENTE
- AUTORIZADO
- BLOQUEADO

Observacao:
- O backend nao armazena biometria, apenas status de acesso.

---

# Status Academico Module

Responsavel por classificacao automatica:

- REGULAR
- FINALISTA
- INATIVO
- EGRESSO
- DESISTENTE (manual)

Triggers de recalculo:
- login
- envio de historico
- atualizacao de lattes
- cron diario

Regra de egresso:
- finalista sem atualizacao por 2 meses de inatividade, ou marcacao manual.

---

# Dashboard e Relatorios

Dashboard:
- Metricas de usuarios, status academico, projetos e disponibilidade.

Relatorios:
- Exportacao em CSV e PDF.

---

# Fluxo Padrao de Requisicao

```
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```
