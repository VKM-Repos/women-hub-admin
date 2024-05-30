import PostSampleImg from "@/assets/post-sample-img.svg";
import MaleAvatar from "@/assets/icons/male-avatar.svg";
import CommentIcon from "@/assets/icons/comment-icon.svg";
import AnalyticsIcon from "@/assets/icons/analytics-icon.svg";
export default function RecentPostCard() {
  return (
    <div className="flex justify-between drop-shadow-sm border px-4 py-2 rounded-xl">
      <div className="flex items-center gap-4">
        <img src={PostSampleImg} alt="" />
        <div className="flex flex-col gap-1">
          <p className="text-xs w-[200px] font-bold">
            Girls who can code and break s...
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-secondary">Draft</span>
            <span className="h-[5px] w-[5px] bg-txtColor rounded-full" />
            <span className="text-xs">May 8, 2024</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div className="flex gap-1">
          <span className="text-xs">Admin 1</span>
          <img src={MaleAvatar} className="h-5 w-5" alt="" />
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex gap-2 items-center">
            <span>22</span> <img src={CommentIcon} />{" "}
          </div>
          <div className="flex gap-2 items-center">
            <span>0</span>
            <img src={AnalyticsIcon} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
