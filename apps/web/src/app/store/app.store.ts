import type { ClientResponse } from "@aps/shared-types";
import { create } from "zustand";

type AppState = {
  client: ClientResponse | null;
  setClient: (client: ClientResponse) => void;
};

const useAppStore = create<AppState>((set) => ({
  client: null,
  setClient: (client) => set({ client }),
}));

export default useAppStore;
