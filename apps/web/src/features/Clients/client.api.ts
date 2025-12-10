import type {
  ClientResponse,
  SelectClientDto,
  UserResponse,
} from "@aps/shared-types";
import { request } from "../../lib/request";

export const getClients = async () => {
  return await request<ClientResponse[]>({
    method: "GET",
    url: "/clients",
  });
};

export const selectClient = async (dto: SelectClientDto) => {
  return await request<UserResponse>({
    method: "PATCH",
    url: "/auth/select-client",
    data: dto,
  });
};
