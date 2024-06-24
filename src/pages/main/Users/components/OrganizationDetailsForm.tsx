import Tag from "@/components/dashboard/Tag";
import Icon from "@/components/icons/Icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OrganizationDetailsForm() {
  return (
    <div className="font-inter mt-7">
      <Tag title="Organization information" />
      <div className="w-full max-w-full">
        <Label htmlFor="category" className="flex items-center gap-2 mb-2 mt-5">
          Category <Icon name="info" />
        </Label>
        <div className="w-full flex gap-4 flex-wrap font-montserrat font-semibold text-xs">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <span
              key={item}
              className="border border-secondary px-3 py-1 rounded-xl cursor-pointer"
            >
              Technology
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="orgName" className="flex items-center gap-2 mb-2">
          Organization Name <Icon name="info" />
        </Label>
        <Input className="bg-[#F4F4F4]" id="orgName" />
      </div>
      <div className="mt-5">
        <Label htmlFor="orgEmil" className="flex items-center gap-2 mb-2">
          Organization Email <Icon name="info" />
        </Label>
        <Input className="bg-[#F4F4F4]" id="orgEmil" />
      </div>
      <div className="mt-5">
        <Label htmlFor="location" className="flex items-center gap-2 mb-2">
          Organization Location <Icon name="info" />
        </Label>
        <Input className="bg-[#F4F4F4]" id="location" />
      </div>
      <div className="mt-5">
        <Label htmlFor="description" className="flex items-center gap-2 mb-2">
          Organization Description <Icon name="info" />
        </Label>
        <Textarea className="bg-[#F4F4F4]" id="description" />
      </div>
    </div>
  );
}
