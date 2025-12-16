import { useCurrentClient } from "@/features/auth/auth.hooks";
import { useClientReports } from "@/features/report-session/session.hooks";
import { useEffect, useMemo } from "react";

export const useReportTitleValidation = (
  title: string | undefined,
  inputRef: React.RefObject<HTMLInputElement> | React.RefObject<null>
) => {
  const currentClient = useCurrentClient();
  const { data: clientReports } = useClientReports(currentClient?.id);

  const reportTitles = useMemo(
    () => new Set(clientReports?.map((r) => r.title)),
    [clientReports]
  );

  useEffect(() => {
    if (!inputRef.current) return;

    if (title && reportTitles.has(title)) {
      inputRef.current.setCustomValidity(
        "A report with this name already exists."
      );
    } else {
      inputRef.current.setCustomValidity("");
    }
  }, [title, reportTitles, inputRef]);
};
