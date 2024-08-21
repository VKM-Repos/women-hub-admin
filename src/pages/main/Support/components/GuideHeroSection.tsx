import { Link } from "react-router-dom";

type Props = {
  data: any;
};

const GuideHeroSection = ({ data }: Props) => {
  return (
    <div className="flex flex-row justify-between bg-white border-2 border-zinc-100 shadow-xl rounded-lg px-5 py-5 mb-10">
      <div className="flex flex-col justify-around">
        <div>
          <h1 className="text-[#106840] font-normal font-sora text-[32px]">
            {data.title}
          </h1>
        </div>
        <div className="mt-2 mb-4">
          <p className="text-[#515151] font-normal font-quicksand text-[16px]">
            {data.description}
          </p>
        </div>
        <div>
          <Link to={"/support/editHeader"} state={{ data }}>
            <button className="bg-[#FCFCFC] px-[16px] py-[8px] font-bold font-inter text-[13px] border-2 border-gray-300 rounded-lg">
              Edit Header
            </button>
          </Link>
        </div>
      </div>
      <div className="w-[322.95px]">
        <img
          src={data.coverImageUrl}
          className="h-full aspect-auto object-fit"
        />
      </div>
    </div>
  );
};

export default GuideHeroSection;
