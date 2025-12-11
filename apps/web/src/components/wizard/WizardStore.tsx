import type { ReportTypeType } from "@aps/shared-types";
import { create } from "zustand";

export type WizardStore = {
  currentStep: number;
  totalSteps: number;

  setTotalSteps: (totalSteps: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setStep: (step: number) => void;

  clearData: () => void;
};
