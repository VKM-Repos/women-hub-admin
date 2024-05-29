import StatisticsCard from "@/components/dashboard/StatisticsCard";
import { userStarts } from "./UserStarts";
import LineChart from "@/components/dashboard/LineChart";
export default function Home() {
  return (
    <div className="font-inter">
      <h1 className="font-bold text-[45px] text-txtColor">Welcome</h1>
      <div>
        <div className="flex items-center gap-5 mt-7">
          <span className="h-10 w-5 bg-[#FFBC99] rounded-md" />
          <h2 className="text-2xl font-semibold">Users Statistics </h2>
        </div>
        <div className="flex gap-5 mt-10">
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
      <div className="flex gap-5 mt-10">
        <div className="flex-1 bg-white drop-shadow-lg">
          <LineChart />
        </div>
        <div className="bg-white">2</div>
      </div>
    </div>
  );
}
