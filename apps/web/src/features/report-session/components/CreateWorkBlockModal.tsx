import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContractors } from "../session.hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BuildingStatusTable from "./ReportBuildingProgress";
import { ScrollArea } from "@/components/ui/scroll-area";
import BuildingSelect from "./BuildingSelect";
import WorkBlockSelect from "./WorkBlockSelect";
import { useState } from "react";

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[95vh] flex flex-col min-w-xl">
        {/* Header (fixed height) */}
        <DialogHeader>
          <DialogTitle>Create Work Block</DialogTitle>
          <DialogDescription>
            Create a new work block for the report session.
          </DialogDescription>
        </DialogHeader>

        {/* Body (takes remaining space) */}
        <div className="flex-1 min-h-0 flex flex-col gap-4">
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
          </div>

          {/* Scrolls ONLY when it must */}
          <div className="flex-1 min-h-0 overflow-y-auto ">
            <WorkBlockSelect />
          </div>
        </div>

        {/* Footer (fixed height) */}
        <DialogFooter className="shrink-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkBlockModal;
