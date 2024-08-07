import { Checkbox } from "@/components/ui/checkbox";
import Avatar from "@/assets/icons/avatar.svg";
import { useNavigate } from "react-router-dom";

import { Faq } from "@/types/faqs.type";
import { cn } from "@/lib/utils";

type Props = {
  showFilters: boolean;
  data: Faq;
};

function FaqPreviewCard({ showFilters, data }: Props) {
  const navigate = useNavigate();

  return (
    <div className="font-inter hover:border-secondary/70 group flex w-full items-center rounded-xl border-2 border-white bg-white p-4 shadow-sm">
      {showFilters && (
        <div className="w-[4rem]">
          {/* This checkbox uses shad cn's lib, */}
          {/* TODO: Customize checkbox component in such a way that when you select(isChecked) will select the id of the data passed to this
            card so it can be used for bulk actions - ie, archive, publish, preview etc, bulk actions */}
          <Checkbox></Checkbox>
        </div>
      )}
      <div className={`grid w-full grid-cols-10 gap-6`}>
        <div className="col-span-9 space-y-1">
          <h5 className="font-normal text-[#65655E] w-full max-w-xl truncate text-base">
            {data?.title}
          </h5>
          <div className="flex items-center justify-start gap-2">
            {/*<span className="border-secondary text-secondary font-light flex w-fit items-center justify-center rounded-full border bg-white p-0 px-2 text-xs">
              {data.category}
            </span>*/}
            <p
              className={cn(
                "text-xs font-bold capitalize",
                data?.status === "DRAFT" ? "text-secondary" : "text-[#106840]"
              )}
            >
              {data?.status?.toLocaleLowerCase()}
            </p>
            &bull;
            <p className="font-normal text-[#65655E] text-xs">{data?.date}</p>
          </div>
        </div>
      </div>
      <div
        className={`flex w-full max-w-60 flex-col items-end justify-end gap-y-2`}
      >
        <div className="flex items-center justify-between gap-6">
          <span className="invisible flex items-center justify-start gap-2 group-hover:visible"></span>
          <p className="text-[#106840] font-normal text-xs">
            {"Editor’s Name"}
          </p>
          <picture className="aspect-square w-5">
            <img src={Avatar} alt="" />
          </picture>
        </div>
      </div>
    </div>
  );
}

export default FaqPreviewCard;
