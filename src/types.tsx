export type SideNavItem = {
  title: string;
  path: string | any;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
