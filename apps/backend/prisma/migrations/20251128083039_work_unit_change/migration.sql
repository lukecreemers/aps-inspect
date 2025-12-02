/*
  Warnings:

  - You are about to drop the column `buildingId` on the `ReportWorkUnit` table. All the data in the column will be lost.
  - You are about to drop the column `reportId` on the `ReportWorkUnit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reportBuildingId,type]` on the table `ReportWorkUnit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reportBuildingId` to the `ReportWorkUnit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReportWorkUnit" DROP CONSTRAINT "ReportWorkUnit_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "ReportWorkUnit" DROP CONSTRAINT "ReportWorkUnit_reportId_fkey";

-- DropIndex
DROP INDEX "ReportWorkUnit_reportId_buildingId_type_key";

-- AlterTable
ALTER TABLE "ReportWorkUnit" DROP COLUMN "buildingId",
DROP COLUMN "reportId",
ADD COLUMN     "reportBuildingId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReportWorkUnit_reportBuildingId_type_key" ON "ReportWorkUnit"("reportBuildingId", "type");

-- AddForeignKey
ALTER TABLE "ReportWorkUnit" ADD CONSTRAINT "ReportWorkUnit_reportBuildingId_fkey" FOREIGN KEY ("reportBuildingId") REFERENCES "report_buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
