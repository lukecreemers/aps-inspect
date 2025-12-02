-- CreateTable
CREATE TABLE "gutter_inspections" (
    "id" TEXT NOT NULL,
    "gutterId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "reportWorkUnitId" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "typeId" TEXT NOT NULL,
    "condition" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gutter_inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gutter_types" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uoaCodeNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "gutter_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gutter_inspections_gutterId_reportId_key" ON "gutter_inspections"("gutterId", "reportId");

-- CreateIndex
CREATE UNIQUE INDEX "gutter_types_code_key" ON "gutter_types"("code");

-- AddForeignKey
ALTER TABLE "gutter_inspections" ADD CONSTRAINT "gutter_inspections_gutterId_fkey" FOREIGN KEY ("gutterId") REFERENCES "gutters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gutter_inspections" ADD CONSTRAINT "gutter_inspections_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gutter_inspections" ADD CONSTRAINT "gutter_inspections_reportWorkUnitId_fkey" FOREIGN KEY ("reportWorkUnitId") REFERENCES "report_work_unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gutter_inspections" ADD CONSTRAINT "gutter_inspections_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "gutter_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
