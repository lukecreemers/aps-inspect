import { useState, useMemo } from "react";
import { useCurrentClient } from "@/features/auth/auth.hooks";
import { useCurrentReport, useReportWorkBlocks } from "../session.hooks";
import WorkBlockRow from "./WorkBlockRow";
import { CheckCircle2, Circle, LayoutList, Inbox, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import CreateWorkBlockModal from "./CreateWorkBlockModal";

type FilterType = "active" | "submitted" | "all";

const WorkBlocks = () => {
  const client = useCurrentClient();
  const { data: report } = useCurrentReport(client?.id);
  const { data: workBlocks } = useReportWorkBlocks(report?.id);

  const [filter, setFilter] = useState<FilterType>("active");
  const [open, setOpen] = useState(false);

  const counts = useMemo(() => {
    if (!workBlocks) return { active: 0, submitted: 0, all: 0 };
    return {
      active: workBlocks.filter((wb) => wb.status !== "SUBMITTED").length,
      submitted: workBlocks.filter((wb) => wb.status === "SUBMITTED").length,
      all: workBlocks.length,
    };
  }, [workBlocks]);

  const filteredBlocks = useMemo(() => {
    if (!workBlocks) return [];

    // Sort by update time (newest first)
    const sorted = [...workBlocks].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    if (filter === "active")
      return sorted.filter((wb) => wb.status !== "SUBMITTED");
    if (filter === "submitted")
      return sorted.filter((wb) => wb.status === "SUBMITTED");
    return sorted;
  }, [workBlocks, filter]);

  return (
    <div className="flex flex-col gap-2">
      <CreateWorkBlockModal
        open={open}
        setOpen={(value: boolean) => setOpen(value)}
      />
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-end sm:items-end justify-between gap-4 ">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Work Blocks
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage assignments and credentials.
          </p>
        </div>

        {/* Filter Group */}
        <div className="flex items-center gap-2">
          <Button
            className="h-10"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Plus />
            Create Work Block
          </Button>

          <div className="flex items-center p-1 bg-muted/40 border rounded-lg">
            <Button
              variant={filter === "active" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter("active")}
              className={cn(
                "h-8 px-3 text-xs font-medium gap-2 rounded-md transition-all",
                filter === "active" &&
                  "bg-background shadow-sm text-foreground hover:bg-background"
              )}
            >
              <Circle
                className={cn(
                  "h-3.5 w-3.5",
                  filter === "active"
                    ? "text-amber-500 fill-amber-500/10"
                    : "text-muted-foreground"
                )}
              />
              Active
              <Badge
                variant="secondary"
                className="ml-0.5 h-5 px-1.5 text-[10px] bg-muted-foreground/10 text-muted-foreground"
              >
                {counts.active}
              </Badge>
            </Button>

            <div className="w-px h-4 bg-border/50 mx-1" />

            <Button
              variant={filter === "submitted" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter("submitted")}
              className={cn(
                "h-8 px-3 text-xs font-medium gap-2 rounded-md transition-all",
                filter === "submitted" &&
                  "bg-background shadow-sm text-foreground hover:bg-background"
              )}
            >
              <CheckCircle2
                className={cn(
                  "h-3.5 w-3.5",
                  filter === "submitted"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />
              Submitted
              <Badge
                variant="secondary"
                className="ml-0.5 h-5 px-1.5 text-[10px] bg-muted-foreground/10 text-muted-foreground"
              >
                {counts.submitted}
              </Badge>
            </Button>

            <div className="w-px h-4 bg-border/50 mx-1" />

            <Button
              variant={filter === "all" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className={cn(
                "h-8 px-3 text-xs font-medium gap-2 rounded-md transition-all",
                filter === "all" &&
                  "bg-background shadow-sm text-foreground hover:bg-background"
              )}
            >
              <LayoutList className="h-3.5 w-3.5" />
              All
            </Button>
          </div>
        </div>
      </div>

      {/* List / Empty State */}
      <div className="space-y-3">
        {filteredBlocks.length > 0 ? (
          filteredBlocks.map((workBlock) => (
            <WorkBlockRow key={workBlock.id} workBlock={workBlock} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed rounded-lg bg-muted/10 text-center">
            <div className="p-3 bg-background rounded-full border shadow-sm mb-4">
              {filter === "submitted" ? (
                <CheckCircle2 className="h-6 w-6 text-muted-foreground/50" />
              ) : (
                <Inbox className="h-6 w-6 text-muted-foreground/50" />
              )}
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              No {filter === "all" ? "" : filter} work blocks found
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              {filter === "active"
                ? "All assigned work has been submitted."
                : filter === "submitted"
                  ? "No work blocks have been submitted yet."
                  : "There are no work blocks associated with this report."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkBlocks;
