/*
  Warnings:

  - Added the required column `metadata` to the `issue_inspections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "issue_inspections" ADD COLUMN     "metadata" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "sub_issue_inspections" (
    "id" TEXT NOT NULL,
    "subIssueId" TEXT NOT NULL,
    "issueInspectionId" TEXT NOT NULL,
    "action" "IssueAction" NOT NULL,
    "xCoord" DOUBLE PRECISION NOT NULL,
    "yCoord" DOUBLE PRECISION NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_issue_inspections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sub_issue_inspections_subIssueId_issueInspectionId_key" ON "sub_issue_inspections"("subIssueId", "issueInspectionId");

-- AddForeignKey
ALTER TABLE "sub_issue_inspections" ADD CONSTRAINT "sub_issue_inspections_subIssueId_fkey" FOREIGN KEY ("subIssueId") REFERENCES "sub_issues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_issue_inspections" ADD CONSTRAINT "sub_issue_inspections_issueInspectionId_fkey" FOREIGN KEY ("issueInspectionId") REFERENCES "issue_inspections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
