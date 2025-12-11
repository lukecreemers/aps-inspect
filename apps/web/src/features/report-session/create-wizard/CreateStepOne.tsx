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
import { Button } from "@/components/ui/button";
import { useReportWizardStore } from "@/components/wizard/stores/create-report/CreateReportStore";
import { useEffect, useRef } from "react";

const CreateStepOne = () => {
  const { nextStep, clearData } = useReportWizardStore();
  const { sessionTitle, setSessionTitle } = useReportWizardStore();
  const { reportingPeriod, setReportingPeriod } = useReportWizardStore();
  const { notes, setNotes } = useReportWizardStore();
  const { isRoofReportEnabled, setRoofReportEnabled } = useReportWizardStore();
  const { isExteriorReportEnabled, setExteriorReportEnabled } =
    useReportWizardStore();
  const { roofReportName, setRoofReportName } = useReportWizardStore();
  const { exteriorReportName, setExteriorReportName } = useReportWizardStore();

  const onCancel = () => {
    clearData();
  };

  const isAnyReportSelected = isRoofReportEnabled || isExteriorReportEnabled;
  const validationInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (validationInputRef.current) {
      validationInputRef.current.setCustomValidity("");
    }
  }, [isAnyReportSelected]);

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
                  value={sessionTitle || ""}
                  onChange={(e) => setSessionTitle(e.target.value)}
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
                  value={reportingPeriod}
                  onChange={(e) => setReportingPeriod(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="notes">Notes (Optional)</FieldLabel>
                <Textarea
                  id="notes"
                  placeholder="Enter any notes about the session"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Separator />
          <FieldSet className="relative">
            <FieldLegend variant="label">Included Report Types</FieldLegend>
            <input
              ref={validationInputRef}
              type="text"
              className="absolute opacity-0 h-px w-px -z-10 left-1/2 top-1/2"
              value={isAnyReportSelected ? "ok" : ""}
              onChange={() => {}}
              required
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity(
                  "Please select at least one report type."
                )
              }
            />
            <FieldGroup className="flex flex-col gap-4">
              <ReportNameToggle
                title="Roof Inspection"
                initValue={sessionTitle}
                value={roofReportName}
                enabled={isRoofReportEnabled}
                onToggle={(val) => setRoofReportEnabled(val)}
                onChange={(val) => setRoofReportName(val)}
                type="Roof Inspection"
              />
              <ReportNameToggle
                title="Exterior Inspection"
                initValue={sessionTitle}
                value={exteriorReportName}
                enabled={isExteriorReportEnabled}
                onToggle={(val) => setExteriorReportEnabled(val)}
                onChange={(val) => setExteriorReportName(val)}
                type="Exterior Inspection"
              />
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal" className="flex justify-end gap-2">
            <Button variant="cancel" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CreateStepOne;
