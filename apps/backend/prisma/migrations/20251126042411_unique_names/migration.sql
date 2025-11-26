/*
  Warnings:

  - A unique constraint covering the columns `[name,locationId]` on the table `Building` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,clientId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,clientId]` on the table `Map` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Building_name_locationId_key" ON "Building"("name", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_clientId_key" ON "Location"("name", "clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Map_name_clientId_key" ON "Map"("name", "clientId");
