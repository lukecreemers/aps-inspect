import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SideTabProps {
  label: string;
  to: string;
  icon: React.ReactNode;
}

export default function SideTab({ label, to, icon }: SideTabProps) {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <Button
          variant="ghost"
          asChild
          className={cn(
            "w-full justify-start gap-3 px-5 py-6 rounded-md",
            isActive
              ? "bg-accent text-accent-foreground border-accent-foreground "
              : " hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <div>
            <span className="transition-colors duration-200">{icon}</span>
            <span className="transition-colors duration-200">{label}</span>
          </div>
        </Button>
      )}
    </NavLink>
  );
}
