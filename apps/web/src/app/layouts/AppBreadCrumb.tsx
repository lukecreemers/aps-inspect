import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { useBreadCrumbs } from "../router/router.hooks";

const AppBreadCrumb = () => {
  const tabTree = useBreadCrumbs();
  tabTree;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {[...tabTree].reverse().map((tab, index) => (
          <>
            {index === tabTree.length - 1 ? (
              <BreadcrumbPage>{tab.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link to={tab.to}>{tab.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadCrumb;
