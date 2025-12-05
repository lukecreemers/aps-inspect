import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../features/auth/auth.hooks";
import type { UserRoleType } from "@aps/shared-types";

export function RequireRole({ role }: { role: UserRoleType }) {
  const { data: currentUser } = useCurrentUser();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== role) return <Navigate to="/app" replace />;
  return <Outlet />;
}
