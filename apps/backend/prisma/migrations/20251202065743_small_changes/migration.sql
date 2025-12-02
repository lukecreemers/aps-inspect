-- AlterTable
ALTER TABLE "issue_inspections" ALTER COLUMN "metadata" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sub_issue_inspections" ALTER COLUMN "metadata" DROP NOT NULL;
