import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UserDetailsForm() {
  return (
    <div className="font-inter mt-7">
      <div>
        <Label htmlFor="email" className="flex items-center gap-2 mb-2">
          Email <Icon name="info" />
        </Label>
        <Input className="bg-[#F4F4F4]" id="email" />
      </div>
      <div className="mt-5">
        <Label htmlFor="name" className="flex items-center gap-2 mb-2">
          Name <Icon name="info" />
        </Label>
        <Input className="bg-[#F4F4F4]" id="name" />
      </div>
      <div className="mt-5">
        <Label htmlFor="bio" className="flex items-center gap-2 mb-2">
          Bio <Icon name="info" />
        </Label>
        <Textarea className="bg-[#F4F4F4]" id="bio" />
      </div>

      <div className="mt-5">
        <Label htmlFor="name" className="flex items-center gap-2 mb-2">
          User Password <Icon name="info" />
        </Label>
        <div className=" flex">
          <Input className="border border-input rounded-r-none" id="pass" />
          <Button
            onClick={() => handleOnCLick()}
            className="bg-[#393939] text-white rounded-l-none"
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}
