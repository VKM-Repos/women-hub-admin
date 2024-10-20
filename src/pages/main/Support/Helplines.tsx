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
import { useEffect, useState } from "react";
import Loading from "@/components/shared/Loading";
import { useGET } from "@/hooks/useGET.hook";
import { API_BASE_URLS } from "@/config/api.config";
import { Link } from "react-router-dom";
// import { helpData } from "./mockupData/helpline-mockup-data";
import { Help } from "@/types/hepline.types";
import Icon from "@/components/icons/Icon";
import toast from "react-hot-toast";
import { usePATCH } from "@/hooks/usePATCH.hook";
import { useNavigate } from "react-router-dom";
import { useDELETE } from "@/hooks/useDelete.hook";

// type helpType = {
//   id: string;
//   name: string;
//   phone: string;
//   state: string;
//   status: string;
// };
// const columns: ColumnDef<helpType>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//         className="text-white"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//         className="text-white"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "helpline",
//     header: "Helplines",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("helpline")}</div>
//     ),
//   },
//   {
//     accessorKey: "state",
//     header: "State",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("state")} state</div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">
//         <span
//           className={`${
//             row.getValue("status") == "Active"
//               ? "bg-[#E3FFF4] text-[#83BF6E]"
//               : row.getValue("status") == "Flagged"
//               ? "bg-[#FFF2B0] text-[#F7931E]"
//               : row.getValue("status") == "Suspended"
//               ? "bg-[#FFE7E4] text-[#FF6A55]"
//               : ""
//           } px-1.5 py-1 rounded-md text-xs`}
//         >
//           {row.getValue("status")}
//         </span>
//       </div>
//     ),
//   },

//   {
//     id: "actions",
//     header: "Action",
//     enableHiding: false,
//     cell: ({ row }) => {
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <div className="flex flex-col gap-2 font-medium font-inter text-sm px-5">
//               <p>View</p>
//               <p>
//                 <Link to={`/support/guide/${row.original.id}`}>Edit</Link>
//               </p>
//               <p>Deactived</p>
//               <p>Active</p>
//             </div>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

export default function Helplines() {
  const navigate = useNavigate();
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // State for search term and pagination
  const [searchTerm] = useState<string>(""); // Destructuring state and setter
  const [currentPage, setCurrentPage] = useState<number>(0); // For pagination
  const [pageSize] = useState<number>(10); // Static page size

  const [id, setId] = useState<{ id: string }>();

  const { mutate: changeHelpline } = usePATCH(`helplines/${id}`, {
    baseURL: API_BASE_URLS.supportServive,
    method: "PATCH",
    callback: (variables: any) => {
      const status = variables.status; // Get the status from the submitted data

      // Dynamically set the toast message based on the status
      if (status === "Active") {
        toast.success("Heelpline has been Activated");
      } else if (status === "Inactive") {
        toast.success("Helpline has been Deactivated");
      }

      setTimeout(() => {
        navigate(0);
      }, 1000);
    },
  });

  const { mutate: deleteHelpline } = useDELETE(`helplines/${id}`, {
    baseURL: API_BASE_URLS.supportServive,
    callback: () => {
      toast.success("Helpline has been deleted.");
      setTimeout(() => {
        navigate(0);
      }, 2000);
    },
  });

  const handleActivateHelpline = (row: any) => {
    try {
      row.original.status = "Active";
      setId(row.original.id); // Modify status
      changeHelpline(row.original); // Trigger the mutation
    } catch (error) {
      console.error("Error Activating Helpline:", error);
      toast.error("Error Activating Helpline.");
    }
  };

  const handleDeactivateHelpline = (row: any) => {
    try {
      row.original.status = "Inactive"; // Modify status
      setId(row.original.id);
      changeHelpline(row.original); // Trigger the mutation for deactivation
    } catch (error) {
      console.error("Error Deactivating Helpline:", error);
      toast.error("Error Deactivating Helpline.");
    }
  };

  const handleDeleteHelpline = (row: any) => {
    // console.log(row);
    try {
      setId(row.original.id);
      // let faq_id: row.original.id
      // let formData = {
      //   faq_id: row.original.id,
      //   // created_at: row.original.created_at,
      //   // name: row.original.name,
      //   // phone: row.original.phone,
      //   // state_id: row.original.state_id,
      //   // status: row.original.status,
      //   // updated_at: row.original.updated_at,
      // };
      deleteHelpline({ faq_id: row.original.id });
    } catch (error) {
      console.error("Error Deactivating Helpline:", error);
      toast.error("Error Deactivating Helpline.");
    }
  };

  const columns: ColumnDef<Help>[] = [
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
      header: "Helplines",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "state_id",
      header: "State",
      cell: ({ row }) => {
        const stateId = row.getValue("state_id");
        return (
          <div className="capitalize">
            {typeof stateId === "string"
              ? stateId.charAt(0).toUpperCase() +
                stateId.slice(1).toLowerCase() +
                " state"
              : "Unknown State"}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          <span
            className={`${
              row.getValue("status") === "Active"
                ? "bg-[#E3FFF4] text-[#83BF6E]"
                : "bg-[#FFE7E4] text-[#FF6A55]"
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

      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex flex-col gap-2 font-medium font-inter text-sm px-2">
                <Link
                  to={`/support/helpline/${row.original.id}`}
                  state={{
                    pageName: "helpline",
                    operation: "Edit",
                    details: row.original,
                  }}
                >
                  <div className="flex flex-row items-center">
                    <div className="mr-2">
                      <Icon name="editIcon" />
                    </div>
                    <span>Edit</span>
                  </div>
                </Link>

                {row.original.status == "Active" ? (
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleDeactivateHelpline(row)}
                  >
                    <div className="mr-2">
                      <Icon name="deactivateIcon" />
                    </div>
                    <span>Inactive</span>
                  </div>
                ) : (
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleActivateHelpline(row)}
                  >
                    <div className="mr-2">
                      <Icon name="activateIcon" />
                    </div>
                    <span>Activate</span>
                  </div>
                )}

                <div
                  className="flex flex-row items-center cursor-pointer"
                  onClick={() => handleDeleteHelpline(row)}
                >
                  <div className="mr-2">
                    <Icon name="deletingIcon" />
                  </div>
                  <span>Delete</span>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Construct the URL based on pagination and search term
  const apiUrl = searchTerm
    ? `helplines/search?title=${searchTerm}&page=${currentPage}&size=${pageSize}`
    : `helplines?page=${currentPage}&size=${pageSize}`;

  // Fetching helplines data using the GET request hook
  const {
    data: helplines,
    isLoading,
    refetch,
    isRefetching,
  } = useGET({
    url: apiUrl,
    queryKey: [
      searchTerm ? "Helplines-search" : "Helplines",
      searchTerm,
      currentPage,
    ],
    baseURL: API_BASE_URLS.supportServive,
    withAuth: true,
    enabled: true,
  });

  // Log fetched data to the console for debugging
  useEffect(() => {
    console.log("Fetched Helplines:", helplines);
  }, [helplines]);

  // Refetch data when searchTerm or currentPage changes
  useEffect(() => {
    refetch();
  }, [searchTerm, currentPage, refetch]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (
      helplines?.totalElements &&
      currentPage < helplines.totalElements / pageSize - 1
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // const test: Help[] = helpData;

  // const test: helpType[] = [
  //   {
  //     id: "m5gr84i9",
  //     name: "For counselling",
  //     state: "Oyo",
  //     status: "Active",
  //   },
  //   {
  //     id: "3u1reuv4",
  //     name: "Sexual Abuse",
  //     state: "Oyo",
  //     status: "Suspended",
  //   },
  // ];
  return (
    <div className="w-full">
      {isLoading || isRefetching ? (
        <Loading />
      ) : (
        <GenericTable
          columns={columns}
          data={helplines || []}
          handlePrevious={handlePreviousPage}
          handleNext={handleNextPage}
          currentPage={currentPage + 1}
          numberOfElements={helplines?.numberOfElements ?? 0}
          totalElements={helplines?.totalElements ?? 0}
        />
      )}
      {/* <GenericTable
        columns={columns}
        data={test}
        handlePrevious={handlePreviousPage}
        handleNext={handleNextPage}
        currentPage={currentPage + 1}
        numberOfElements={helplines?.numberOfElements ?? 0}
        totalElements={helplines?.totalElements ?? 0}
      /> */}
    </div>
  );
}
