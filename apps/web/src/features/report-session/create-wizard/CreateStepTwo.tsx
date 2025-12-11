import { useWizardStore } from "@/components/wizard/WizardStore";
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

const CreateStepTwo = () => {
  useWizardStore();
  const currentClient = useCurrentClient();
  const { data: buildingGroups } = useCurrentBuildings(currentClient?.id);

  const unattachedBuildings = buildingGroups?.unattachedBuildings;
  const locations = buildingGroups?.locations;

  return (
    <div className="w-full max-w-2xl border rounded-lg overflow-hidden bg-card text-card-foreground shadow-sm">
      {/* Table Header */}
      <div className="flex items-center gap-4 bg-muted/40 p-4 border-b text-sm font-medium text-muted-foreground">
        <div className="w-4" /> {/* Visual alignment for checkbox */}
        <div className="w-4" /> {/* Visual alignment for icon */}
        <div className="flex-1">Location / Building</div>
        <div className="w-8" /> {/* Visual alignment for actions */}
      </div>

      <div className="divide-y">
        {locations?.map(({ location, buildings }) => (
          <Collapsible key={location.id} className="group">
            <div className="flex items-center hover:bg-muted/50 transition-colors pr-4">
              <label
                htmlFor={location.id}
                className="flex flex-1 items-center gap-4 p-4 cursor-pointer"
              >
                <Checkbox id={location.id} />
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-base">{location.name}</span>
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
                  />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        {unattachedBuildings?.map((building) => (
          <BuildingSelect key={building.id} building={building} />
        ))}
      </div>
    </div>
  );
};

export default CreateStepTwo;
