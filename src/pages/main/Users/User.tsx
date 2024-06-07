import GenericTable from "@/components/shared/table/Table";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserImg from "@/assets/user-img.svg";

const data: User[] = [
  {
    id: "m5gr84i9",
    name: "Salis Sadiq",
    image: UserImg,
    email: "ken99@yahoo.com",
    status: "Active",
    joined: "21 MAR 24",
    bio: "The variance of being t..",
  },
  {
    id: "3u1reuv4",
    name: "Akanbi Kanyinsola",
    image: UserImg,
    email: "Abe45@gmail.com",
    status: "Active",
    joined: "21 MAR 24",
    bio: "-----",
  },
  {
    id: "derv1ws0",
    name: "Mustapha Omotosho",
    image: UserImg,
    email: "Monserrat44@gmail.com",
    status: "Flagged",
    joined: "21 MAR 24",
    bio: "A demanding life..Bio",
  },
  {
    id: "5kma53ae",
    name: "Damilola Victor",
    image: UserImg,
    email: "Silas22@gmail.com",
    status: "Suspended",
    joined: "21 MAR 24",
    bio: "Massive work fro the things in ..",
  },
  {
    id: "bhqecj4p",
    name: "Olumide balogun",
    image: UserImg,
    email: "carmella@hotmail.com",
    status: "Active",
    joined: "21 MAR 24",
    bio: "The though of difficult geno,..",
  },
];

export type User = {
  id: string;
  image: string;
  name: string;
  email: string;
  status: "Active" | "Flagged" | "Suspended";
  joined: string;
  bio: string;
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
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-5">
        <img src={UserImg} alt="" /> {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        <span
          className={`${
            row.getValue("status") == "Active"
              ? "bg-[#E3FFF4] text-[#83BF6E]"
              : row.getValue("status") == "Flagged"
              ? "bg-[#FFF2B0] text-[#F7931E]"
              : row.getValue("status") == "Suspended"
              ? "bg-[#FFE7E4] text-[#FF6A55]"
              : ""
          } px-1.5 py-1 rounded-md text-xs`}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "joined",
    header: "Join date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("joined")}</div>
    ),
  },
  {
    accessorKey: "bio",
    header: "Bio",
    cell: ({ row }) => <div className="capitalize">{row.getValue("bio")}</div>,
  },

  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex flex-col gap-2 font-medium font-inter text-sm px-5">
              <p>View</p>
              <p>Edit</p>
              <p>Flag</p>
              <p>Suspend</p>
              <p>Active</p>
              <p>Delete</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export default function Users() {
  return (
    <div className="w-full">
      <GenericTable columns={columns} data={data} />
    </div>
  );
}
