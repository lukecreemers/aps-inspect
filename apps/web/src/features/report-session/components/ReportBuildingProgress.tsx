import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus, Building2 } from "lucide-react";
import type {
  ReportStatusBuildingView,
  ReportTypeType,
} from "@aps/shared-types";
import {
  useCurrentReport,
  useReportStatus,
  useReportTypes,
} from "../session.hooks";
import { useCurrentClient } from "@/features/auth/auth.hooks";
import StatusOrb from "@/components/StatusOrb";
import { cn } from "@/lib/utils";

const BuildingStatusTable = () => {
  const currentClient = useCurrentClient();
  const { data: currentReport } = useCurrentReport(currentClient?.id);
  const { data: reportStatus } = useReportStatus(currentReport?.id);
  const { data: reportTypes } = useReportTypes(currentReport?.id);

  const types = reportTypes ?? [];

  const footerCounts = (() => {
    if (!reportStatus) return [];

    const allBuildings = [
      ...reportStatus.locations.flatMap((l) => l.buildings),
      ...reportStatus.unattachedBuildings,
    ];

    return types.map((type) => {
      const allTypeUnits = allBuildings
        .flatMap((b) => b.types)
        .filter((t) => t.type === type.type);

      const completed = allTypeUnits.filter(
        (t) => t.status === "SUBMITTED"
      ).length;

      return {
        type: type.type,
        completed,
        total: allTypeUnits.length,
      };
    });
  })();

  const locationCounts = (
    buildings: ReportStatusBuildingView[],
    type: ReportTypeType
  ) => {
    return buildings
      .flatMap((building) => building.types)
      .filter((t) => t.type === type && t.status === "SUBMITTED").length;
  };

  const getLocationStatus = (buildings: ReportStatusBuildingView[]) => {
    if (buildings.length === 0) return "pending";

    const allTypeUnits = buildings.flatMap((b) => b.types);

    if (allTypeUnits.length === 0) return "pending";

    const allSubmitted = allTypeUnits.every((t) => t.status === "SUBMITTED");
    if (allSubmitted) return "completed";

    const hasInProgress = allTypeUnits.some((t) => t.status === "IN_PROGRESS");
    const hasPending = allTypeUnits.some((t) => t.status === "PENDING");
    const hasSubmitted = allTypeUnits.some((t) => t.status === "SUBMITTED");

    if (hasInProgress || (hasPending && hasSubmitted)) return "in_progress";

    return "pending";
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[320px] p-4 text-foreground text-md">
              Coverage
            </TableHead>
            {types.map((type) => (
              <TableHead
                key={type.id}
                className="text-center w-[96px] text-muted-foreground"
              >
                {type.type.charAt(0).toUpperCase() +
                  type.type.slice(1).toLowerCase()}
              </TableHead>
            ))}
            <TableHead className="w-[32px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {reportStatus && (
            <>
              {reportStatus.locations.map(({ location, buildings }) => {
                const locationStatus = getLocationStatus(buildings);
                return (
                  <Collapsible key={location.id} asChild>
                    <>
                      {/* Location row */}
                      <TableRow
                        className={cn("relative  transition-colors", {
                          "bg-primary/5 border-l-4 border-l-primary":
                            locationStatus === "completed",
                          "bg-amber-500/5 border-l-4 border-l-amber-500":
                            locationStatus === "in_progress",
                          "bg-muted/30 border-l-4 border-l-muted-foreground/30":
                            locationStatus === "pending",
                        })}
                      >
                        <TableCell className="font-medium p-4">
                          <div className="flex items-center gap-4 text-[16px]">
                            <MapPin
                              className={cn("h-4 w-4", {
                                "text-primary": locationStatus === "completed",
                                "text-amber-500":
                                  locationStatus === "in_progress",
                                "text-muted-foreground":
                                  locationStatus === "pending",
                              })}
                            />
                            <span
                              className={cn({
                                "text-primary font-semibold":
                                  locationStatus === "completed",
                                "text-amber-600 font-semibold":
                                  locationStatus === "in_progress",
                              })}
                            >
                              {location.name}
                            </span>
                          </div>
                        </TableCell>

                        {types.map((type) => {
                          const locationCount = locationCounts(
                            buildings,
                            type.type
                          );
                          return (
                            <TableCell
                              key={type.id}
                              className={cn(
                                "text-center text-xs text-muted-foreground",
                                locationCount !== 0 &&
                                  "text-amber-500 font-medium",
                                locationCount === buildings.length &&
                                  "text-primary font-medium"
                              )}
                            >
                              {locationCount} / {buildings.length}
                            </TableCell>
                          );
                        })}

                        <TableCell className="text-right">
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="group h-8 w-8"
                            >
                              <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
                              <Minus className="h-4 w-4 hidden group-data-[state=open]:block" />
                            </Button>
                          </CollapsibleTrigger>
                        </TableCell>
                      </TableRow>

                      {/* Buildings */}
                      <CollapsibleContent asChild>
                        <>
                          {buildings.map(
                            ({ building, types: buildingTypes }) => {
                              const buildingStatus = getLocationStatus([
                                { building, types: buildingTypes },
                              ]);
                              return (
                                <TableRow
                                  key={building.id}
                                  className={cn("relative transition-colors", {
                                    "bg-primary/5 ":
                                      buildingStatus === "completed",
                                    "bg-amber-500/5 ":
                                      buildingStatus === "in_progress",
                                    "bg-muted/30 border-l-4 border-l-muted-foreground/30":
                                      buildingStatus === "pending",
                                  })}
                                >
                                  <TableCell className="flex gap-4 p-3 pl-10 text-foreground items-center">
                                    <Building2
                                      className={cn("h-4 w-4", {
                                        "text-primary":
                                          buildingStatus === "completed",
                                        "text-amber-500":
                                          buildingStatus === "in_progress",
                                        "text-muted-foreground":
                                          buildingStatus === "pending",
                                      })}
                                    />
                                    <span
                                      className={cn({
                                        "text-primary font-semibold":
                                          buildingStatus === "completed",
                                        "text-amber-600 font-semibold":
                                          buildingStatus === "in_progress",
                                      })}
                                    >
                                      {building.name}
                                    </span>
                                  </TableCell>

                                  {types.map((type) => {
                                    const buildingType = buildingTypes.find(
                                      (bt) => bt.type === type.type
                                    );
                                    return (
                                      <TableCell
                                        key={type.type}
                                        className="w-[96px]"
                                      >
                                        <div className="flex items-center justify-center">
                                          {buildingType && (
                                            <StatusOrb
                                              status={buildingType.status}
                                            />
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
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                );
              })}
              <>
                {reportStatus.unattachedBuildings.map(
                  ({ building, types: buildingTypes }) => {
                    const buildingStatus = getLocationStatus([
                      { building, types: buildingTypes },
                    ]);
                    return (
                      <TableRow
                        key={building.id}
                        className={cn("relative transition-colors", {
                          "bg-primary/5 border-l-4 border-l-primary":
                            buildingStatus === "completed",
                          "bg-amber-500/5 border-l-4 border-l-amber-500":
                            buildingStatus === "in_progress",
                          "bg-muted/30 border-l-4 border-l-muted-foreground/30":
                            buildingStatus === "pending",
                        })}
                      >
                        <TableCell className="flex gap-4 p-3 pl-4 text-foreground items-center">
                          <Building2
                            className={cn("h-4 w-4", {
                              "text-primary": buildingStatus === "completed",
                              "text-amber-500":
                                buildingStatus === "in_progress",
                              "text-muted-foreground":
                                buildingStatus === "pending",
                            })}
                          />
                          <span
                            className={cn({
                              "text-primary font-semibold":
                                buildingStatus === "completed",
                              "text-amber-600 font-semibold":
                                buildingStatus === "in_progress",
                            })}
                          >
                            {building.name}
                          </span>
                        </TableCell>

                        {types.map((type) => {
                          const buildingType = buildingTypes.find(
                            (bt) => bt.type === type.type
                          );
                          return (
                            <TableCell key={type.type} className="w-[96px]">
                              <div className="flex items-center justify-center">
                                {buildingType && (
                                  <StatusOrb status={buildingType.status} />
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
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-muted/30 font-medium">
            <TableCell className="p-4 text-sm text-muted-foreground">
              Total completed
            </TableCell>

            {footerCounts.map((count) => {
              const completed = count.completed;
              const total = count.total;
              return (
                <TableCell
                  key={count.type}
                  className={cn(
                    "text-center text-sm",
                    completed !== 0 && "text-amber-500 font-medium",
                    completed === total && "text-primary font-medium"
                  )}
                >
                  {completed} / {total}
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
