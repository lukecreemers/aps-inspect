import type { BuildingResponse, LocationResponse } from "@aps/shared-types";

export type LocationGroup = {
  location: LocationResponse;
  buildings: BuildingResponse[];
};

export type LocationsAndBuildingsResponse = {
  locations: LocationGroup[];
  unattachedBuildings: BuildingResponse[];
};

export const organizeBuildingsLocations = (
  buildings: BuildingResponse[],
  locations: LocationResponse[]
): LocationsAndBuildingsResponse => {
  const locationMap = new Map<string, LocationGroup>();

  locations.forEach((location) => {
    locationMap.set(location.id, {
      location,
      buildings: [],
    });
  });

  const unattachedBuildings: BuildingResponse[] = [];

  buildings.forEach((building) => {
    const locationId = building.locationId;

    if (locationId && locationMap.has(locationId)) {
      locationMap.get(locationId)!.buildings.push(building);
    } else {
      unattachedBuildings.push(building);
    }
  });

  const filteredLocations = Array.from(locationMap.values()).filter(
    (group) => group.buildings.length > 0
  );

  return {
    locations: filteredLocations,
    unattachedBuildings,
  };
};
