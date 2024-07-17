import { iconsItems } from "./IconsItems";

type IconProps = {
  name: string | any;
};

export default function Icon({ name }: IconProps) {
  const icon: string = iconsItems[name as keyof typeof iconsItems];
  if (!icon) return null;
  return <div>{icon} </div>;
}
