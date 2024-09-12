import { Checkbox } from "@/components/ui/checkbox";
import Thumbnail from "@/assets/images/guide-thumbnail.png";
import Avatar from "@/assets/icons/avatar.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/icons/Icon";
import { cn } from "@/lib/utils";
import { SupportButtons } from "../components/SupportButtons";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { usePATCH } from "@/hooks/usePATCH.hook";
import { API_BASE_URLS } from "@/config/api.config";

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

  const { mutate: publishGuide } = usePATCH(`guides/${data.id}`, {
    baseURL: API_BASE_URLS.supportServive,
    method: "PATCH",
    callback: () => {
      toast.success("Guide Published");
      setTimeout(() => {
        navigate("/support");
      }, 1000);
    },
  });

  const handleArchiveGuide = (id: string) => {
    console.log(id);
    toast.success("Guide Archived");
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
    try {
      // data.question = "updated2";
      data.status = "Published";
      publishGuide(data);
    } catch (error) {
      console.error("Error Publishing FAQ:", error);
      toast.error("Error Publishing FAQ.");
    }
  };

  const date = new Date(data?.created_at);
  date.setDate(date.getDate() - 4);
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <div className="font-inter hover:border-secondary/70 group flex justify-between w-full items-center rounded-xl border-2 border-white bg-white px-[20px] py-[30px] shadow-sm">
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
      <Link
        to={`/support/guide/${data?.id}`}
        state={{
          pageName: "guideline",
          operation: "Edit",
          details: data,
        }}
      >
        <div className={`flex grid w-full grid-cols-10 gap-6`}>
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
                  "fontlight text-xs capitalize",
                  data?.status === "Draft"
                    ? "text-secondary"
                    : data?.status === "Publish"
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
      </Link>
      <div
        className={`flex w-full max-w-60 flex-col items-end justify-end gap-y-2`}
      >
        <div className="flex items-center justify-between gap-6">
          <span className="invisible flex items-center justify-start gap-2 group-hover:visible">
            {data?.status === "Published" && (
              <SupportButtons
                icon={<Icon name="archivingIcon" />}
                label="Archive"
                onClick={() => handleArchiveGuide(data?.id)}
              />
            )}
            {data?.status === "Draft" && (
              <SupportButtons
                icon={<Icon name="publishingIcon" />}
                label="Publish"
                onClick={() => handlePublishGuide(data?.id)}
              />
            )}
            <SupportButtons
              icon={<Icon name="viewingIcon" />}
              label="View"
              onClick={() => handleViewGuide(data?.id)}
            />

            <SupportButtons
              icon={<Icon name="deletingIcon" />}
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
