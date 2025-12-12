import { useCurrentBuildings } from "../session.hooks";
import { useCurrentClient } from "@/features/auth/auth.hooks";
import BuildingSelect from "../components/BuildingSelect";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus } from "lucide-react";
import { useReportWizardStore } from "@/components/wizard/stores/create-report/CreateReportStore";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useEffect, useRef } from "react";

const CreateStepTwo = () => {
  const currentClient = useCurrentClient();
  const { data: buildingGroups } = useCurrentBuildings(currentClient?.id);
  const {
    selectedBuildings,
    deselectBuildings,
    setBuildings,
    nextStep,
    previousStep,
  } = useReportWizardStore();
  const unattachedBuildings = buildingGroups?.unattachedBuildings;
  const locations = buildingGroups?.locations;

  const getAllBuildingIds = (): string[] => {
    const buildings = [
      ...(unattachedBuildings || []),
      ...(locations?.flatMap((item) => item.buildings) || []),
    ];

    return buildings.map((building) => building.id);
  };

  const getAllBuildingIdsByLocation = (locationId: string): string[] => {
    const locationGroup = locations?.find(
      (group) => group.location.id === locationId
    );
    return locationGroup?.buildings.map((building) => building.id) ?? [];
  };

  const isAllSelected = (): boolean => {
    const allBuildings = getAllBuildingIds();
    return allBuildings.every((item) => selectedBuildings.has(item));
  };

  const isLocationAllSelected = (locationId: string): boolean => {
    const buildingIds = getAllBuildingIdsByLocation(locationId);
    return buildingIds.every((item) => selectedBuildings.has(item)) ?? false;
  };

  const handleDeselectBuildings = (value: boolean) => {
    if (value) {
      setBuildings(getAllBuildingIds());
    } else if (isAllSelected()) {
      deselectBuildings(getAllBuildingIds());
    }
  };

  const handleResetLocation = (value: boolean, locationId: string) => {
    if (value) {
      setBuildings(getAllBuildingIdsByLocation(locationId));
    } else if (isLocationAllSelected(locationId)) {
      deselectBuildings(getAllBuildingIdsByLocation(locationId));
    }
  };

  const handleNextStep = () => {
    nextStep();
  };

  const hasBuildings = selectedBuildings.size > 0;
  const validationInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (validationInputRef.current) {
      validationInputRef.current.setCustomValidity("");
    }
  }, [hasBuildings]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNextStep();
      }}
    >
      <FieldGroup className="w-full max-w-xl relative">
        <FieldSet>
          <FieldLegend>Location Selection</FieldLegend>
          <FieldDescription>
            Select the buildings and locations you want to include in the
            report.
          </FieldDescription>
          <div className="w-full  border rounded-lg overflow-hidden bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-4 bg-muted/40 p-4 border-b text-sm font-medium text-muted-foreground">
              <Checkbox
                id="all-buildings"
                onCheckedChange={handleDeselectBuildings}
                checked={isAllSelected()}
              />
              <div className="flex-1">Select All</div>
              <div className="w-8" />
            </div>

            <div className="divide-y">
              {locations?.map(({ location, buildings }) => (
                <Collapsible key={location.id} className="group">
                  <div className="flex items-center hover:bg-muted/50 transition-colors pr-4">
                    <label
                      htmlFor={location.id}
                      className="flex flex-1 items-center gap-4 p-4 cursor-pointer"
                    >
                      <Checkbox
                        id={location.id}
                        onCheckedChange={(value) =>
                          handleResetLocation(value === true, location.id)
                        }
                        checked={isLocationAllSelected(location.id)}
                      />
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-base">
                        {location.name}
                      </span>
                    </label>

                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 shrink-0"
                      >
                        <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
                        <Minus className="h-4 w-4 hidden group-data-[state=open]:block" />
                        <span className="sr-only">Toggle {location.name}</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="border-t bg-muted/10 pl-8">
                      {buildings.map((building) => (
                        <BuildingSelect
                          key={building.id}
                          building={building}
                          className="border-b last:border-0"
                          isChecked={selectedBuildings.has(building.id)}
                        />
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

              {unattachedBuildings?.map((building) => (
                <BuildingSelect
                  key={building.id}
                  building={building}
                  isChecked={selectedBuildings.has(building.id)}
                />
              ))}
            </div>
            <input
              ref={validationInputRef}
              value={hasBuildings ? "ok" : ""}
              required
              type="text"
              className="absolute opacity-0 h-px w-px -z-10 left-1/2 top-1/2"
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity(
                  "Please select at least one building or location."
                )
              }
            />
          </div>
        </FieldSet>
        <Field orientation="horizontal" className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={previousStep}>
            Previous
          </Button>
          <Button type="submit">Continue</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default CreateStepTwo;
