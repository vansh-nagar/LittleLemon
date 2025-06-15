/*
  Warnings:

  - Added the required column `spiceLevel` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SpiceLevel" AS ENUM ('MILD', 'MEDIUM', 'SPICY');

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "calories" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prepTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "spiceLevel" "SpiceLevel" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cartItemCount" INTEGER NOT NULL DEFAULT 0;
