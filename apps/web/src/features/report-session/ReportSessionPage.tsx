import { useCurrentClient } from "../auth/auth.hooks";
import EmptyReport from "./components/EmptyReport";
import CreateSessionPage from "./CreateSessionPage";
import { useCurrentReport } from "./session.hooks";

const ReportSessionPage = () => {
  const currentClient = useCurrentClient();
  const { data: currentReport } = useCurrentReport(currentClient?.id);

  return (
    <div className="flex flex-1 flex-col h-full">
      {!currentReport ? <CreateSessionPage /> : <EmptyReport />}
    </div>
  );
};

export default ReportSessionPage;
