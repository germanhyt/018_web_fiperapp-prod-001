-- CreateTable
CREATE TABLE "Operations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "mount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "operationtypeId" INTEGER NOT NULL,

    CONSTRAINT "Operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operationtype" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Operationtype_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Operations" ADD CONSTRAINT "Operations_operationtypeId_fkey" FOREIGN KEY ("operationtypeId") REFERENCES "Operationtype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
