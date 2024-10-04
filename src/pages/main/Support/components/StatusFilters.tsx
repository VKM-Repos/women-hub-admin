/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  onStatusFilterChange: (status: string) => void;
};

export default function StatusFilters({ onStatusFilterChange }: Props) {
  const handleStatusFilter = (status: string) => {
    onStatusFilterChange(status);
  };

  const listOptions = [
    {
      listType: "ALL",
      label: `All`,
      action: () => handleStatusFilter(""),
    },
    {
      listType: "PUBLISHED",
      label: `Published`,
      action: () => handleStatusFilter("Published"),
    },
    {
      listType: "DRAFT",
      label: `Drafts`,
      action: () => handleStatusFilter("Draft"),
    },
    {
      listType: "ARCHIVED",
      label: `Archived`,
      action: () => handleStatusFilter("Archived"),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-10 w-10 cursor-pointer items-center justify-center"
        asChild
      >
        <span title="more filters">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M4.2323 7.17695C4.36297 6.86915 4.66498 6.66927 4.99937 6.66927L14.9994 6.66927C15.3338 6.66927 15.6358 6.86915 15.7664 7.17695C15.8971 7.48476 15.8311 7.84086 15.5989 8.08142L11.165 12.6739C11.0472 12.796 10.9076 12.9408 10.7712 13.0485C10.6079 13.1776 10.3503 13.3359 9.99937 13.3359C9.64847 13.3359 9.39088 13.1776 9.2275 13.0485C9.09111 12.9408 8.95149 12.796 8.83376 12.6739L4.39986 8.08142C4.1676 7.84086 4.10163 7.48476 4.2323 7.17695Z"
              fill="#1B1B1B"
            />
            <path
              d="M15.7691 7.17695C15.6385 6.86915 15.3365 6.66927 15.0021 6.66927H10.8354L6.88867 10.6564L8.83646 12.6739L8.83649 12.6739C8.95422 12.796 9.09383 12.9408 9.23021 13.0485C9.39359 13.1776 9.65117 13.3359 10.0021 13.3359C10.353 13.3359 10.6106 13.1776 10.7739 13.0485C10.9103 12.9408 11.0499 12.796 11.1677 12.6739L11.1677 12.6739L15.6016 8.08142C15.8338 7.84086 15.8998 7.48475 15.7691 7.17695Z"
              fill="#1B1B1B"
            />
          </svg>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        {listOptions.map((option) => (
          <DropdownMenuItem
            key={option.listType}
            onSelect={option.action}
            className="hover:bg-blue-500 hover:text-white"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
