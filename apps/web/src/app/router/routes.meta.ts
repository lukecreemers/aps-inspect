import {
  Archive,
  Briefcase,
  FileText,
  Home,
  LayoutGrid,
  Lock,
  Map,
  Users,
} from "lucide-react";
import type { Tab } from "../layouts/sidebar/sidebar.types";

export interface RouteMeta {
  label: string;
  parent?: string;
}

export const routeMeta: Record<string, RouteMeta> = {
  // Admin meta
  "/app/admin": {
    label: "Dashboard",
  },

  "/app/admin/overview": {
    label: "Buildings & Map",
  },

  "/app/admin/report-session": {
    label: "Report Session",
  },

  "/app/admin/report-session/create": {
    label: "Create Report",
    parent: "/app/admin/report-session",
  },

  "/app/admin/archive": {
    label: "Report Archive",
  },

  "/app/admin/quotes": {
    label: "Quotes",
  },

  "/app/admin/credentials": {
    label: "Credentials",
  },
};

export const adminTabs: Tab[] = [
  { label: "Dashboard", to: "/app/admin", icon: LayoutGrid },
  { label: "Buildings & Map", to: "/app/admin/overview", icon: Map },
  {
    label: "Report Session",
    to: "/app/admin/report-session",
    icon: FileText,
  },
  {
    label: "Report Archive",
    to: "/app/admin/archive",
    icon: Archive,
  },
  { label: "Quotes", to: "/app/admin/quotes", icon: Briefcase },
  { label: "Credentials", to: "/app/admin/credentials", icon: Lock },
];

export const clientTabs: Tab[] = [
  { label: "Dashboard", to: "/app/client", icon: Home },
  { label: "Reports", to: "/app/client/reports", icon: FileText },
  { label: "Invoices", to: "/app/client/invoices", icon: FileText },
  { label: "Clients", to: "/app/client/clients", icon: Users },
];
