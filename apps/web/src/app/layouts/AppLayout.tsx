import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser, useLogout } from "../../features/auth/auth.hooks";
import Sidebar from "./sidebar/Sidebar";
import {
  Archive,
  Briefcase,
  FileText,
  Grid,
  Grid2X2,
  Home,
  Key,
  LayoutGrid,
  Lock,
  Map,
  Users,
} from "lucide-react";

export function AppLayout() {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const logout = useLogout();

  const adminTabs = [
    { label: "Dashboard", to: "/app/admin", icon: <LayoutGrid /> },
    { label: "Buildings & Map", to: "/app/admin/overview", icon: <Map /> },
    {
      label: "Report Session",
      to: "/app/admin/report-session",
      icon: <FileText />,
    },
    {
      label: "Report Archive",
      to: "/app/admin/archive",
      icon: <Archive />,
    },
    { label: "Quotes", to: "/app/admin/quotes", icon: <Briefcase /> },
    { label: "Credentials", to: "/app/admin/credentials", icon: <Lock /> },
  ];

  const clientTabs = [
    { label: "Dashboard", to: "/app/client", icon: <Home /> },
    { label: "Reports", to: "/app/client/reports", icon: <FileText /> },
    { label: "Invoices", to: "/app/client/invoices", icon: <FileText /> },
    { label: "Clients", to: "/app/client/clients", icon: <Users /> },
  ];

  const tabs = currentUser?.role === "ADMIN" ? adminTabs : clientTabs;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <Sidebar tabs={tabs} handleLogout={handleLogout} />

      <main className="flex-1 p-6 overflow-auto bg-[var(--color-bg-default)]">
        <Outlet />
      </main>
    </div>
  );
}
