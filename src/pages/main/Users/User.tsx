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

const data: object[] = [
  {
    id: "m5gr84i9",
    name: "Salis Sadiq",
    email: "ken99@yahoo.com",
    status: "Active",
    joined: "21 MAR 24",
    bio: "The variance of being t..",
  },
  {
    id: "3u1reuv4",
    name: "Akanbi Kanyinsola",
    email: "Abe45@gmail.com",
    status: "Active",
    joined: "21 MAR 24",
    bio: "-----",
  },
  {
    id: "derv1ws0",
    name: "Mustapha Omotosho",
    email: "Monserrat44@gmail.com",
    status: "Flagged",
    joined: "21 MAR 24",
    bio: "A demanding life..Bio",
  },
  {
    id: "5kma53ae",
    name: "Damilola Victor",
    email: "Silas22@gmail.com",
    status: "Suspended",
    joined: "21 MAR 24",
    bio: "Massive work fro the things in ..",
  },
  {
    id: "bhqecj4p",
    name: "Olumide balogun",
    email: "carmella@hotmail.com",
    status: "Active",
    joined: "21 MAR 24",
    bio: "The though of difficult geno,..",
  },
];

export type User = {
  id: string;
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
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
