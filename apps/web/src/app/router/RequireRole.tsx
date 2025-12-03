import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import type { UserRoleType } from "@aps/shared-types";

export function RequireRole({ role }: { role: UserRoleType }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/app" replace />;
  return <Outlet />;
}
