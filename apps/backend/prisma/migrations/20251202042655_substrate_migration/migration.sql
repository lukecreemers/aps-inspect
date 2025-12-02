-- CreateTable
CREATE TABLE "substrate_inspections" (
    "id" TEXT NOT NULL,
    "substrateId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "reportWorkUnitId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "condition" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "substrate_inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "substrate_types" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uoaCodeNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "substrate_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "substrate_inspections_substrateId_reportId_key" ON "substrate_inspections"("substrateId", "reportId");

-- CreateIndex
CREATE UNIQUE INDEX "substrate_types_code_key" ON "substrate_types"("code");

-- AddForeignKey
ALTER TABLE "substrate_inspections" ADD CONSTRAINT "substrate_inspections_substrateId_fkey" FOREIGN KEY ("substrateId") REFERENCES "substrates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substrate_inspections" ADD CONSTRAINT "substrate_inspections_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substrate_inspections" ADD CONSTRAINT "substrate_inspections_reportWorkUnitId_fkey" FOREIGN KEY ("reportWorkUnitId") REFERENCES "report_work_unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substrate_inspections" ADD CONSTRAINT "substrate_inspections_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "substrate_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
