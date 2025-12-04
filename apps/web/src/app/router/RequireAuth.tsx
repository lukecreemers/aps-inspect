import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../features/Login/auth.hooks";

export function RequireAuth() {
  const { data: currentUser } = useCurrentUser();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}
