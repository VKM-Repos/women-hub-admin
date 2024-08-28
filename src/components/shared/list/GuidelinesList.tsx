import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import Icon from '@/components/icons/Icon';

<<<<<<< HEAD
import { Input } from "@/components/ui/input";
=======
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
>>>>>>> 699e4d4bfb78f241019c46d13054bfeb86823cbd

import GUIDELINE from '@/assets/images/Getting started.png';

type tableProps = {
  columns: ColumnDef<string>[];
  data: any[] | string[];
};

export default function GuidelineList({ columns, data }: tableProps) {
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
      <div className="border-zinc-100 mb-10 flex flex-row justify-between rounded-lg border-2 bg-white px-5 py-5 shadow-xl">
        <div className="flex flex-col justify-around">
          <div>
            <h1 className="text-[32px] font-medium text-[#106840]">
              A Guide to Women Hub
            </h1>
          </div>
          <div className="mb-2 mt-2">
            <p className="text-[16px] text-[#515151]">
              Learn about our community guidelines and policies to ensure a safe
              and welcoming environment for everyone.
            </p>
          </div>
          <div>
            <button className="rounded-lg bg-[#FCFCFC] px-[16px] py-[8px]">
              Edit Header
            </button>
          </div>
        </div>
        <div className="w-[290.09px]">
          <img src={GUIDELINE} className="h-full" />
        </div>
      </div>
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
                (table.getColumn('helpline')?.getFilterValue() as string) ?? ''
              }
              onChange={event =>
                table.getColumn('helpline')?.setFilterValue(event.target.value)
              }
              className="max-w-sm border-0"
            />
          </div>
          <div>
            <Button className="bg-secondary flex h-12 w-[150px] items-center gap-2 rounded-lg text-white">
              <span>
                <Icon name="plus" />
              </span>
              Add new
            </Button>
          </div>
        </div>
      </div>
      <div className="font-inter rounded-md border bg-white">
        <div></div>
        <div></div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
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
