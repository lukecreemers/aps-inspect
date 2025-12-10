import { useWizardStore } from "@/components/wizard/WizardStore";
import { useCurrentBuildings } from "../session.hooks";
import { useGetClients } from "@/features/clients/client.hooks";
import useAppStore from "@/app/store/app.store";

const CreateStepTwo = () => {
  const { sessionData, updateData, clearData, nextStep, previousStep } =
    useWizardStore();
  const { client } = useAppStore();
  const { data: buildingGroups } = useCurrentBuildings(client?.id);

  const handleChange = (field: string, value: any) => {
    updateData({ [field]: value });
  };

  const onCancel = () => {
    clearData();
  };
  return (
    <div className="w-full max-w-md">
      {buildingGroups?.unattachedBuildings.map((building) => (
        <div>{building.name}</div>
      ))}
    </div>
  );
};

export default CreateStepTwo;
