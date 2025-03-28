import MembersTable from "@/components/shared/table/MembersTable";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import UserImg from "@/assets/user-img.svg";
import { useGET } from "@/hooks/useGET.hook";
import Loading from "@/components/shared/Loading";
import { formatDate } from "@/lib/utils/dateFormat";
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


export default function Users() {
  const { data, isPending, refetch } = useGET({
    url: `admin/users`,
    queryKey: ["GET_USERS_LIST"],
  });

  const users = (
    data && 
    data.content?.map((user: any) => ({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      bio: user?.bio,
      createdAt: user?.createdAt,
      active: user?.active,
      suspended: user?.suspended,
    }))
  )

  const export_users_endpoint = 'admin/analytics/export/users';


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
      id: "status",
      header: () => (<p className="text-sm text-textPrimary font-medium">Status</p>),
      cell: ({ row }) => {
        
        const user: any = row.original;
  
        const isSuspended = user?.suspended;
        const isActive = user?.active;
        const isFlagged = user?.flagged;
    
        let statusText = "Active";
        let bgColor = "bg-[#E3FFF4] text-[#83BF6E]";
  
        if (isActive === false) {
          statusText = "Deactivated";
          bgColor = "bg-[#FFE7E4] text-[#FF6A55]"; 
        }
        else if (isFlagged) {
          statusText = "Suspended";
          bgColor = "bg-[#FFE7E4] text-[#FF6A55]"; 
        } 
        else if (isSuspended) {
          statusText = "Flagged";
          bgColor = "bg-[#FFF2B0] text-[#F7931E]"; 
        }
  
        return (
          <div className="capitalize">
            <span className={`${bgColor} px-1.5 py-1 rounded-md text-xs font-semibold`}>
              {statusText}
            </span>
          </div>
        )
      }
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
      cell: ({ row }) => {
        const user = row.original;
        
        return (
          <ManageUser user={user} refetch={refetch}/>
        );
      },
    },
  ];


  return (
    <div className="cursor-default">
      {isPending ? (
        <Loading />
      ) : (
        <MembersTable columns={columns} data={users || []} endpoint={export_users_endpoint}/>
      )}
    </div>
  );
}
