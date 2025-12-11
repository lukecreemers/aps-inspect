import ClientDropdown from "./ClientDropdown";
import { ProfileMenu } from "./Profile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import AppSideTabs from "./AppSideTabs";
import type { Tab } from "./sidebar.types";

interface SidebarProps {
  tabs: Tab[];
  handleLogout: () => void;
}

const AppSidebar = ({ tabs, handleLogout }: SidebarProps) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <ClientDropdown />
      </SidebarHeader>
      <SidebarContent>
        <AppSideTabs tabs={tabs} />
      </SidebarContent>
      <SidebarFooter>
        <ProfileMenu onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
