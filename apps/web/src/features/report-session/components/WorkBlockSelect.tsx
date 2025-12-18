import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  const types = reportTypes ?? [];

  if (!reportStatus) return null;
  console.log(workUnitIds);
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

      if (shouldAdd) {
        next.add(type.workUnitId);
      } else {
        next.delete(type.workUnitId);
      }

      return next;
    });

    setSelectedWork((prev) => {
      const current = prev[buildingId] ?? new Set();
      const next = new Set(current);

      if (shouldAdd) {
        next.add(type.type);
      } else {
        next.delete(type.type);
      }

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
    return unassigned.length === 0 ? true : false;
  };

  const isLocationFull = (
    location: ReportStatusLocationView,
    type: ReportTypeType
  ): boolean => {
    const unassigned: string[] = [];
    location.buildings.forEach((building) => {
      const workUnit = building.types.find(
        (t) => t.type === type && t.status === "PENDING"
      );
      if (workUnit) unassigned.push(building.building.id);
    });
    let isFull = true;
    unassigned.forEach((building) => {
      if (!selectedWork[building] || !selectedWork[building].has(type)) {
        isFull = false;
      }
    });
    return isFull;
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

    const handleBuildings = (buildings: ReportStatusBuildingView[]) => {
      buildings.forEach((building) => {
        building.types.forEach((type) => {
          if (type.status === "PENDING") {
            units.push({ buildingId: building.building.id, type: type });
          }
        });
      });
    };

    reportStatus.locations.forEach((location) => {
      handleBuildings(location.buildings);
    });
    handleBuildings(reportStatus.unattachedBuildings);

    return units;
  };

  const isAllSelected = (): boolean => {
    const pendingUnits = getAllPendingUnits();
    if (pendingUnits.length === 0) return false;

    const value = pendingUnits.every(({ buildingId, type }) =>
      selectedWork[buildingId]?.has(type.type)
    );

    return value;
  };

  const handleCheckAll = (enabled: boolean) => {
    const pendingUnits = getAllPendingUnits();
    pendingUnits.forEach((unit) => {
      handleCheck(unit.buildingId, unit.type, enabled);
    });
  };

  return (
    <div className="">
      {/* Header toggle */}
      <div className="flex items-center justify-between  py-3 ">
        <span className="text-sm font-medium">Assign work</span>
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <Checkbox
            checked={showAll}
            onCheckedChange={(v) => setShowAll(v === true)}
          />
          Show assigned buildings
        </label>
      </div>
      <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[240px] p-4 m-1 text-muted-foreground flex items-center gap-4">
                <Checkbox
                  checked={isAllSelected()}
                  onCheckedChange={handleCheckAll}
                />
                <span className="text-sm font-medium">Select All</span>
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
            {/* Locations */}
            {visibleLocations.map(({ location, buildings }) => (
              <Collapsible key={location.id} asChild>
                <>
                  {/* Location row */}
                  <TableRow className="hover:bg-muted/50">
                    <TableCell className="font-medium p-4">
                      <div className="flex items-center gap-4 text-[16px]">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {location.name}
                      </div>
                    </TableCell>

                    {types.map((type) => (
                      <TableCell key={type.id} className="text-center">
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
                      </TableCell>
                    ))}

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
                      {buildings.map(({ building, types: buildingTypes }) => (
                        <TableRow key={building.id} className="bg-muted/10">
                          <TableCell className="flex gap-4 p-3 pl-10 items-center">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            {building.name}
                          </TableCell>

                          {types.map((type) => {
                            const buildingType = buildingTypes.find(
                              (t) => t.type === type.type
                            );

                            const isPending =
                              buildingType?.status === "PENDING";

                            return (
                              <TableCell key={type.id} className="w-[96px]">
                                <div className="flex justify-center">
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
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}

            {/* Unattached buildings */}
            {visibleUnattachedBuildings.map(
              ({ building, types: buildingTypes }) => (
                <TableRow key={building.id} className="bg-muted/10">
                  <TableCell className="flex gap-4 p-3 pl-4 items-center">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {building.name}
                  </TableCell>

                  {types.map((type) => {
                    const buildingType = buildingTypes.find(
                      (t) => t.type === type.type
                    );

                    const isPending = buildingType?.status === "PENDING";

                    return (
                      <TableCell key={type.id}>
                        <div className="flex justify-center">
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
