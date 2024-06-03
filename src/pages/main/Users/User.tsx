import GenericTable from "@/components/shared/table/Table";
import { createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

type Person = {
  checked: JSX.Element | string;
  username: string;
  email: string;
  status: string;
  joinDate: string;
  bio: string;
  action: JSX.Element;
};

const defaultData: Person[] = [
  {
    checked: <Checkbox />,
    username: "Salis Sadiq",
    email: "salscodes@gmail.com",
    status: "Active",
    joinDate: "21 MAR 24",
    bio: "In Relationship",
    action: <></>,
  },
  {
    checked: <Checkbox />,
    username: "Mustapha Alani",
    email: "musteecool@gmail.com",
    status: "Flagged",
    joinDate: "21 MAR 24",
    bio: "Married",
    action: <></>,
  },
  {
    checked: <></>,
    username: "Akonbi Kanyinsola",
    email: "akonbi@gmail.com",
    status: "Active",
    joinDate: "21 MAR 24",
    bio: "In Relationship",
    action: <></>,
  },
];
const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor(" ", {
    cell: () => (
      <span>
        <Checkbox />
      </span>
    ),
  }),
  columnHelper.accessor("username", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.email, {
    id: "email",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Email</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("joinDate", {
    header: () => <span>Join date</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("bio", {
    header: "Bio",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("action", {
    cell: () => <span>...</span>,
  }),
];
export default function Users() {
  return (
    <div className="w-full">
      <GenericTable columns={columns} data={defaultData} />
    </div>
  );
}
