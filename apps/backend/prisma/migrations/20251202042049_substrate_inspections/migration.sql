-- CreateTable
CREATE TABLE "window_inspections" (
    "id" TEXT NOT NULL,
    "windowId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "reportWorkUnitId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "condition" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "window_inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "window_types" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uoaCodeNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "window_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "window_inspections_windowId_reportId_key" ON "window_inspections"("windowId", "reportId");

-- CreateIndex
CREATE UNIQUE INDEX "window_types_code_key" ON "window_types"("code");

-- AddForeignKey
ALTER TABLE "window_inspections" ADD CONSTRAINT "window_inspections_windowId_fkey" FOREIGN KEY ("windowId") REFERENCES "windows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "window_inspections" ADD CONSTRAINT "window_inspections_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "window_inspections" ADD CONSTRAINT "window_inspections_reportWorkUnitId_fkey" FOREIGN KEY ("reportWorkUnitId") REFERENCES "report_work_unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "window_inspections" ADD CONSTRAINT "window_inspections_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "window_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
