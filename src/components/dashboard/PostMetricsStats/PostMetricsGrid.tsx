import StatisticsCard from "../StatisticsCard";

import PostIcon from "@/assets/icons/blog-rounded.svg";
import EditorIcon from "@/assets/icons/editor-rounded.svg";
import LikeIcon from "@/assets/icons/like-rounded.svg";
type PostMetrics = {
  posts: number;
  editors: number;
  totalComments: number;
  totalLikes: number;
};
export default function PostMetricsGrid({
  postMetrics,
}: {
  postMetrics: PostMetrics;
}) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <StatisticsCard
        title="Blog Posts"
        count={postMetrics?.posts}
        color="#FFBC99"
        icon={<img src={PostIcon} />}
      />
      <StatisticsCard
        title="Editors"
        count={postMetrics?.editors}
        color="#82E1CA78"
        icon={<img src={EditorIcon} />}
      />
      <StatisticsCard
        title="Total Comments"
        count={postMetrics?.totalComments}
        color="#A1BF4A2B"
        icon={<img src={PostIcon} />}
      />
      <StatisticsCard
        title="Total Likes"
        count={postMetrics?.totalLikes}
        color="#FC32252B"
        icon={<img src={LikeIcon} />}
      />
    </div>
  );
}
