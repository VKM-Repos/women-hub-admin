import Tag from "@/components/dashboard/Tag";
import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";

export default function FilterTableButton({ table }: { table: Table<any>}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex h-12 items-center gap-2 shadow-custom font-semibold"
              >
                <Icon name='filterTableIcon' />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onInteractOutside={e => e.preventDefault()}
            >
              <div className="px-5">
                <div>
                  <Tag title="Showing 10 of 32 Users" color="bg-[#FFBC99]" />
                  <hr className="mb-6 mt-4" />
                </div>
                <span className="text-txtColor text-sm">Showing</span>
                {table
                  .getAllColumns()
                  .filter(column => column.getCanHide())
                  .map(column => {
                    return (
                      <div className="my-3 w-[300px]">
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
                <div className="mb-3 mt-10 flex justify-end gap-3">
                  <Button className="bg-white" variant="outline">
                    Reset
                  </Button>
                  <Button className="bg-secondary text-white">Apply</Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
    )
}