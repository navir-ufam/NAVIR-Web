# NAVIR - Especificacao de Telas para Wireframes Iniciais

## 1. Objetivo
Este documento descreve como cada tela deve ser estruturada no nivel de wireframe (baixa fidelidade), para validar fluxo, hierarquia de informacao e regras de negocio antes do UI visual final.

Escopo desta versao:
- Fluxos de autenticacao e cadastro
- Fluxos de administracao
- Fluxos de professor
- Fluxos de pesquisador
- Comportamento do interessado

## 2. Premissas de Navegacao
- Header fixo com nome do sistema, perfil logado e logout.
- Menu lateral para area interna (itens mudam por perfil).
- Breadcrumb nas telas internas de profundidade maior que 1.
- Todas as listas com busca, filtro e paginacao.
- Estados obrigatorios em todas as telas: carregando, vazio, erro, sucesso.

## 3. Perfis e Menus
### 3.1 ADMIN
Menu:
- Dashboard
- Usuarios
- Projetos
- Dispositivos
- Acesso Laboratorio
- Relatorios

### 3.2 PROFESSOR
Menu:
- Dashboard Orientandos
- Pesquisar Pesquisadores
- Projetos
- Perfil

### 3.3 PESQUISADOR
Menu:
- Meu Dashboard
- Meu Perfil
- Meus Projetos
- Dispositivos WiFi
- Acesso Laboratorio
- Atualizacoes Academicas

### 3.4 INTERESSADO
- Nao entra na area interna.
- Ao login, recebe tela de mensagem de acompanhamento.

## 4. Telas de Acesso
## T01 - Login
Publico: todos
Objetivo: autenticar usuario
Blocos:
- Logo + titulo
- Formulario (email, senha)
- Acao primaria: Entrar
- Acao secundaria: Criar conta
- Link "Esqueci minha senha" (opcional para MVP)
Estados/regras:
- Usuario NEGADO: mostrar erro de acesso.
- INTERESSADO: redirecionar para T05.
- PESQUISADOR/PROFESSOR PENDENTE: redirecionar para T06.

## T02 - Escolha de tipo de cadastro
Publico: nao autenticado
Objetivo: direcionar para formulario correto
Blocos:
- Cards: Pesquisador, Professor, Interessado
- Resumo rapido de cada tipo
- Botao "Continuar"

## T03 - Cadastro Pesquisador
Publico: nao autenticado
Campos obrigatorios:
- Nome completo
- Email institucional
- Senha
- Confirmacao de senha
- Historico escolar (upload)
- Link Lattes
- Aceite de termos
Acoes:
- Primaria: Cadastrar
- Secundaria: Voltar para login
Saida esperada:
- Conta criada com estado PENDENTE
- Tela de confirmacao de envio para aprovacao

## T04 - Cadastro Professor
Publico: nao autenticado
Campos obrigatorios:
- Nome completo
- Email institucional
- Senha
- Confirmacao de senha
- Link Lattes
- Aceite de termos
Acoes:
- Primaria: Cadastrar
Saida esperada:
- Conta criada com estado PENDENTE

## T05 - Cadastro Interessado
Publico: nao autenticado
Campos obrigatorios:
- Nome completo
- Email
- Senha
- Historico escolar (upload)
- Link Lattes
- Aceite de termos
Campos opcionais:
- Descricao (bio basica)
- Habilidades
Saida esperada:
- Cadastro direto sem aprovacao
- Mensagem: entraremos em contato quando surgir oportunidade

## T06 - Aguardando aprovacao
Publico: pesquisador/professor pendente
Objetivo: bloquear acesso interno e informar status
Blocos:
- Card de status PENDENTE
- Texto explicativo
- Botao "Sair"

## 5. Telas Admin
## T10 - Dashboard Admin
Objetivo: visao geral de operacao
Cards:
- Total usuarios
- Pendentes
- Regular
- Finalista
- Inativo
- Egresso
- Disponiveis
Blocos extras:
- Grafico por status academico
- Lista "Ultimas atualizacoes"
- Lista "Aprovacoes pendentes"

## T11 - Usuarios (lista e filtros)
Objetivo: gerenciar usuarios
Colunas:
- Nome
- Tipo
- Estado
- Status academico
- Disponibilidade
- Ultima atualizacao
Filtros:
- Nome
- Tipo
- Status academico
- Disponibilidade
- Habilidade
Acoes por linha:
- Ver detalhe
- Aprovar/Negar (se pendente)
- Converter (se interessado)
- Bloquear

## T12 - Detalhe do usuario
Objetivo: visao completa para decisao
Abas:
- Perfil
- Dados academicos
- Curriculo
- Projetos
- Atualizacoes
- Dispositivos
- Acesso laboratorio
Acoes:
- Aprovar
- Negar (com motivo obrigatorio)
- Converter interessado para pesquisador
- Alterar status manual (egresso/desistente quando permitido)

## T13 - Dispositivos (admin)
Objetivo: ativar/inativar dispositivos
Colunas:
- Usuario
- Nome dispositivo
- MAC
- Tipo
- Status
Acoes:
- Ativar
- Inativar

## T14 - Acesso Laboratorio (admin)
Objetivo: decidir solicitacoes
Colunas:
- Usuario
- Status atual
- Data solicitacao
Acoes:
- Autorizar
- Bloquear

## T15 - Relatorios
Objetivo: exportacao
Filtros:
- Periodo
- Tipo usuario
- Status academico
- Projeto ativo
Acoes:
- Exportar CSV
- Exportar PDF

## 6. Telas Professor
## T20 - Dashboard Orientandos
Objetivo: acompanhamento dos orientandos
Blocos:
- Quantidade de orientandos
- Distribuicao por status academico
- Alertas de inatividade
- Projetos proximos do fim

## T21 - Buscar Pesquisadores/Interessados
Objetivo: encontrar perfis por aderencia
Filtros:
- Habilidades
- Disponibilidade
- Status academico (pesquisadores)
- Tipo (pesquisador/interessado)
Resultado:
- Card de perfil com resumo academico
- Acesso ao detalhe

## T22 - Projetos (visao professor)
Objetivo: visualizar projetos orientados
Colunas:
- Titulo
- Pesquisador
- Tipo
- Data fim
- Status
Acao:
- Ver detalhes

## 7. Telas Pesquisador
## T30 - Meu Dashboard
Objetivo: visao rapida da propria situacao
Blocos:
- Meu status academico atual
- Dias desde ultima atualizacao valida
- Projetos ativos
- Status acesso laboratorio
- Status dispositivos

## T31 - Meu Perfil
Campos:
- Foto
- Nome
- Email
- Biografia
- Cidade origem (somente leitura quando derivada de historico)
- Habilidades
Acoes:
- Salvar alteracoes

## T32 - Curriculo (Lattes)
Campos:
- Link Lattes
- Data ultima atualizacao (somente leitura)
Acao:
- Atualizar Lattes

## T33 - Historico Escolar
Objetivo: upload e processamento
Campos:
- Arquivo historico
Acoes:
- Enviar e processar
Pos-acao:
- Exibir resumo extraido: curso, modalidade, periodo, coeficiente, percentual

## T34 - Meus Projetos (lista)
Objetivo: listar, criar e editar projetos
Colunas:
- Titulo
- Tipo
- Professor
- Inicio
- Fim
- Status
Acoes:
- Novo projeto
- Editar
- Finalizar (se permitido)

## T35 - Projeto (criar/editar)
Campos obrigatorios:
- Titulo
- Tipo
- Data inicio
- Data fim
- Professor orientador
- Status
Campos condicionais:
- Agencia
- Remunerado
Regra especial:
- Se tipo for PIBIC/PIBIT, codigo_projeto obrigatorio

## T36 - Dispositivos WiFi (pesquisador)
Objetivo: cadastrar e acompanhar status
Colunas:
- Nome
- MAC
- Tipo
- Status
Acao:
- Cadastrar novo dispositivo

## T37 - Acesso Laboratorio (pesquisador)
Objetivo: solicitar e acompanhar autorizacao
Blocos:
- Status atual (PENDENTE/AUTORIZADO/BLOQUEADO)
- Data da ultima alteracao
Acao:
- Solicitar acesso (quando nao houver solicitacao pendente)

## 8. Tela Interessado
## T40 - Feedback de Interessado
Publico: interessado autenticado
Objetivo: reforcar canal e expectativa
Conteudo:
- Mensagem principal: entraremos em contato quando surgir oportunidade
- Bloco "Mantenha seu perfil atualizado"
Acoes:
- Atualizar historico
- Atualizar Lattes
- Atualizar descricao/habilidades
- Sair
Restricoes visiveis:
- Sem acesso a projetos
- Sem acesso a dispositivos
- Sem acesso ao laboratorio

## 9. Estados e Feedback (padrao global)
Para todas as telas:
- Loading: skeleton simples para listas/cards
- Empty state: mensagem orientando a primeira acao
- Erro de API: alerta com "Tentar novamente"
- Sucesso: toast apos salvar/atualizar/aprovar
- Confirmacao para acoes irreversiveis (bloquear, negar, finalizar)

## 10. Validacoes Minimas de Formulario
- Email em formato valido
- Senha com confirmacao igual
- Campos obrigatorios por tipo de cadastro
- Motivo obrigatorio para NEGAR usuario
- Codigo projeto obrigatorio para PIBIC/PIBIT
- Arquivo de historico com extensao permitida (PDF no MVP)

## 11. Ordem Recomendada para Wireframes (MVP)
1. T01 Login
2. T02 Escolha de cadastro
3. T03/T04/T05 Cadastros
4. T06 Aguardando aprovacao
5. T10 Dashboard Admin
6. T11 Usuarios
7. T12 Detalhe Usuario
8. T30 Dashboard Pesquisador
9. T31/T32/T33 Perfil e atualizacoes
10. T34/T35 Projetos
11. T36 Dispositivos
12. T37 Acesso Laboratorio
13. T20/T21 Dashboard e Busca Professor
14. T15 Relatorios
15. T40 Feedback Interessado

## 12. Criterios de Pronto dos Wireframes
- Cada tela com hierarquia clara de informacao
- Fluxo de navegacao entre telas mapeado
- Todas as acoes principais e estados de erro representados
- Regras condicionais criticas representadas (PIBIC/PIBIT, aprovacao, interessado)
- Revisao rapida com backend para validar contratos de endpoint
