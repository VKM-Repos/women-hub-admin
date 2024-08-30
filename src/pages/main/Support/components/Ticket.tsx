import fileUpload from "@/assets/images/fileUpload.png";
import { useState } from "react";
import { useSessionStorage } from "usehooks-ts";

const Ticket = () => {
  const [display, setDisplay] = useState(false);

  const show = () => {
    setDisplay(!display);
  };
  return (
    <div className="bg-[#FCFCFC] flex flex-col w-full rounded-[20px] p-6 pb-40">
      <div className="flex justify-between">
        <div className="flex flex-col font-inter text-[#242731] leading-[34px] gap-[8px]">
          <p className=" text-[20px]">Ticket# 202406-A01</p>
          <p className="font-bold text-[26px]">Issue with Registration</p>
        </div>
        <div className="self-center">
          <button
            className="bg-[#FF7400] p-[10px] flex rounded-[10px] "
            onClick={show}
          >
            Ongoing
            <svg
              width="17"
              height="10"
              viewBox="0 0 17 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="self-center ml-2"
            >
              <path
                d="M16 1.25L8.5 8.75L1 1.25"
                stroke="#413723"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          {display ? (
            <div>
              <p>New</p>
              <p>Closed</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="bg-[#FFFFFF] flex flex-col w-full border-[1px] border-[#D8DAE6] rounded-lg p-[16px] mt-10">
        <div className="flex justify-between">
          <p>@joe@gmail.com</p>
          <p className="font-inter text-[#242731] text-[12px]">10 min ago</p>
        </div>
        <p className="text-[14px] mt-2 text-[#84818A] font-inter">
          I receive internal error whenever i try to sign up and i have tried
          refreshing my browser but nothing has changed
        </p>
        <div className="flex flex-col mt-4">
          <p className="text-[#3F3E5E] leading-[25.48px] text-[14px]">Upload</p>
          <div className="flex gap-[10px]">
            <img src={fileUpload} className="w-[48.69px] h-[48.69px]" />
            <img src={fileUpload} className="w-[48.69px] h-[48.69px]" />
            <img src={fileUpload} className="w-[48.69px] h-[48.69px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
