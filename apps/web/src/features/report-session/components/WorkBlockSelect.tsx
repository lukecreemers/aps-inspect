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

/**
 * UI-only table for assigning work blocks
 * - Default: only unassigned (PENDING) work
 * - Optional toggle to show all buildings
 * - Checkboxes are NOT wired to state
 */
const WorkBlockSelect = () => {
  const currentClient = useCurrentClient();
  const { data: currentReport } = useCurrentReport(currentClient?.id);
  const { data: reportStatus } = useReportStatus(currentReport?.id);
  const { data: reportTypes } = useReportTypes(currentReport?.id);

  const [showAll, setShowAll] = useState(false);
  const types = reportTypes ?? [];

  if (!reportStatus) return null;

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
                <Checkbox />{" "}
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
                      <div className="flex items-center gap-4">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {location.name}
                      </div>
                    </TableCell>

                    {types.map((type) => (
                      <TableCell key={type.id} className="text-center">
                        <AssignCheckbox isAssigned={true} />
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
                                  <AssignCheckbox isAssigned={!isPending} />
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
                          <AssignCheckbox isAssigned={!isPending} />
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
