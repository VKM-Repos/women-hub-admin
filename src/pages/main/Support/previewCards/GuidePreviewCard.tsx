import { Checkbox } from "@/components/ui/checkbox";
import Thumbnail from "@/assets/images/guide-thumbnail.png";
import Avatar from "@/assets/icons/avatar.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/icons/Icon";
import { cn } from "@/lib/utils";
import { SupportButtons } from "../components/SupportButtons";

type Props = {
  showFilters: boolean;
  data: any;
  isSelected: boolean; // Whether the Guide is selected
  toggleGuideSelection: () => void; // Function to toggle selection
};

function GuidePreviewCard({
  showFilters,
  data,
  isSelected,
  toggleGuideSelection,
}: Props) {
  const navigate = useNavigate();

  const handleArchiveGuide = (id: string) => {
    console.log(id);
    toast.success("Guide archived");
  };
  const handleDeleteGuide = (id: string) => {
    console.log(id);
    toast.success("Guide deleted");
  };
  const handleViewGuide = (id: string) => {
    console.log(id);
    navigate(`/guide/${id}`);
  };
  const handlePublishGuide = (id: string) => {
    console.log(id);
    toast.success("Guide published");
  };

  const date = new Date(data?.created_at);
  date.setDate(date.getDate() - 4);
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <div className="font-inter hover:border-secondary/70 group flex w-full items-center rounded-xl border-2 border-white bg-white px-[20px] py-[30px] shadow-sm">
      {showFilters && (
        <div className="w-[4rem]">
          <Checkbox
            checked={isSelected}
            onCheckedChange={toggleGuideSelection}
            aria-label="Select all"
            className="text-white"
          />
        </div>
      )}
      <div className={`grid w-full grid-cols-10 gap-6`}>
        <picture className="col-span-1 aspect-square w-full">
          <img src={Thumbnail} alt="" />
        </picture>
        <div className="col-span-9 space-y-1">
          <h5 className="font-normal text-[#65655E] w-full max-w-xl truncate text-base">
            {data?.title}
          </h5>
          <div className="flex items-center justify-start gap-2">
            <p
              className={cn(
                "text-xs font-bold capitalize",
                data?.status === "DRAFT" ? "text-secondary" : "text-[#106840]"
              )}
            >
              {/* {data?.status?.toLocaleLowerCase()} */}
              Published
            </p>
            &bull;
            <p className="font-normal text-[#65655E] text-xs">
              {formattedDate}
            </p>
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
                icon={<Icon name="archiveGuideIcon" />}
                label="Archive"
                onClick={() => handleArchiveGuide(data?.id)}
              />
            )}
            {data?.status === "DRAFT" && (
              <SupportButtons
                icon={<Icon name="publishGuideIcon" />}
                label="Publish"
                onClick={() => handlePublishGuide(data?.id)}
              />
            )}
            <SupportButtons
              icon={<Icon name="viewGuideIcon" />}
              label="View"
              onClick={() => handleViewGuide(data?.id)}
            />

            <SupportButtons
              icon={<Icon name="deleteGuideIcon" />}
              label="Delete"
              onClick={() => handleDeleteGuide(data?.id)}
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

export default GuidePreviewCard;
