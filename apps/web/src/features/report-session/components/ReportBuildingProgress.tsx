import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus, Building2 } from "lucide-react";
import {
  useCurrentReport,
  useReportStatus,
  useReportTypes,
} from "../session.hooks";
import { useCurrentClient } from "@/features/auth/auth.hooks";
import StatusOrb from "@/components/StatusOrb";
import { cn } from "@/lib/utils";

// Helper type based on your provided structure
type ReportTypeItem = {
  type: "ROOF" | "EXTERIOR";
  status: "PENDING" | "IN_PROGRESS" | "SUBMITTED";
  workUnitId: string;
};

const BuildingStatusTable = () => {
  const currentClient = useCurrentClient();
  const { data: currentReport } = useCurrentReport(currentClient?.id);
  const { data: reportStatus } = useReportStatus(currentReport?.id);
  const { data: reportTypes } = useReportTypes(currentReport?.id);

  // State to track which locations are expanded
  const [expandedLocations, setExpandedLocations] = useState<
    Record<string, boolean>
  >({});

  const toggleLocation = (locationId: string) => {
    setExpandedLocations((prev) => ({
      ...prev,
      [locationId]: !prev[locationId],
    }));
  };

  const columns = reportTypes ?? [];

  // --- LOGIC HELPERS ---

  const getStatsForTypes = (
    typesList: ReportTypeItem[],
    targetType: string
  ) => {
    const matches = typesList.filter((t) => t.type === targetType);
    if (matches.length === 0) return { completed: 0, total: 0 };
    const completed = matches.filter((t) => t.status === "SUBMITTED").length;
    return { completed, total: matches.length };
  };

  const getLocationStats = (
    buildings: { types: ReportTypeItem[] }[],
    targetType: string
  ) => {
    let total = 0;
    let completed = 0;
    buildings.forEach((b) => {
      const stats = getStatsForTypes(b.types, targetType);
      total += stats.total;
      completed += stats.completed;
    });
    return { completed, total };
  };

  const footerCounts = columns.map((col) => {
    if (!reportStatus) return { type: col.type, completed: 0, total: 0 };
    const locationBuildings = reportStatus.locations.flatMap(
      (l) => l.buildings
    );
    const allBuildings = [
      ...locationBuildings,
      ...reportStatus.unattachedBuildings,
    ];
    let total = 0;
    let completed = 0;
    allBuildings.forEach((b) => {
      const stats = getStatsForTypes(b.types, col.type);
      total += stats.total;
      completed += stats.completed;
    });
    return { type: col.type, completed, total };
  });

  // --- STATUS LOGIC ---
  const getRowStatus = (typesList: ReportTypeItem[]) => {
    if (!typesList || typesList.length === 0) return "pending";
    const allSubmitted = typesList.every((t) => t.status === "SUBMITTED");
    if (allSubmitted) return "complete";

    const anyActivity = typesList.some(
      (t) => t.status === "IN_PROGRESS" || t.status === "SUBMITTED"
    );
    if (anyActivity) return "in-progress";
    return "pending";
  };

  const getLocationRowStatus = (buildings: { types: ReportTypeItem[] }[]) => {
    if (buildings.length === 0) return "pending";

    const allBuildingsComplete = buildings.every(
      (b) => getRowStatus(b.types) === "complete"
    );
    if (allBuildingsComplete) return "complete";

    const anyActivity = buildings.some((b) => {
      const s = getRowStatus(b.types);
      return s === "complete" || s === "in-progress";
    });

    if (anyActivity) return "in-progress";
    return "pending";
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border/60">
            <TableHead className="w-[320px] p-4 text-foreground text-md pl-6">
              Coverage
            </TableHead>
            {columns.map((col) => (
              <TableHead
                key={col.id}
                className="text-center w-[96px] text-muted-foreground"
              >
                {col.type.charAt(0).toUpperCase() +
                  col.type.slice(1).toLowerCase()}
              </TableHead>
            ))}
            <TableHead className="w-[32px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {reportStatus && (
            <>
              {/* --- LOCATIONS --- */}
              {reportStatus.locations.map(({ location, buildings }) => {
                const status = getLocationRowStatus(buildings);
                const isExpanded = expandedLocations[location.id];

                return (
                  <React.Fragment key={location.id}>
                    <TableRow
                      className={cn(
                        "transition-colors border-b border-border/40 group",
                        // 1. IN PROGRESS: Amber background + Amber border
                        status === "in-progress" &&
                          "bg-amber-50/60 hover:bg-amber-50/80 border-l-[4px] border-l-amber-400",
                        // 2. COMPLETE: Primary (Clean) + Primary border
                        status === "complete" &&
                          "hover:bg-muted/20 border-l-[4px] border-l-primary",
                        // 3. PENDING: Default
                        status === "pending" &&
                          "hover:bg-muted/30 border-l-[4px] border-l-transparent"
                      )}
                    >
                      <TableCell className="font-medium p-4 pl-5">
                        <div className="flex items-center gap-3 text-[16px]">
                          {/* Icon Logic: Always MapPin, color changes */}
                          <div
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                              status === "in-progress" &&
                                "bg-amber-100 text-amber-600",
                              status === "complete" &&
                                "bg-primary/10 text-primary",
                              status === "pending" &&
                                "bg-muted text-muted-foreground"
                            )}
                          >
                            <MapPin className="h-4 w-4" />
                          </div>

                          <span
                            className={cn(
                              status === "complete" &&
                                "text-foreground font-semibold",
                              status === "in-progress" &&
                                "text-amber-950 font-semibold",
                              status === "pending" && "text-muted-foreground"
                            )}
                          >
                            {location.name}
                          </span>
                        </div>
                      </TableCell>

                      {/* Counts Columns */}
                      {columns.map((col) => {
                        const { completed, total } = getLocationStats(
                          buildings,
                          col.type
                        );
                        const isEmpty = total === 0;
                        const isDone = total > 0 && completed === total;
                        const isPartial = completed > 0 && completed < total;

                        return (
                          <TableCell key={col.id} className="text-center p-2">
                            <div
                              className={cn(
                                "mx-auto w-fit px-2.5 py-1 rounded-md text-xs font-medium border",
                                isEmpty &&
                                  "border-transparent text-muted-foreground/30",
                                // Done = Primary
                                isDone &&
                                  "bg-primary/10 text-primary border-primary/20",
                                // Partial = Amber
                                isPartial &&
                                  "bg-amber-100/80 text-amber-800 border-amber-200",
                                // Pending = Muted
                                !isEmpty &&
                                  !isDone &&
                                  !isPartial &&
                                  "bg-muted text-muted-foreground border-transparent"
                              )}
                            >
                              {isEmpty ? "-" : `${completed} / ${total}`}
                            </div>
                          </TableCell>
                        );
                      })}

                      <TableCell className="text-right pr-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => toggleLocation(location.id)}
                        >
                          {isExpanded ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* --- BUILDINGS IN LOCATION (Conditionally Rendered) --- */}
                    {isExpanded && (
                      <>
                        {buildings.map(({ building, types: buildingTypes }) => {
                          const bStatus = getRowStatus(buildingTypes);

                          return (
                            <TableRow
                              key={building.id}
                              className={cn(
                                "border-b border-border/30",
                                // Same logic for buildings
                                bStatus === "in-progress" &&
                                  "bg-amber-50/30 border-l-[4px] border-l-amber-200",
                                bStatus === "complete" &&
                                  "bg-muted/5 border-l-[4px] border-l-primary/40",
                                bStatus === "pending" &&
                                  "bg-muted/5 border-l-[4px] border-l-transparent"
                              )}
                            >
                              <TableCell className="flex gap-4 p-3 pl-[3.5rem] text-foreground items-center">
                                {/* Always Building2 icon */}
                                <Building2
                                  className={cn(
                                    "h-4 w-4 shrink-0",
                                    bStatus === "in-progress" &&
                                      "text-amber-500",
                                    bStatus === "complete" && "text-primary",
                                    bStatus === "pending" &&
                                      "text-muted-foreground/40"
                                  )}
                                />

                                <span
                                  className={cn(
                                    "text-sm",
                                    bStatus === "complete" &&
                                      "text-foreground font-medium",
                                    bStatus === "in-progress" &&
                                      "text-foreground font-medium",
                                    bStatus === "pending" &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  {building.name}
                                </span>
                              </TableCell>

                              {columns.map((col) => {
                                const buildingType = buildingTypes.find(
                                  (bt) => bt.type === col.type
                                );

                                return (
                                  <TableCell
                                    key={col.id}
                                    className="w-[96px] py-2"
                                  >
                                    <div className="flex items-center justify-center">
                                      {buildingType ? (
                                        <StatusOrb
                                          status={buildingType.status}
                                        />
                                      ) : (
                                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/10" />
                                      )}
                                    </div>
                                  </TableCell>
                                );
                              })}

                              <TableCell />
                            </TableRow>
                          );
                        })}
                      </>
                    )}
                  </React.Fragment>
                );
              })}

              {/* --- UNATTACHED BUILDINGS --- */}
              {reportStatus.unattachedBuildings.length > 0 && (
                <>
                  <TableRow className="bg-muted/10 border-b border-border/60">
                    <TableCell
                      colSpan={columns.length + 2}
                      className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Unattached Buildings
                    </TableCell>
                  </TableRow>
                  {reportStatus.unattachedBuildings.map(
                    ({ building, types: buildingTypes }) => {
                      const bStatus = getRowStatus(buildingTypes);

                      return (
                        <TableRow
                          key={building.id}
                          className={cn(
                            "border-b border-border/30",
                            bStatus === "in-progress" &&
                              "bg-amber-50/30 border-l-[4px] border-l-amber-200",
                            bStatus === "complete" &&
                              "bg-card border-l-[4px] border-l-primary/40",
                            bStatus === "pending" &&
                              "bg-card border-l-[4px] border-l-transparent"
                          )}
                        >
                          <TableCell className="flex gap-4 p-3 pl-6 text-foreground items-center">
                            <Building2
                              className={cn(
                                "h-4 w-4 shrink-0",
                                bStatus === "in-progress" && "text-amber-500",
                                bStatus === "complete" && "text-primary",
                                bStatus === "pending" &&
                                  "text-muted-foreground/40"
                              )}
                            />
                            <span
                              className={cn(
                                "text-sm",
                                bStatus === "complete" &&
                                  "text-foreground font-medium",
                                bStatus === "in-progress" &&
                                  "text-foreground font-medium",
                                bStatus === "pending" && "text-muted-foreground"
                              )}
                            >
                              {building.name}
                            </span>
                          </TableCell>

                          {columns.map((col) => {
                            const buildingType = buildingTypes.find(
                              (bt) => bt.type === col.type
                            );
                            return (
                              <TableCell key={col.id} className="w-[96px]">
                                <div className="flex items-center justify-center">
                                  {buildingType ? (
                                    <StatusOrb status={buildingType.status} />
                                  ) : (
                                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/10" />
                                  )}
                                </div>
                              </TableCell>
                            );
                          })}

                          <TableCell />
                        </TableRow>
                      );
                    }
                  )}
                </>
              )}
            </>
          )}
        </TableBody>

        {/* --- FOOTER --- */}
        <TableFooter>
          <TableRow className="bg-muted/30 font-medium border-t-2">
            <TableCell className="p-4 pl-6 text-sm text-muted-foreground">
              Total completed
            </TableCell>

            {footerCounts.map((count) => {
              const isDone = count.total > 0 && count.completed === count.total;

              return (
                <TableCell key={count.type} className="text-center">
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      isDone
                        ? "text-primary font-bold"
                        : "text-muted-foreground"
                    )}
                  >
                    <span>
                      {count.completed} / {count.total}
                    </span>
                  </div>
                </TableCell>
              );
            })}

            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default BuildingStatusTable;
