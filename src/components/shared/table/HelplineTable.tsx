import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Pagination from "@/pages/main/Support/components/Pagination";

import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GuideHeroSection from "@/pages/main/Support/components/GuideHeroSection";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { Help } from "@/types/hepline.types";

type tableProps = {
  columns: ColumnDef<Help>[];
  data: Help[];
  handlePrevious: () => void;
  handleNext: () => void;
  currentPage: number;
  numberOfElements: number;
  totalElements: number;
};

export default function HelplineTable({
  columns,
  data,
  handlePrevious,
  handleNext,
  currentPage,
  totalElements,
  numberOfElements,
}: tableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getGroupedRowModel: getGroupedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const location = useLocation();
  const guide = location.state?.guide;

  return (
    <div className="mx-10">
      <GuideHeroSection data={guide} />
      <div className="flex items-center justify-between py-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center rounded-lg bg-white px-3 py-1">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 13.4013 20.1536 15.6049 18.7429 17.3287L23 21.5858L21.5858 23L17.3287 18.7429C15.6049 20.1536 13.4013 21 11 21C5.47715 21 1 16.5228 1 11ZM11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3Z"
                  fill="#141B34"
                />
              </svg>
            </span>
            <Input
              placeholder="Search Articles"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full border-none bg-transparent focus:outline-none"
            />
          </div>
          <div>
            <Link
              to={`/support/addHelpline`}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "flex gap-2 text-white rounded-[12px]"
              )}
              state={{
                pageName: "helpline",
                operation: "new",
                details: null,
              }}
            >
              <PlusIcon />
              Add new
            </Link>
          </div>
        </div>
      </div>
      <div className="font-inter rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-4">
                      <span className="text-base">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${index % 2 == 0 ? "bg-[#EAEAEA]" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          currentPage={currentPage}
          numberOfElements={totalElements}
          totalElements={numberOfElements}
        />
      </div>
    </div>
  );
}
