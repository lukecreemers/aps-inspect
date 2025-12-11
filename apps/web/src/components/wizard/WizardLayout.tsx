import React from "react";
import { StepHeader } from "../StepHeader";
import { useReportWizardStore } from "./stores/create-report/CreateReportStore";

interface WizardLayoutProps {
  steps: { id: number; title: string }[];
  children: React.ReactNode;
}

const WizardLayout = ({ steps, children }: WizardLayoutProps) => {
  const { currentStep, totalSteps, nextStep, previousStep } =
    useReportWizardStore();
  return (
    <div className="max-w-3xl mx-auto relative">
      <StepHeader steps={steps} currentStep={currentStep} />
      <div className="flex-1">
        <div className="flex flex-col gap-4">{children}</div>
        <button onClick={previousStep}>Previous</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default WizardLayout;
