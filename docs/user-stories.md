# NAVIR Interno — User Stories e Plano de Implementação

Este documento consolida as **user stories** do sistema NAVIR Interno e o **plano de implementação** em fases, derivados exclusivamente da documentação deste repositório e do que já está implementado.

Fontes utilizadas:
- [requisitos](requisitos.md), [regras-de-negocio](regras-de-negocio.md), [api-rest](api-rest.md)
- [arquitetura](arquitetura.md), [backend](backend.md), [frontend](frontend.md), [banco](banco.md)
- [wireframes-iniciais](wireframes-iniciais.md), [NAVIR_Design_System](NAVIR_Design_System.md)
- Código em `src/frontend` e `src/backend`

---

# 1. Visão Geral e Premissas

O NAVIR Interno é o sistema de gestão integrada do laboratório, cobrindo usuários (ADMIN, PROFESSOR, PESQUISADOR, INTERESSADO), projetos acadêmicos, atualização acadêmica via histórico escolar e Lattes, controle de acesso ao laboratório, dispositivos WiFi, classificação acadêmica automática, dashboard e relatórios.

## 1.1 Premissas

- O **frontend** já possui base implementada (SCRUM-37 a SCRUM-44): setup Vite/React/TS, Tailwind + design system, shadcn/ui, roteamento com guards, `AuthContext`, `api.ts`/`apiClient.ts` e layout (Sidebar/Header/ProtectedRoute/PublicRoute).
- A maior parte das **páginas funcionais é placeholder** (`PagePlaceholder`) e os **services** já espelham os endpoints de `api-rest.md`, mas ainda não estão ligados às telas.
- O **backend é um scaffold NestJS vazio**: sem módulos de domínio, sem banco/ORM, sem autenticação.
- O banco é relacional (PostgreSQL), com 14 tabelas documentadas em `banco.md`.
- As regras de negócio `RN-001` a `RN-031` são a fonte de verdade funcional.
- As telas `T01` a `T40` de `wireframes-iniciais.md` definem o alvo de UI.

## 1.2 Divergências conhecidas entre docs e código

| Item | Documentação | Código atual |
|---|---|---|
| Rota de cadastro | `/auth/cadastro` | `/cadastro`, `/cadastro/pesquisador`, `/cadastro/professor`, `/cadastro/interessado` |
| Páginas citadas como “componentes-chave” | existentes | ainda são `PagePlaceholder` |
| Backend | módulos por domínio | apenas `AppModule` padrão |

O plano assume o **código como base de implementação** e a **documentação como contrato funcional**, ajustando os docs quando necessário (US-003).

## 1.3 Não-objetivos desta entrega

- Reescrever o frontend já implementado — apenas integrá-lo às APIs reais.
- Itens listados como “escalabilidade futura” em `arquitetura.md` (microserviços, WebSocket, logs de acesso/WiFi, biometria).

---

# 2. Convenções

- **IDs de história:** `US-NNN` (sequencial).
- **Estado de implementação:**
  - ✅ implementado
  - 🟡 parcial (existe base reutilizável)
  - ⬜ pendente
- **Referências:** `RN-xxx` (regra de negócio), `T-xx` (tela/wireframe), endpoint em `api-rest.md`, tabelas de `banco.md`.
- **Formato da história:** “Como <papel>, quero <ação>, para <benefício>.”
- **Critérios de aceite** são checklists testáveis.

---

# 3. Épicos e User Stories

## E0 — Fundação de Backend e Contratos

### US-001 — Fundação do backend NestJS e banco de dados
Como equipe de desenvolvimento, quero a estrutura base do backend com banco configurado, para que os módulos de domínio possam ser implementados.

- **Refs:** `arquitetura.md`, `backend.md`, `banco.md`
- **Endpoint:** `GET /api/v1/health`
- **Tabelas:** `usuarios`, `perfis`, `dados_academicos`, `curriculos`, `atualizacoes`, `projetos`, `tipos_projeto`, `agencias`, `habilidades`, `usuario_habilidades`, `dispositivos`, `acesso_laboratorio`, `notificacoes`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Projeto NestJS com módulos por domínio (auth, usuarios, perfis, dados-academicos, curriculos, historico, projetos, dispositivos, acesso-laboratorio, status-academico, dashboard, relatorios, notificacoes)
  - [ ] Conexão PostgreSQL via TypeORM com migrações para as 14 tabelas de `banco.md`
  - [ ] Índices e constraints de `banco.md` aplicados (email UNIQUE, mac_address UNIQUE, etc.)
  - [ ] Prefixo global de rota `/api/v1` e `ValidationPipe` global
  - [ ] Filtro de exceções padroniza erros 400/401/403/404 (seção 12 de `api-rest.md`)
  - [ ] Swagger/OpenAPI disponível e `.env.example` documentado
  - [ ] `npm run build` e `npm run test` verdes

### US-002 — Seeds e CI do backend
Como equipe, quero seeds iniciais e pipeline de qualidade, para viabilizar o desenvolvimento e evitar regressões.

- **Refs:** `banco.md`
- **Tabelas:** `tipos_projeto`, `agencias`, `habilidades`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Seed de tipos de projeto incluindo **PIBIC** e **PIBIT**
  - [ ] Seed de agências e habilidades base
  - [ ] Script de seed executável em ambiente local
  - [ ] Pipeline de CI roda `lint` e `test` do backend e frontend

### US-003 — Contratos compartilhados e alinhamento de rotas
Como desenvolvedor, quero tipos e roteamento alinhados aos contratos, para integrar telas e API sem ambiguidade.

- **Refs:** `api-rest.md`, `frontend.md`
- **Estado:** 🟡 (tipos e services já existem parcialmente)
- **Critérios de aceite:**
  - [ ] Tipos TS do frontend cobrem `UserType`, `UserState`, `AcademicStatus` e entidades de `banco.md`
  - [ ] Services do frontend em `src/frontend/src/services` batem 1:1 com os endpoints de `api-rest.md`
  - [ ] Divergências de rota documentadas e resolvidas (cadastro, versão do Router)
  - [ ] `docs/frontend.md` e `docs/api-rest.md` atualizados conforme decisão

---

## E1 — Autenticação e Sessão

### US-004 — Login com JWT
Como usuário interno, quero autenticar com e-mail e senha, para acessar as funcionalidades do meu perfil.

- **Refs:** RN-002, RN-027 | **Tela:** T01 | **Endpoint:** `POST /auth/login` | **Tabela:** `usuarios`
- **Estado:** 🟡 (frontend pronto, backend pendente)
- **Critérios de aceite:**
  - [ ] Credenciais válidas retornam `token` + `usuario {id, tipo, estado}`
  - [ ] Usuário **NEGADO** recebe **403** e não gera sessão, com tela de acesso negado
  - [ ] Usuário **PENDENTE** autentica mas é redirecionado a `/aguardando-aprovacao`
  - [ ] **INTERESSADO** não acessa área interna; recebe apenas a mensagem padrão de oportunidade
  - [ ] Token persistido em `localStorage` e enviado em `Authorization: Bearer`
  - [ ] Senha comparada via hash (`bcrypt`), nunca em texto puro

### US-005 — Refresh de token e logout
Como usuário autenticado, quero manter/receber minha sessão de forma segura, para não ser desconectado indevidamente.

- **Refs:** RN-027 | **Endpoints:** `POST /auth/refresh`, `POST /auth/logout`
- **Estado:** 🟡 (`apiClient.ts` já tenta refresh; backend pendente)
- **Critérios de aceite:**
  - [ ] `401` em rota protegida dispara tentativa única de refresh
  - [ ] Falha no refresh limpa a sessão e emite evento de não autorizado (`AUTH_UNAUTHORIZED_EVENT`)
  - [ ] Logout limpa token, usuário e cache do React Query

### US-006 — Guards de autenticação, role e estado
Como sistema, quero bloquear acessos indevidos por tipo e estado de usuário, para garantir a segurança (RN-027).

- **Refs:** RN-008, RN-009, RN-010, RN-026, RN-027 | **Tabelas:** `usuarios`
- **Estado:** 🟡 (guards de frontend prontos; backend pendente)
- **Critérios de aceite:**
  - [ ] `AuthGuard` valida JWT em rotas protegidas
  - [ ] `RoleGuard` restringe por tipo de usuário conforme permissões de `regras-de-negocio.md`
  - [ ] `StateGuard` bloqueia usuário **NEGADO** (403)
  - [ ] Ao fazer login, a classificação acadêmica é recalculada (RN-026)
  - [ ] `ROLE_PERMISSIONS` do frontend corresponde às permissões do backend

---

## E2 — Cadastro, Aprovação e Banco de Talentos

### US-007 — Cadastro de pesquisador
Como candidato a pesquisador, quero me cadastrar com meus dados e histórico, para solicitar entrada no laboratório.

- **Refs:** RN-005, RN-006 | **Telas:** T02, T03 | **Endpoint:** `POST /usuarios` | **Tabelas:** `usuarios`, `curriculos`, `atualizacoes`
- **Estado:** ⬜ (página placeholder; service existe)
- **Critérios de aceite:**
  - [ ] Campos obrigatórios: nome, e-mail institucional, senha+confirmação, **histórico (upload)**, link Lattes, aceite de termos
  - [ ] Conta criada com `estado_usuario = PENDENTE`
  - [ ] E-mail institucional validado quanto ao formato
  - [ ] Arquivo de histórico aceita apenas extensões permitidas (PDF no MVP)
  - [ ] Após cadastro, exibe confirmação de envio para aprovação
  - [ ] ADMIN é notificado (ver US-033)

### US-008 — Cadastro de professor
Como professor, quero me cadastrar sem enviar histórico, para solicitar entrada como orientador.

- **Refs:** RN-005, RN-006 | **Telas:** T02, T04 | **Endpoint:** `POST /usuarios` | **Tabelas:** `usuarios`, `curriculos`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Campos obrigatórios: nome, e-mail institucional, senha+confirmação, link Lattes, aceite de termos
  - [ ] **Histórico não é obrigatório** para professor
  - [ ] Conta criada com `estado_usuario = PENDENTE`

### US-009 — Cadastro de interessado
Como interessado, quero me cadastrar no banco de talentos, para ser contatado quando surgir oportunidade.

- **Refs:** RN-005, RN-007 | **Telas:** T02, T05 | **Endpoint:** `POST /usuarios` | **Tabelas:** `usuarios`, `perfis`, `habilidades`, `usuario_habilidades`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Campos obrigatórios: nome, e-mail, senha, histórico (upload), link Lattes, aceite de termos
  - [ ] Campos opcionais: descrição/bio e habilidades
  - [ ] Conta criada com `estado_usuario = NULL` e **sem aprovação**
  - [ ] Sistema **não** envia e-mail automático
  - [ ] Exibe a mensagem: “Entraremos em contato quando surgir uma oportunidade compatível com seu perfil.”
  - [ ] ADMIN é notificado sobre o novo cadastro

### US-010 — Aprovar ou negar cadastro
Como ADMIN, quero aprovar ou negar cadastros, para controlar quem entra no sistema.

- **Refs:** RN-006, RN-008 | **Telas:** T11, T12 | **Endpoint:** `PATCH /usuarios/{id}/aprovacao` | **Tabela:** `usuarios`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] `acao = ACEITAR` altera `estado_usuario` para `ACEITO`
  - [ ] `acao = NEGAR` exige `motivo` obrigatório (400 se ausente)
  - [ ] Usuário NEGADO não autentica (integração com US-004/US-006)
  - [ ] Ação disponível apenas para ADMIN
  - [ ] Confirmação antes de negar (ação irreversível)

### US-011 — Converter interessado em pesquisador
Como ADMIN, quero converter um interessado em pesquisador, para aproveitar um perfil já cadastrado.

- **Refs:** RN-004, RN-008 | **Tela:** T12 | **Endpoint:** `PATCH /usuarios/{id}/converter-para-pesquisador` | **Tabelas:** `usuarios`, `perfis`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Conversão preserva os dados cadastrais existentes
  - [ ] `tipo_usuario` passa a `PESQUISADOR` e estado definido (ACEITO)
  - [ ] Funcionalidades de pesquisador são liberadas após conversão
  - [ ] Ação disponível apenas para ADMIN e somente para `INTERESSADO`

### US-012 — Telas de estado de acesso
Como usuário, quero telas claras de estado, para entender minha situação no sistema.

- **Refs:** RN-007 | **Telas:** T06, T40, acesso-negado | **Estado:** 🟡 (rotas existem; conteúdo placeholder)
- **Critérios de aceite:**
  - [ ] T06 “Aguardando aprovação” para PESQUISADOR/PROFESSOR **PENDENTE**, com botão Sair
  - [ ] Tela de acesso negado para `NEGADO`
  - [ ] T40 feedback do interessado com mensagem padrão e ações de atualizar histórico/Lattes/perfil
  - [ ] T40 exibe restrições: sem projetos, sem dispositivos, sem laboratório
  - [ ] Guards redirecionam corretamente por estado (integração com US-006)

---

## E3 — Perfil, Currículo e Habilidades

### US-013 — Editar perfil básico
Como usuário, quero editar meus dados pessoais e habilidades, para manter meu perfil atualizado.

- **Refs:** RN-009, RN-010, RN-011 | **Tela:** T31 | **Endpoint:** `PUT /perfil` | **Tabelas:** `perfis`, `habilidades`, `usuario_habilidades`
- **Estado:** ⬜ (página placeholder; service existe)
- **Critérios de aceite:**
  - [ ] Edita foto, biografia e habilidades
  - [ ] `cidade_origem` é **somente leitura** quando derivada do histórico
  - [ ] Nome e e-mail exibidos (e-mail não editável no MVP)
  - [ ] Toast de sucesso após salvar
  - [ ] Validação de campos e feedback de erro

### US-014 — Atualizar currículo Lattes
Como usuário, quero atualizar meu link Lattes, para registrar minha atualização acadêmica.

- **Refs:** RN-009, RN-010, RN-011, RN-019 | **Tela:** T32 | **Endpoint:** `PUT /curriculo` | **Tabelas:** `curriculos`, `atualizacoes`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Atualiza `link_lattes` e `data_atualizacao_lattes`
  - [ ] Data da última atualização exibida como somente leitura
  - [ ] Atualização válida dispara recálculo de classificação (RN-026)

---

## E4 — Dados Acadêmicos e Histórico

### US-015 — Envio e processamento do histórico escolar
Como PESQUISADOR/INTERESSADO, quero enviar meu histórico escolar, para que meus dados acadêmicos sejam extraídos automaticamente.

- **Refs:** RN-030, RN-031 | **Tela:** T33 | **Endpoint:** `POST /historico` | **Tabelas:** `dados_academicos`, `atualizacoes`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Upload processa o PDF e extrai: curso, modalidade, matrícula, período, coeficiente, carga horária
  - [ ] Calcula `percentual_concluido`
  - [ ] Arquivo é transitório; o sistema persiste apenas os dados extraídos (RN-030)
  - [ ] Atualiza `data_ultimo_historico` e `data_ultima_atualizacao`
  - [ ] Exibe resumo extraído após processamento
  - [ ] Novo histórico válido recalcula percentual e status (RN-031)

### US-016 — Reenvio de histórico e atualização de interessado
Como INTERESSADO, quero reenviar histórico e link do Lattes, para manter meu cadastro elegível a oportunidades.

- **Refs:** RN-011, RN-019 | **Tela:** T40 | **Endpoints:** `POST /historico`, `PUT /curriculo`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Interessado pode enviar histórico atualizado
  - [ ] Interessado pode atualizar link do Lattes
  - [ ] Interessado **não** acessa projetos, dispositivos ou laboratório
  - [ ] Atualizações refletem no perfil básico usado nas buscas (US-031)

---

## E5 — Classificação Acadêmica e Atualizações

### US-017 — Classificação REGULAR e FINALISTA
Como sistema, quero classificar pesquisadores por percentual concluído, para refletir a situação acadêmica.

- **Refs:** RN-003, RN-021, RN-022 | **Tabela:** `usuarios.status_academico`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] `percentual_concluido < 80%` → `REGULAR`
  - [ ] `percentual_concluido >= 80%` → `FINALISTA`
  - [ ] Apenas PESQUISADOR possui `status_academico`
  - [ ] Regras cobertas por testes unitários

### US-018 — Classificação INATIVO e EGRESSO com automações
Como sistema, quero recalcular inatividade e egresso automaticamente, para manter os status corretos.

- **Refs:** RN-023, RN-024, RN-026 | **Tabelas:** `usuarios`, `atualizacoes`, `projetos`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] **INATIVO**: sem atualização por 6 meses
  - [ ] Exceção 1: se o projeto terminar antes dos 6 meses, contagem inicia no fim do projeto
  - [ ] Exceção 2: se pesquisador DISPONÍVEL, prazo reduzido para 3 meses
  - [ ] **EGRESSO**: FINALISTA sem atualização por 2 meses de inatividade
  - [ ] Recálculo disparado em: login, envio de histórico, atualização de Lattes e **cron diário**
  - [ ] Regras cobertas por testes unitários

### US-019 — Marcação manual de EGRESSO e DESISTENTE
Como ADMIN/usuário, quero marcar manualmente determinados status, para tratar casos fora da regra automática.

- **Refs:** RN-024, RN-025 | **Tela:** T12 | **Tabela:** `usuarios.status_academico`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] ADMIN pode definir `EGRESSO` manualmente
  - [ ] ADMIN pode definir `DESISTENTE` manualmente
  - [ ] Usuário pode se marcar como `EGRESSO` (quando permitido)
  - [ ] Marcação manual prevalece sobre a automática

### US-020 — Tela de atualizações acadêmicas
Como PESQUISADOR, quero visualizar minhas datas de atualização, para saber se estou em dia.

- **Refs:** RN-019, RN-020 | **Tela:** T30/T33 | **Endpoint:** `GET /atualizacoes` | **Tabela:** `atualizacoes`
- **Estado:** ⬜ (página placeholder)
- **Critérios de aceite:**
  - [ ] Exibe `data_ultima_atualizacao`, `data_ultimo_historico`, `data_ultimo_lattes`
  - [ ] Exibe dias desde a última atualização válida
  - [ ] Exibe status acadêmico atual
  - [ ] Atalhos para envio de histórico e atualização de Lattes

---

## E6 — Projetos e Disponibilidade

### US-021 — Gerenciar projetos
Como PESQUISADOR, quero criar e editar meus projetos, para registrar minha atuação acadêmica.

- **Refs:** RN-012, RN-013 | **Telas:** T34, T35, T22 | **Endpoints:** `POST /projetos`, `GET /projetos`, `PATCH /projetos/{id}` | **Tabelas:** `projetos`, `tipos_projeto`, `agencias`
- **Estado:** ⬜ (páginas placeholder; service existe)
- **Critérios de aceite:**
  - [ ] Apenas PESQUISADOR cria projeto
  - [ ] Campos obrigatórios: título, tipo, data início, data fim, professor orientador, status
  - [ ] Agência e remunerado obrigatórios quando **não** for projeto independente
  - [ ] Lista com filtros por status, professor e tipo
  - [ ] Edição permitida ao dono do projeto

### US-022 — Regra PIBIC/PIBIT
Como PESQUISADOR, quero informar o código quando o projeto for PIBIC/PIBIT, para cumprir a regra de bolsas.

- **Refs:** RN-014 | **Tela:** T35 | **Endpoint:** `POST /projetos` | **Tabela:** `projetos.codigo_projeto`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Se tipo = **PIBIC** ou **PIBIT**, `codigo_projeto` é obrigatório
  - [ ] Validação bloqueia o envio sem o código, com mensagem clara
  - [ ] Para outros tipos, `codigo_projeto` é opcional
  - [ ] Regra coberta por teste unitário

### US-023 — Finalização automática e disponibilidade
Como sistema, quero finalizar projetos por data e sinalizar disponibilidade, para refletir a alocação real.

- **Refs:** RN-015, RN-016 | **Endpoint:** `PATCH /projetos/{id}/finalizar` | **Tabelas:** `projetos`, `usuarios`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Projeto com `data_fim` vencida vira `FINALIZADO` automaticamente (cron diário)
  - [ ] Finalização manual permitida por permissão
  - [ ] Pesquisador sem projeto ativo recebe flag `DISPONIVEL`
  - [ ] Evento `projeto_finalizado` recalcula disponibilidade

---

## E7 — Dispositivos WiFi

### US-024 — Cadastrar dispositivo
Como PESQUISADOR, quero cadastrar meus dispositivos, para solicitar acesso à rede do laboratório.

- **Refs:** RN-018, RN-010 | **Tela:** T36 | **Endpoint:** `POST /dispositivos` | **Tabela:** `dispositivos`
- **Estado:** ⬜ (página placeholder; service existe)
- **Critérios de aceite:**
  - [ ] Apenas PESQUISADOR cadastra dispositivo
  - [ ] Campos: nome, MAC address, tipo (NOTEBOOK, CELULAR, TABLET, OUTRO)
  - [ ] MAC address validado e UNIQUE
  - [ ] Status inicial = `PENDENTE`
  - [ ] Lista exibe nome, MAC, tipo e status

### US-025 — Ativar/Inativar dispositivo
Como ADMIN, quero ativar ou inativar dispositivos, para controlar o acesso à rede.

- **Refs:** RN-008, RN-018 | **Tela:** T13 | **Endpoints:** `PATCH /dispositivos/{id}/ativar`, `PATCH /dispositivos/{id}/inativar` | **Tabela:** `dispositivos`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] ADMIN ativa `PENDENTE/INATIVO → ATIVO`
  - [ ] ADMIN inativa `ATIVO → INATIVO`
  - [ ] Ações disponíveis apenas para ADMIN
  - [ ] Toast de sucesso e atualização da lista

---

## E8 — Acesso ao Laboratório

### US-026 — Solicitar acesso ao laboratório
Como PESQUISADOR, quero solicitar acesso ao laboratório, para obter autorização de entrada.

- **Refs:** RN-017, RN-010 | **Tela:** T37 | **Endpoint:** `POST /acesso-laboratorio/solicitacoes` | **Tabela:** `acesso_laboratorio`
- **Estado:** ⬜ (página placeholder; service existe)
- **Critérios de aceite:**
  - [ ] Apenas PESQUISADOR solicita acesso
  - [ ] Status inicial = `PENDENTE` com `data_solicitacao`
  - [ ] Sistema **não** armazena biometria, apenas status
  - [ ] Não permite nova solicitação se já houver pendente
  - [ ] Exibe status atual e data da última alteração

### US-027 — Autorizar/Bloquear acesso ao laboratório
Como ADMIN, quero autorizar ou bloquear solicitações, para controlar o acesso físico.

- **Refs:** RN-008, RN-017 | **Tela:** T14 | **Endpoint:** `PATCH /acesso-laboratorio/{usuarioId}` | **Tabela:** `acesso_laboratorio`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] ADMIN define status `AUTORIZADO` ou `BLOQUEADO`
  - [ ] Apenas ADMIN altera status
  - [ ] Lista exibe usuário, status atual e data da solicitação
  - [ ] Alteração relevante notifica o usuário (US-033)

---

## E9 — Dashboards

### US-028 — Dashboard do administrador
Como ADMIN, quero visualizar métricas gerais, para acompanhar a operação do laboratório.

- **Refs:** RN-008 | **Tela:** T10 | **Endpoint:** `GET /dashboard` | **Tabelas:** `usuarios`, `projetos`, `acesso_laboratorio`
- **Estado:** ⬜ (página placeholder)
- **Critérios de aceite:**
  - [ ] Cards: total de usuários, pendentes, regular, finalista, inativo, egresso, disponíveis
  - [ ] Gráfico por status acadêmico
  - [ ] Lista “Últimas atualizações” e “Aprovações pendentes”
  - [ ] Métricas conferem com os dados do banco
  - [ ] Estados de loading/erro/vazio tratados

### US-029 — Dashboard do professor (orientandos)
Como PROFESSOR, quero acompanhar meus orientandos, para identificar pendências e riscos.

- **Refs:** RN-009 | **Tela:** T20 | **Endpoint:** `GET /dashboard` (visão orientandos)
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Exibe quantidade de orientandos
  - [ ] Distribuição por status acadêmico
  - [ ] Alertas de inatividade
  - [ ] Projetos próximos do fim

### US-030 — Dashboard do pesquisador
Como PESQUISADOR, quero ver minha situação atual, para saber o que precisa de atenção.

- **Refs:** RN-010 | **Tela:** T30
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Exibe status acadêmico atual
  - [ ] Exibe dias desde a última atualização válida
  - [ ] Exibe projetos ativos
  - [ ] Exibe status de acesso ao laboratório e de dispositivos

---

## E10 — Busca de Perfis

### US-031 — Buscar pesquisadores e interessados
Como PROFESSOR/ADMIN, quero buscar perfis por aderência, para encontrar pessoas para projetos.

- **Refs:** RN-009, RN-008 | **Telas:** T11, T21 | **Endpoint:** `GET /usuarios` | **Tabelas:** `usuarios`, `usuario_habilidades`, `dados_academicos`
- **Estado:** ⬜ (página placeholder; service existe)
- **Critérios de aceite:**
  - [ ] Filtros: nome, tipo, status acadêmico, disponibilidade, habilidade
  - [ ] Resultado em cards com resumo acadêmico
  - [ ] Acesso ao detalhe do perfil (T12)
  - [ ] Interessado tem perfil básico gerado a partir do histórico
  - [ ] Busca disponível para ADMIN e PROFESSOR

---

## E11 — Relatórios e Notificações

### US-032 — Exportar relatórios
Como ADMIN, quero exportar relatórios em CSV e PDF, para análise externa.

- **Refs:** RN-008, RN-029 | **Tela:** T15 | **Endpoint:** `GET /relatorios/export?formato=csv|pdf`
- **Estado:** ⬜ (página placeholder; service existe)
- **Critérios de aceite:**
  - [ ] Filtros: período, tipo de usuário, status acadêmico, projeto ativo
  - [ ] Exportação em **CSV** e **PDF**
  - [ ] Apenas ADMIN exporta relatórios
  - [ ] Conteúdo do arquivo respeita os filtros aplicados

### US-033 — Notificações
Como sistema, quero notificar usuários e administradores, para dar visibilidade a eventos importantes.

- **Refs:** RN-028 | **Tabelas:** `notificacoes`
- **Estado:** ⬜
- **Critérios de aceite:**
  - [ ] Novo interessado notifica ADMIN
  - [ ] Mudança relevante de status notifica o usuário
  - [ ] Notificação possui tipo, mensagem, destinatário, `lida` e `data_criacao`
  - [ ] Usuário consegue marcar notificação como lida
  - [ ] Eventos internos `novo_interessado` e `usuario_inativo` disparam notificações

---

## E12 — QA, Segurança e Hardening

### US-034 — Qualidade, testes e segurança
Como equipe, quero cobertura de testes e revisão de segurança, para garantir confiabilidade e conformidade.

- **Refs:** RN-027
- **Estado:** 🟡 (há testes de frontend; backend e regras pendentes)
- **Critérios de aceite:**
  - [ ] Regras críticas (RN-021 a RN-025, RN-014, RN-027) cobertas por testes
  - [ ] Testes de guards por tipo/estado de usuário no backend
  - [ ] Matriz de permissões (`regras-de-negocio.md`) revisada por role
  - [ ] Pipeline Sonar sem security hotspots críticos
  - [ ] Padrão de resposta de erros 400/401/403/404 validado

---

# 4. Plano de Implementação por Fases

Abordagem por **fatias verticais por domínio**: cada fase entrega backend + frontend integrados e utilizáveis ponta a ponta. Alternativas descartadas: *backend-first* (UI inutilizável por muito tempo) e *frontend-first com mocks* (risco alto de integração tardia).

| Fase | Objetivo | US | Entregável | Critério de pronto |
|---|---|---|---|---|
| 0 | Fundação backend + contratos | US-001 a US-003 | Banco migrado, guards base, Swagger, CI | `build` + `test` verdes |
| 1 | Autenticação end-to-end | US-004 a US-006 | Login real integrado ao `AuthContext` | Login por role; NEGADO/PENDENTE/INTERESSADO testados |
| 2 | Cadastro, aprovação e talentos | US-007 a US-012 | Fluxo T01–T06/T40 completo | Aprovar, negar e converter funcionando |
| 3 | Perfil e currículo | US-013 a US-014 | T31/T32 reais | Persistência + validação |
| 4 | Histórico e dados acadêmicos | US-015 a US-016 | T33 real | Extração + recálculo |
| 5 | Classificação e atualizações | US-017 a US-020 | Cron + triggers + T30/T33 | RN-021 a RN-026 cobertas por teste |
| 6 | Projetos | US-021 a US-023 | T34/T35/T22 | PIBIC/PIBIT e disponibilidade |
| 7 | Dispositivos | US-024 a US-025 | T36/T13 | Fluxo PENDENTE→ATIVO/INATIVO |
| 8 | Acesso ao laboratório | US-026 a US-027 | T37/T14 | Solicitar/autorizar/bloquear |
| 9 | Dashboards e busca | US-028 a US-031 | T10/T20/T30/T21 | Métricas conferem com o banco |
| 10 | Relatórios e notificações | US-032 a US-033 | T15 + eventos | Export CSV/PDF válido |
| 11 | QA e hardening | US-034 | Suíte + Sonar | Cobertura + gate aprovados |

## 4.1 Detalhamento por fase

### Fase 0 — Fundação backend + contratos
- **Backend:** estrutura modular, TypeORM + migrações (14 tabelas), `ValidationPipe`, filtro de exceções, Swagger, healthcheck, `.env`, seeds.
- **Frontend:** revisão de tipos e alinhamento de rotas/services aos contratos.
- **Testes:** smoke de boot da aplicação, migração e seed.
- **Risco:** modelagem do parser de histórico e escolha de ORM.

### Fase 1 — Autenticação end-to-end
- **Backend:** `AuthModule` (login, refresh, logout), `@nestjs/jwt` + `passport-jwt` + `bcrypt`, guards Auth/Role/State, gancho de recálculo no login.
- **Frontend:** ligar `LoginPage` ao serviço real (`authService.loginRequest`), manter fallback de mock para desenvolvimento, tratar 403/estado.
- **Testes:** login por role, NEGADO (403), PENDENTE, INTERESSADO.

### Fase 2 — Cadastro, aprovação e talentos
- **Backend:** `UsuariosModule` (`POST /usuarios`, `GET /usuarios`, `GET /usuarios/{id}`, `PATCH /usuarios/{id}/aprovacao`, `PATCH /usuarios/{id}/converter-para-pesquisador`) + upload de histórico inicial + evento `novo_interessado`.
- **Frontend:** telas T02/T03/T04/T05, T06, T40, T11, T12.
- **Testes:** validação por tipo de cadastro, motivo obrigatório na negação, conversão preservando dados.

### Fase 3 — Perfil e currículo
- **Backend:** `PerfisModule` (`PUT /perfil`), `CurriculosModule` (`PUT /curriculo`).
- **Frontend:** T31/T32 e gestão de habilidades.
- **Testes:** persistência, cidade somente leitura, gatilho de recálculo.

### Fase 4 — Histórico e dados acadêmicos
- **Backend:** `HistoricoModule` (upload + parser), `DadosAcademicosService` (percentual concluído), `UpdatesService` (datas).
- **Frontend:** T33 com resumo extraído.
- **Testes:** extração de dados, cálculo de percentual, persistência sem arquivo.

### Fase 5 — Classificação e atualizações
- **Backend:** `StatusAcademicoService` (REGULAR/FINALISTA/INATIVO/EGRESSO/DESISTENTE), `@nestjs/schedule` (cron diário), ganchos em login/histórico/Lattes.
- **Frontend:** T30/T33 de atualizações.
- **Testes:** todas as exceções de inatividade e regra de egresso.

### Fase 6 — Projetos
- **Backend:** `ProjetosModule` (CRUD, finalização por data, disponibilidade, evento `projeto_finalizado`).
- **Frontend:** T34/T35/T22.
- **Testes:** PIBIC/PIBIT, projeto independente, flag DISPONÍVEL.

### Fase 7 — Dispositivos
- **Backend:** `DispositivosModule` (cadastro, ativar, inativar).
- **Frontend:** T36/T13.
- **Testes:** MAC único, transições de status, permissões.

### Fase 8 — Acesso ao laboratório
- **Backend:** `AcessoLaboratorioModule` (solicitar, autorizar, bloquear).
- **Frontend:** T37/T14.
- **Testes:** solicitação única pendente, permissões, ausência de biometria.

### Fase 9 — Dashboards e busca
- **Backend:** `DashboardModule` (`GET /dashboard`), filtros de `GET /usuarios`.
- **Frontend:** T10/T20/T30/T21 com cards e gráficos (Recharts).
- **Testes:** consistência das métricas com o banco.

### Fase 10 — Relatórios e notificações
- **Backend:** `RelatoriosModule` (CSV/PDF), `NotificacoesModule` + eventos internos.
- **Frontend:** T15 + sino/lista de notificações.
- **Testes:** geração de arquivos, filtros, eventos de notificação.

### Fase 11 — QA e hardening
- Revisão de permissões, cobertura das regras críticas, ajuste de Sonar, documentação final.

---

# 5. Matriz de Rastreabilidade

## 5.1 Regra de negócio → User Story

| Regra | User Stories |
|---|---|
| RN-001 Tipos de usuário | US-001, US-007, US-008, US-009 |
| RN-002 Estados de usuário | US-004, US-006, US-007, US-008, US-009 |
| RN-003 Status acadêmico | US-017, US-018, US-019 |
| RN-004 Conversão de interessado | US-011 |
| RN-005 Dados obrigatórios | US-007, US-008, US-009 |
| RN-006 Aprovação/negação | US-007, US-008, US-010 |
| RN-007 Cadastro de interessado | US-009, US-012 |
| RN-008 Permissões ADMIN | US-010, US-011, US-025, US-027, US-028, US-031, US-032 |
| RN-009 Permissões PROFESSOR | US-029, US-031 |
| RN-010 Permissões PESQUISADOR | US-013, US-015, US-021, US-024, US-026, US-030 |
| RN-011 Permissões INTERESSADO | US-012, US-016 |
| RN-012 Ownership de projeto | US-021 |
| RN-013 Campos de projeto | US-021 |
| RN-014 PIBIC/PIBIT | US-022 |
| RN-015 Status do projeto | US-023 |
| RN-016 Disponibilidade | US-023 |
| RN-017 Acesso ao laboratório | US-026, US-027 |
| RN-018 Dispositivos WiFi | US-024, US-025 |
| RN-019 Atualização válida | US-014, US-016, US-020 |
| RN-020 Registro temporal | US-020 |
| RN-021 REGULAR | US-017 |
| RN-022 FINALISTA | US-017 |
| RN-023 INATIVO | US-018 |
| RN-024 EGRESSO | US-018, US-019 |
| RN-025 DESISTENTE | US-019 |
| RN-026 Recálculo de classificação | US-006, US-014, US-015, US-018 |
| RN-027 Segurança | US-004, US-005, US-006, US-034 |
| RN-028 Notificações | US-033 |
| RN-029 Relatórios | US-032 |
| RN-030 Histórico escolar | US-015 |
| RN-031 Recálculo acadêmico | US-015 |

## 5.2 Tela → User Story

| Tela | Descrição | User Story |
|---|---|---|
| T01 | Login | US-004, US-005 |
| T02 | Escolha de tipo de cadastro | US-007, US-008, US-009 |
| T03 | Cadastro Pesquisador | US-007 |
| T04 | Cadastro Professor | US-008 |
| T05 | Cadastro Interessado | US-009 |
| T06 | Aguardando aprovação | US-012 |
| T10 | Dashboard Admin | US-028 |
| T11 | Usuários (lista/filtros) | US-010, US-031 |
| T12 | Detalhe do usuário | US-010, US-011, US-019 |
| T13 | Dispositivos (admin) | US-025 |
| T14 | Acesso Laboratório (admin) | US-027 |
| T15 | Relatórios | US-032 |
| T20 | Dashboard Orientandos | US-029 |
| T21 | Buscar Pesquisadores/Interessados | US-031 |
| T22 | Projetos (visão professor) | US-021 |
| T30 | Meu Dashboard (pesquisador) | US-030 |
| T31 | Meu Perfil | US-013 |
| T32 | Currículo (Lattes) | US-014 |
| T33 | Histórico Escolar | US-015 |
| T34 | Meus Projetos (lista) | US-021 |
| T35 | Projeto (criar/editar) | US-021, US-022 |
| T36 | Dispositivos WiFi (pesquisador) | US-024 |
| T37 | Acesso Laboratório (pesquisador) | US-026 |
| T40 | Feedback de Interessado | US-012, US-016 |

---

# 6. Riscos e Decisões Técnicas

## 6.1 Decisões assumidas

| Tema | Decisão | Alternativa |
|---|---|---|
| ORM/banco | TypeORM + migrações (PostgreSQL) | Prisma |
| Autenticação | `@nestjs/jwt` + `passport-jwt` + `bcrypt` | Sessão via cookie |
| Validação | DTOs com `class-validator` | Zod no backend |
| Upload/parsing | Multer + `pdf-parse`; persistir apenas dados extraídos | Armazenar o PDF |
| Agendamento | `@nestjs/schedule` (cron diário) | Worker externo |
| Relatórios | Geração de CSV nativa + PDF (`pdfkit`) | Puppeteer |
| Frontend | Manter React 19 / Router v7 / React Query v5 / RHF+Zod / shadcn | — |

## 6.2 Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Parser de histórico depende de formato variável | Alto | Começar com 1 modelo de PDF e validar com amostras reais; fallback de edição manual |
| Backend vazio concentra muito trabalho na Fase 0 | Alto | Priorizar fundação e auth antes de telas de domínio |
| Divergências docs × código | Médio | US-003 alinha e atualiza docs |
| Regras de inatividade/egresso têm exceções sutis | Alto | Testes unitários dedicados (US-018) |
| Permissões por role no frontend e backend | Alto | Matriz única de permissões + testes de guards (US-034) |
| Integração tardia de services ao frontend | Médio | Fatias verticais por domínio desde a Fase 1 |

---

## Próximos passos

1. Aprovar este documento e as decisões da seção 6.1.
2. Criar as issues no GitHub usando `.github/ISSUE_TEMPLATE/task.yml`, uma por user story, referenciando `US-NNN`.
3. Iniciar pela **Fase 0 (US-001 a US-003)**.
