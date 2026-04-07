# NAVIR Interno - Regras de Negocio

---

# 1. Usuarios

## RN-001 - Tipos de usuario
- ADMIN
- PROFESSOR
- PESQUISADOR
- INTERESSADO

## RN-002 - Estados de usuario
- PENDENTE
- ACEITO
- NEGADO

Regras:
- PESQUISADOR inicia como PENDENTE.
- PROFESSOR inicia como PENDENTE (quando auto cadastrado).
- INTERESSADO nao possui estado.
- Usuario NEGADO nao acessa o sistema.

## RN-003 - Status academico (apenas pesquisador)
- REGULAR
- FINALISTA
- INATIVO
- EGRESSO
- DESISTENTE (manual)

## RN-004 - Conversao de interessado
- ADMIN pode converter INTERESSADO para PESQUISADOR.
- Conversao preserva dados cadastrais.
- Conversao libera funcionalidades de pesquisador.

---

# 2. Cadastro

## RN-005 - Dados obrigatorios no cadastro inicial
- Nome completo
- Email institucional
- Link do Lattes
- Tipo de usuario
- Aceite de termos

Regra adicional:
- Historico escolar e obrigatorio para PESQUISADOR e INTERESSADO.
- Historico escolar nao e obrigatorio para PROFESSOR.

## RN-006 - Cadastro de pesquisador/professor
- Requer aprovacao do ADMIN.
- Negacao exige justificativa obrigatoria.

## RN-007 - Cadastro de interessado
- Nao requer aprovacao.
- Nao envia email automatico.
- Notifica ADMIN sobre novo cadastro.
- Ao tentar login, exibe mensagem de oportunidade.

Mensagem padrao:
"Entraremos em contato quando surgir uma oportunidade compativel com seu perfil."

---

# 3. Permissoes

## RN-008 - ADMIN
- Gerenciar usuarios e bloqueios.
- Aprovar/Negar cadastros.
- Converter interessado em pesquisador.
- Gerenciar projetos e tipos.
- Autorizar acesso ao laboratorio.
- Gerenciar dispositivos.
- Exportar relatorios.
- Acessar dashboard administrativo.

## RN-009 - PROFESSOR
- Atualizar perfil.
- Visualizar pesquisadores vinculados.
- Visualizar projetos.
- Buscar pesquisadores por habilidade/disponibilidade.
- Acessar dashboard de orientandos.

## RN-010 - PESQUISADOR
- Atualizar perfil.
- Gerenciar projetos.
- Enviar historico escolar.
- Atualizar Lattes.
- Cadastrar dispositivos.
- Solicitar acesso ao laboratorio.
- Visualizar status academico.

## RN-011 - INTERESSADO
- Pode atualizar historico e link do Lattes.
- Pode atualizar descricao/bio basica e habilidades.
- Nao possui acesso a projetos, dispositivos e laboratorio.

---

# 4. Projetos

## RN-012 - Criacao e ownership
- Apenas PESQUISADOR cria projeto.

## RN-013 - Campos obrigatorios
- Titulo
- Tipo
- Data de inicio
- Data de fim
- Professor orientador
- Status

Campos condicionais:
- Agencia e remunerado sao obrigatorios quando nao for projeto independente.

## RN-014 - Regra PIBIC/PIBIT
- Se tipo = PIBIC ou PIBIT, codigo_projeto e obrigatorio.

## RN-015 - Status do projeto
- ATIVO
- FINALIZADO (automatico por data)

## RN-016 - Disponibilidade
- Pesquisador sem projeto ativo recebe flag DISPONIVEL.

---

# 5. Acesso ao laboratorio e dispositivos

## RN-017 - Acesso ao laboratorio
- Sistema nao armazena biometria.
- Apenas status de acesso:
   - PENDENTE
   - AUTORIZADO
   - BLOQUEADO
- Apenas PESQUISADOR solicita acesso.
- Apenas ADMIN altera status.

## RN-018 - Dispositivos WiFi
- Apenas PESQUISADOR cadastra dispositivo.
- ADMIN ativa/inativa dispositivo.
- Fluxo de status: PENDENTE -> ATIVO/INATIVO.

---

# 6. Atualizacao de dados

## RN-019 - Atualizacao valida
- Novo historico enviado.
- Lattes atualizado.

## RN-020 - Registro temporal
- data_ultima_atualizacao
- data_ultimo_historico
- data_ultimo_lattes

---

# 7. Classificacao academica

## RN-021 - REGULAR
- Percentual concluido < 80%.

## RN-022 - FINALISTA
- Percentual concluido >= 80%.

## RN-023 - INATIVO
- Base: sem atualizacao por 6 meses.

Excecoes:
1. Se projeto terminar antes dos 6 meses, contagem inicia no fim do projeto.
2. Se pesquisador estiver DISPONIVEL, prazo reduzido para 3 meses.

## RN-024 - EGRESSO
- FINALISTA sem atualizacao por 2 meses de inatividade.
- Ou definicao manual por ADMIN ou pelo proprio usuario.

## RN-025 - DESISTENTE
- Definicao manual por ADMIN.

---

# 8. Automacoes

## RN-026 - Recalculo de classificacao
Executar em:
- Login
- Atualizacao de historico
- Atualizacao de Lattes
- Cron diario

---

# 9. Seguranca, notificacoes e relatorios

## RN-027 - Seguranca
- NEGADO nao autentica.
- Permissoes por tipo de usuario sao obrigatorias.

## RN-028 - Notificacoes
- Novo interessado -> notificar ADMIN.
- Mudanca relevante de status -> notificar usuario.

## RN-029 - Relatorios
- Apenas ADMIN exporta relatorios.
- Formatos suportados: CSV e PDF.

---

# 10. Integridade de dados

## RN-030 - Historico escolar
- Arquivo pode ser transitiente; sistema persiste os dados extraidos.

## RN-031 - Recalculo academico
- Percentual concluido e status sao recalculados a cada novo historico valido.