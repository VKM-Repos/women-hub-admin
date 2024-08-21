type Props = {
  data: any;
};

const GuideCard = ({ data }: Props) => {
  return (
    <div className=" w-[300px] h-[251.16px] mr-4 px-[11.63px]">
      <div className="w-[290.09px]  hover:w-[300px] hover:h-[150px] transition-all duration-300">
        <img src={data.coverImageUrl} className="aspect-auto object-cover" />
      </div>
      <h1 className="text-[17.45px] text-[#106840] font-normal font-sora mt-4 mb-4">
        {data.title}
      </h1>

      <p className="text-sm/[11.63px] text-txtColor leading-4 font-normal font-quicksand mt-4 mb-4">
        {data.description}
      </p>
      <p className="text-sm/[11.63px] text-secondary leading-4 font-normal font-sora mt-4 mb-4">
        {data.info}
      </p>
    </div>
  );
};

export default GuideCard;
