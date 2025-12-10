import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReportNameToggle } from "../components/ReportNameToggle";
import { Separator } from "@/components/ui/separator";
import { useWizardStore } from "@/components/wizard/WizardStore";
import { Button } from "@/components/ui/button";

const CreateStepOne = () => {
  const { sessionData, updateData, clearData } = useWizardStore();
  const { nextStep } = useWizardStore();

  const handleChange = (field: string, value: any) => {
    updateData({ [field]: value });
  };

  const onCancel = () => {
    clearData();
  };

  const isAnyReportSelected =
    sessionData.isRoofReportEnabled || sessionData.isExteriorReportEnabled;

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isAnyReportSelected) return;
          nextStep();
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="sessionTitle">Session Title</FieldLabel>
                <Input
                  id="sessionTitle"
                  placeholder="UOA Annual Inspection 2025"
                  required
                  value={sessionData.sessionTitle || ""}
                  onChange={(e) => handleChange("sessionTitle", e.target.value)}
                />
                <FieldDescription className="text-xs text-muted-foreground">
                  This title is used as the base for naming all reports in the
                  session
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="reportingPeriod">
                  Reporting Period (Optional)
                </FieldLabel>
                <Input
                  id="reportingPeriod"
                  placeholder="e.g. Jan 2025 - Mar - 2025"
                  value={sessionData.reportingPeriod || ""}
                  onChange={(e) =>
                    handleChange("reportingPeriod", e.target.value)
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="notes">Notes (Optional)</FieldLabel>
                <Textarea
                  id="notes"
                  placeholder="Enter any notes about the session"
                  value={sessionData.notes || ""}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Separator />
          <FieldSet>
            <FieldLegend variant="label">Included Report Types</FieldLegend>
            <FieldGroup className="flex flex-col gap-4">
              <ReportNameToggle
                title="Roof Inspection"
                initValue={sessionData.sessionTitle || ""}
                value={sessionData.roofReportName || ""}
                enabled={!!sessionData.isRoofReportEnabled}
                onToggle={(val) => handleChange("isRoofReportEnabled", val)}
                onChange={(val) => handleChange("roofReportName", val)}
                type="Roof Inspection"
              />
              <ReportNameToggle
                title="Exterior Inspection"
                initValue={sessionData.sessionTitle || ""}
                value={sessionData.exteriorReportName || ""}
                enabled={!!sessionData.isExteriorReportEnabled}
                onToggle={(val) => handleChange("isExteriorReportEnabled", val)}
                onChange={(val) => handleChange("exteriorReportName", val)}
                type="Exterior Inspection"
              />
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal" className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isAnyReportSelected}>
              Continue
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CreateStepOne;
