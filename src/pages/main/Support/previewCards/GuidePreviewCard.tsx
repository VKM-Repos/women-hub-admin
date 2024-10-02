import { Checkbox } from "@/components/ui/checkbox";
// import Thumbnail from "@/assets/images/guide-thumbnail.png";
import Avatar from "@/assets/icons/avatar.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/icons/Icon";
import { cn } from "@/lib/utils";
import { SupportButtons } from "../components/SupportButtons";
import { Link } from "react-router-dom";
import { usePATCH } from "@/hooks/usePATCH.hook";
import { API_BASE_URLS } from "@/config/api.config";
import { useDELETE } from "@/hooks/useDelete.hook";
import { useEffect, useRef, useState } from "react";

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

  const { mutate: updateGuideline } = usePATCH(`guides-with-file/${data.id}`, {
    baseURL: API_BASE_URLS.supportServive,
    contentType: "multipart/form-data",
    callback: (variables: any) => {
      const status = variables.status; // Get the status from the submitted data

      // Dynamically set the toast message based on the status
      if (status === "Published") {
        toast.success("Guideline has been Published");
      } else if (status === "Archived") {
        toast.success("Guideline has been Archived");
      }

      // toast.success("Guideline has been Published");

      // Delay the navigation to let the toast be visible for a while
      setTimeout(() => {
        navigate(0); // Trigger the navigation after the toast is shown
      }, 2000);
    },
  });

  const { mutate: deleteGuide } = useDELETE(`guides/${data.id}`, {
    baseURL: API_BASE_URLS.supportServive,
    // contentType: "multipart/form-data",
    callback: () => {
      // Show the toast first
      toast.success("Guideline has been deleted");

      // Delay the navigation to let the toast be visible for a while
      setTimeout(() => {
        navigate(0); // Trigger the navigation after the toast is shown
      }, 2000);
    },
  });

  const handleArchiveGuide = () => {
    try {
      updateGuideline({
        title: data.title,
        content: data.content,
        file: null,
        status: "Archived",
      });
    } catch (error) {
      console.error("Error Archiving Guideline:", error);
      toast.error("Failed to Archived Guideline.");
    }
  };
  const handleDeleteGuide = () => {
    try {
      deleteGuide(data.id);
    } catch (error) {
      console.error("Error Deleting Guideline:", error);
      toast.error("Failed to delete Guideline.");
    }
  };

  const handlePublishGuide = () => {
    try {
      updateGuideline({
        title: data.title,
        content: data.content,
        file: null,
        status: "Published",
      });
    } catch (error) {
      console.error("Error Publishing Guideline:", error);
      toast.error("Failed to Publish Guideline.");
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
            onCheckedChange={toggleGuideSelection}
            aria-label="Select all"
            className="text-white"
          />
        </div>
      )}

      <div className={`flex grid w-full grid-cols-10 gap-6`}>
        <picture className="col-span-1 aspect-square w-full">
          <img src={data?.picture_path} alt="" />
        </picture>
        <div className="col-span-9 space-y-1">
          <h5 className="font-normal text-[#65655E] w-full max-w-xl truncate text-base">
            {data?.title}
          </h5>
          <div className="flex items-center justify-start gap-2">
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
                onClick={handleArchiveGuide}
                isHovered={isHovered}
              />
            )}
            {data?.status !== "Published" && (
              <SupportButtons
                icon={<Icon name="publishingIcon" />}
                label="Publish"
                onClick={handlePublishGuide}
                isHovered={isHovered}
              />
            )}
            <Link
              to={`/support/guide/${data?.id}`}
              state={{
                pageName: "guideline",
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
              onClick={() => handleDeleteGuide()}
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
    // <div
    //   ref={buttonRef}
    //   className="font-inter hover:border-secondary/70 group flex w-full items-center gap-x-4 rounded-xl border-2 border-white bg-white p-4 shadow-sm"
    // >
    //   <div className="">
    //     {showFilters && (
    //       <Checkbox
    //         checked={isSelected}
    //         onCheckedChange={toggleGuideSelection}
    //       />
    //     )}
    //   </div>
    //   <div className={`grid w-full grid-cols-10 gap-6`}>
    //     <picture className="col-span-1 aspect-square w-full">
    //       <img src={Thumbnail} alt="Thumbnail" />
    //     </picture>
    //     <div className="col-span-9 space-y-1">
    //       <h5 className="font-normal text-textPrimary w-full max-w-xl truncate text-base">
    //         {data?.title
    //           ? data.title.charAt(0).toUpperCase() + data.title.slice(1)
    //           : "No Title"}
    //       </h5>

    //       <div className="flex items-center justify-start gap-2">
    //         <span className="border-secondary text-secondary font-light flex w-fit items-center justify-center rounded-[4px] border bg-white p-0 px-2 text-xs">
    //           {data?.category?.name || "No Category"}
    //         </span>
    //         <p
    //           className={cn(
    //             "fontlight text-xs capitalize",
    //             data?.status === "Draft"
    //               ? "text-secondary"
    //               : data?.status === "Publish"
    //               ? "text-textPrimary"
    //               : data?.status === "Archive"
    //               ? " text-yellow-400"
    //               : "text-textPrimary"
    //           )}
    //         >
    //           {data?.status?.toLocaleLowerCase() || "Unknown Status"}
    //         </p>
    //         &bull;
    //         <p className="font-normal text-txtColor text-xs">
    //           {data?.status === "Publish" ? data.datePublish : formattedDate}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <div
    //     className={`flex w-full max-w-60 flex-col items-end justify-end gap-y-2`}
    //   >
    //     <div className="flex items-center justify-between gap-6">
    //       <span className="flex items-center justify-start gap-2">
    //         {data?.status === "Publish" && (
    //           <SupportButtons
    //             icon={<Icon name="archiveGuideIcon" />}
    //             label="Archive"
    //             onClick={() => handleArchiveGuide(data?.id)}
    //             isHovered={isHovered}
    //           />
    //         )}
    //         {data?.status === "Draft" && (
    //           <SupportButtons
    //             icon={<Icon name="publishGuideIcon" />}
    //             label="Publish"
    //             onClick={() => handlePublishGuide(data?.id)}
    //             isHovered={isHovered}
    //           />
    //         )}
    //         <SupportButtons
    //           icon={<Icon name="viewGuideIcon" />}
    //           label="View"
    //           onClick={() => handleViewGuide(data?.id)}
    //           isHovered={isHovered}
    //         />
    //       </span>
    //       <p className="text-textPrimary font-normal text-xs">
    //         {data?.author || "No Author"}
    //       </p>
    //       <picture className="aspect-square w-5">
    //         <img src={Avatar} alt="Avatar" />
    //       </picture>
    //     </div>
    //     <div className="text-txtColor flex items-start gap-4 text-xs font-semibold">
    //       <span className="flex items-center gap-2">
    //         {data.numberOfComments || 0}
    //         <Icon name="GuideCommentIcon" />
    //       </span>
    //       <span className="flex items-center gap-2">
    //         {data.numberOfLikes || 0}
    //         <Icon name="GuideInteractionIcon" />
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
}

export default GuidePreviewCard;
