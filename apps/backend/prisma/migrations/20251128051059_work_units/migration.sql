-- CreateEnum
CREATE TYPE "WorkUnitStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'SUBMITTED', 'REVIEWED');

-- CreateTable
CREATE TABLE "ReportWorkUnit" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "contractorId" TEXT,
    "status" "WorkUnitStatus" NOT NULL DEFAULT 'PENDING',
    "assignedAt" TIMESTAMP(3),
    "firstPulledAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "ReportWorkUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReportWorkUnit_reportId_buildingId_type_key" ON "ReportWorkUnit"("reportId", "buildingId", "type");

-- AddForeignKey
ALTER TABLE "ReportWorkUnit" ADD CONSTRAINT "ReportWorkUnit_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportWorkUnit" ADD CONSTRAINT "ReportWorkUnit_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportWorkUnit" ADD CONSTRAINT "ReportWorkUnit_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
