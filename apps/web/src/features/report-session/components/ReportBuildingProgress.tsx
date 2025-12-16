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
import {
  MapPin,
  Plus,
  Minus,
  CheckCircle2,
  Loader2,
  MinusCircle,
  Building2,
} from "lucide-react";
import type { WorkUnitStatusType } from "@aps/shared-types";
import {
  useCurrentReport,
  useReportStatus,
  useReportTypes,
} from "../session.hooks";
import { useCurrentClient } from "@/features/auth/auth.hooks";

/* ---------- Status icon ---------- */

const StatusIcon = ({ status }: { status: WorkUnitStatusType }) => {
  if (status === "SUBMITTED")
    return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  if (status === "IN_PROGRESS")
    return <Loader2 className="h-4 w-4 text-amber-500" />;
  return <MinusCircle className="h-4 w-4 text-muted-foreground" />;
};

/* ---------- Component ---------- */

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

  return (
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
      <Table>
        {/* Header */}
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
              {reportStatus.locations.map(({ location, buildings }) => (
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
                        <TableCell
                          key={type.id}
                          className="text-center text-xs text-muted-foreground"
                        >
                          1 / {buildings.length}
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
                        {buildings.map(({ building, types }) => (
                          <TableRow key={building.id} className="bg-muted/10">
                            <TableCell className="flex gap-4 p-3 pl-10 text-foreground items-center">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span>{building.name}</span>
                            </TableCell>

                            {types.map((type) => (
                              <TableCell key={type.type} className="w-[96px]">
                                <div className="flex items-center justify-center">
                                  <StatusIcon status={type.status} />
                                </div>
                              </TableCell>
                            ))}

                            <TableCell />
                          </TableRow>
                        ))}
                      </>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))}
              <>
                {reportStatus.unattachedBuildings.map(({ building, types }) => (
                  <TableRow key={building.id} className="bg-muted/10">
                    <TableCell className="flex gap-4 p-3 pl-4 text-foreground items-center">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{building.name}</span>
                    </TableCell>

                    {types.map((type) => (
                      <TableCell key={type.type} className="w-[96px]">
                        <div className="flex items-center justify-center">
                          <StatusIcon status={type.status} />
                        </div>
                      </TableCell>
                    ))}

                    <TableCell />
                  </TableRow>
                ))}
              </>
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-muted/30 font-medium">
            <TableCell className="p-4 text-sm text-muted-foreground">
              Total completed
            </TableCell>

            {footerCounts.map((count) => (
              <TableCell key={count.type} className="text-center text-sm">
                {count.completed} / {count.total}
              </TableCell>
            ))}

            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default BuildingStatusTable;
