import { create } from "zustand";

type WizardStore = {
  currentStep: number;
  totalSteps: number;

  sessionData: Record<string, any>;

  setTotalSteps: (totalSteps: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setStep: (step: number) => void;
  updateData: (data: Record<string, any>) => void;
};

export const useWizardStore = create<WizardStore>((set) => ({
  currentStep: 1,
  totalSteps: 3,
  sessionData: {},
  setTotalSteps: (totalSteps) => set({ totalSteps }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),
  previousStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  setStep: (step) => set({ currentStep: step }),
  updateData: (data) =>
    set((state) => ({ sessionData: { ...state.sessionData, ...data } })),
}));
