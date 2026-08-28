-- CreateTable
CREATE TABLE "roteiro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "cidade" TEXT,
    "data_inicio" TIMESTAMP(3),
    "data_fim" TIMESTAMP(3),
    "id_usuario" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roteiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_roteiro" (
    "id" SERIAL NOT NULL,
    "id_roteiro" INTEGER NOT NULL,
    "id_ponto" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "observacao" TEXT,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_roteiro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "roteiro_id_usuario_idx" ON "roteiro"("id_usuario");

-- CreateIndex
CREATE INDEX "item_roteiro_id_roteiro_idx" ON "item_roteiro"("id_roteiro");

-- CreateIndex
CREATE UNIQUE INDEX "item_roteiro_id_roteiro_id_ponto_key" ON "item_roteiro"("id_roteiro", "id_ponto");

-- AddForeignKey
ALTER TABLE "roteiro" ADD CONSTRAINT "roteiro_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_roteiro" ADD CONSTRAINT "item_roteiro_id_roteiro_fkey" FOREIGN KEY ("id_roteiro") REFERENCES "roteiro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_roteiro" ADD CONSTRAINT "item_roteiro_id_ponto_fkey" FOREIGN KEY ("id_ponto") REFERENCES "ponto_turistico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
