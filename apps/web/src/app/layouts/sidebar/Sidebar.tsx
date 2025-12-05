import React from "react";
import { NavLink } from "react-router-dom";
import SideTab from "./SideTab";

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
    <aside className="w-80 bg-[var(--color-bg-sidebar)]">
      <div className="flex flex-col gap-2 m-4">
        {tabs.map((t) => (
          <SideTab label={t.label} to={t.to} icon={t.icon} />
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </aside>
  );
};

export default Sidebar;
