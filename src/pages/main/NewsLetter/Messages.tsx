import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MessagesTable from "./components/MessagesTable";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import Icon from "@/components/icons/Icon";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

const data: any[] | [string] = [
  {
    id: "m5gr84i9",
    subject: "Happy Women's Day",
    timeStamp: "21 MAR 24",
    status: "Scheduled",
  },
  {
    id: "3u1reuv4",
    subject: "Happy Women's Day",
    timeStamp: "21 MAR 24",
    status: "Scheduled",
  },
  {
    id: "derv1ws0",
    subject: "Happy Women's Day",
    timeStamp: "21 MAR 24",
    status: "Scheduled",
  },
  {
    id: "5kma53ae",
    subject: "Happy Women's Day",
    timeStamp: "21 MAR 24",
    status: "Scheduled",
  },
  {
    id: "bhqecj4p",
    subject: "Happy Women's Day",
    timeStamp: "21 MAR 24",
    status: "Scheduled",
  },
  {
    id: "6kvk93ae",
    subject: "Happy Women's Day",
    timeStamp: "21 MAR 24",
    status: "Scheduled",
  },
  {
    id: "6kvk93ae",
    subject: "Happy Women's Day",
    timeStamp: "21 MAR 24",
    status: "Scheduled",
  },
  {
    id: "6kvk93ae",
    subject: "Happy Women's Day",
    timeStamp: "21 MAR 24",
    status: "Scheduled",
  },
  {
    id: "6kvk93ae",
    subject: "Happy Women's Day",
    timeStamp: "21 MAR 24",
    status: "Scheduled",
  },
];

export type Message = {
  id: string;
  subject: string;
  timeStamp: string;
  status: string;
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
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subject")}</div>
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
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
export default function Messages() {
  return (
    <div>
      <MessagesTable data={data || []} columns={columns} />
    </div>
  );
}
