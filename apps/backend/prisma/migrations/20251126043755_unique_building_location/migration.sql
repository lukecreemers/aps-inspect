/*
  Warnings:

  - A unique constraint covering the columns `[clientId,name,locationId]` on the table `Building` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Building_name_locationId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Building_clientId_name_locationId_key" ON "Building"("clientId", "name", "locationId");
