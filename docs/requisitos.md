# 📘 NAVIR Interno — Documento de Requisitos

---

# 1. Objetivo do Sistema

O NAVIR Interno é um sistema para gestão integrada do laboratório, contemplando:

- Gestão de usuários (pesquisadores, interessados e professores)
- Projetos acadêmicos
- Dados acadêmicos automatizados (via histórico escolar)
- Currículo Lattes
- Controle de acesso ao laboratório
- Controle de dispositivos WiFi
- Classificação acadêmica automática
- Monitoramento de atualização de dados
- Dashboard administrativo e relatórios

---

# 2. Modelagem de Usuários

## 2.1 Tipos de Usuário


| Tipo          | Descrição |
|---------------|----------|
| ADMIN | Controle total do sistema |
| PROFESSOR     | Orientador com acesso a pesquisadores |
| PESQUISADOR   | Membro ativo do laboratório |
| INTERESSADO   | Candidato no banco de talentos |

---

## 2.2 Estados do Usuário (Sistema)

Controlam o ciclo de vida no sistema:
- PENDENTE
- ACEITO
- NEGADO

### Regras:

- Pesquisador inicia como **Pendente**
- Professor inicia como **Pendente** (quando se cadastra sozinho)
- Interessado **não possui estado**
- Usuário Negado não pode acessar o sistema

---

## 2.3 Status Acadêmico

Aplicável apenas a Pesquisadores:

- REGULAR
- FINALISTA
- INATIVO
- EGRESSO
- DESISTENTE (manual)

---

## 2.4 Permissões

### Administrador
- Gerenciar usuários
- Bloquear usuários
- Aprovar (Aceitar) ou negar usuários
- Converter interessado → pesquisador
- Gerenciar projetos e tipos
- Autorizar acesso ao laboratório
- Gerenciar dispositivos
- Exportar relatórios
- Acessar dashboard

---

### Professor
- Completar e atualizar perfil
- Visualizar pesquisadores vinculados
- Visualizar projetos
- Buscar por pesquisadores por:
  - habilidades
  - disponibilidade
- Acessar dashboard de orientandos

---

### Pesquisador
- Completar e atualizar perfil
- Gerenciar projetos
- Enviar histórico escolar
- Atualizar Lattes
- Cadastrar dispositivos
- Solicitar acesso ao laboratório
- Visualizar status acadêmico

---

### Interessado

1. Cadastro realizado  
2. Sistema **não exige aprovação**  
3. Sistema exibe mensagem:

> "Seu cadastro foi realizado com sucesso. Entraremos em contato quando surgir uma oportunidade compatível com seu perfil."

4. Sistema realiza automaticamente:
   - Armazena dados no banco  
   - Notifica administradores sobre novo interessado  

Pode:
- Se cadastrar com dados básico (Nome, email, histórico e link lattes)
- Pode colocar uma descrição (que seria a bio caso ele for convertido para pesquisador) e habilidades
- Enviar histórico atualizado
- Informar link do Lattes atualizado
- Atualizar perfil básico (histórico e link do lattes)

Sistema:
- Não envia email automático
- Não realiza aprovação
- Não possui estado
- Notifica o administrador sobre novo cadastro
- Exibe mensagem ao logar:
  "Entraremos em contato quando surgir uma oportunidade"
- Professores e admin podem pesquisar interessado
- O sistema faz um perfil básico do interessado pelos dados abstraídos do histórico para ser mostrado nas pesquisas.

Restrições:
- Sem acesso ao laboratório
- Sem projetos
- Sem dispositivos

---

# 3. Cadastro

## 3.1 Cadastro Inicial

Dados obrigatórios:

- Nome completo  
- Email institucional  
- Histórico escolar  (exceto Professor)
- Link do Lattes  
- Tipo (Pesquisador ou Interessado)  
- Aceite de termos  

## 3.1 Pesquisador / Professor

- Cadastro → Estado Pendente
- Requer aprovação do admin
- Negação exige justificativa

---

## 3.2 Interessado

- Cadastro direto
- Não acessa sistema interno
- Ao tentar login:
  - Exibir mensagem:
    "Entraremos em contato quando surgir uma oportunidade"
- Admin é notificado

---

## 3.3 Conversão de Interessado para Pesquisador

- Mantém dados
- Torna Pesquisador
- Libera funcionalidades de pesquisador

---

# 4. Perfil do Pesquisador

## 4.1 Dados Pessoais
- Nome, email, senha
- Foto
- Biografia
- Cidade origem (automatico do histórico escolar)
- Habilidades

---

## 4.2 Dados Acadêmicos (automáticos)
- Curso
- Modalidade
- Matrícula
- Período
- Coeficiente
- Carga horária
- Percentual concluído

---

## 4.3 Currículo
- Link Lattes
- Data atualização

---

## 4.4 Projetos

Campos obrigatórios:

- Título
- Tipo (tag)
- Data início
- Data fim
- Professor oriientador
- Status

Obrigatórios dependendo do tipo de projeto (Caso não for projeto independente)
- Agência
- Remunerado

### Regra especial:
- Se tipo = **PIBIC ou PIBIT**, deve possuir **código do projeto (obrigatório)**

---

# 5. Acesso ao Laboratório

- Sistema não armazena biometria
- Apenas status

Status:
- PENDENTE
- AUTORIZADO
- BLOQUEADO

---

# 6. Dispositivos WiFi

- Apenas pesquisador cadastra
- Admin ativa/inativa

---

# 7. Atualização

Atualização válida (para pesquisador e interessado):
- Novo histórico
- Lattes atualizado

---

# 8. Classificação Acadêmica

## Regular
- < 80%

## Finalista
- ≥ 80%

## Inativo

- Sem atualização por 6 meses

Exceções:
- Se projeto termina antes dos 6 meses:
  → conta a partir do fim do projeto
- Se está disponível:
  → prazo reduzido para 3 meses

---

## Egresso

- Finalista sem atualização (2 meses de inativo)

OU

- Definido manualmente por:
  - Usuário
  - Admin

---

# 9. Projetos e Disponibilidade

- Finalizam automaticamente por data
- Pesquisador sem projeto ativo:
  - Flag: Disponível

---

# 10. Dashboard

Métricas:
- Usuários
- Status acadêmico
- Projetos
- Disponibilidade

---

# 11. Relatórios

- CSV
- PDF

---

# 12. Extras

- Integração Lattes
- Cron diário
- Notificações