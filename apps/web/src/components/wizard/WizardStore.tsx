import type { StateCreator } from "zustand";

export type WizardSlice = {
  currentStep: number;
  totalSteps: number;

  setTotalSteps: (totalSteps: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setStep: (step: number) => void;

  clearWizard: () => void;
};

export const createWizardSlice: StateCreator<
  WizardSlice,
  [],
  [],
  WizardSlice
> = (set) => ({
  currentStep: 1,
  totalSteps: 1,

  setTotalSteps: (total) => set({ totalSteps: total }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),
  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
  setStep: (step) => set({ currentStep: step }),

  clearWizard: () => set({ currentStep: 1, totalSteps: 1 }),
});
