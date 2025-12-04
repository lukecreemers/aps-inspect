import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as UserApi from "./auth.api";

const authKeys = {
  login: ["login"] as const,
  currentUser: ["currentUser"] as const,
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserApi.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: UserApi.fetchCurrentUser,
  });
}
