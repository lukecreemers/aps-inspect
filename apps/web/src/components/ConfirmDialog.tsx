import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface ConfirmDeleteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  header?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

const ConfirmDialog = ({
  open,
  setOpen,
  onConfirm,
  header = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmDeleteProps) => {
  const isDestructive = variant === "destructive";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        // 1. Red border for the whole modal
        className={isDestructive ? "border-destructive/50 border-2" : ""}
      >
        <AlertDialogHeader className={isDestructive ? "sm:text-center" : ""}>
          {/* 2. Big Red Warning Icon */}
          {isDestructive && (
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
          )}

          <AlertDialogTitle
            className={isDestructive ? "text-destructive text-lg" : ""}
          >
            {header}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className={isDestructive ? "sm:justify-center" : ""}>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant }))}
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
