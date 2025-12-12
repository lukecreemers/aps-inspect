import { createBrowserRouter } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";
import { RequireRole } from "./RequireRole";

import { AppLayout } from "../layouts/AppLayout";
import { LoginPage } from "../../features/auth/LoginPage";
import ClientPage from "../../features/clients/ClientPage";
import ReportSessionPage from "@/features/report-session/ReportSessionPage";
import CreateSessionPage from "@/features/report-session/CreateSessionPage";

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
              {
                path: "report-session",

                children: [
                  { index: true, element: <ReportSessionPage /> },
                  { path: "create", element: <CreateSessionPage /> },
                ],
              },
              { path: "archive", element: <div>Archive</div> },
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
