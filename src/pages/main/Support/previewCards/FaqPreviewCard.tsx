import { Checkbox } from "@/components/ui/checkbox";
import Avatar from "@/assets/icons/avatar.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Faq } from "@/types/faqs.type";
import { cn } from "@/lib/utils";
import Icon from "@/components/icons/Icon";
import { SupportButtons } from "../components/SupportButtons";

type Props = {
  showFilters: boolean;
  data: Faq;
  isSelected: boolean; // Whether the post is selected
  toggleFAQSelection: () => void; // Function to toggle selection
};

function FaqPreviewCard({
  showFilters,
  data,
  isSelected,
  toggleFAQSelection,
}: Props) {
  const navigate = useNavigate();

  const handleArchiveFAQ = (id: string) => {
    console.log(id);
    toast.success("FAQ archived");
  };
  const handleDeleteFAQ = (id: string) => {
    console.log(id);
    toast.success("FAQ deleted");
  };
  const handleViewFAQ = (id: string) => {
    console.log(id);
    navigate(`/FAQs/${id}`);
  };
  const handlePublishFAQ = (id: string) => {
    console.log(id);
    toast.success("FAQ published");
  };

  return (
    <div className="font-inter hover:border-secondary/70 group flex w-full items-center rounded-xl border-2 border-white bg-white px-[20px] py-[30px] shadow-sm">
      {showFilters && (
        <div className="w-[4rem]">
          <Checkbox
            checked={isSelected}
            onCheckedChange={toggleFAQSelection}
            aria-label="Select all"
            className="text-white"
          />
        </div>
      )}
      <div className={`grid w-full grid-cols-10 gap-6`}>
        <div className="col-span-9 space-y-1">
          <h5 className="font-normal text-[#106840] w-full max-w-xl truncate text-base">
            {data?.title}
          </h5>
          <div className="flex items-center justify-start gap-2">
            <span className="border-secondary text-secondary font-light flex w-fit items-center justify-center rounded-sm border bg-white p-0 px-2 text-xs">
              {data?.category}
            </span>
            <p
              className={cn(
                "text-xs font-semibold capitalize",
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
          <span className="invisible flex items-center justify-start gap-2 group-hover:visible">
            {data?.status === "PUBLISHED" && (
              <SupportButtons
                icon={<Icon name="archivePostIcon" />}
                label="Archive"
                onClick={() => handleArchiveFAQ(data?.id)}
              />
            )}
            {data?.status === "DRAFT" && (
              <SupportButtons
                icon={<Icon name="publishPostIcon" />}
                label="Publish"
                onClick={() => handlePublishFAQ(data?.id)}
              />
            )}
            <SupportButtons
              icon={<Icon name="viewPostIcon" />}
              label="View"
              onClick={() => handleViewFAQ(data?.id)}
            />

            <SupportButtons
              icon={<Icon name="deletePostIcon" />}
              label="Delete"
              onClick={() => handleDeleteFAQ(data?.id)}
            />
          </span>
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
