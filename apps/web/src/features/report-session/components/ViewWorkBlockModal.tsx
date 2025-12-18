import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Copy,
  CheckCircle2,
  User,
  Building2,
  KeyRound,
  RefreshCw,
  Clock,
} from "lucide-react";
import type { ReportWorkBlockOverviewResponse } from "@aps/shared-types";
import { formatTimeAgo } from "@/utils/date.util";
import WorkBlockState from "@/components/WorkBlockState";

// --- DUMMY DATA ---
const DUMMY_DATA = {
  contractor: {
    name: "Alex Rivera",
    initials: "AR",
    status: "ASSIGNED",
    assignedAt: "Just now",
  },
  buildings: [
    {
      id: 1,
      name: "Sector 100 - Main Hub",
      reports: ["Roof", "Exterior Cladding"],
    },
    {
      id: 2,
      name: "Sector 200 - Warehouse",
      reports: ["Roof"],
    },
    {
      id: 3,
      name: "Sector 300 - Annex",
      reports: ["Exterior Cladding", "Guttering", "Safety Systems"],
    },
    {
      id: 4,
      name: "Sector 400 - Office Block",
      reports: ["Interior Common Areas"],
    },
  ],
  credentials: {
    token: "wb_8923_xk92_####", // Masked by default per brief
  },
};

interface ViewWorkBlockModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workBlock: ReportWorkBlockOverviewResponse;
}

const ViewWorkBlockModal = ({
  open,
  setOpen,
  workBlock,
}: ViewWorkBlockModalProps) => {
  // No state implementation as requested.
  // We assume the modal is controlled by a parent or open for dev purposes.
  const handleClose = () => {
    setOpen(false);
  };

  const initials = workBlock.contractorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[95vh] flex flex-col min-w-xl sm:max-w-[600px] p-8 py-10">
        {/* --- 1. Header (Context & Reassurance) --- */}
        <DialogHeader className="space-y-4 pb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle>Work Block Details</DialogTitle>
              <DialogDescription>
                Confirm assignment details and handoff credentials.
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{formatTimeAgo(workBlock.createdAt)}</span>
            </div>
          </div>

          {/* Contractor Context Card */}
          <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium leading-none">
                  {workBlock.contractorName}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Contractor</p>
              </div>
            </div>
            <WorkBlockState state={workBlock.status} />
          </div>
        </DialogHeader>

        <Separator />

        {/* --- Body (Scrollable Content) --- */}
        <div className="flex-1 min-h-0 overflow-y-auto py-4 space-y-6">
          {/* --- 2. Assigned Buildings (Core Content) --- */}
          <div className="space-y-3 px-1">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">
                Assigned Buildings
              </h3>
            </div>

            {/* Flat List - Optimised for scanning */}
            <div className="grid gap-3">
              {DUMMY_DATA.buildings.map((building) => (
                <div
                  key={building.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-md border bg-card hover:bg-accent/5 transition-colors"
                >
                  <span className="font-medium text-sm mb-2 sm:mb-0">
                    {building.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {building.reports.map((report) => (
                      <Badge
                        key={report}
                        variant="secondary"
                        className="text-xs font-normal text-muted-foreground bg-muted"
                      >
                        {report}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- 3. Contractor Credentials (Operational Block) --- */}
          <div className="space-y-3 px-1">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">
                Access Credentials
              </h3>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700">
              <div className="flex flex-col gap-3">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  One-time Access Token
                </Label>

                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      readOnly
                      value={DUMMY_DATA.credentials.token}
                      className="w-full h-10 px-3 py-2 text-sm font-mono rounded-md border bg-background text-muted-foreground"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Regenerate token">
                    <RefreshCw className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>

                <p className="text-[11px] text-muted-foreground">
                  Share this token with the contractor. They will need it to log
                  in to the mobile app.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer (Fixed Actions) --- */}
        <DialogFooter className="shrink-0 pt-2 gap-2 sm:gap-0">
          <div className="flex w-full sm:justify-between items-center">
            {/* Secondary / Destructive could go here left aligned */}
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Close
              </Button>
            </DialogClose>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" className="hidden sm:flex">
                <Copy className="w-4 h-4 mr-2" />
                Copy Details
              </Button>
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                <Mail className="w-4 h-4 mr-2" />
                Email Credentials
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewWorkBlockModal;
