-- CreateTable
CREATE TABLE "roof_inspections" (
    "id" TEXT NOT NULL,
    "roofId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "reportWorkUnitId" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "typeId" TEXT NOT NULL,
    "condition" INTEGER NOT NULL,
    "paintCondition" INTEGER,
    "color" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roof_inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roof_types" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uoaCodeNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "roof_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roof_inspections_roofId_reportId_key" ON "roof_inspections"("roofId", "reportId");

-- CreateIndex
CREATE UNIQUE INDEX "roof_types_code_key" ON "roof_types"("code");

-- AddForeignKey
ALTER TABLE "roof_inspections" ADD CONSTRAINT "roof_inspections_roofId_fkey" FOREIGN KEY ("roofId") REFERENCES "roofs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roof_inspections" ADD CONSTRAINT "roof_inspections_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roof_inspections" ADD CONSTRAINT "roof_inspections_reportWorkUnitId_fkey" FOREIGN KEY ("reportWorkUnitId") REFERENCES "report_work_unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roof_inspections" ADD CONSTRAINT "roof_inspections_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "roof_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
