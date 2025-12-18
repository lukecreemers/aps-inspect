import type { Tab } from "./sidebar.types";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AppSideTabsProps {
  tabs: Tab[];
}

const AppSideTabs = ({ tabs }: AppSideTabsProps) => {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-1">
        {tabs.map((tab) => {
          // YOUR SYSTEM: Exact match only
          const isActive = location.pathname === tab.to;

          return (
            <SidebarMenuItem key={tab.label}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={tab.label}
                className={cn(
                  "h-10 transition-all duration-200 ease-in-out",
                  "data-[active=true]:bg-primary/5 data-[active=true]:font-medium data-[active=true]:text-primary"
                )}
              >
                <Link to={tab.to} className="flex items-center gap-3">
                  {tab.icon && (
                    <tab.icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  )}
                  <span className="truncate">{tab.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AppSideTabs;
