import { useLocation } from "react-router-dom";
import { routeMeta } from "./routes.meta";
import type { Tab } from "../layouts/sidebar/sidebar.types";

export const useBreadCrumbs = (): Omit<Tab, "icon">[] => {
  const location = useLocation();
  const to = location.pathname;
  const metadata = routeMeta[to];

  if (!metadata) {
    return [];
  }

  const tabList: Omit<Tab, "icon">[] = [{ label: metadata.label, to }];

  let parent = metadata.parent;
  while (parent) {
    const curMetadata = routeMeta[parent];
    if (!curMetadata) {
      break;
    }
    tabList.push({ label: curMetadata.label, to: parent });
    parent = curMetadata.parent;
  }

  return tabList;
};
