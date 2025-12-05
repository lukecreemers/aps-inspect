import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../features/auth/auth.hooks";

export function RequireAuth() {
  const { data: currentUser } = useCurrentUser();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}
