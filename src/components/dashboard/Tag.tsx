import { cn } from "@/lib/utils";
type TagProps = {
  title: string;
  color: string;
};
export default function Tag({ title, color }: TagProps) {
  return (
    <div className="flex items-center gap-5">
      <span className={cn("h-10 w-5  rounded-md", color)} />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}
