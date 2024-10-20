import { SideNavItem } from "../../types";

import Circle from "@/assets/icons/circle.svg";
import Icon from "../icons/Icon";
export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Icon name="dashboard" />,
    access: ["SUPER_ADMIN", "EDITOR"],
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
    access: ["SUPER_ADMIN"],
  },
  {
    title: "Posts",
    path: "/posts",
    icon: <Icon name="posts" />,
    access: ["SUPER_ADMIN", "EDITOR"],
  },
];
