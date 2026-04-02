# NAVIR — Estrutura do Banco de Dados

Banco relacional projetado para:

* Usuários (alunos + interessados)
* Dados acadêmicos
* Projetos
* Dispositivos WiFi
* Biometria
* Atualizações
* Status automático

---

# Tabelas Principais

```
users
academic
projects
devices
biometric
updates
```

---

# Tabela: users

Armazena usuários do sistema.

Tipos:

* Administrador
* Aluno NAVIR
* Interessado

```
users
```

Campos:

* id (uuid)
* nome
* email
* senha
* foto
* cpf
* cidade_origem
* tipo_usuario
* status_usuario
* status_academico
* acesso_lab
* aprovado
* bloqueado
* created_at
* updated_at

---

# Enum: tipo_usuario

```
ADMIN
ALUNO
INTERESSADO
```

---

# Enum: status_usuario

```
PENDENTE
ATIVO
INATIVO
BLOQUEADO
EGRESSO
```

---

# Enum: status_academico

```
REGULAR
FINALISTA
INATIVO
EGRESSO
```

---

# Enum: acesso_lab

```
AUTORIZADO
PENDENTE_BIOMETRIA
BLOQUEADO
INATIVO
```

---

# Tabela: academic

Dados acadêmicos do usuário.

Relacionamento:

User 1:1 Academic

```
academic
```

Campos:

* id
* user_id (FK users)
* curso
* modalidade
* matricula
* periodo
* coeficiente
* carga_horaria_total
* carga_horaria_concluida
* percentual_concluido
* universidade
* cidade
* estado
* created_at
* updated_at

---

# Tabela: projects

Usuário pode ter múltiplos projetos.

Relacionamento:

User 1:N Projects

```
projects
```

Campos:

* id
* user_id (FK users)
* tipo_projeto
* titulo
* professor
* data_inicio
* data_fim
* remunerado
* status
* created_at
* updated_at

---

# Enum: tipo_projeto

```
PIBIC
P&D
MESTRADO
OUTRO
```

---

# Enum: status_projeto

```
ATIVO
FINALIZADO
PAUSADO
```

---

# Tabela: devices

Dispositivos WiFi cadastrados.

Relacionamento:

User 1:N Devices

```
devices
```

Campos:

* id
* user_id (FK users)
* nome_dispositivo
* mac_address
* tipo
* ativo
* created_at

---

# Enum: tipo_dispositivo

```
NOTEBOOK
CELULAR
TABLET
OUTRO
```

---

# Tabela: biometric

Controle de acesso físico.

Relacionamento:

User 1:1 Biometric

```
biometric
```

Campos:

* id
* user_id (FK users)
* biometria_hash
* status_acesso
* data_cadastro
* atualizado_em

---

# Enum: status_acesso

```
AUTORIZADO
PENDENTE
BLOQUEADO
INATIVO
```

---

# Tabela: updates

Controle de atualização obrigatória.

Relacionamento:

User 1:1 Updates

```
updates
```

Campos:

* id
* user_id (FK users)
* data_ultima_atualizacao
* data_ultimo_historico
* data_ultima_atualizacao_lattes
* link_lattes
* created_at
* updated_at

---

# Relacionamentos

```
users
 ├── 1:1 academic
 ├── 1:N projects
 ├── 1:N devices
 ├── 1:1 biometric
 └── 1:1 updates
```

---

# Diagrama Lógico

```
users
  |
  ├── academic
  |
  ├── projects
  |
  ├── devices
  |
  ├── biometric
  |
  └── updates
```

---

# Regras Importantes

Usuário pode ter vários projetos

Usuário pode ter vários dispositivos

Usuário possui apenas um registro acadêmico

Usuário possui apenas um registro de biometria

Usuário possui apenas um registro de atualização

---

# Índices Recomendados

users

* email (unique)
* cpf (unique)
* status_usuario
* tipo_usuario

projects

* user_id
* status
* tipo_projeto

devices

* user_id
* mac_address (unique)

academic

* user_id (unique)

updates

* user_id (unique)

biometric

* user_id (unique)

---

# Campos Calculados

Não armazenar, calcular em runtime:

percentual_concluido

```
percentual = carga_concluida / carga_total * 100
```

status_academico

calculado pelo StatusService

---

# Regras de Negócio no Banco

Finalista

```
percentual >= 80
```

Inativo

```
sem atualização > 6 meses
```

Egresso

```
finalista AND sem atualização > 12 meses
```

---

# Auditoria (Opcional Futuro)

Tabelas extras:

```
access_logs
wifi_logs
status_history
project_history
```

---

# Banco Recomendado

PostgreSQL

Compatível com:

* NestJS
* Prisma
* TypeORM
* migrations
* enums
* JSON
