/*
  Warnings:

  - A unique constraint covering the columns `[clientId,title]` on the table `reports` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reports_clientId_title_key" ON "reports"("clientId", "title");
