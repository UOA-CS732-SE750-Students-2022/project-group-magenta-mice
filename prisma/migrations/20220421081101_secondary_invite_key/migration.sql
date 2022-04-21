/*
  Warnings:

  - A unique constraint covering the columns `[userId,exchangeId]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invite_userId_exchangeId_key" ON "Invite"("userId", "exchangeId");
