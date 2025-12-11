import type { ReportTypeType } from "@aps/shared-types";
import type { WizardStore } from "../../WizardStore";
import { create } from "zustand";

type ReportWizardStore = {
  // Step One
  sessionTitle: string;
  reportingPeriod: string;
  notes: string;
  isRoofReportEnabled: boolean;
  isExteriorReportEnabled: boolean;
  roofReportName: string;
  exteriorReportName: string;

  setSessionTitle: (sessionTitle: string) => void;
  setReportingPeriod: (reportingPeriod: string) => void;
  setNotes: (notes: string) => void;
  setRoofReportEnabled: (enabled: boolean) => void;
  setExteriorReportEnabled: (enabled: boolean) => void;
  setRoofReportName: (name: string) => void;
  setExteriorReportName: (name: string) => void;

  // Step Two
} & WizardStore;

export const useReportWizardStore = create<ReportWizardStore>((set) => ({
  // Base Wizard
  currentStep: 1,
  totalSteps: 1,

  setTotalSteps: (totalSteps) => set({ totalSteps }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),
  previousStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  setStep: (step) => set({ currentStep: step }),
  clearData: () =>
    set({
      sessionTitle: "",
      reportingPeriod: "",
      notes: "",
      isRoofReportEnabled: false,
      isExteriorReportEnabled: false,
      roofReportName: "",
      exteriorReportName: "",
    }),

  // Step One
  sessionTitle: "",
  reportingPeriod: "",
  notes: "",
  isRoofReportEnabled: false,
  isExteriorReportEnabled: false,
  roofReportName: "",
  exteriorReportName: "",

  setSessionTitle: (newTitle: string) => set({ sessionTitle: newTitle }),
  setReportingPeriod: (newPeriod: string) =>
    set({ reportingPeriod: newPeriod }),
  setNotes: (notes: string) => set({ notes: notes }),
  setRoofReportEnabled: (enabled: boolean) =>
    set({ isRoofReportEnabled: enabled }),
  setExteriorReportEnabled: (enabled: boolean) =>
    set({ isExteriorReportEnabled: enabled }),
  setRoofReportName: (name: string) => set({ roofReportName: name }),
  setExteriorReportName: (name: string) => set({ exteriorReportName: name }),

  // Step Two
}));
