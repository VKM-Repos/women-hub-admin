import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import OrgImg from "@/assets/org-img.svg";
import MembersTable from "@/components/shared/table/MembersTable";
import Loading from "@/components/shared/Loading";
import Icon from "@/components/icons/Icon";
import { useGET } from "@/hooks/useGET.hook";
import { useDELETE } from "@/hooks/useDelete.hook";
import { formatDate } from "@/lib/utils/dateFormat";
import { truncateString } from "@/lib/utils/truncateString";

export type Organisation = {
  id: number;
  name: string;
  email: string;
  logo: string;
  state: string;
  description: string;
  createdAt: string;
};

/**
 * This page previously rendered a hardcoded array of five fake organisations,
 * and its action menu was five plain <p> tags with no handlers at all. It now
 * reads GET /organizations and the Delete action actually calls the API.
 */
export default function Admin() {
  const { data, isPending, refetch } = useGET({
    url: `organizations`,
    queryKey: ["GET_ORGANISATIONS_LIST"],
  });

  const organisations =
    data?.content?.map((org: any) => ({
      id: org?.id,
      name: org?.name,
      email: org?.email,
      logo: org?.logo,
      state: org?.state,
      description: org?.description,
      createdAt: org?.createdAt,
    })) ?? [];

  const export_organisations_endpoint =
    "admin/analytics/export/organizations";

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
      header: () => (
        <p className="text-sm text-textPrimary font-medium">Organisation</p>
      ),
      cell: ({ row }) => {
        const org: any = row.original;
        return (
          <div className="capitalize text-sm text-textPrimary flex items-center gap-3">
            <img
              src={org?.logo || OrgImg}
              onError={(e) => {
                e.currentTarget.src = OrgImg;
              }}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            {row.getValue("name")}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <p className="text-sm text-textPrimary font-medium">Email</p>
      ),
      cell: ({ row }) => (
        <p className="text-textPrimary text-sm">
          {row.getValue("email") ?? "--"}
        </p>
      ),
    },
    {
      accessorKey: "state",
      header: () => (
        <p className="text-sm text-textPrimary font-medium">State</p>
      ),
      cell: ({ row }) => (
        <p className="capitalize text-textPrimary text-sm">
          {row.getValue("state") ?? "--"}
        </p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <p className="text-sm text-textPrimary font-medium">Join Date</p>
      ),
      cell: ({ row }) => (
        <div className="min-w-[6rem] text-textPrimary text-sm">
          {formatDate(row.getValue("createdAt"))}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => (
        <p className="text-sm text-textPrimary font-medium">Description</p>
      ),
      cell: ({ row }) => (
        <div className="truncate text-textPrimary text-sm w-[15.625rem]">
          {truncateString(row.getValue("description"), 40)}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => (
        <p className="text-sm text-textPrimary font-medium">Action</p>
      ),
      enableHiding: false,
      cell: ({ row }) => (
        <ManageOrganisation organisation={row.original} refetch={refetch} />
      ),
    },
  ];

  return (
    <div className="w-full cursor-default">
      {isPending ? (
        <Loading />
      ) : (
        <MembersTable
          columns={columns}
          data={organisations}
          endpoint={export_organisations_endpoint}
        />
      )}
    </div>
  );
}

function ManageOrganisation({
  organisation,
  refetch,
}: {
  organisation: any;
  refetch: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const { mutate: deleteOrganisation, isPending: deleting } = useDELETE(
    `organizations/${organisation?.id}`,
    {
      showSuccessToast: false,
      callback: () => {
        setConfirmingDelete(false);
        refetch();
        toast.success(`${organisation?.name} has been deleted.`);
      },
    }
  );

  const menuItem =
    "flex gap-2 items-center w-full py-1.5 px-1.5 rounded cursor-pointer focus:bg-[#EAEAEA]";

  return (
    <>
      {/* modal={false} — see the note in ManageUser.tsx. */}
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-[11rem] font-inter text-sm font-medium"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuItem
            className={`${menuItem} text-[#FF6A55] focus:text-[#FF6A55]`}
            onSelect={() => {
              setMenuOpen(false);
              // Deferred by a frame so the menu unmounts before the dialog opens.
              setTimeout(() => setConfirmingDelete(true), 0);
            }}
          >
            <Icon name="deletingIcon" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Rendered outside the menu so it survives the menu unmounting. */}
      <Dialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <DialogContent className="w-[33.5rem] flex flex-col gap-12">
          <DialogHeader className="flex flex-col gap-4 items-center">
            <DialogTitle className="text-textPrimary font-bold text-2xl py-3 px-5 w-full text-center">
              You are about to delete {organisation?.name}
              <hr className="w-full mt-2 mb-0" />
            </DialogTitle>
            <DialogDescription className="text-[#515151] font-medium text-sm text-center">
              This permanently removes the organisation from WomenHub. Are you
              sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex !justify-center !items-center !gap-4">
            <Button
              type="button"
              variant="outline"
              className="text-black bg-white h-10 px-5 border border-[#EFEFEF] rounded-lg"
              onClick={() => setConfirmingDelete(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              className="text-white bg-[#FF6A55] hover:bg-[#e85f4b] h-10 px-5 rounded-lg"
              onClick={() => deleteOrganisation({})}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}