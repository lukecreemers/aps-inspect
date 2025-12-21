-- AddForeignKey
ALTER TABLE "report_work_unit" ADD CONSTRAINT "report_work_unit_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
