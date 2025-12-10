-- AlterTable
ALTER TABLE "user" ADD COLUMN     "selectedClientId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_selectedClientId_fkey" FOREIGN KEY ("selectedClientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
