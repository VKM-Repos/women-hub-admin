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
import { useDELETE } from "@/hooks/useDelete.hook";

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
    callback: (variables: any) => {
      const status = variables.status; // Get the status from the submitted data

      // Dynamically set the toast message based on the status
      if (status === "Published") {
        toast.success("FAQ has been Published");
      } else if (status === "Archived") {
        toast.success("FAQ has been Archived");
      }

      setTimeout(() => {
        navigate(0); // Trigger the navigation after the toast is shown
      }, 2000);
    },
  });

  const { mutate: deleteFAQ } = useDELETE(`faqs/${data.id}`, {
    baseURL: API_BASE_URLS.supportServive,
    // contentType: "multipart/form-data",
    callback: () => {
      // Show the toast first
      toast.success("FAQ has been deleted");

      // Delay the navigation to let the toast be visible for a while
      setTimeout(() => {
        navigate(0); // Trigger the navigation after the toast is shown
      }, 2000);
    },
  });

  const handleArchiveFAQ = () => {
    try {
      updateFAQ({
        question: data.question,
        answer: data.answer,
        category: data.category,
        status: "Archived",
      });
    } catch (error) {
      console.error("Error Archiving FAQ:", error);
      toast.error("Failed to Archived FAQ.");
    }
  };
  const handleDeleteFAQ = () => {
    try {
      deleteFAQ(data.id);
    } catch (error) {
      console.error("Error Deleting FAQ:", error);
      toast.error("Failed to delete FAQ.");
    }
  };

  const handlePublishFAQ = () => {
    try {
      updateFAQ({
        question: data.question,
        answer: data.answer,
        category: data.category,
        status: "Published",
      });
    } catch (error) {
      console.error("Error Publishing FAQ:", error);
      toast.error("Failed to Publish FAQ.");
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
                onClick={handleArchiveFAQ}
                isHovered={isHovered}
              />
            )}
            {data?.status !== "Published" && (
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
              onClick={handleDeleteFAQ}
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
