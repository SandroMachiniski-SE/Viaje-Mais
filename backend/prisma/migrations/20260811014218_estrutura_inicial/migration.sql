-- CreateEnum
CREATE TYPE "TipoConta" AS ENUM ('VISITANTE', 'MORADOR', 'NEGOCIO', 'GESTOR', 'MODERADOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatusPonto" AS ENUM ('RASCUNHO', 'PUBLICADO', 'PENDENTE_VERIFICACAO', 'REJEITADO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "tipo_conta" "TipoConta" NOT NULL DEFAULT 'VISITANTE',
    "cidade_base" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ponto_turistico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoria" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "endereco" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "faixa_preco" TEXT,
    "acessibilidade" TEXT,
    "site_oficial" TEXT,
    "telefone_contato" TEXT,
    "status" "StatusPonto" NOT NULL DEFAULT 'PUBLICADO',
    "selo_verificado" BOOLEAN NOT NULL DEFAULT false,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "id_responsavel" INTEGER,

    CONSTRAINT "ponto_turistico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE INDEX "ponto_turistico_cidade_idx" ON "ponto_turistico"("cidade");

-- CreateIndex
CREATE INDEX "ponto_turistico_categoria_idx" ON "ponto_turistico"("categoria");

-- CreateIndex
CREATE INDEX "ponto_turistico_status_idx" ON "ponto_turistico"("status");

-- AddForeignKey
ALTER TABLE "ponto_turistico" ADD CONSTRAINT "ponto_turistico_id_responsavel_fkey" FOREIGN KEY ("id_responsavel") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
