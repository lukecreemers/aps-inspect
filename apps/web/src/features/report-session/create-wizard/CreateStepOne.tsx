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
import React from "react";
import { ReportNameToggle } from "../components/ReportNameToggle";
import { Separator } from "@/components/ui/separator";
import { useWizardStore } from "@/components/wizard/WizardStore";

const CreateStepOne = () => {
  // 1. Connect to the store
  const { sessionData, updateData } = useWizardStore();

  // 2. Helper to update specific fields
  const handleChange = (field: string, value: any) => {
    updateData({ [field]: value });
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={(e) => e.preventDefault()}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="sessionTitle">Session Title</FieldLabel>
                <Input
                  id="sessionTitle"
                  placeholder="UOA Annual Inspection 2025"
                  required
                  // 3. Bind value and onChange
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
                  required
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
                  required
                  value={sessionData.notes || ""}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Separator />
          <FieldSet>
            <FieldLegend variant="label">Included Reports</FieldLegend>
            <FieldGroup className="flex flex-col gap-4">
              {/* ReportNameToggle expects props based on your file definition */}
              <ReportNameToggle
                title="Roof Inspection"
                initValue={sessionData.sessionTitle || ""}
                value={sessionData.roofReportName || ""}
                onChange={(val) => handleChange("roofReportName", val)}
                type="Roof Inspection"
              />
              <ReportNameToggle
                title="Exterior Inspection"
                initValue={sessionData.sessionTitle || ""}
                value={sessionData.exteriorReportName || ""}
                onChange={(val) => handleChange("exteriorReportName", val)}
                type="Exterior Inspection"
              />
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CreateStepOne;
