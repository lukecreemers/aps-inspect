import { useWizardStore } from "@/components/wizard/WizardStore";

const CreateStepTwo = () => {
  const { sessionData, updateData, clearData, nextStep, previousStep } =
    useWizardStore();

  const handleChange = (field: string, value: any) => {
    updateData({ [field]: value });
  };

  const onCancel = () => {
    clearData();
  };
  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
      >
        CreateStepTwo
      </form>
    </div>
  );
};

export default CreateStepTwo;
