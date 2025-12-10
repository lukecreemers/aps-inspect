import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ClientApi from "./client.api";
import { authKeys } from "../auth/auth.hooks";

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

export const useSelectClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ClientApi.selectClient,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.currentUser, data);
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
    },
  });
};
