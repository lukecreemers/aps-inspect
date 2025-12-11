import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import type { Tab } from "./sidebar/sidebar.types";
import { LayoutGrid } from "lucide-react";

interface AppBreadCrumbProps {
  currentTab?: Tab;
  tabTree?: Tab[];
}

const AppBreadCrumb = ({
  currentTab = { label: "Dashboard", to: "/app/admin", icon: LayoutGrid },
  tabTree = [],
}: AppBreadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          {tabTree.length === 0 ? (
            <BreadcrumbPage>{currentTab.label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to={currentTab.to}>{currentTab.label}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {tabTree.map((tab, index) => (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem key={tab.label}>
              {index === tabTree.length - 1 ? (
                <BreadcrumbPage>{tab.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={tab.to}>{tab.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadCrumb;
