import { SideNavItem } from "../../types";
import Icon from "../icons/Icon";
export const TOOLS_ITEMS: SideNavItem[] = [
  {
    title: "News Letter",
    path: "/news-letter",
    icon: <Icon name="newsLetter" />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <Icon name="analytics" />,
  },
  {
    title: "Audit Log",
    path: "/audit-log",
    icon: <Icon name="audit" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Icon name="settings" />,
  },
];
