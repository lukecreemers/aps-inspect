import useAppStore from "@/app/store/app.store";
import { useCurrentBuildings } from "../report-session/session.hooks";
import { useGetClients } from "./client.hooks";
import { useCurrentClient } from "../auth/auth.hooks";
import CreateStepTwo from "../report-session/create-wizard/CreateStepTwo";

const ClientPage = () => {
  // const currentClient = useCurrentClient();
  // const { data: buildingsData, refetch } = useCurrentBuildings(
  //   currentClient?.id
  // );
  return (
    <div>
      <h1>Clients</h1>
      <CreateStepTwo />
    </div>
  );
};

export default ClientPage;
