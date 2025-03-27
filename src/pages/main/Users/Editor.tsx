import MembersTable from "@/components/shared/table/Table";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";


import UserImg from "@/assets/user-img.svg";
import { useGET } from "@/hooks/useGET.hook";
import Loading from "@/components/shared/Loading";
import { formatDate } from "@/lib/utils/dateFormat";
import { truncateString } from "@/lib/utils/truncateString";
import ManageUser from "./components/ManageUser";

export type User = {
  id: string;
  image: string;
  name: string;
  email: string;
  status: "Active" | "Flagged" | "Suspended";
  joined: string;
  bio: string;
};


export default function Editor() {
  const { data: editors, refetch, isPending } = useGET({
    url: `admin/users/editors`,
    queryKey: ["GET_EDITORS_LIST"],
    withAuth: true,
    enabled: true,
  });

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
      accessorKey: "suspended",
      header: "Status",
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
      header: "Join date",
      cell: ({ row }) => (
        <div className="capitalize">{formatDate(row.getValue("createdAt"))}</div>
      ),
    },
    {
      accessorKey: "bio",
      header: "Bio",
      cell: ({ row }) => (
        <div className="capitalize">
          {truncateString(row.getValue("bio"), 30)}
        </div>
      ),
    },
  
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        const editor = row.original;

        return (
          <ManageUser user={editor} refetch={refetch} />
        );
      },
    },
  ];


  return (
    <div className="">
      {isPending ? (
        <Loading />
      ) : (
        <MembersTable columns={columns} data={editors?.content || []} />
      )}
    </div>
  );
}
