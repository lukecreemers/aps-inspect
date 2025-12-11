import WizardLayout from "@/components/wizard/WizardLayout";
import { useEffect } from "react";
import CreateStepOne from "./create-wizard/CreateStepOne";
import CreateStepTwo from "./create-wizard/CreateStepTwo";
import { useReportWizardStore } from "@/components/wizard/stores/create-report/CreateReportStore";
import CreateStepThree from "./create-wizard/CreateStepThree";

const steps = [
  { id: 1, title: "Session Details" },
  { id: 2, title: "Previous Report" },
  { id: 3, title: "Review and Submit" },
];

const ReportSessionPage = () => {
  const { currentStep, setTotalSteps } = useReportWizardStore();

  useEffect(() => {
    setTotalSteps(3);
  }, [setTotalSteps]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CreateStepOne />;
      case 2:
        return <CreateStepTwo />;
      case 3:
        return <CreateStepThree />;
    }
  };

  return (
    <div className="flex-1">
      <WizardLayout steps={steps}>{renderStep()}</WizardLayout>
    </div>
  );
};

export default ReportSessionPage;
