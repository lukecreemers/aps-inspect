import useAppStore from "@/app/store/app.store";
import { useCurrentBuildings } from "../report-session/session.hooks";
import { useGetClients } from "./client.hooks";
import { useCurrentClient } from "../auth/auth.hooks";

const ClientPage = () => {
  const currentClient = useCurrentClient();
  const { data: buildingsData, refetch } = useCurrentBuildings(
    currentClient?.id
  );
  return (
    <div>
      <h1>Clients</h1>
      {JSON.stringify(buildingsData)}
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
};

export default ClientPage;
