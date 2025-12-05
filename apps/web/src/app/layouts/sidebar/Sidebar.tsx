import React from "react";
import { NavLink } from "react-router-dom";
import SideTab from "./SideTab";
import ClientDropdown from "./ClientDropdown";

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
    <div className="w-80 bg-[var(--color-bg-sidebar)]">
      <ClientDropdown />
      <div className="flex flex-col gap-1 m-4">
        {tabs.map((t) => (
          <SideTab label={t.label} to={t.to} icon={t.icon} />
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
