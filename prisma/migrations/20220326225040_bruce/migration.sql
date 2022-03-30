/*
  Warnings:

  - Added the required column `profilePicUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicUrl" TEXT NOT NULL;
