import React from "react";
import { useWizardStore } from "./WizardStore";
import { StepHeader } from "../StepHeader";

interface WizardLayoutProps {
  steps: { id: number; title: string }[];
  children: React.ReactNode;
}

const WizardLayout = ({ steps, children }: WizardLayoutProps) => {
  const { currentStep, totalSteps, nextStep, previousStep } = useWizardStore();
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <StepHeader steps={steps} currentStep={currentStep} />
      <div className="flex flex-col mt-12 gap-4">{children}</div>
      <button onClick={previousStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default WizardLayout;
