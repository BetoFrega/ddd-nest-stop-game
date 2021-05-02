-- CreateTable
CREATE TABLE "Usuario" (
    "uuid" TEXT NOT NULL,

    PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Credencial" (
    "chave_de_busca" TEXT NOT NULL,
    "valor_crypto" TEXT NOT NULL,
    "tipo_de_chave" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,

    PRIMARY KEY ("chave_de_busca","tipo_de_chave")
);

-- CreateIndex
CREATE UNIQUE INDEX "credenciais_chave_de_busca_tipo_de_chave_uindex" ON "Credencial"("chave_de_busca", "tipo_de_chave");

-- AddForeignKey
ALTER TABLE "Credencial" ADD FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
