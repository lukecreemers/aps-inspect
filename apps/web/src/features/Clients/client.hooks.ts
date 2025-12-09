import { useQuery } from "@tanstack/react-query";
import * as ClientApi from "./client.api";

const clientKeys = {
  all: ["clients"] as const,
};

export function useGetClients() {
  return useQuery({
    queryKey: clientKeys.all,
    queryFn: ClientApi.getClients,
    staleTime: 10 * 60 * 1000,
  });
}
