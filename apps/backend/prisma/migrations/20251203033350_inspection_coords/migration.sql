/*
  Warnings:

  - Added the required column `xCoord` to the `issue_inspections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yCoord` to the `issue_inspections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "issue_inspections" ADD COLUMN     "xCoord" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yCoord" DOUBLE PRECISION NOT NULL;
