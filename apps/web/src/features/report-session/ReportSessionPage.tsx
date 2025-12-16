import { useCurrentClient } from "../auth/auth.hooks";
import EmptyReport from "./components/EmptyReport";
import CreateSessionPage from "./CreateSessionPage";
import CurrentReport from "./current-report/CurrentReport";
import { useCurrentReport } from "./session.hooks";

const ReportSessionPage = () => {
  const currentClient = useCurrentClient();
  const { data: currentReport } = useCurrentReport(currentClient?.id);

  return (
    <div className="flex flex-1 flex-col h-full w-full mx-auto">
      {currentReport ? <CurrentReport /> : <EmptyReport />}
    </div>
  );
};

export default ReportSessionPage;
