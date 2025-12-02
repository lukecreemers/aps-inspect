/*
  Warnings:

  - You are about to drop the `Building` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gutter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Map` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roof` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Substrate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Window` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Building" DROP CONSTRAINT "Building_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Building" DROP CONSTRAINT "Building_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Gutter" DROP CONSTRAINT "Gutter_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Map" DROP CONSTRAINT "Map_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Roof" DROP CONSTRAINT "Roof_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Substrate" DROP CONSTRAINT "Substrate_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Window" DROP CONSTRAINT "Window_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "map_images" DROP CONSTRAINT "map_images_mapId_fkey";

-- DropForeignKey
ALTER TABLE "report_buildings" DROP CONSTRAINT "report_buildings_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "report_buildings" DROP CONSTRAINT "report_buildings_reportId_fkey";

-- DropForeignKey
ALTER TABLE "report_type_assignments" DROP CONSTRAINT "report_type_assignments_reportId_fkey";

-- DropTable
DROP TABLE "Building";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Gutter";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Map";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Roof";

-- DropTable
DROP TABLE "Substrate";

-- DropTable
DROP TABLE "Window";

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maps" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buildings" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "locationId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "facilityNumber" TEXT,
    "accessInformation" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roofs" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "removedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roofs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gutters" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "removedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gutters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "substrates" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "removedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "substrates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "windows" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "removedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "windows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_name_key" ON "clients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "maps_name_clientId_key" ON "maps"("name", "clientId");

-- CreateIndex
CREATE UNIQUE INDEX "locations_name_clientId_key" ON "locations"("name", "clientId");

-- CreateIndex
CREATE UNIQUE INDEX "buildings_clientId_name_locationId_key" ON "buildings"("clientId", "name", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "contractors_email_key" ON "contractors"("email");

-- AddForeignKey
ALTER TABLE "maps" ADD CONSTRAINT "maps_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "map_images" ADD CONSTRAINT "map_images_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roofs" ADD CONSTRAINT "roofs_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gutters" ADD CONSTRAINT "gutters_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substrates" ADD CONSTRAINT "substrates_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "windows" ADD CONSTRAINT "windows_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_type_assignments" ADD CONSTRAINT "report_type_assignments_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_buildings" ADD CONSTRAINT "report_buildings_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_buildings" ADD CONSTRAINT "report_buildings_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
