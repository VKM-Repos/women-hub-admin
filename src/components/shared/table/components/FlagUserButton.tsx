import Tag from '@/components/dashboard/Tag';
import Icon from '@/components/icons/Icon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function FlagUserButton() {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex h-12 items-center gap-2 shadow-custom font-semibold"
          >
           <Icon name='flagBulkIcon' />
            Flag
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="px-5">
            <div>
              <Tag title="Flag User" color="bg-[#FFBC99]" />
              <hr className="mb-6 mt-4" />
            </div>
            <p className="text-txtColor text-base font-semibold">
              Reason(s)
            </p>
            <p className="text-txtColor text-sm">
              You can select atmost 2 reasons
            </p>
            <div className="mt-5 flex w-[300px] flex-col gap-3">
              <div className="flex items-center justify-between">
                Inappropriate Language <Checkbox></Checkbox>{' '}
              </div>
              <div className="flex items-center justify-between">
                Inappropriate Content <Checkbox></Checkbox>{' '}
              </div>
              <div className="flex items-center justify-between">
                Spam <Checkbox></Checkbox>{' '}
              </div>
              <div className="flex items-center justify-between">
                Misleading information <Checkbox></Checkbox>{' '}
              </div>
              <div className="flex items-center justify-between">
                Other <Checkbox></Checkbox>{' '}
              </div>
            </div>
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