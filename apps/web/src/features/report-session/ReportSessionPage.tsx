import WizardLayout from "@/components/wizard/WizardLayout";
import { useEffect } from "react";
import CreateStepOne from "./create-wizard/CreateStepOne";
import CreateStepTwo from "./create-wizard/CreateStepTwo";
import { useReportWizardStore } from "@/components/wizard/stores/create-report/CreateReportStore";
import CreateStepThree from "./create-wizard/CreateStepThree";
import { useCurrentReport } from "./session.hooks";
import { useCurrentClient, useCurrentUser } from "../auth/auth.hooks";

const ReportSessionPage = () => {
  const currentClient = useCurrentClient();
  const { data: currentReport } = useCurrentReport(currentClient?.id);

  console.log(currentReport);

  return (
    <div className="flex-1">
      {currentReport ? (
        <div>Current report found</div>
      ) : (
        <div>No report found</div>
      )}
    </div>
  );
};

export default ReportSessionPage;
