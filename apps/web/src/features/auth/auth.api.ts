import type { LoginDto, UserResponse, LoginResponse } from "@aps/shared-types";
import { request } from "../../lib/request";

export const login = async (dto: LoginDto) => {
  return await request<LoginResponse>({
    method: "POST",
    url: "/auth/login",
    data: dto,
  });
};

export const fetchCurrentUser = async () => {
  return await request<UserResponse>({
    method: "GET",
    url: "/auth/current-user",
  });
};
