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
        const baseStyles = "flex items-center gap-3 px-4 py-4 rounded-xl";

        const activeStyles = "bg-[var(--color-primary)] text-white shadow-md";

        const inactiveStyles =
          "text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/20 hover:text-[var(--color-primary)]";

        return (
          <div
            className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
          >
            <span className={`transition-colors duration-200 `}>{icon}</span>
            <span className={`transition-colors duration-200`}>{label}</span>
          </div>
        );
      }}
    </NavLink>
  );
}
