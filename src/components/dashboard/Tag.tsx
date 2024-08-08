type TagProps = {
  title: string;
  /*color: string;*/
};
export default function Tag({ title }: TagProps) {
  return (
    <div className="flex items-center gap-5">
      <span className={`h-10 w-5 bg-tagBgOrg rounded-md`} />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}
