-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMIN', 'PROFESSOR', 'PESQUISADOR', 'INTERESSADO');

-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('PENDENTE', 'ACEITO', 'NEGADO');

-- CreateEnum
CREATE TYPE "StatusAcademico" AS ENUM ('REGULAR', 'FINALISTA', 'INATIVO', 'EGRESSO', 'DESISTENTE');

-- CreateEnum
CREATE TYPE "StatusProjeto" AS ENUM ('ATIVO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "TipoDispositivo" AS ENUM ('NOTEBOOK', 'CELULAR', 'TABLET', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusDispositivo" AS ENUM ('PENDENTE', 'ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "StatusAcesso" AS ENUM ('PENDENTE', 'AUTORIZADO', 'BLOQUEADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,
    "estado_usuario" "EstadoUsuario",
    "status_academico" "StatusAcademico",
    "aceite_termos" BOOLEAN NOT NULL DEFAULT false,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "foto_url" TEXT,
    "biografia" TEXT,
    "cidade_origem" TEXT,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DadosAcademicos" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "periodo" INTEGER NOT NULL,
    "coeficiente" DOUBLE PRECISION NOT NULL,
    "carga_horaria_total" INTEGER NOT NULL,
    "carga_horaria_concluida" INTEGER NOT NULL,
    "percentual_concluido" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DadosAcademicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curriculo" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "link_lattes" TEXT,
    "data_atualizacao_lattes" TIMESTAMP(3),

    CONSTRAINT "Curriculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atualizacao" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "data_ultima_atualizacao" TIMESTAMP(3) NOT NULL,
    "data_ultimo_historico" TIMESTAMP(3),
    "data_ultimo_lattes" TIMESTAMP(3),

    CONSTRAINT "Atualizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo_projeto_id" TEXT NOT NULL,
    "agencia_id" TEXT,
    "codigo_projeto" TEXT,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3),
    "professor_id" TEXT NOT NULL,
    "remunerado" BOOLEAN,
    "status" "StatusProjeto" NOT NULL DEFAULT 'ATIVO',

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoProjeto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "logo_url" TEXT,

    CONSTRAINT "TipoProjeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agencia" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "logo_url" TEXT,

    CONSTRAINT "Agencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habilidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Habilidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioHabilidade" (
    "usuario_id" TEXT NOT NULL,
    "habilidade_id" TEXT NOT NULL,

    CONSTRAINT "UsuarioHabilidade_pkey" PRIMARY KEY ("usuario_id","habilidade_id")
);

-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "mac_address" TEXT NOT NULL,
    "tipo" "TipoDispositivo" NOT NULL,
    "status" "StatusDispositivo" NOT NULL DEFAULT 'PENDENTE',

    CONSTRAINT "Dispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcessoLaboratorio" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "status" "StatusAcesso" NOT NULL DEFAULT 'PENDENTE',
    "data_solicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcessoLaboratorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" TEXT NOT NULL,
    "usuario_destino_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_tipo_usuario_idx" ON "Usuario"("tipo_usuario");

-- CreateIndex
CREATE INDEX "Usuario_estado_usuario_idx" ON "Usuario"("estado_usuario");

-- CreateIndex
CREATE INDEX "Usuario_status_academico_idx" ON "Usuario"("status_academico");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_usuario_id_key" ON "Perfil"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "DadosAcademicos_usuario_id_key" ON "DadosAcademicos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Curriculo_usuario_id_key" ON "Curriculo"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Atualizacao_usuario_id_key" ON "Atualizacao"("usuario_id");

-- CreateIndex
CREATE INDEX "Atualizacao_data_ultima_atualizacao_idx" ON "Atualizacao"("data_ultima_atualizacao");

-- CreateIndex
CREATE INDEX "Projeto_usuario_id_idx" ON "Projeto"("usuario_id");

-- CreateIndex
CREATE INDEX "Projeto_status_idx" ON "Projeto"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_mac_address_key" ON "Dispositivo"("mac_address");

-- CreateIndex
CREATE INDEX "AcessoLaboratorio_usuario_id_idx" ON "AcessoLaboratorio"("usuario_id");

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosAcademicos" ADD CONSTRAINT "DadosAcademicos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curriculo" ADD CONSTRAINT "Curriculo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atualizacao" ADD CONSTRAINT "Atualizacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_tipo_projeto_id_fkey" FOREIGN KEY ("tipo_projeto_id") REFERENCES "TipoProjeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_agencia_id_fkey" FOREIGN KEY ("agencia_id") REFERENCES "Agencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioHabilidade" ADD CONSTRAINT "UsuarioHabilidade_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioHabilidade" ADD CONSTRAINT "UsuarioHabilidade_habilidade_id_fkey" FOREIGN KEY ("habilidade_id") REFERENCES "Habilidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispositivo" ADD CONSTRAINT "Dispositivo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcessoLaboratorio" ADD CONSTRAINT "AcessoLaboratorio_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_usuario_destino_id_fkey" FOREIGN KEY ("usuario_destino_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
