import { useReportWizardStore } from "@/components/wizard/stores/create-report/CreateReportStore";
import { useEffect } from "react";
import CreateStepOne from "./create-wizard/CreateStepOne";
import CreateStepThree from "./create-wizard/CreateStepThree";
import CreateStepTwo from "./create-wizard/CreateStepTwo";
import WizardLayout from "@/components/wizard/WizardLayout";

const steps = [
  { id: 1, title: "Session Details" },
  { id: 2, title: "Previous Report" },
  { id: 3, title: "Review and Submit" },
];

const CreateSessionPage = () => {
  const { currentStep, setTotalSteps, clearData, clearWizard } =
    useReportWizardStore();

  useEffect(() => {
    clearData();
    clearWizard();
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

export default CreateSessionPage;
