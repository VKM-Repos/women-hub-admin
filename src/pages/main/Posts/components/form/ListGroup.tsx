import { AlignCenter, AlignJustify, AlignLeft, AlignRight, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";

export type MenuItem = {
  title: string;
  icon?: React.ReactNode;
  link?: string;
  isButton?: boolean;
  condition?: boolean;
  onClick?: (e: any) => void;
};

type Props = {
  editor: Editor
}

const menu: MenuItem[] = [
  {
    title: "Bullet List",
    isButton: true,
    icon: <List className="h-5 w-5" />,
    onClick: (editor: Editor | null) => {
        editor?.chain().focus().toggleBulletList().run();
    },
  },
  {
    title: "Ordered List",
    isButton: true,
    icon: <ListOrdered className="h-5 w-5" />,
    onClick: (editor: Editor | null) => {
        editor?.chain().focus().toggleOrderedList().run();
    },
  },
  
];

export function ListGroup({editor} : Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="border-none" asChild>
        <Button className="flex gap-2 items-center justify-center w-[40px] p-0" variant="outline">
          <Toggle size='sm' aria-label="Toggle link" pressed={editor?.isActive("bulletList" || "orderedList")}>
            {selectedItem?.icon || <List className="h-5 w-5" />}
          </Toggle>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <div className="flex flex-col mt-4">
          {menu.map((item, index) => {
            if (item.condition === false) return null;
            return (
              <React.Fragment key={index}>
                {item.isButton && (
                  <>
                    <li className="flex w-full items-center justify-start gap-2 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          item.onClick && item.onClick(editor);
                          setSelectedItem(item);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-2 text-txtColor hover:text-white relative bg-none hover:bg-blue-600 p-2 cursor-pointer text-xs rounded-sm transition duration-300 ease-in-out hover:no-underline"
                      >
                        {item.icon}
                        {item.title}
                      </button>
                    </li>
                    {index !== menu.length - 1 && (
                      <Separator className="bg-gray-300 w-full h-[1px]" />
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
