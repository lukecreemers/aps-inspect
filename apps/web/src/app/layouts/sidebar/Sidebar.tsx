import React from "react";
import ClientDropdown from "./ClientDropdown";
import SideTab from "./SideTab";
import { ProfileMenu } from "./Profile";

import { Card, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  tabs: {
    label: string;
    to: string;
    icon: React.ReactNode;
  }[];
  handleLogout: () => void;
}

const Sidebar = ({ tabs, handleLogout }: SidebarProps) => {
  return (
    <Card
      className="
        w-80 h-screen
        flex flex-col
        rounded-none
        border-r
        bg-sidebar
        text-sidebar-foreground
        py-0
      "
    >
      {/* TOP */}
      <div>
        <ClientDropdown />

        <Separator />

        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 p-2 mt-2">
            {tabs.map((t) => (
              <SideTab key={t.to} label={t.label} to={t.to} icon={t.icon} />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* BOTTOM */}
      <div className="p-2 mt-auto">
        {/* <Separator className="mb-4" /> */}
        <ProfileMenu onLogout={handleLogout} />
      </div>
    </Card>
  );
};

export default Sidebar;
