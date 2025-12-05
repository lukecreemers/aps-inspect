import type { LoginDto, UserResponse, LoginResponse } from "@aps/shared-types";
import { request } from "../../lib/request";

export async function login(dto: LoginDto) {
  return await request<LoginResponse>({
    method: "POST",
    url: "/auth/login",
    data: dto,
  });
}

export async function fetchCurrentUser() {
  return await request<UserResponse>({
    method: "GET",
    url: "/auth/current-user",
  });
}
