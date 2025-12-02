-- CreateTable
CREATE TABLE "issue" (
    "id" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "openingReportId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "issue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_openingReportId_fkey" FOREIGN KEY ("openingReportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
