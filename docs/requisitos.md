# NAVIR Interno — Documento de Requisitos

## 1. Visão Geral

O **NAVIR Interno** é um sistema para gerenciamento de:

* Alunos do laboratório NAVIR
* Banco de talentos (interessados)
* Projetos acadêmicos
* Acesso físico ao laboratório (biometria)
* Dispositivos conectados ao WiFi
* Currículo Lattes
* Histórico escolar
* Status acadêmico automático
* Atualizações obrigatórias
* Dashboard administrativo

O sistema deve diferenciar **Aluno NAVIR** e **Interessado (Banco de Talentos)**.

---

# 2. Tipos de Usuário

## 2.1 Administrador

Possui acesso total ao sistema.

Permissões:

* Aprovar/rejeitar usuários
* Converter interessado em aluno
* Editar usuários
* Visualizar todos os dados
* Autorizar acesso ao laboratório
* Cadastrar biometria
* Exportar relatórios
* Visualizar dashboard
* Filtrar usuários
* Bloquear usuários

---

## 2.2 Aluno NAVIR

Usuário ativo do laboratório.

Pode:

* Completar cadastro
* Atualizar perfil
* Enviar histórico escolar
* Informar Lattes
* Cadastrar dispositivos WiFi
* Ter biometria cadastrada
* Possuir projeto
* Atualizar dados acadêmicos
* Ser classificado automaticamente
* Ver status acadêmico

---

## 2.3 Interessado (Banco de Talentos)

Usuário externo interessado em entrar no NAVIR.

Pode:

* Se cadastrar
* Enviar histórico escolar
* Informar Lattes
* Atualizar perfil básico

Não pode:

* Ter biometria
* Ter acesso ao laboratório
* Cadastrar dispositivos
* Criar projeto
* Ser classificado como finalista
* Ser classificado como egresso
* Ser classificado como inativo

Admin pode converter interessado em aluno NAVIR.

---

# 3. Fluxo de Cadastro

## 3.1 Cadastro Inicial

Usuário preenche:

* Nome completo
* Email
* Histórico escolar analítico
* Link do Lattes
* Tipo de cadastro:

  * Aluno NAVIR
  * Banco de talentos

Status inicial:

Pendente aprovação

Após análise:

* Aprovado
* Rejeitado

Usuário recebe email com resultado.

---

# 4. Cadastro Completo (Aluno NAVIR)

Após aprovação, o aluno deve preencher:

## 4.1 Dados pessoais

* Senha
* Foto de perfil
* Cidade de origem
* Atividades externas
* Descrição das atividades

---

## 4.2 Dados acadêmicos

* Curso
* Modalidade (bacharelado / mestrado)
* Matrícula
* Período atual
* Coeficiente
* Carga horária total
* Carga horária concluída

---

## 4.3 Projeto

* Tipo de projeto

  * PIBIC
  * P&D
  * Mestrado
  * Outro
* Título do projeto
* Data inicial
* Data final prevista
* Professor orientador
* Projeto remunerado (sim/não)

---

## 4.4 Currículo

* Link do Lattes
* Data atualização Lattes
* Descrição (opcional)

---

# 5. Dados obtidos automaticamente do histórico

O sistema deve identificar:

* Coeficiente escolar
* Período atual
* Curso
* Modalidade
* Matrícula
* Cidade/Estado
* Sexo
* CPF
* Carga horária total
* Carga horária concluída
* Percentual concluído

---

# 6. Controle de Dispositivos WiFi

Apenas Aluno NAVIR pode cadastrar.

Campos:

* Nome do dispositivo
* Endereço MAC
* Tipo

  * Notebook
  * Celular
  * Tablet
  * Outro

Objetivo:

Controle de acesso ao WiFi do laboratório.

---

# 7. Controle de Acesso ao Laboratório

Sistema deve armazenar:

* Biometria cadastrada
* Status de acesso

Status possíveis:

* Autorizado
* Pendente biometria
* Bloqueado
* Inativo

Admin cadastra a biometria.

Somente "Autorizado" pode abrir a porta.

---

# 8. Atualização Obrigatória do Usuário

Aluno NAVIR deve atualizar:

* Link do Lattes
* Histórico escolar analítico

A atualização só é válida se:

* Novo histórico enviado
* Lattes atualizado

Alterações em:

* Foto
* Senha
* Dispositivos

Não contam como atualização.

---

# 9. Registro de Atualização

O sistema deve armazenar:

* data_ultima_atualizacao
* data_ultima_atualizacao_lattes
* data_ultimo_historico
* link_lattes

---

# 10. Exibição para o Usuário

Mostrar no perfil:

* Última atualização do sistema
* Última atualização do Lattes
* Último histórico enviado
* Status acadêmico
* Situação do usuário

---

# 11. Classificação Automática do Aluno NAVIR

O sistema deve classificar automaticamente:

* Regular
* Finalista
* Inativo
* Egresso

---

## 11.1 Regular

Condição:

Carga horária concluída menor que 80%

---

## 11.2 Finalista

Condição:

Carga horária concluída maior ou igual a 80%

---

## 11.3 Inativo

Condição:

Usuário não atualiza o sistema por 1 semestre (6 meses)

Ações:

* Marcar como inativo
* Enviar email
* Mostrar no dashboard

---

## 11.4 Egresso

Condições:

Usuário é finalista
E não atualiza o sistema por 1 ano

Ações:

* Remover acesso ao laboratório
* Remover WiFi
* Mover para ex-alunos
* Manter histórico

---

## 11.5 Prioridade dos Status

Ordem:

1. Egresso
2. Inativo
3. Finalista
4. Regular

---

# 12. Atualização Automática

Sistema deve recalcular status:

* Ao login
* Ao atualizar perfil
* Ao enviar histórico
* Automaticamente diariamente

---

# 13. Estados do Usuário

* Pendente aprovação
* Aprovado
* Ativo
* Inativo
* Finalista
* Regular
* Egresso
* Banco de talentos
* Bloqueado

---

# 14. Conversão de Interessado para Aluno

Admin pode converter interessado.

Sistema deve:

* Manter dados existentes
* Liberar cadastro completo
* Liberar projeto
* Liberar biometria
* Liberar WiFi
* Iniciar classificação automática

---

# 15. Dashboard do Administrador

Mostrar métricas:

* Total de alunos
* Interessados
* Regulares
* Finalistas
* Inativos
* Egressos
* Com acesso ao laboratório
* Sem atualização
* Lattes desatualizado
* Projetos ativos

---

# 16. Filtros do Admin

Filtrar por:

* Nome
* Curso
* Status
* Tipo de usuário
* Projeto
* Professor
* Cidade
* Remunerado
* Com acesso ao lab
* Atualização recente

---

# 17. Relatórios

Admin pode exportar:

* CSV
* PDF

Conteúdo:

* Lista de usuários
* Status
* Projetos
* Atualização
* Lattes
* Histórico

---

# 18. Campos principais do banco

Usuário:

* id
* nome
* email
* senha
* foto
* tipo_usuario
* cpf
* curso
* modalidade
* matricula
* cidade_origem

Acadêmico:

* coeficiente
* periodo
* carga_horaria_total
* carga_horaria_concluida
* percentual_concluido

Projeto:

* tipo_projeto
* titulo_projeto
* data_inicio
* data_fim
* professor
* remunerado

Currículo:

* link_lattes
* data_ultima_atualizacao_lattes

Atualização:

* data_ultima_atualizacao
* data_ultimo_historico

Status:

* status_academico
* status_usuario
* acesso_lab

Dispositivos:

* nome_dispositivo
* mac_address
* tipo

---

# 19. Funcionalidades do Aluno NAVIR

* Atualizar perfil
* Enviar histórico
* Atualizar Lattes
* Atualizar projeto
* Cadastrar dispositivos
* Atualizar foto
* Atualizar senha
* Ver status acadêmico
* Ver última atualização

---

# 20. Funcionalidades do Interessado

* Atualizar perfil básico
* Enviar histórico
* Informar Lattes
* Permanecer no banco de talentos

---

# 21. Funcionalidades do Admin

* Aprovar usuários
* Converter interessado
* Editar usuários
* Cadastrar biometria
* Autorizar acesso
* Exportar relatórios
* Filtrar alunos
* Ver dashboard
* Bloquear usuários
* Ver histórico de atualização

---

# 22. Extras (Opcional)

* Log de acessos à porta
* Log de WiFi
* Histórico de projetos
* Lista de ex-alunos
* Notificações internas
* Integração API Lattes
* Atualização automática por cron job
