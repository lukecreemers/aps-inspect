import { createBrowserRouter } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";
import { RequireRole } from "./RequireRole";

import { AppLayout } from "../layouts/AppLayout";
import { LoginPage } from "../../features/auth/LoginPage";
import ClientPage from "../../features/clients/ClientPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },

  {
    path: "/app",
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "admin",
            element: <RequireRole role="ADMIN" />,
            children: [
              { index: true, element: <div>Admin Dashboard</div> },
              { path: "overview", element: <div>Admin Overview</div> },
              { path: "report-session", element: <div>Admin Reports</div> },
              { path: "archive", element: <div>Admin Archive</div> },
              { path: "quotes", element: <div>Admin Quotes</div> },
              { path: "credentials", element: <div>Admin Credentials</div> },
            ],
          },
          {
            path: "client",
            element: <RequireRole role="CLIENT" />,
            children: [
              { index: true, element: <div>Client Dashboard</div> },
              { path: "reports", element: <div>Client Reports</div> },
              { path: "invoices", element: <div>Client Invoices</div> },
              { path: "clients", element: <ClientPage /> },
            ],
          },
        ],
      },
    ],
  },
]);
