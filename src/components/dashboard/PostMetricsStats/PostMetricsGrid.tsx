import StatisticsCard from "../StatisticsCard";

import PostIcon from "@/assets/icons/blog-rounded.svg";
import EditorIcon from "@/assets/icons/editor-rounded.svg";
import LikeIcon from "@/assets/icons/like-rounded.svg";
export default function PostMetricsGrid() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <StatisticsCard
        title="Blog Posts"
        count={250}
        color="bg-[#FFBC99]"
        icon={<img src={PostIcon} />}
      />
      <StatisticsCard
        title="Editors"
        count={180}
        color="bg-[##82E1CA78]"
        icon={<img src={EditorIcon} />}
      />
      <StatisticsCard
        title="Total Comments"
        count={612}
        color="bg-[#A1BF4A2B]"
        icon={<img src={PostIcon} />}
      />
      <StatisticsCard
        title="Total Likes"
        count={"2,135"}
        color="bg-[#FC32252B]"
        icon={<img src={LikeIcon} />}
      />
    </div>
  );
}
