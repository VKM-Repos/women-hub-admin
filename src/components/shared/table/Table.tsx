"use client";

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

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Tag from "@/components/dashboard/Tag";
import { Checkbox } from "@/components/ui/checkbox";

type tableProps = {
  columns: ColumnDef<string>[];
  data: [] | string[];
};

export default function DataTable({ columns, data }: tableProps) {
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

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Button className="text-white bg-secondary h-12 w-[150px] flex items-center gap-2">
          <span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2.75C12.6904 2.75 13.25 3.30964 13.25 4V10.75H20C20.6904 10.75 21.25 11.3096 21.25 12C21.25 12.6904 20.6904 13.25 20 13.25H13.25V20C13.25 20.6904 12.6904 21.25 12 21.25C11.3096 21.25 10.75 20.6904 10.75 20V13.25H4C3.30964 13.25 2.75 12.6904 2.75 12C2.75 11.3096 3.30964 10.75 4 10.75H10.75V4C10.75 3.30964 11.3096 2.75 12 2.75Z"
                fill="#F2F2F2"
              />
            </svg>
          </span>
          Add New User
        </Button>

        <div className="flex items-center gap-5">
          <div className="flex items-center bg-white py-1 px-3 rounded-md w-[500px]">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 13.4013 20.1536 15.6049 18.7429 17.3287L23 21.5858L21.5858 23L17.3287 18.7429C15.6049 20.1536 13.4013 21 11 21C5.47715 21 1 16.5228 1 11ZM11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3Z"
                  fill="#141B34"
                />
              </svg>
            </span>
            <Input
              placeholder="Search users"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm border-0"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-12 flex items-center gap-2"
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 22C6.94772 22 6.5 21.5523 6.5 21V18C6.5 17.4477 6.94772 17 7.5 17C8.05228 17 8.5 17.4477 8.5 18V21C8.5 21.5523 8.05228 22 7.5 22Z"
                    fill="#F2F2F2"
                  />
                  <path
                    opacity="0.4"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5 22C16.9477 22 16.5 21.5523 16.5 21V15C16.5 14.4477 16.9477 14 17.5 14C18.0523 14 18.5 14.4477 18.5 15V21C18.5 21.5523 18.0523 22 17.5 22Z"
                    fill="#141B34"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5 7C16.9477 7 16.5 6.55228 16.5 6V3C16.5 2.44772 16.9477 2 17.5 2C18.0523 2 18.5 2.44772 18.5 3V6C18.5 6.55228 18.0523 7 17.5 7Z"
                    fill="#141B34"
                  />
                  <path
                    opacity="0.4"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 10C6.94772 10 6.5 9.55228 6.5 9V3C6.5 2.44772 6.94772 2 7.5 2C8.05229 2 8.5 2.44772 8.5 3V9C8.5 9.55228 8.05228 10 7.5 10Z"
                    fill="#141B34"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.47475 11.25H7.52525C7.96972 11.25 8.34075 11.25 8.64537 11.2708C8.96247 11.2924 9.26199 11.339 9.55238 11.4593C10.2262 11.7384 10.7616 12.2738 11.0407 12.9476C11.161 13.238 11.2076 13.5375 11.2292 13.8546C11.25 14.1592 11.25 14.5303 11.25 14.9747V15.0253C11.25 15.4697 11.25 15.8408 11.2292 16.1454C11.2076 16.4625 11.161 16.762 11.0407 17.0524C10.7616 17.7262 10.2262 18.2616 9.55238 18.5407C9.26199 18.661 8.96247 18.7076 8.64537 18.7292C8.34075 18.75 7.96972 18.75 7.52526 18.75H7.47474C7.03028 18.75 6.65925 18.75 6.35464 18.7292C6.03754 18.7076 5.73801 18.661 5.44762 18.5407C4.77379 18.2616 4.23844 17.7262 3.95933 17.0524C3.83905 16.762 3.79241 16.4625 3.77077 16.1454C3.74999 15.8408 3.74999 15.4697 3.75 15.0253V14.9747C3.74999 14.5303 3.74999 14.1592 3.77077 13.8546C3.79241 13.5375 3.83905 13.238 3.95933 12.9476C4.23844 12.2738 4.77379 11.7384 5.44762 11.4593C5.73801 11.339 6.03754 11.2924 6.35464 11.2708C6.65925 11.25 7.03029 11.25 7.47475 11.25Z"
                    fill="#141B34"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.4747 5.25H17.5253C17.9697 5.24999 18.3408 5.24999 18.6454 5.27077C18.9625 5.29241 19.262 5.33905 19.5524 5.45933C20.2262 5.73844 20.7616 6.27379 21.0407 6.94762C21.161 7.23801 21.2076 7.53754 21.2292 7.85464C21.25 8.15925 21.25 8.53028 21.25 8.97474V9.02526C21.25 9.46972 21.25 9.84075 21.2292 10.1454C21.2076 10.4625 21.161 10.762 21.0407 11.0524C20.7616 11.7262 20.2262 12.2616 19.5524 12.5407C19.262 12.661 18.9625 12.7076 18.6454 12.7292C18.3408 12.75 17.9697 12.75 17.5253 12.75H17.4747C17.0303 12.75 16.6592 12.75 16.3546 12.7292C16.0375 12.7076 15.738 12.661 15.4476 12.5407C14.7738 12.2616 14.2384 11.7262 13.9593 11.0524C13.839 10.762 13.7924 10.4625 13.7708 10.1454C13.75 9.84075 13.75 9.46971 13.75 9.02525V8.97475C13.75 8.53029 13.75 8.15925 13.7708 7.85464C13.7924 7.53754 13.839 7.23801 13.9593 6.94762C14.2384 6.27379 14.7738 5.73844 15.4476 5.45933C15.738 5.33905 16.0375 5.29241 16.3546 5.27077C16.6592 5.24999 17.0303 5.24999 17.4747 5.25Z"
                    fill="#141B34"
                  />
                </svg>
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-5">
                <div>
                  <Tag title="Showing 10 of 32 Users" />
                  <hr className="mt-4 mb-6" />
                </div>
                <span className="text-txtColor text-sm">Showing</span>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <div className="w-[300px] my-3">
                        <div className="flex justify-between">
                          <span className="font-semibold capitalize">
                            {column.id}
                          </span>

                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value: boolean) =>
                              column.toggleVisibility(!!value)
                            }
                          ></DropdownMenuCheckboxItem>
                        </div>
                      </div>
                    );
                  })}
                <div className="flex justify-end gap-3 mt-10 mb-3">
                  <Button className="bg-white" variant="outline">
                    Reset
                  </Button>
                  <Button className="bg-secondary text-white">Apply</Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-12 flex items-center gap-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M12.1002 3.24076C8.49822 1.40591 5.58745 2.46876 4.09632 3.62736C3.87973 3.79513 3.6094 4.00454 3.43035 4.3704C3.25014 4.73864 3.25117 5.09828 3.25209 5.42129L3.25196 20.7505C3.25196 21.3028 3.69967 21.7505 4.25196 21.7505C4.80424 21.7505 5.25196 21.3028 5.25196 20.7505V14.9583C5.25196 14.7996 5.25196 14.7202 5.29173 14.6509C5.33151 14.5815 5.3946 14.5446 5.52077 14.4708C6.73973 13.758 8.81235 13.2493 11.4194 14.5773C15.1343 16.4697 18.3475 15.704 19.9317 14.838C20.0889 14.7538 20.3982 14.5879 20.5774 14.2858C20.7579 13.9815 20.7542 13.5956 20.7522 13.4013V5.83419C20.7523 5.45456 20.7523 5.10916 20.7231 4.84205C20.697 4.60284 20.6287 4.1657 20.2589 3.88447C20.0507 3.72616 19.8223 3.68039 19.6489 3.67004C19.4783 3.65985 19.307 3.68077 19.1552 3.70766C18.864 3.75922 18.4521 3.87345 18.022 3.99272C16.605 4.38564 14.5022 4.46434 12.1002 3.24076Z"
                    fill="#393939"
                  />
                  <path
                    d="M4.09632 3.62544C3.87973 3.7932 3.6094 4.00262 3.43035 4.36847C3.25014 4.73671 3.25117 5.09636 3.25209 5.41937L3.25196 20.7486C3.25196 21.3008 3.69967 21.7486 4.25196 21.7486C4.80424 21.7486 5.25196 21.3008 5.25196 20.7486V14.9564C5.25196 14.8945 5.25196 14.8446 5.25432 14.8027C5.2791 14.3629 5.29149 14.1429 5.29161 14.1387C5.29171 14.1352 5.29173 14.5449 5.29173 14.5449V14.489V2.89844C4.82857 3.11559 4.42744 3.36816 4.09632 3.62544Z"
                    fill="#141B34"
                  />
                </svg>
                Flag
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-5">
                <div>
                  <Tag title="Flag User" />
                  <hr className="mt-4 mb-6" />
                </div>
                <p className="text-txtColor text-base font-semibold">
                  Reason(s)
                </p>
                <p className="text-txtColor text-sm">
                  You can select atmost 2 reasons
                </p>
                <div className="flex flex-col gap-3 w-[300px] mt-5">
                  <div className="flex justify-between items-center">
                    Inappropriate Language <Checkbox></Checkbox>{" "}
                  </div>
                  <div className="flex justify-between items-center">
                    Inappropriate Content <Checkbox></Checkbox>{" "}
                  </div>
                  <div className="flex justify-between items-center">
                    Spam <Checkbox></Checkbox>{" "}
                  </div>
                  <div className="flex justify-between items-center">
                    Misleading information <Checkbox></Checkbox>{" "}
                  </div>
                  <div className="flex justify-between items-center">
                    Other <Checkbox></Checkbox>{" "}
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-10 mb-3">
                  <Button className="bg-white" variant="outline">
                    Reset
                  </Button>
                  <Button className="bg-secondary text-white">Apply</Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-12 flex items-center gap-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.875 19.5059C12.3227 19.5059 11.875 19.0581 11.875 18.5059C11.875 17.9536 12.3227 17.5059 12.875 17.5059H17.375V16.9116C17.3749 16.736 17.3747 16.5203 17.3968 16.3439L17.3972 16.3405C17.413 16.2141 17.4848 15.638 18.0504 15.3637C18.6173 15.0887 19.1174 15.3907 19.2256 15.456L19.6941 15.7951C20.0699 16.0897 20.5844 16.4954 20.9754 16.8759C21.1705 17.0657 21.3717 17.283 21.5306 17.5139C21.6718 17.7191 21.875 18.0693 21.875 18.5C21.875 18.9307 21.6718 19.2809 21.5306 19.4861C21.3717 19.717 21.1705 19.9343 20.9754 20.1241C20.5844 20.5046 20.0699 20.9102 19.6941 21.2049L19.2256 21.544C19.1174 21.6093 18.6172 21.9113 18.0504 21.6363C17.4848 21.362 17.413 20.7859 17.3972 20.6595L17.3968 20.6561C17.3747 20.4797 17.3749 20.264 17.375 20.0884V19.5059H12.875Z"
                    fill="#393939"
                  />
                  <path
                    opacity="0.4"
                    d="M6.81154 22.6472C7.79379 22.75 9.35661 22.75 10.8977 22.75C11.4375 22.75 11.875 22.3124 11.875 21.7727C11.875 21.233 11.4375 20.7954 10.8977 20.7954C9.28909 20.7954 7.88285 20.7941 7.0134 20.7032C6.15948 20.6138 5.67555 20.4471 5.31772 20.194C5.07627 20.0233 4.86389 19.8222 4.6861 19.5978C4.43053 19.2753 4.26109 18.8425 4.16886 18.0558C4.07393 17.246 4.07235 16.1887 4.07235 14.6652L4.07227 11.765C4.07225 11.498 4.07242 10.8595 4.35304 10.3873C4.52597 10.0963 4.74739 9.85324 4.97484 9.72942C5.34135 9.5299 5.76154 9.41654 6.20821 9.41654L7.24858 9.45303C7.62867 9.46092 8.07221 9.44892 8.50036 9.3342C9.33433 9.11073 9.98574 8.45932 10.2092 7.62535C10.3239 7.1972 10.3359 6.75366 10.328 6.37357L10.2915 5.3332C10.2915 4.86551 10.4159 4.45838 10.6333 4.07997C10.76 3.85938 10.9807 3.65749 11.2855 3.48018C11.7476 3.21127 12.301 3.20878 12.6392 3.20726C12.9773 3.20573 13.3341 3.20456 13.6322 3.20456C15.4663 3.20456 16.1334 3.21851 16.6368 3.39586C17.5094 3.70332 18.1751 4.34496 18.4852 5.13033C18.5628 5.32697 18.6177 5.58539 18.6471 6.03334C18.6771 6.49001 18.6776 7.07296 18.6776 7.91322V13.0263C18.6776 13.564 19.1136 14 19.6513 14C20.1891 14 20.625 13.564 20.625 13.0263V7.88004C20.625 7.08088 20.625 6.43332 20.5903 5.90474C20.5545 5.36011 20.4789 4.87444 20.2956 4.41028C19.7668 3.07097 18.6584 2.0367 17.2818 1.5517C16.423 1.24911 14.9509 1.2495 13.3959 1.25004C10.5563 1.24968 8.86965 1.24947 7.48721 1.73655C5.26721 2.51873 3.49348 4.18147 2.65009 6.31753C2.36897 7.02949 2.24444 7.79421 2.18419 8.71105C2.125 9.61176 2.125 10.7243 2.125 12.1426V14.7261C2.12498 16.1742 2.12496 17.3469 2.23485 18.2842C2.34896 19.2576 2.59221 20.0955 3.16204 20.8145C3.45722 21.187 3.80577 21.5158 4.19614 21.7919C4.9409 22.3185 5.80212 22.5416 6.81154 22.6472Z"
                    fill="#141B34"
                  />
                </svg>
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: boolean) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border bg-white font-inter">
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
        <div className="flex-1 text-sm text-muted-foreground">
          Showing 1-10 of {table.getFilteredRowModel().rows.length}
        </div>
        <div className="space-x-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.41 10.4008L2.83 5.99438L7.41 1.58798L6 0.234375L0 5.99438L6 11.7544L7.41 10.4008Z"
                  fill="#202224"
                />
              </svg>
            </span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.59 10.4008L5.17 5.99438L0.59 1.58798L2 0.234375L8 5.99438L2 11.7544L0.59 10.4008Z"
                  fill="#202224"
                />
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
