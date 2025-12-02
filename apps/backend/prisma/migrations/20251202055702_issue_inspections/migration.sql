-- CreateEnum
CREATE TYPE "TimeFrame" AS ENUM ('IMMEDIATE', 'URGENT', 'NONURGENT');

-- CreateEnum
CREATE TYPE "IssueAction" AS ENUM ('OPENED', 'UPDATED', 'RESOLVED');

-- CreateTable
CREATE TABLE "issue_inspections" (
    "id" TEXT NOT NULL,
    "isInitial" BOOLEAN NOT NULL DEFAULT false,
    "issueId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "workUnitId" TEXT NOT NULL,
    "timeframe" "TimeFrame",
    "action" "IssueAction" NOT NULL DEFAULT 'UPDATED',
    "description" TEXT NOT NULL,
    "toFix" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "issue_inspections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "issue_inspections_issueId_reportId_key" ON "issue_inspections"("issueId", "reportId");

-- AddForeignKey
ALTER TABLE "issue_inspections" ADD CONSTRAINT "issue_inspections_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_inspections" ADD CONSTRAINT "issue_inspections_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_inspections" ADD CONSTRAINT "issue_inspections_workUnitId_fkey" FOREIGN KEY ("workUnitId") REFERENCES "report_work_unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
