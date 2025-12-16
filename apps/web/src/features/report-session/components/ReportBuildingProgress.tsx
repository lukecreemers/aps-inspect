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
import type { ReportTypeAssignmentResponse } from "@aps/shared-types";

interface BuildingStatusTableProps {
  types: ReportTypeAssignmentResponse[];
}

type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";

/* ---------- Dummy data ---------- */

const dummyData = {
  locations: [
    {
      id: "loc-1",
      name: "Main Site",
      buildings: [
        { id: "b1", name: "Building A" },
        { id: "b2", name: "Building B" },
      ],
    },
    {
      id: "loc-2",
      name: "Warehouse",
      buildings: [{ id: "b3", name: "Storage Shed" }],
    },
  ],
};

const randomStatus = (): Status =>
  ["COMPLETED", "IN_PROGRESS", "NOT_STARTED"][
    Math.floor(Math.random() * 3)
  ] as Status;

/* ---------- Status icon ---------- */

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === "COMPLETED")
    return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  if (status === "IN_PROGRESS")
    return <Loader2 className="h-4 w-4 text-amber-500" />;
  return <MinusCircle className="h-4 w-4 text-muted-foreground" />;
};

/* ---------- Component ---------- */

const BuildingStatusTable = ({ types }: BuildingStatusTableProps) => {
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
          {dummyData.locations.map((location) => (
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
                      1 / {location.buildings.length}
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
                    {location.buildings.map((building) => (
                      <TableRow key={building.id} className="bg-muted/10">
                        <TableCell className="flex gap-4 p-3 pl-10 text-foreground items-center">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span>{building.name}</span>
                        </TableCell>

                        {types.map((type) => (
                          <TableCell key={type.id} className="w-[96px]">
                            <div className="flex items-center justify-center">
                              <StatusIcon status={randomStatus()} />
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
        </TableBody>
      </Table>
    </div>
  );
};

export default BuildingStatusTable;
