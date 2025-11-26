-- CreateEnum
CREATE TYPE "MapImageType" AS ENUM ('BASE', 'WIREFRAME', 'ANNOTATED', 'BLUEPRINT');

-- CreateTable
CREATE TABLE "MapImage" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageType" "MapImageType" NOT NULL DEFAULT 'BASE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MapImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MapImage" ADD CONSTRAINT "MapImage_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
