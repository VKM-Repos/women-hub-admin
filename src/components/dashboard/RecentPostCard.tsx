import MaleAvatar from "@/assets/icons/male-avatar.svg";
import CommentIcon from "@/assets/icons/comment-icon.svg";
import AnalyticsIcon from "@/assets/icons/analytics-icon.svg";
import { convertISOToReadableDate } from "@/lib/utils";
export default function RecentPostCard({ recentsPost }: any) {
  console.log(recentsPost);

  return (
    <>
      {recentsPost?.map((post: any) => (
        <div className="flex justify-between drop-shadow-sm border px-4 py-2 rounded-xl">
          <div className="flex items-center gap-4">
            <img
              src={post?.coverImageUrl}
              alt=""
              className="w-12 h-12 max-w-12 max-h-12 aspect-square object-cover"
            />
            <div className="flex flex-col gap-1">
              <p className="text-xs w-[200px] font-bold">{post?.title}</p>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-secondary">
                  {post?.status}
                </span>
                <span className="h-[5px] w-[5px] bg-txtColor rounded-full" />
                <span className="text-xs">
                  {convertISOToReadableDate(post?.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex gap-1">
              <span className="text-xs">{post?.createdBy?.name}</span>
              <img src={MaleAvatar} className="h-5 w-5" alt="" />
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex gap-2 items-center">
                <span>{post?.numberOfComments}</span> <img src={CommentIcon} />{" "}
              </div>
              <div className="flex gap-2 items-center">
                <span>{post?.numberOfLikes}</span>
                <img src={AnalyticsIcon} />{" "}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
