/*
  Warnings:

  - You are about to drop the `MapImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MapImage" DROP CONSTRAINT "MapImage_mapId_fkey";

-- DropTable
DROP TABLE "MapImage";

-- CreateTable
CREATE TABLE "map_images" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageType" "MapImageType" NOT NULL DEFAULT 'BASE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "map_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_buildings" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,

    CONSTRAINT "report_buildings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "report_buildings_reportId_buildingId_key" ON "report_buildings"("reportId", "buildingId");

-- AddForeignKey
ALTER TABLE "map_images" ADD CONSTRAINT "map_images_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_buildings" ADD CONSTRAINT "report_buildings_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_buildings" ADD CONSTRAINT "report_buildings_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
