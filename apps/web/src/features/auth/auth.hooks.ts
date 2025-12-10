import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as UserApi from "./auth.api";

const authKeys = {
  login: ["login"] as const,
  currentUser: ["currentUser"] as const,
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserApi.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: UserApi.fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(authKeys.currentUser, null);
    queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
  };
};
