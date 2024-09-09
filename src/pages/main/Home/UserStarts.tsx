import UsersIcon from "@/assets/icons/users-rounded.svg";
import Organization from "@/assets/icons/organization-rounded.svg";
import Events from "@/assets/icons/events-rounded.svg";
import Project from "@/assets/icons/project-circle.svg";
type userTypes = {
  title: string;
  count: number;
  icon: JSX.Element;
  color: string;
};
export const userStarts: userTypes[] = [
  {
    title: "Users",
    count: 180,
    icon: <img src={UsersIcon} />,
    color: "#B5FFE1",
  },
  {
    title: "Organizations",
    count: 160,
    icon: <img src={Organization} />,
    color: "#F1EAE4",
  },
  {
    title: "Events",
    count: 160,
    icon: <img src={Events} />,
    color: "#DFE2FF",
  },
  {
    title: "Projects",
    count: 260,
    icon: <img src={Project} />,
    color: "#E9FEFF",
  },
];
