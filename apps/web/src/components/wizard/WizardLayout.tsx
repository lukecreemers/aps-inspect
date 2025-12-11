import React from "react";
import { StepHeader } from "../StepHeader";
import { useReportWizardStore } from "./stores/create-report/CreateReportStore";

interface WizardLayoutProps {
  steps: { id: number; title: string }[];
  children: React.ReactNode;
}

const WizardLayout = ({ steps, children }: WizardLayoutProps) => {
  const { currentStep } = useReportWizardStore();
  return (
    <div className="max-w-3xl mx-auto relative">
      <StepHeader steps={steps} currentStep={currentStep} />
      <div className="flex-1">
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};

export default WizardLayout;
