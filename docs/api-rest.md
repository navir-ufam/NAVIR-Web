# NAVIR API REST

Base URL:
/api/v1

---

# 1. Autenticacao

## POST /auth/login

Request:
{
  "email": "user@ufam.edu.br",
  "senha": "Exemplo12*%"
}

Response (pesquisador/professor/admin):
{
  "token": "jwt_token",
  "usuario": {
    "id": 1,
    "tipo": "PESQUISADOR",
    "estado": "ACEITO"
  }
}

Response (interessado):
{
  "mensagem": "Entraremos em contato quando surgir uma oportunidade compativel com seu perfil."
}

Regras:
- Usuario NEGADO retorna 403.
- INTERESSADO nao recebe funcionalidades internas; apenas mensagem de acompanhamento.

---

# 2. Usuarios

## POST /usuarios

Cria usuario (PESQUISADOR, PROFESSOR ou INTERESSADO).

Request de exemplo (pesquisador/interessado):
{
  "nome": "Joao Silva",
  "email": "joao.user@ufam.edu.br",
  "senha": "Exemplo12*%",
  "tipo": "PESQUISADOR | INTERESSADO",
  "historico": "historico.pdf",
  "link_lattes": "lattes.cnpq.br/0000000000000000",
  "aceite_termos": true
}

Request de exemplo (professor):
{
  "nome": "Joao Silva",
  "email": "joao.user@ufam.edu.br",
  "senha": "Exemplo12*%",
  "tipo": "PROFESSOR",
  "link_lattes": "lattes.cnpq.br/0000000000000000",
  "aceite_termos": true
}

Regras:
- INTERESSADO: estado = null, nao exige aprovacao, notifica admin.
- PESQUISADOR/PROFESSOR: estado inicial = PENDENTE.
- Se acao = NEGAR em aprovacao, motivo e obrigatorio.

Response:
201 Created

## GET /usuarios

(ADMIN/PROFESSOR)

Query params:
- nome
- tipo
- status_academico
- disponibilidade
- habilidade

## GET /usuarios/{id}

Retorna perfil completo.

## PATCH /usuarios/{id}/aprovacao

(ADMIN)

{
  "acao": "ACEITAR | NEGAR",
  "motivo": "obrigatorio se NEGAR"
}

## PATCH /usuarios/{id}/converter-para-pesquisador

(ADMIN)

Converte interessado em pesquisador mantendo dados existentes.

---

# 3. Perfil e Curriculo

## PUT /perfil

Atualiza perfil basico.

{
  "foto_url": "https://...",
  "biografia": "Sou pesquisador do 3 periodo com foco em IA.",
  "habilidades": ["Python", "IA"]
}

## PUT /curriculo

{
  "link_lattes": "..."
}

---

# 4. Historico Escolar

## POST /historico

Upload e processamento para extracao de dados academicos.

Regras:
- Atualiza curso, modalidade, matricula, periodo, coeficiente, carga horaria e percentual concluido.
- Atualiza datas de controle de atualizacao.

---

# 5. Projetos

## POST /projetos

(PESQUISADOR)

{
  "titulo": "Machine Learning com IoT",
  "tipo_projeto_id": 1,
  "agencia_id": 1,
  "codigo_projeto": "99999999",
  "data_inicio": "2026-01-01",
  "data_fim": "2026-12-01",
  "professor_id": 2,
  "remunerado": true
}

Regras:
- Projeto independente: agencia_id e remunerado podem ser nulos.
- PIBIC/PIBIT: codigo_projeto obrigatorio.

## GET /projetos

Filtros:
- status
- professor
- tipo

## PATCH /projetos/{id}

Atualiza projeto.

## PATCH /projetos/{id}/finalizar

Finalizacao automatica por data ou manual por permissao.

---

# 6. Dispositivos WiFi

## POST /dispositivos

(PESQUISADOR)

{
  "nome": "Notebook Dell",
  "mac_address": "AA:BB:CC:DD:EE:FF",
  "tipo": "NOTEBOOK"
}

Regra:
- Status inicial = PENDENTE.

## PATCH /dispositivos/{id}/ativar

(ADMIN)

## PATCH /dispositivos/{id}/inativar

(ADMIN)

---

# 7. Acesso ao Laboratorio

## POST /acesso-laboratorio/solicitacoes

(PESQUISADOR)

Response:
{
  "status": "PENDENTE"
}

## PATCH /acesso-laboratorio/{usuarioId}

(ADMIN)

{
  "status": "AUTORIZADO | BLOQUEADO"
}

---

# 8. Dashboard

## GET /dashboard

(ADMIN e PROFESSOR para visao de orientandos)

Response:
{
  "total_usuarios": 100,
  "pendentes": 12,
  "regular": 60,
  "finalista": 20,
  "inativo": 10,
  "egresso": 5,
  "disponiveis": 14
}

---

# 9. Relatorios

## GET /relatorios/export

(ADMIN)

Query:
- formato=csv|pdf

---

# 10. Classificacao (interno)

Nao exposta diretamente por endpoint de escrita.

Executada via:
- login
- cron diario
- atualizacao de historico/lattes

---

# 11. Middlewares e Guards

- AuthGuard: valida JWT.
- RoleGuard: valida tipo de usuario.
- StateGuard: bloqueia acesso de usuario NEGADO.

---

# 12. Erros padrao

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

---

# 13. Eventos internos

- novo_interessado -> notificar admin
- projeto_finalizado -> recalcular disponibilidade
- usuario_inativo -> notificar usuario