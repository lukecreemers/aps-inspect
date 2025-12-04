import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser, useLogout } from "../../features/Login/auth.hooks";

export function AppLayout() {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const logout = useLogout();

  const adminTabs = [
    { label: "Dashboard", to: "/app/admin" },
    { label: "Reports", to: "/app/admin/reports" },
    { label: "Credentials", to: "/app/admin/credentials" },
  ];

  const clientTabs = [
    { label: "Dashboard", to: "/app/client" },
    { label: "Reports", to: "/app/client/reports" },
    { label: "Invoices", to: "/app/client/invoices" },
  ];

  const tabs = currentUser?.role === "ADMIN" ? adminTabs : clientTabs;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-56 bg-gray-900 text-white p-4">
        {tabs.map((t) => (
          <NavLink key={t.to} className="block py-2" to={t.to}>
            {t.label}
          </NavLink>
        ))}
        <button onClick={handleLogout}>Logout</button>
      </aside>

      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
