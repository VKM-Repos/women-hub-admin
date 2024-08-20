import { cn } from "@/lib/utils";

type TagProps = {
  title: string;
  color: string;
};
export default function Tag({ title, color }: TagProps) {
  return (
    <div className="flex items-center gap-5">
      <span className={cn("h-5 w-5 rounded-full", color)} />
      <h2 className="text-xl ">{title}</h2>
    </div>
  );
}
