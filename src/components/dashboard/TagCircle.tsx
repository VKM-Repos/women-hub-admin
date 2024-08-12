type TagProps = {
  title: string;
  color: string;
};
export default function Tag({ title, color }: TagProps) {
  return (
    <div className="flex items-center gap-5">
      <span className={`h-5 w-5 bg-tagBgOrg rounded-full`} />

      <h2 className="text-xl ">{title}</h2>
    </div>
  );
}
