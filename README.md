# NAVIR Web

Sistema interno do NAVIR para gerenciar alunos, banco de talentos e rotinas administrativas do laboratorio, incluindo cadastro, atualizacao academica e acompanhamento de status.

## Tecnologias

- Frontend: React + TypeScript + Vite
- Backend: NestJS + TypeScript

## Como rodar localmente

### 1. Rodar tudo com um comando (recomendado)

Na raiz do projeto:

```bash
python run.py
```

Esse script:

- instala dependencias de `src/backend` e `src/frontend` se necessario
- inicia backend e frontend juntos
- encerra os dois ao interromper (Ctrl+C)

### 2. Rodar separadamente (manual)

#### Backend (API)

```bash
cd src/backend
npm install
npm run start:dev
```

A API inicia em `http://localhost:3000` (ou na porta definida em `PORT`).

### 2. Frontend (Web)

Em outro terminal:

```bash
cd src/frontend
npm install
npm run dev
```

O frontend inicia em `http://localhost:5173`.

## Estrutura

- `src/backend`: API REST
- `src/frontend`: aplicacao web
- `docs`: documentacao de requisitos e arquitetura
