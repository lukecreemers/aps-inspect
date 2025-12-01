/*
  Warnings:

  - The values [REVIEWED] on the enum `WorkUnitStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ReportWorkUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WorkBlockStatus" AS ENUM ('ASSIGNED', 'IN_PROGRESS', 'SUBMITTED');

-- AlterEnum
BEGIN;
CREATE TYPE "WorkUnitStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'SUBMITTED');
ALTER TABLE "ReportWorkUnit" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ReportWorkUnit" ALTER COLUMN "status" TYPE "WorkUnitStatus_new" USING ("status"::text::"WorkUnitStatus_new");
ALTER TYPE "WorkUnitStatus" RENAME TO "WorkUnitStatus_old";
ALTER TYPE "WorkUnitStatus_new" RENAME TO "WorkUnitStatus";
DROP TYPE "WorkUnitStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ReportWorkUnit" DROP CONSTRAINT "ReportWorkUnit_contractorId_fkey";

-- DropForeignKey
ALTER TABLE "ReportWorkUnit" DROP CONSTRAINT "ReportWorkUnit_reportBuildingId_fkey";

-- DropTable
DROP TABLE "ReportWorkUnit";

-- CreateTable
CREATE TABLE "report_work_unit" (
    "id" TEXT NOT NULL,
    "reportBuildingId" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "contractorId" TEXT,
    "contractorName" TEXT,
    "reportWorkBlockId" TEXT,
    "status" "WorkUnitStatus" NOT NULL DEFAULT 'PENDING',
    "assignedAt" TIMESTAMP(3),
    "firstPulledAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "report_work_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_work_block" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "loginSecretText" TEXT NOT NULL,
    "status" "WorkBlockStatus" NOT NULL DEFAULT 'ASSIGNED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_work_block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "report_work_unit_reportBuildingId_type_key" ON "report_work_unit"("reportBuildingId", "type");

-- AddForeignKey
ALTER TABLE "report_work_unit" ADD CONSTRAINT "report_work_unit_reportBuildingId_fkey" FOREIGN KEY ("reportBuildingId") REFERENCES "report_buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_work_unit" ADD CONSTRAINT "report_work_unit_reportWorkBlockId_fkey" FOREIGN KEY ("reportWorkBlockId") REFERENCES "report_work_block"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_work_block" ADD CONSTRAINT "report_work_block_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_work_block" ADD CONSTRAINT "report_work_block_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
