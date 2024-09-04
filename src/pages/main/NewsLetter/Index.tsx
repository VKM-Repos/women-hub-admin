import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NewsLetterTable from "./components/NewsLetterTable";
import Icon from "@/components/icons/Icon";

const data: any[] | [string] = [
  {
    id: "m5gr84i9",
    name: "Salis Sadiq",
    email: "salissadiq@gmail.com",
    timeStamp: "21 MAR 24",
    userType: "Guest",
    tags: ["Guest", "News subscriber"],
  },
  {
    id: "3u1reuv4",
    name: "Salis Sadiq",
    email: "salissadiq@gmail.com",
    timeStamp: "21 MAR 24",
    userType: "Guest",
    tags: ["Guest", "News subscriber"],
  },
  {
    id: "derv1ws0",
    name: "Salis Sadiq",
    email: "salissadiq@gmail.com",
    timeStamp: "21 MAR 24",
    userType: "Guest",
    tags: ["Guest", "News subscriber"],
  },
  {
    id: "5kma53ae",
    name: "Salis Sadiq",
    email: "salissadiq@gmail.com",
    timeStamp: "21 MAR 24",
    userType: "Guest",
    tags: ["Guest", "News subscriber"],
  },
  {
    id: "bhqecj4p",
    name: "Salis Sadiq",
    email: "salissadiq@gmail.com",
    timeStamp: "21 MAR 24",
    userType: "Guest",
    tags: ["Guest", "News subscriber"],
  },
  {
    id: "6kvk93ae",
    name: "Salis Sadiq",
    email: "salissadiq@gmail.com",
    timeStamp: "21 MAR 24",
    userType: "Guest",
    tags: ["Guest", "News subscriber"],
  },
];

export type Help = {
  id: string;
  name: string;
  email: string;
  timeStamp: string;
  userType: string;
  tags: [string];
};

const columns: ColumnDef<string>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="text-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="text-white"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "timeStamp",
    header: "Timestamp",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("timeStamp")}</div>
    ),
  },
  {
    accessorKey: "userType",
    header: "User Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userType")}</div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags: [] = row.getValue("tags");
      return (
        <div className="capitalize flex gap-2">
          {tags.map((tag) => (
            <span className="inline-block bg-[#EFCBAB] rounded-full px-3 py-1 text-xs text-[#106840] ">
              {tag}
            </span>
          ))}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex flex-col gap-2 font-inter text-sm px-1 text-[10px]">
              <span className="flex items-center gap-3 cursor-pointer hover:bg-blue-500 hover:text-white px-5 py-2 rounded-md">
                <Icon name="send" /> Add or remove Tag
              </span>
              <hr className="m-0" />
              <span className="flex items-center gap-3 cursor-pointer hover:bg-blue-500 hover:text-white px-5 py-2 rounded-md">
                {" "}
                <Icon name="deleteDark" /> Delete
              </span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export default function Helplines() {
  return (
    <div className="w-full">
      <NewsLetterTable data={data} columns={columns} />
    </div>
  );
}
