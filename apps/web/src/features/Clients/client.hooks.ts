import { useMutation, useQuery } from "@tanstack/react-query";
import * as ClientApi from "./client.api";

const clientKeys = {
  all: ["clients"] as const,
};

export const useGetClients = () => {
  return useQuery({
    queryKey: clientKeys.all,
    queryFn: ClientApi.getClients,
    staleTime: 10 * 60 * 1000,
  });
};

export const useSelectClient = (clientId: string) => {
  return useMutation({
    mutationFn: ClientApi.selectClient,
  });
};
