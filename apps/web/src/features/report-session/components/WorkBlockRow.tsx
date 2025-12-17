import { useState } from "react";
import {
  Eye,
  EyeOff,
  Building2,
  Clock,
  ChevronRight,
  KeyRound,
  Copy,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  ReportTypeType,
  ReportWorkBlockOverviewResponse,
  WorkBlockStatusType,
} from "@aps/shared-types";

// Mock Types

interface WorkBlockRowProps {
  workBlock: ReportWorkBlockOverviewResponse;
}

const WorkBlockRow = ({ workBlock }: WorkBlockRowProps) => {
  const contractor = workBlock.contractorName;
  const data = "2 days ago";
  const types: ReportTypeType[] = workBlock.types;
  const buildingCount = workBlock.buildingCount;
  const state: WorkBlockStatusType = workBlock.status;
  const credential = workBlock.loginSecretText;

  const [showCredential, setShowCredential] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper for initials
  const initials = contractor
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(credential);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-4 hover:border-border transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        {/* LEFT STACK */}
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          {/* Row 1: Types + Building Count */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {types.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="rounded-md font-medium text-[10px] px-2 py-0.5"
                >
                  {type}
                </Badge>
              ))}
            </div>

            <div className="h-3 w-px bg-border mx-1" />

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              <span className="text-sm font-semibold text-foreground">
                {buildingCount}
              </span>
              <span className="text-xs font-medium">Buildings</span>
            </div>
          </div>

          {/* Row 2: Person */}
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8 border">
              <AvatarFallback className="text-[10px] bg-muted font-bold text-muted-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm text-foreground">
              {contractor}
            </span>
          </div>
        </div>

        {/* RIGHT STACK */}
        <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
          {/* Row 1: Time + Status */}
          <div className="flex items-center justify-between sm:justify-end w-full gap-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
              <Clock className="h-3 w-3" />
              {data}
            </span>
            <Badge
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide border",
                state === "ASSIGNED" &&
                  "bg-card text-foreground border-border shadow-sm"
              )}
            >
              {state}
            </Badge>
          </div>

          {/* Row 2: Credentials + View Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Credential Box */}
            <div className="flex-1 sm:flex-none flex items-center gap-1 bg-muted/50 border pl-2.5 pr-1 rounded-md h-9">
              <div className="flex items-center gap-1.5 border-r pr-2 mr-1 h-5">
                <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-tight">
                  Creds
                </span>
              </div>

              {/* Fixed width container to prevent layout shift */}
              <span
                className={cn(
                  "text-xs font-mono w-[110px] truncate",
                  showCredential
                    ? "text-foreground"
                    : "text-muted-foreground/50 tracking-widest"
                )}
              >
                {showCredential ? credential : "••••••••••••"}
              </span>

              {/* Toggle Visibility */}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-sm text-muted-foreground hover:text-foreground"
                onClick={() => setShowCredential(!showCredential)}
              >
                {showCredential ? (
                  <Eye className="h-3.5 w-3.5" />
                ) : (
                  <EyeOff className="h-3.5 w-3.5" />
                )}
              </Button>

              {/* Copy Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-sm text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>

            {/* View Button - Matches h-9 height */}
            <Button size="sm" className="h-9 px-4 text-xs shadow-sm ">
              View
              <ChevronRight className="ml-1 h-3 w-3 opacity-70" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WorkBlockRow;
