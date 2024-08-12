import { SideNavItem } from "../../types";

import Circle from "@/assets/icons/circle.svg";
import Icon from "../icons/Icon";
export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/home",
    icon: <Icon name="dashboard" />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <Icon name="users" />,
    submenu: true,
    subMenuItems: [
      { title: "Users", icon: <img src={Circle} />, path: "/users" },
      {
        title: "Administrators",
        icon: <img src={Circle} className="z-50" />,
        path: "/administrators",
      },
      {
        title: "Editors",
        icon: <img src={Circle} />,
        path: "/editors",
      },
    ],
  },
  {
    title: "Posts",
    path: "/posts",
    icon: <Icon name="posts" />,
  },
];
