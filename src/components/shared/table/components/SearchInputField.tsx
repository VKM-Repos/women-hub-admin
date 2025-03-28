import Icon from "@/components/icons/Icon";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

export default function SearchInputField({ table }: { table: Table<any>}) {
    return (
        <div className="flex gap-1 w-full max-w-[18.75rem] items-center rounded-md bg-white px-3 py-1 shadow-custom">
              <Icon name='searchTableIcon' />
            <Input
              placeholder="Search users"
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={event =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              className="max-w-sm border-0 bg-white"
            />
          </div>
    )
}