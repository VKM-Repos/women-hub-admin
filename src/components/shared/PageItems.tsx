import { SideNavItem } from "../../types";

import PageIcon from "@/assets/icons/page-icon.svg";
export const PAGE_ITEMS: SideNavItem[] = [
  {
    title: "Landing Page",
    path: "/home",
    icon: <img src={PageIcon} className="z-50" />,
  },
  {
    title: "Category",
    path: "/#",
    icon: <img src={PageIcon} />,
  },
  {
    title: "Event",
    path: "/#",
    icon: <img src={PageIcon} />,
  },
  {
    title: "Discussion",
    path: "/#",
    icon: <img src={PageIcon} />,
  },
  {
    title: "Support",
    path: "/#",
    icon: <img src={PageIcon} />,
  },
];
