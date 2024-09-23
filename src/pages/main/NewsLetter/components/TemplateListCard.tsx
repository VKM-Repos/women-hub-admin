import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export default function TemplateListCard({ template }: { template: any }) {
  return (
    <div className="group">
      <h2 className="text-[1.1rem] text-primary font-bold my-5">
        {" "}
        {template.subject}
      </h2>
      <div className="border-2 relative border-[#E8E8E8] rounded-2xl w-[320px] max-w-[320px] h-[380px] max-h-[380px] overflow-hidden flex flex-col justify-start items-start cursor-pointe">
        <div className="px-2">
          <div className="flex gap-3 items-center mt-3 mb-12 pl-5">
            <img src={logo} alt="" className="w-7 h-7 " />{" "}
            <span className="text-[#106840] text-sm font-bold">women Hub</span>
          </div>
          <div className={cn("px-5", template.bg)}>
            <div className="flex flex-col items-center">
              <img src={template.image} alt="" />
              <h2 className="text-lg font-bold text-[#106840]">
                {template.heading}
              </h2>
            </div>
            <span className="text-xs text-txtColor">{template.body}</span>
          </div>
        </div>
        <div className="bg-white hidden absolute group-hover:flex gap-5 justify-center items-center group-hover:z-[1000] rounded-2xl w-[320px] max-w-[320px] h-[400px] max-h-[400px] ">
          <Button className="bg-secondary text-white">Choose</Button>
          <Button variant="outline">Preview</Button>
        </div>
      </div>
    </div>
  );
}
