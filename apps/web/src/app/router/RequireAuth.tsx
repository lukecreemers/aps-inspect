import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../providers/UserProvider";

export function RequireAuth() {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
