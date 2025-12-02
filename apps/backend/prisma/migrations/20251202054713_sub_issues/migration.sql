/*
  Warnings:

  - You are about to drop the `issue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "issue" DROP CONSTRAINT "issue_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "issue" DROP CONSTRAINT "issue_openingReportId_fkey";

-- DropTable
DROP TABLE "issue";

-- CreateTable
CREATE TABLE "issues" (
    "id" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "openingReportId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_issues" (
    "id" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "sub_issues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_openingReportId_fkey" FOREIGN KEY ("openingReportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_issues" ADD CONSTRAINT "sub_issues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
