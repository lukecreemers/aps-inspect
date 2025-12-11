import { useWizardStore } from "@/components/wizard/WizardStore";
import { useCurrentBuildings } from "../session.hooks";
import { useGetClients } from "@/features/clients/client.hooks";
import useAppStore from "@/app/store/app.store";
import { useCurrentClient } from "@/features/auth/auth.hooks";

const CreateStepTwo = () => {
  const { sessionData, updateData, clearData, nextStep, previousStep } =
    useWizardStore();
  const currentClient = useCurrentClient();
  const { data: buildingGroups } = useCurrentBuildings(currentClient?.id);

  const handleChange = (field: string, value: any) => {
    updateData({ [field]: value });
  };

  const onCancel = () => {
    clearData();
  };
  return (
    <div className="w-full max-w-md">{JSON.stringify(buildingGroups)}</div>
  );
};

export default CreateStepTwo;
