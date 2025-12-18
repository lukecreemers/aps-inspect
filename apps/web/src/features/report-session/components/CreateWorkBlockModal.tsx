import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useContractors, useCreateWorkBlock } from "../session.hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorkBlockSelect from "./WorkBlockSelect";
import { useState, useRef, useEffect } from "react";
import type { ReportTypeType } from "@aps/shared-types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type SelectedWork = Record<string, Set<ReportTypeType>>;

interface CreateWorkBlockModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateWorkBlockModal = ({
  open,
  setOpen,
}: CreateWorkBlockModalProps) => {
  const { data: contractors } = useContractors();
  const [selectedContractor, setSelectedContractor] = useState<
    string | undefined
  >(undefined);
  const {
    mutate: createWorkBlock,
    isSuccess,
    isError,
    isPending,
  } = useCreateWorkBlock();
  const [selectedWork, setSelectedWork] = useState<SelectedWork>({});

  const hasWorkUnits = Object.values(selectedWork).some((set) => set.size > 0);
  const contractorValidationRef = useRef<HTMLInputElement>(null);
  const workUnitsValidationRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedContractor(undefined);
    setSelectedWork({});
  };

  useEffect(() => {
    if (contractorValidationRef.current && selectedContractor) {
      contractorValidationRef.current.setCustomValidity("");
    }
  }, [selectedContractor]);

  useEffect(() => {
    if (workUnitsValidationRef.current && hasWorkUnits) {
      workUnitsValidationRef.current.setCustomValidity("");
    }
  }, [hasWorkUnits]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      toast.success("Work block created successfully");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to create work block");
    }
  }, [isError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation will be handled by the browser via the hidden required inputs
    // If we get here, the form is valid
    console.log("Form submitted", { selectedContractor, selectedWork });
    createWorkBlock();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[95vh] flex flex-col min-w-xl">
        {/* Header (fixed height) */}
        <DialogHeader>
          <DialogTitle>Create Work Block</DialogTitle>
          <DialogDescription>
            Create a new work block for the report session.
          </DialogDescription>
        </DialogHeader>

        {/* Body (takes remaining space) */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 min-h-0 flex flex-col gap-4"
        >
          {/* Non-scrollable inputs */}
          <div className="grid gap-3 shrink-0 w-full">
            <Label>Contractor</Label>
            <Select
              value={selectedContractor}
              onValueChange={setSelectedContractor}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                {contractors?.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              ref={contractorValidationRef}
              value={selectedContractor ? "ok" : ""}
              required
              type="text"
              className="absolute opacity-0 h-px w-px -z-10 left-1/2 top-[140px]"
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity("Please select a contractor")
              }
            />
          </div>

          {/* Scrolls ONLY when it must */}
          <div className="flex-1 min-h-0 overflow-y-auto relative">
            <WorkBlockSelect
              selectedWork={selectedWork}
              setSelectedWork={setSelectedWork}
            />
            <input
              ref={workUnitsValidationRef}
              value={hasWorkUnits ? "ok" : ""}
              required
              type="text"
              className="absolute opacity-0 h-px w-px -z-10 left-1/2 top-1/2"
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity(
                  "Please select at least one work unit"
                )
              }
            />
          </div>

          {/* Footer (fixed height) */}
          <DialogFooter className="shrink-0 mt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} className="w-[80px]">
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkBlockModal;
