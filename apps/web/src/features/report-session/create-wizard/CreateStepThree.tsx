import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useReportWizardStore } from "@/components/wizard/stores/create-report/CreateReportStore";
import { Building, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useCreateReport } from "../session.hooks";
import { useCurrentClient } from "@/features/auth/auth.hooks";
import type { ReportNameType, ReportTypeType } from "@aps/shared-types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type ReportConfig = {
  key: string;
  label: string;
  enabled: boolean;
  type: ReportNameType;
};

const CreateStepThree = () => {
  const {
    sessionTitle,
    reportingPeriod,
    notes,
    isRoofReportEnabled,
    isExteriorReportEnabled,
    roofReportName,
    exteriorReportName,
    selectedBuildings,
    previousStep,
  } = useReportWizardStore();

  const { mutate: createReportMutation, isPending } = useCreateReport();
  const client = useCurrentClient();
  const navigate = useNavigate();

  const reportConfigs: ReportConfig[] = [
    {
      key: "roof",
      label: "Roof report",
      enabled: isRoofReportEnabled,
      type: {
        title: roofReportName,
        type: "ROOF",
      },
    },
    {
      key: "exterior",
      label: "Exterior report",
      enabled: isExteriorReportEnabled,
      type: {
        title: exteriorReportName,
        type: "EXTERIOR",
      },
    },
  ];

  const enabledReports = reportConfigs.filter((r) => r.enabled);

  const handleCreateReport = () => {
    createReportMutation(
      {
        clientId: client?.id ?? "N/A",
        title: sessionTitle,
        buildingIds: [...selectedBuildings],
        reportNameTypes: enabledReports.map((report) => report.type),
      },
      {
        onError: () => {
          toast.error("Failed to create report");
        },
        onSuccess: () => {
          toast.success("Succesfully created new report");
          navigate("/app/admin/report-session");
        },
      }
    );
  };

  const safeText = (value?: string) =>
    value && value.trim().length > 0 ? (
      value
    ) : (
      <span className="text-muted-foreground italic">Not provided</span>
    );

  return (
    <div>
      <Card className="border-muted shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="font-medium text-lg">Session details</CardTitle>
          <CardDescription>
            Review everything before creating the session. You can go back to
            previous steps if you need to make changes.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Session info */}
          <section className="mt-4 space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Session information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Session title</span>
                <span className="col-span-2 font-medium">
                  {safeText(sessionTitle)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Reporting period</span>
                <span className="col-span-2">{safeText(reportingPeriod)}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Notes</span>
                <span className="col-span-2 whitespace-pre-line">
                  {safeText(notes)}
                </span>
              </div>
            </div>
          </section>

          <Separator />

          {/* Reports */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Reports to generate
            </h3>

            {enabledReports.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No reports selected yet. You can enable reports in the previous
                step.
              </p>
            ) : (
              <div className="space-y-3">
                {enabledReports.map((report) => (
                  <div
                    key={report.key}
                    className="flex items-start justify-between rounded-md border bg-muted/40 px-3 py-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {report.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Report name
                      </p>
                      <p className="text-sm">
                        {safeText(report.type.title || undefined)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <Separator />

          {/* Buildings */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Buildings
            </h3>

            <div className="flex items-center justify-between rounded-md border bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <Building className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Selected buildings</p>
                  <p className="text-xs text-muted-foreground">
                    Included in the final report
                  </p>
                </div>
              </div>

              <span className="text-xl font-semibold">
                {selectedBuildings.size}
              </span>
            </div>
          </section>
          <Field
            orientation="horizontal"
            className="flex justify-end gap-2 mt-8"
          >
            <Button variant="outline" type="button" onClick={previousStep}>
              Previous
            </Button>
            <Button
              type="submit"
              onClick={handleCreateReport}
              className="min-w-32"
            >
              {isPending ? (
                <div>
                  <Loader2 className="animate-spin size-5" />
                </div>
              ) : (
                "Create Report"
              )}
            </Button>
          </Field>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStepThree;
