import React from "react";
import ClientDropdown from "./ClientDropdown";
import SideTab from "./AppSideTabs";
import { ProfileMenu } from "./Profile";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
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
