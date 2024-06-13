import React from "react";
import { iconsItems } from "./IconsItems";

type IconProps = {
  name: string;
};

export default function Icon({ name }: IconProps) {
  const icon = iconsItems[name];
  if (!icon) return null;
  return <div>{icon} </div>;
}
