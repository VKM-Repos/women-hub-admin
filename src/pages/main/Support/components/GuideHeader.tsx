import React from 'react'
import { Link } from "react-router-dom";


const GuideHeader = ({data}) => {
  return (
    <div className="flex flex-row justify-between bg-white border-2 border-zinc-100 shadow-xl rounded-lg px-5 py-5 mb-10">
        <div className="flex flex-col justify-around">
          <div>
            <h1 className="text-[#106840] font-normal font-sora text-[32px]">FAQs</h1>
          </div>
          <div className="mt-2 mb-4 w-[609px]">
            <p className="text-[#515151] font-normal font-quicksand text-[16px]">
              Find answers to common questions and learn more about how to use
              Women Hub effectively.
            </p>
          </div>
          <div>
          <Link to={"/support/editHeader"}>
              <button className="bg-[#FCFCFC] px-[16px] py-[8px] font-bold font-inter text-[13px] border-2 border-gray-300 rounded-lg">
                Edit Header
              </button>
            </Link>
          </div>
        </div>
        <div className="w-[322.95px]">
          <img src={FAQ} className="h-full aspect-auto object-cover rounded-[21.16px]" />
        </div>
      </div>
  )
}

export default GuideHeader