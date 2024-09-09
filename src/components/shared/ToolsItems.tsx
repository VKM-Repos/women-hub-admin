import { SideNavItem } from "../../types";
import Icon from "../icons/Icon";
import Circle from "@/assets/icons/circle.svg";
export const TOOLS_ITEMS: SideNavItem[] = [
  {
    title: "Newsletter",
    path: "/newsletter",
    icon: <Icon name="newsLetter" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Subscribers",
        icon: <img src={Circle} className="z-50" />,
        path: "/subscribers",
      },
      {
        title: "Messages",
        icon: <img src={Circle} />,
        path: "/messages",
      },
    ],
    access: ["EDITOR"],
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
    access: ["EDITOR"],
  },
];
