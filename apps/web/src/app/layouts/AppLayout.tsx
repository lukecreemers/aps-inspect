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
import AppBreadCrumb from "./AppBreadCrumb";
import { adminTabs, clientTabs } from "../router/routes.meta";

export function AppLayout() {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const logout = useLogout();

  const tabs = currentUser?.role === "ADMIN" ? adminTabs : clientTabs;

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
          <AppBreadCrumb />
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
