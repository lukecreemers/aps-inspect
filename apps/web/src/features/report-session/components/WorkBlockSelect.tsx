import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus, Building2 } from "lucide-react";
import {
  useCurrentReport,
  useReportStatus,
  useReportTypes,
} from "../session.hooks";
import { useCurrentClient } from "@/features/auth/auth.hooks";
import { useState } from "react";
import AssignCheckbox from "./AssignCheckbox";
import { cn } from "@/lib/utils";
import type {
  ReportStatusBuildingView,
  ReportStatusLocationView,
  ReportStatusTypeStatus,
  ReportTypeType,
} from "@aps/shared-types";

type SelectedWork = Record<string, Set<ReportTypeType>>;

interface WorkBlockSelectProps {
  selectedWork: SelectedWork;
  setSelectedWork: React.Dispatch<React.SetStateAction<SelectedWork>>;
  workUnitIds: Set<string>;
  setWorkUnitIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const WorkBlockSelect = ({
  selectedWork,
  setSelectedWork,
  workUnitIds,
  setWorkUnitIds,
}: WorkBlockSelectProps) => {
  const currentClient = useCurrentClient();
  const { data: currentReport } = useCurrentReport(currentClient?.id);
  const { data: reportStatus } = useReportStatus(currentReport?.id);
  const { data: reportTypes } = useReportTypes(currentReport?.id);

  const [showAll, setShowAll] = useState(false);
  const [expandedLocations, setExpandedLocations] = useState<
    Record<string, boolean>
  >({});

  const types = reportTypes ?? [];

  if (!reportStatus) return null;

  // --- Logic Helpers ---

  const toggleLocation = (locationId: string) => {
    setExpandedLocations((prev) => ({
      ...prev,
      [locationId]: !prev[locationId],
    }));
  };

  const isSelected = (buildingId: string, type: ReportTypeType) =>
    selectedWork[buildingId]?.has(type) ?? false;

  const handleCheck = (
    buildingId: string,
    type: ReportStatusTypeStatus | undefined,
    enabled: boolean
  ) => {
    if (!type) return;

    const shouldAdd = type.status === "PENDING" && enabled;

    setWorkUnitIds((prev) => {
      const next = new Set(prev);
      if (shouldAdd) next.add(type.workUnitId);
      else next.delete(type.workUnitId);
      return next;
    });

    setSelectedWork((prev) => {
      const current = prev[buildingId] ?? new Set();
      const next = new Set(current);
      if (shouldAdd) next.add(type.type);
      else next.delete(type.type);
      return { ...prev, [buildingId]: next };
    });
  };

  const buildingHasPending = (types: { status: string }[]) =>
    types.some((t) => t.status === "PENDING");

  const visibleLocations = reportStatus.locations
    .map(({ location, buildings }) => {
      const visibleBuildings = showAll
        ? buildings
        : buildings.filter((b) => buildingHasPending(b.types));

      return visibleBuildings.length
        ? { location, buildings: visibleBuildings }
        : null;
    })
    .filter(Boolean) as typeof reportStatus.locations;

  const visibleUnattachedBuildings = showAll
    ? reportStatus.unattachedBuildings
    : reportStatus.unattachedBuildings.filter((b) =>
        buildingHasPending(b.types)
      );

  const isLocationAssigned = (
    location: ReportStatusLocationView,
    type: ReportTypeType
  ): boolean => {
    const unassigned: ReportStatusTypeStatus[] = [];
    location.buildings.forEach((building) => {
      const workUnit = building.types.find(
        (t) => t.type === type && t.status === "PENDING"
      );
      if (workUnit) unassigned.push(workUnit);
    });
    return unassigned.length === 0;
  };

  const isLocationFull = (
    location: ReportStatusLocationView,
    type: ReportTypeType
  ): boolean => {
    const pendingIds: string[] = [];
    location.buildings.forEach((building) => {
      const workUnit = building.types.find(
        (t) => t.type === type && t.status === "PENDING"
      );
      if (workUnit) pendingIds.push(building.building.id);
    });

    if (pendingIds.length === 0) return false;

    return pendingIds.every(
      (id) => selectedWork[id] && selectedWork[id].has(type)
    );
  };

  const handleCheckLocation = (
    location: ReportStatusLocationView,
    type: ReportTypeType,
    enabled: boolean
  ) => {
    location.buildings.forEach((building) => {
      handleCheck(
        building.building.id,
        building.types.find((t) => t.type === type),
        enabled
      );
    });
  };

  const getAllPendingUnits = () => {
    const units: { buildingId: string; type: ReportStatusTypeStatus }[] = [];
    const collect = (buildings: ReportStatusBuildingView[]) => {
      buildings.forEach((building) => {
        building.types.forEach((type) => {
          if (type.status === "PENDING") {
            units.push({ buildingId: building.building.id, type });
          }
        });
      });
    };

    reportStatus.locations.forEach((l) => collect(l.buildings));
    collect(reportStatus.unattachedBuildings);
    return units;
  };

  const isAllSelected = (): boolean => {
    const pendingUnits = getAllPendingUnits();
    if (pendingUnits.length === 0) return false;
    return pendingUnits.every(({ buildingId, type }) =>
      selectedWork[buildingId]?.has(type.type)
    );
  };

  const handleCheckAll = (enabled: boolean) => {
    const pendingUnits = getAllPendingUnits();
    pendingUnits.forEach((unit) => {
      handleCheck(unit.buildingId, unit.type, enabled);
    });
  };

  return (
    <div className="space-y-3">
      {/* Header toggle */}
      <div className="flex items-center justify-between ">
        <h3 className="text-sm font-medium text-foreground">
          Select Work Units
        </h3>
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
          <Checkbox
            checked={showAll}
            onCheckedChange={(v) => setShowAll(v === true)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          Show already assigned
        </label>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border/60">
              <TableHead className="w-[300px] p-4 text-foreground font-medium">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isAllSelected()}
                    onCheckedChange={handleCheckAll}
                    aria-label="Select all"
                  />
                  <span className="text-sm">Select All</span>
                </div>
              </TableHead>

              {types.map((type) => (
                <TableHead
                  key={type.id}
                  className="text-center w-[100px] text-muted-foreground font-medium"
                >
                  {type.type.charAt(0).toUpperCase() +
                    type.type.slice(1).toLowerCase()}
                </TableHead>
              ))}

              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Locations */}
            {visibleLocations.map(({ location, buildings }) => {
              const isExpanded = expandedLocations[location.id];

              return (
                <div key={location.id} style={{ display: "contents" }}>
                  {/* Location Row */}
                  <TableRow
                    className={cn(
                      "hover:bg-muted/30 transition-colors border-b border-border/40",
                      isExpanded ? "bg-muted/20" : ""
                    )}
                  >
                    <TableCell className="font-medium p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <span className="text-foreground font-medium">
                          {location.name}
                        </span>
                      </div>
                    </TableCell>

                    {types.map((type) => (
                      <TableCell key={type.id} className="text-center p-2">
                        <div className="flex justify-center items-center h-full">
                          <AssignCheckbox
                            isAssigned={isLocationAssigned(
                              { location, buildings },
                              type.type
                            )}
                            checked={isLocationFull(
                              { location, buildings },
                              type.type
                            )}
                            onChange={(checked) => {
                              handleCheckLocation(
                                { location, buildings },
                                type.type,
                                checked
                              );
                            }}
                          />
                        </div>
                      </TableCell>
                    ))}

                    <TableCell className="text-right pr-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleLocation(location.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        type="button"
                      >
                        {isExpanded ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Buildings (Conditionally Rendered) */}
                  {isExpanded && (
                    <>
                      {buildings.map(({ building, types: buildingTypes }) => (
                        <TableRow
                          key={building.id}
                          className="border-b border-border/30 hover:bg-muted/5"
                        >
                          <TableCell className="flex gap-3 p-3 pl-[3.5rem] items-center">
                            <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-foreground/90">
                              {building.name}
                            </span>
                          </TableCell>

                          {types.map((type) => {
                            const buildingType = buildingTypes.find(
                              (t) => t.type === type.type
                            );
                            const isPending =
                              buildingType?.status === "PENDING";

                            return (
                              <TableCell
                                key={type.id}
                                className="w-[100px] p-2"
                              >
                                <div className="flex justify-center items-center h-full">
                                  <AssignCheckbox
                                    isAssigned={!isPending}
                                    checked={isSelected(building.id, type.type)}
                                    onChange={(checked) =>
                                      handleCheck(
                                        building.id,
                                        buildingType,
                                        checked
                                      )
                                    }
                                  />
                                </div>
                              </TableCell>
                            );
                          })}

                          <TableCell />
                        </TableRow>
                      ))}
                    </>
                  )}
                </div>
              );
            })}

            {/* Unattached buildings */}
            {visibleUnattachedBuildings.length > 0 && (
              <TableRow className="bg-muted/10 border-b border-t border-border/60">
                <TableCell
                  colSpan={types.length + 2}
                  className="py-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Unattached Buildings
                </TableCell>
              </TableRow>
            )}
            {visibleUnattachedBuildings.map(
              ({ building, types: buildingTypes }) => (
                <TableRow
                  key={building.id}
                  className="border-b border-border/30 hover:bg-muted/5"
                >
                  <TableCell className="flex gap-3 p-3 pl-4 items-center">
                    <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-foreground/90">
                      {building.name}
                    </span>
                  </TableCell>

                  {types.map((type) => {
                    const buildingType = buildingTypes.find(
                      (t) => t.type === type.type
                    );
                    const isPending = buildingType?.status === "PENDING";

                    return (
                      <TableCell key={type.id} className="p-2">
                        <div className="flex justify-center items-center h-full">
                          <AssignCheckbox
                            isAssigned={!isPending}
                            checked={isSelected(building.id, type.type)}
                            onChange={(checked) =>
                              handleCheck(building.id, buildingType, checked)
                            }
                          />
                        </div>
                      </TableCell>
                    );
                  })}

                  <TableCell />
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkBlockSelect;
