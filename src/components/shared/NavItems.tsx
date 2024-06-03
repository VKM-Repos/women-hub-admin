import { SideNavItem } from "../../types";

import DashboardIcon from "@/assets/icons/dashboard-icon.svg";
import UsersIcon from "@/assets/icons/users-icon.svg";
import PostIcon from "@/assets/icons/post-icon.svg";
import Circle from "@/assets/icons/circle.svg";
export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/home",
    icon: <img src={DashboardIcon} className="z-30" />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <img src={UsersIcon} />,
    submenu: true,
    subMenuItems: [
      { title: "Users", icon: <img src={Circle} />, path: "/users" },
      {
        title: "Administrators",
        icon: <img src={Circle} className="z-50" />,
        path: "/projects/web-design",
      },
      {
        title: "Editors",
        icon: <img src={Circle} />,
        path: "/projects/graphic-design",
      },
    ],
  },
  {
    title: "Posts",
    path: "/posts",
    icon: <img src={PostIcon} />,
  },
];
