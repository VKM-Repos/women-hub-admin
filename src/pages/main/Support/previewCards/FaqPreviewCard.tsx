import { Checkbox } from "@/components/ui/checkbox";
import Avatar from "@/assets/icons/avatar.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Faq } from "@/types/faqs.type";
import { cn } from "@/lib/utils";
import Icon from "@/components/icons/Icon";
import { SupportButtons } from "../components/SupportButtons";
import { Link } from "react-router-dom";
import { API_BASE_URLS } from "@/config/api.config";
import { usePATCH } from "@/hooks/usePATCH.hook";
import { useEffect, useRef, useState } from "react";

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

  const { mutate: updateFAQ } = usePATCH(`faqs/${data.id}`, {
    baseURL: API_BASE_URLS.supportServive,
    method: "PATCH",
    callback: () => {
      toast.success("FAQ Published");
      setTimeout(() => {
        navigate("/support");
      }, 1000);
    },
  });
  const handleArchiveFAQ = (id: string) => {
    console.log(id);
    toast.success("FAQ Archived");
  };
  const handleDeleteFAQ = (id: string) => {
    console.log(id);
    toast.success("FAQ deleted");
  };

  const handlePublishFAQ = () => {
    try {
      data.status = "Published";
      updateFAQ(data);
    } catch (error) {
      console.error("Error Publishing FAQ:", error);
      toast.error("Error Publishing FAQ.");
    }
  };

  const date = new Date(data?.created_at);
  date.setDate(date.getDate() - 4);
  const formattedDate = date.toISOString().split("T")[0];

  const buttonRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const buttonElement = buttonRef.current;
    if (buttonElement) {
      buttonElement.addEventListener("mouseenter", handleMouseEnter);
      buttonElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (buttonElement) {
        buttonElement.removeEventListener("mouseenter", handleMouseEnter);
        buttonElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className="font-inter hover:border-secondary/70 group flex justify-between w-full items-center rounded-xl border-2 border-white bg-white px-[20px] py-[30px] shadow-sm"
    >
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

      <div className={`flex  grid w-full grid-cols-10 gap-6`}>
        <div className="col-span-9 space-y-1">
          <h5 className="font-normal text-[#106840] w-full max-w-xl truncate text-base">
            {data?.question}
          </h5>
          <div className="flex items-center justify-start gap-2">
            <span className="border-secondary text-secondary font-light flex w-fit items-center justify-center rounded-sm border bg-white p-0 px-2 text-xs">
              {data?.category}
            </span>
            <p
              className={cn(
                "fontlight text-xs capitalize",
                data?.status === "Draft"
                  ? "text-secondary"
                  : data?.status === "Published"
                  ? "text-textPrimary"
                  : data?.status === "Archived"
                  ? " text-yellow-400"
                  : "text-textPrimary"
              )}
            >
              {data?.status?.toLocaleLowerCase()}
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
            {data?.status === "Published" && (
              <SupportButtons
                icon={<Icon name="archivingIcon" />}
                label="Archive"
                onClick={() => handleArchiveFAQ(data?.id)}
                isHovered={isHovered}
              />
            )}
            {data?.status === "Draft" && (
              <SupportButtons
                icon={<Icon name="publishingIcon" />}
                label="Publish"
                onClick={handlePublishFAQ}
                isHovered={isHovered}
              />
            )}
            <Link
              to={`/support/faq/${data.id}`}
              state={{
                pageName: "faq",
                operation: "Edit",
                details: data,
              }}
            >
              <SupportButtons
                icon={<Icon name="viewingIcon" />}
                label="View"
                onClick={() => true}
                isHovered={isHovered}
              />
            </Link>
            <SupportButtons
              icon={<Icon name="deletingIcon" />}
              label="Delete"
              onClick={() => handleDeleteFAQ(data?.id)}
              isHovered={isHovered}
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
