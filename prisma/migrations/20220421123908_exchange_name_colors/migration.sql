/*
  Warnings:

  - Added the required column `colour` to the `Exchange` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Exchange` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exchange" ADD COLUMN     "colour" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
