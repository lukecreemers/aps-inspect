import React from "react";
import type { Tab } from "./sidebar.types";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";

interface AppSideTabsProps {
  tabs: Tab[];
}

const AppSideTabs = ({ tabs }: AppSideTabsProps) => {
  const navigate = useNavigate();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {tabs.map((tab) => (
          <SidebarMenuItem key={tab.label}>
            <SidebarMenuButton onClick={() => navigate(tab.to)}>
              {tab.icon && <tab.icon />}
              <span>{tab.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AppSideTabs;
