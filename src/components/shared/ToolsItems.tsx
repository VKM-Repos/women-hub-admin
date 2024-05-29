import { SideNavItem } from "../../types";

import AnalysisIcon from "@/assets/icons/analysis-icon.svg";
import AuditIcon from "@/assets/icons/audit-icon.svg";
import SettingsIcon from "@/assets/icons/settings-icon.svg";
import LogoutIcon from "@/assets/icons/logout-icon.svg";
export const TOOLS_ITEMS: SideNavItem[] = [
  {
    title: "Analytics",
    path: "/#",
    icon: <img src={AnalysisIcon} />,
  },
  {
    title: "Audit Log",
    path: "/#",
    icon: <img src={AuditIcon} />,
  },
  {
    title: "Settings",
    path: "/#",
    icon: <img src={SettingsIcon} />,
  },
  {
    title: "Logout",
    path: "/#",
    icon: <img src={LogoutIcon} />,
  },
];
