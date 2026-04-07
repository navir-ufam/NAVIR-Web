# Modelo de Banco (Relacional)

---

# 1. Tabela: usuarios

id (PK)
nome
email (UNIQUE)
senha_hash
tipo_usuario ENUM (ADMIN, PROFESSOR, PESQUISADOR, INTERESSADO)
estado_usuario ENUM (PENDENTE, ACEITO, NEGADO) NULL
status_academico ENUM (REGULAR, FINALISTA, INATIVO, EGRESSO, DESISTENTE) NULL
aceite_termos BOOLEAN
data_criacao
data_atualizacao

Regras:
- INTERESSADO -> estado_usuario = NULL.
- Apenas PESQUISADOR possui status_academico.

---

# 2. Tabela: perfis

id (PK)
usuario_id (FK usuarios.id)
foto_url
biografia
cidade_origem

---

# 3. Tabela: dados_academicos

id (PK)
usuario_id (FK usuarios.id)
curso
modalidade
matricula
periodo
coeficiente
carga_horaria_total
carga_horaria_concluida
percentual_concluido

---

# 4. Tabela: curriculos

id (PK)
usuario_id (FK usuarios.id)
link_lattes
data_atualizacao_lattes

---

# 5. Tabela: atualizacoes

id (PK)
usuario_id (FK usuarios.id)
data_ultima_atualizacao
data_ultimo_historico
data_ultimo_lattes

Uso:
- Base para regras de INATIVO/EGRESSO.

---

# 6. Tabela: projetos

id (PK)
usuario_id (FK usuarios.id)
titulo
tipo_projeto_id (FK tipos_projeto.id)
agencia_id (FK agencias.id) NULL
codigo_projeto NULL
data_inicio
data_fim
professor_id (FK usuarios.id)
remunerado BOOLEAN NULL
status ENUM (ATIVO, FINALIZADO)

Regras:
- Para projeto independente, agencia_id e remunerado podem ser nulos.
- codigo_projeto obrigatorio se tipo = PIBIC ou PIBIT.

---

# 7. Tabela: tipos_projeto

id (PK)
nome
sigla
logo_url

---

# 8. Tabela: agencias

id (PK)
nome
sigla
logo_url

---

# 9. Tabela: habilidades

id (PK)
nome

---

# 10. Tabela: usuario_habilidades

usuario_id (FK usuarios.id)
habilidade_id (FK habilidades.id)

PK composta (usuario_id, habilidade_id)

---

# 11. Tabela: dispositivos

id (PK)
usuario_id (FK usuarios.id)
nome
mac_address UNIQUE
tipo ENUM (NOTEBOOK, CELULAR, TABLET, OUTRO)
status ENUM (PENDENTE, ATIVO, INATIVO)

Regra:
- Apenas PESQUISADOR pode cadastrar.

---

# 12. Tabela: acesso_laboratorio

id (PK)
usuario_id (FK usuarios.id)
status ENUM (PENDENTE, AUTORIZADO, BLOQUEADO)
data_solicitacao
data_atualizacao

Observacao:
- Nao armazena biometria, somente status de acesso.

---

# 13. Tabela: notificacoes (opcional/recomendada)

id (PK)
usuario_destino_id (FK usuarios.id)
tipo
mensagem
lida BOOLEAN
data_criacao

Uso:
- Notificacao de novo interessado para admin.

---

# 14. Indices importantes

- usuarios.email (UNIQUE)
- dispositivos.mac_address (UNIQUE)
- usuarios.tipo_usuario
- usuarios.estado_usuario
- usuarios.status_academico
- projetos.usuario_id
- projetos.status
- acesso_laboratorio.usuario_id
- atualizacoes.data_ultima_atualizacao