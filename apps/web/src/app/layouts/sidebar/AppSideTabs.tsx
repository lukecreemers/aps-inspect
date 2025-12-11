import type { Tab } from "./sidebar.types";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

interface AppSideTabsProps {
  tabs: Tab[];
}

const AppSideTabs = ({ tabs }: AppSideTabsProps) => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {tabs.map((tab) => (
          <SidebarMenuItem key={tab.label}>
            <SidebarMenuButton asChild isActive={location.pathname === tab.to}>
              <Link to={tab.to}>
                {tab.icon && <tab.icon />}
                <span>{tab.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AppSideTabs;
