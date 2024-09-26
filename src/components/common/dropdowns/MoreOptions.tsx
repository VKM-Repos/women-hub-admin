"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MoreHorizontalIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export type MenuItem = {
  title: string;
  icon?: React.ReactNode;
  link?: string;
  isButton?: boolean;
  condition?: boolean;
  onClick?: (e: any) => void;
};

type Props = {
  menu: MenuItem[];
  label?: React.ReactNode;
};

const MoreOptions: React.FC<Props> = ({ menu, label = "options" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="hover:bg-primary/20 relative flex aspect-square w-12 items-center justify-center rounded-full">
                <MoreHorizontalIcon />
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="text-black bg-white shadow-sm  border text-xs"
            >
              {label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-white absolute top-[0px] right-7 w-48 overflow-hidden rounded shadow-md p-0"
      >
        <ul className=" text-gray-200 flex flex-col items-start justify-center gap-0 p-0">
          {menu.map((item, index) => {
            if (item.condition === false) return null;
            return (
              <React.Fragment key={index}>
                {item.isButton ? (
                  <>
                    <li className="flex w-full items-center justify-start gap-2 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          item.onClick && item.onClick(e);
                          setIsOpen(false);
                        }}
                        className="w-full  text-black hover:text-white relative bg-none hover:bg-blue-600 p-2 flex cursor-pointer gap-4 text-sm transition duration-300 ease-in-out hover:no-underline"
                      >
                        {item.icon}
                        {item.title}
                      </button>
                    </li>
                    {index !== menu.length - 1 && (
                      <Separator className="bg-gray-300 w-full h-[1px]" />
                    )}
                  </>
                ) : (
                  <>
                    <li className="flex w-full items-center justify-start whitespace-nowrap">
                      <NavLink
                        to={item.link || ""}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          " w-full  text-black hover:text-white relative bg-none hover:bg-blue-600 p-2 flex gap-4 text-sm transition duration-300 ease-in-out hover:no-underline"
                        )}
                      >
                        {item.icon}
                        {item.title}
                      </NavLink>
                    </li>
                    {index !== menu.length - 1 && <Separator />}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MoreOptions;
