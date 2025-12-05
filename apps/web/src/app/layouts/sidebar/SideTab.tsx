import { Home } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SideTabProps {
  label: string;
  to: string;
  icon: React.ReactNode;
}

export default function SideTab({ label, to, icon }: SideTabProps) {
  return (
    <NavLink to={to} end>
      {({ isActive }) => {
        return (
          <div
            className={`flex items-center p-4 rounded-xl ${isActive ? "bg-[var(--color-primary)] " : "hover:bg-[var(--color-primary)]/10 hover:text-white"}`}
          >
            <span
              className={`flex items-center gap-3 ${isActive ? "text-white font-semibold" : "text-[var(--color-text-secondary)]"}`}
            >
              {icon}
              {label}
            </span>
          </div>
        );
      }}
    </NavLink>
  );
}
