import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";


export function sysActivityFormatDate(isoString: string) {
  const date = new Date(isoString);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  
  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  
  return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
}

export const columns: ColumnDef<string>[] = [
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
        accessorKey: 'timestamp',
        header: () => <p>Timestamp</p>,
        cell: ({ row }) => <p>{sysActivityFormatDate(row.getValue('timestamp'))}</p>
    },
    {
        accessorKey: 'activity',
        header: () => <p>Action Type</p>,
        cell: ({ row }) => <p>{row.getValue('activity')}</p>
    },
    {
        accessorKey: 'user',
        header: () => <p>Performed by</p>,
        cell: ({ row }) => <p>{row.getValue('user')}</p>
    },
    {
        accessorKey: 'entityId',
        header: () => <p>Object ID</p>,
        cell: ({ row }) => <p>{row.getValue('entityId')}</p>
    },
    {
      id: "actions",
      header: () => (<p className="text-sm text-textPrimary font-medium">Action</p>),
      enableHiding: false,
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Button className='gap-2'>
                <Icon name='send'></Icon>
                View Details
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
]