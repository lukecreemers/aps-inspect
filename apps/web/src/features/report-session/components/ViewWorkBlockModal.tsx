import { useState, useEffect } from "react";
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
  Check,
  Building2,
  KeyRound,
  RefreshCw,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import type { ReportWorkBlockOverviewResponse } from "@aps/shared-types";
import { formatTimeAgo } from "@/utils/date.util";
import WorkBlockState from "@/components/WorkBlockState";
import { cn } from "@/lib/utils";
import { getInitials, toTitleCase } from "@/utils/text.util";

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
  const [showCredential, setShowCredential] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setShowCredential(false);
      setCopied(false);
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(workBlock.loginSecretText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[95vh] flex flex-col min-w-xl sm:max-w-[600px] p-8 pt-10">
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
                {getInitials(workBlock.contractorName)}
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
        <div className="flex-1 min-h-0 overflow-y-auto  space-y-6">
          {/* --- 2. Assigned Buildings (Core Content) --- */}
          <div className="space-y-3 px-1">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">
                Assigned Buildings
              </h3>
            </div>

            {/* Flat List - Optimised for scanning */}
            <div className="grid border-1 rounded-md overflow-hidden">
              {workBlock.buildings.map((building) => (
                <div
                  key={building.id}
                  // Applied bg-muted/10 and specific padding (p-3 pl-4) from target styling.
                  // Kept rounded-md and border for separation in this list view.
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 pl-4  border-b bg-muted/10 transition-colors last:border-b-0"
                >
                  {/* Added Icon and wrapped in flex gap-4 to match target styling */}
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <span className=" text-sm text-foreground">
                      {building.name}
                    </span>
                  </div>

                  {/* Existing badge content */}
                  <div className="flex flex-wrap gap-1.5 justify-end ml-4">
                    {building.types.map((type) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className="text-xs font-normal text-muted-foreground bg-muted"
                      >
                        {toTitleCase(type)}
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
                  Access Token
                </Label>

                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      readOnly
                      autoFocus={false}
                      value={
                        showCredential
                          ? workBlock.loginSecretText
                          : "••••••••••••"
                      }
                      tabIndex={-1}
                      className={cn(
                        "w-full h-10 px-3 pr-10 py-2 text-sm font-mono rounded-md border bg-background",
                        showCredential
                          ? "text-foreground"
                          : "text-muted-foreground/50 tracking-widest"
                      )}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10 rounded-md text-muted-foreground hover:text-foreground"
                      onClick={() => setShowCredential(!showCredential)}
                      title={showCredential ? "Hide token" : "Show token"}
                    >
                      {showCredential ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-md text-muted-foreground hover:text-foreground"
                    onClick={handleCopy}
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
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
        <DialogFooter className="shrink-0  gap-2 sm:gap-0">
          <div className="flex w-full justify-end items-center gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Close
              </Button>
            </DialogClose>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Email Credentials
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewWorkBlockModal;
