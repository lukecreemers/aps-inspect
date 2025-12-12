/*
  Warnings:

  - Added the required column `title` to the `report_type_assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "report_type_assignments" ADD COLUMN     "title" TEXT NOT NULL;
