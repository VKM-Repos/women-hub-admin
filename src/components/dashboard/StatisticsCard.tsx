import { cn } from "@/lib/utils";

type cardProps = {
  title: string;
  count: number | string;
  icon: React.ReactNode;
  color: string;
};
export default function StatisticsCard({
  title,
  count,
  icon,
  color,
}: cardProps) {
  return (
    <div
      className={cn(
        "flex items-center cursor-pointer justify-between w-[220px] max-w-[220px] drop-shadow-lg skewmorphism rounded-md px-4 py-5 bg-opacity-[17%] font-inter",
        color
      )}
    >
      <div>
        <p className="font-semibold text-txtColor text-sm my-2">{title}</p>
        <p className="font-bold text-2xl text-txtColor">{count}</p>
      </div>
      <div>{icon}</div>
    </div>
  );
}
