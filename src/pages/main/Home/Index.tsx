import StatisticsCard from "@/components/dashboard/StatisticsCard";
import { userStarts } from "./UserStarts";
import LineChart from "@/components/dashboard/LineChart";
import SupportTicketCard from "@/components/dashboard/SupportTicketCard";
import Tag from "@/components/dashboard/Tag";
import PostMetricsGrid from "@/components/dashboard/PostMetricsStats/PostMetricsGrid";
import RecentPostCard from "@/components/dashboard/RecentPostCard";

export default function Home() {
  return (
    <div className="font-inter">
      <h1 className="font-bold text-[45px] text-txtColor">Welcome</h1>
      <div className="mt-3">
        <Tag title="Users Statistics" color="bg-[#FFBC99]" />
        <div className="flex gap-5 mt-10 w-full">
          {userStarts?.map((stats) => (
            <StatisticsCard
              title={stats?.title}
              count={stats?.count}
              icon={stats.icon}
              color={stats?.color}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-5 mt-10 mb-10">
        <div className="bg-white rounded-md drop-shadow-lg w-[70%] h-fit">
          <LineChart />
        </div>
        <div className="bg-white drop-shadow-lg rounded-md w-[30%] flex flex-col px-4 py-4 h-fit">
          <h2 className="text-base font-bold">Recent Support Tickets</h2>

          {[1, 2, 3, 4].map((item) => (
            <>
              <SupportTicketCard key={item} />
              <hr className="m-0" />
            </>
          ))}
          <button className="border py-2 rounded-xl mt-3">
            View all tickets
          </button>
        </div>
      </div>
      <Tag title="Post Metrics" color="bg-[#FFBC99]" />
      <div className="flex justify-between gap-10 mt-5 mb-10">
        <div className="w-full">
          <PostMetricsGrid />
        </div>
        <div className="bg-white rounded-xl drop-shadow-lg w-full px-5 py-8">
          <div className="flex justify-between">
            <h2 className="text-base font-bold">Recent Posts</h2>
            <button className="border px-4 py-1 rounded-xl font-bold text-sm text-txtColor">
              View all
            </button>
          </div>

          <div>
            <RecentPostCard />
          </div>
        </div>
      </div>
    </div>
  );
}
