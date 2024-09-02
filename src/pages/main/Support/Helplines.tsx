import GenericTable from "@/components/shared/table/HelplineTable";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const data: any[] | [string] = [
  {
    id: "m5gr84i9",
    helpline: "For counselling",
    state: "Oyo",
    status: "Active",
  },
  {
    id: "3u1reuv4",
    helpline: "Sexual Abuse",
    state: "Oyo",
    status: "Suspended",
  },
  {
    id: "derv1ws0",
    helpline: "For counselling",
    state: "Oyo",
    status: "Active",
  },
  {
    id: "5kma53ae",
    helpline: "Sexual Abuse",
    state: "Oyo",
    status: "Suspended",
  },
  {
    id: "bhqecj4p",
    helpline: "For counselling",
    state: "Oyo",
    status: "Active",
  },
  {
    id: "6kvk93ae",
    helpline: "Sexual Abuse",
    state: "Oyo",
    status: "Suspended",
  },
];

export type Help = {
  id: string;
  helpline: string;
  state: string;
  status: "Active" | "Flagged" | "Suspended";
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
    accessorKey: "helpline",
    header: "Helplines",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("helpline")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("state")} state</div>
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
            <div className="flex flex-col gap-2 font-medium font-inter text-sm px-5">
              <p>View</p>
              <p>Edit</p>
              <p>Deactived</p>
              <p>Active</p>
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
      <GenericTable columns={columns} data={data} />
    </div>
  );
}
