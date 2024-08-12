import Tag from "@/components/dashboard/Tag";

const AddArticle = () => {
  return (
    <>
      <div className="flex flex-col bg-white border-2 border-zinc-100 rounded-lg px-5 mb-1">
        <div className="flex justify-between mb-4">
          <div className="self-center">
            <Tag title="Add Article" />
          </div>
          <div>
            <button className="border p-2 rounded-xl mt-3">
              View all tickets
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between w-full"></div>
      </div>
      <div className="flex flex-col bg-white border-2 border-zinc-100 rounded-sm px-5 mb-10">
        <div className="flex justify-between mb-4">
          <div className="self-center">
            <Tag title="Add Article" />
          </div>
          <div>
            <button className="border p-2 rounded-xl mt-3">
              View all tickets
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between w-full"></div>
      </div>
    </>
  );
};

export default AddArticle;
