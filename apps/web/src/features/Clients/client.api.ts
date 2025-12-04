import type { ClientResponse } from "@aps/shared-types";
import { request } from "../../lib/request";

export async function getClients() {
  return await request<ClientResponse[]>({
    method: "GET",
    url: "/clients",
  });
}
