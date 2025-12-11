import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser, useLogout } from "../../features/auth/auth.hooks";
import AppSidebar from "./sidebar/AppSidebar";
import {
  Archive,
  Briefcase,
  FileText,
  Home,
  LayoutGrid,
  Lock,
  Map,
  Users,
} from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import type { Tab } from "./sidebar/sidebar.types";
import AppBreadCrumb from "./AppBreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppLayout() {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const logout = useLogout();

  const adminTabs: Tab[] = [
    { label: "Dashboard", to: "/app/admin", icon: LayoutGrid },
    { label: "Buildings & Map", to: "/app/admin/overview", icon: Map },
    {
      label: "Report Session",
      to: "/app/admin/report-session",
      icon: FileText,
    },
    {
      label: "Report Archive",
      to: "/app/admin/archive",
      icon: Archive,
    },
    { label: "Quotes", to: "/app/admin/quotes", icon: Briefcase },
    { label: "Credentials", to: "/app/admin/credentials", icon: Lock },
  ];

  const clientTabs: Tab[] = [
    { label: "Dashboard", to: "/app/client", icon: Home },
    { label: "Reports", to: "/app/client/reports", icon: FileText },
    { label: "Invoices", to: "/app/client/invoices", icon: FileText },
    { label: "Clients", to: "/app/client/clients", icon: Users },
  ];

  const tabs = currentUser?.role === "ADMIN" ? adminTabs : clientTabs;
  const location = useLocation();
  const pathname = location.pathname;
  const currentTab = tabs.find((tab) => tab.to === pathname);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <AppSidebar tabs={tabs} handleLogout={handleLogout} />

      <SidebarInset className="flex h-screen flex-col flex-1">
        <header className="z-30 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <AppBreadCrumb currentTab={currentTab} />
        </header>

        <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>

    // <div className="flex h-screen">

    //
    // </div>
  );
}
