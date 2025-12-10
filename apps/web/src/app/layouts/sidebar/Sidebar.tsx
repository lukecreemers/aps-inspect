import React from "react";
import SideTab from "./SideTab";
import ClientDropdown from "./ClientDropdown";
import Profile from "./Profile";

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
    <div className="w-80 bg-[var(--color-bg-sidebar)] justify-between flex flex-col">
      <div>
        <ClientDropdown />
        <div className="flex flex-col gap-1 m-4">
          {tabs.map((t) => (
            <SideTab label={t.label} to={t.to} icon={t.icon} />
          ))}
        </div>
      </div>
      <div className="m-4">
        {/* <button onClick={handleLogout}>Logout</button> */}
        <Profile />
      </div>
    </div>
  );
};

export default Sidebar;
