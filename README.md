# NAVIR Web

Sistema interno do NAVIR para gestao integrada do laboratorio.

O sistema cobre:
- gestao de usuarios (admin, professor, pesquisador e interessado)
- projetos academicos
- atualizacao academica via historico escolar e Lattes
- controle de acesso ao laboratorio por status
- controle de dispositivos WiFi
- classificacao academica automatica
- dashboard e relatorios administrativos

## Stack

- Frontend: React + TypeScript + Vite
- Backend: NestJS + TypeScript
- Banco (documentado): PostgreSQL

## Perfis de usuario

- ADMIN: gerenciamento completo, aprovacoes, dashboard e relatorios
- PROFESSOR: acompanhamento de orientandos e busca por pesquisadores
- PESQUISADOR: perfil, projetos, historico, Lattes, dispositivos e acesso ao laboratorio
- INTERESSADO: banco de talentos com perfil basico e atualizacoes (sem acesso interno completo)

## API

- Base path padrao: /api/v1
- Autenticacao com JWT
- Controle de permissao por tipo de usuario

## Como rodar localmente

### 1. Rodar tudo com um comando (recomendado)

Na raiz do projeto:

```bash
python run.py
```

O script:
- instala dependencias de src/backend e src/frontend (se necessario)
- inicia backend e frontend juntos
- encerra os dois ao interromper (Ctrl+C)

### 2. Rodar separadamente (manual)

Backend (API):

```bash
cd src/backend
npm install
npm run start:dev
```

Frontend (Web), em outro terminal:

```bash
cd src/frontend
npm install
npm run dev
```

Padrao local:
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Estrutura

- src/backend: API REST
- src/frontend: aplicacao web
- docs: documentacao funcional e tecnica

## Documentacao

- Requisitos: docs/requisitos.md
- Regras de negocio: docs/regras-de-negocio.md
- API REST: docs/api-rest.md
- Arquitetura geral: docs/arquitetura.md
- Backend: docs/backend.md
- Frontend: docs/frontend.md
- Banco de dados: docs/banco.md
- Wireframes iniciais: docs/wireframes-iniciais.md
- Dev log: docs/devlog.md

## Status atual

Documentacao funcional principal esta sincronizada com o escopo mais recente definido em requisitos.
