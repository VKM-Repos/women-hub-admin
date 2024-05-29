import { SideNavItem } from "../../types";

import DashboardIcon from "@/assets/icons/dashboard-icon.svg";
import UsersIcon from "@/assets/icons/users-icon.svg";
import PostIcon from "@/assets/icons/post-icon.svg";
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
      { title: "Users", path: "/users" },
      { title: "Administrators", path: "/projects/web-design" },
      { title: "Editors", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "Posts",
    path: "/posts",
    icon: <img src={PostIcon} />,
  },
];
