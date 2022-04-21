-- CreateEnum
CREATE TYPE "InstrumentType" AS ENUM ('BOND', 'STOCK');

-- CreateTable
CREATE TABLE "Exchange" (
    "id" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instrument" (
    "id" TEXT NOT NULL,
    "exchangeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tickSizeMin" INTEGER NOT NULL,
    "positionLimit" INTEGER NOT NULL,
    "instrumentType" "InstrumentType" NOT NULL,
    "bondFixedPrice" INTEGER,
    "bondVolatility" INTEGER,
    "stockInitialPrice" INTEGER,
    "stockVolatility" INTEGER,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_exchangeId_key" ON "Instrument"("exchangeId");

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_exchangeId_fkey" FOREIGN KEY ("exchangeId") REFERENCES "Exchange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
