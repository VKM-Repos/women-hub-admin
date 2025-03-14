import GenericTable from "@/components/shared/table/Table";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserImg from "@/assets/user-img.svg";
import { useGET } from "@/hooks/useGET.hook";
import Loading from "@/components/shared/Loading";
import { formatDate } from "@/lib/utils/dateFormat";

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
    header: () => (<p className="text-sm text-textPrimary font-medium">User Name</p>) ,
    cell: ({ row }) => (
      <div className="capitalize text-sm text-textPrimary flex items-center gap-5">
        <img src={UserImg} alt="" /> {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => (<p className="text-sm text-textPrimary font-medium">Email</p>),
    cell: ({ row }) => (
      <p className="text-textPrimary text-sm">{row.getValue("email")}</p>
    ),
  },
  {
    accessorKey: "suspended",
    header: () => (<p className="text-sm text-textPrimary font-medium">Status</p>),
    cell: ({ row }) => (
      <div className="capitalize">
        <span
          className={`${
            row.getValue("suspended") == false
              ? "bg-[#E3FFF4] text-[#83BF6E]"
              : row.getValue("suspended") == true
              ? "bg-[#FFF2B0] text-[#F7931E]"
              : row.getValue("suspended") == true
              ? "bg-[#FFE7E4] text-[#FF6A55]"
              : ""
          } px-1.5 py-1 rounded-md text-xs`}
        >
          {row.getValue("suspended") ? "Suspend" : "Active"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (<p className="text-sm text-textPrimary font-medium">Join Date</p>),
    cell: ({ row }) => (
      <div className="min-w-[6rem] text-textPrimary text-sm">{formatDate(row.getValue("createdAt"))}</div>
    ),
  },
  {
    accessorKey: "bio",
    header: () => (<p className="text-sm text-textPrimary font-medium">Bio</p>),
    cell: ({ row }) => <div className="truncate text-textPrimary text-sm w-[15.625rem]">{row.getValue("bio") ?? "--"}</div>,
  },

  {
    id: "actions",
    header: () => (<p className="text-sm text-textPrimary font-medium">Action</p>),
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
  const { data: users, isPending } = useGET({
    url: `admin/users`,
    queryKey: ["GET_USERS_LIST"],
  });

  return (
    <div className="cursor-default">
      {isPending ? (
        <Loading />
      ) : (
        <GenericTable columns={columns} data={users?.content || []} />
      )}
    </div>
  );
}
