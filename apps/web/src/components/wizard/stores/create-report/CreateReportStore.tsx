import { createWizardSlice, type WizardSlice } from "../../WizardStore";
import { create } from "zustand";

type ReportWizardStore = {
  clearData: () => void;
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
  selectedBuildings: Set<string>;
  toggleBuilding: (buildingId: string) => void;
  deselectBuildings: (buildings: string[]) => void;
  setBuildings: (buildings: string[]) => void;
} & WizardSlice;

export const useReportWizardStore = create<ReportWizardStore>()((...args) => {
  const [set] = args;
  return {
    ...createWizardSlice(...args),

    clearData: () =>
      set({
        sessionTitle: "",
        reportingPeriod: "",
        notes: "",
        isRoofReportEnabled: false,
        isExteriorReportEnabled: false,
        roofReportName: "",
        exteriorReportName: "",
        selectedBuildings: new Set(),
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
    selectedBuildings: new Set<string>(),
    toggleBuilding: (buildingId: string) =>
      set((state) => {
        const newSet = new Set(state.selectedBuildings);
        newSet.has(buildingId)
          ? newSet.delete(buildingId)
          : newSet.add(buildingId);
        return { selectedBuildings: newSet };
      }),
    deselectBuildings: (buildings: string[]) =>
      set((state) => {
        const newSet = new Set(state.selectedBuildings);
        buildings.forEach((buildingId) => {
          newSet.delete(buildingId);
        });
        return { selectedBuildings: newSet };
      }),
    setBuildings: (buildings: string[]) =>
      set((state) => {
        const newSet = new Set(state.selectedBuildings);
        buildings.forEach((buildingId) => {
          newSet.add(buildingId);
        });
        return { selectedBuildings: newSet };
      }),
  };
});
