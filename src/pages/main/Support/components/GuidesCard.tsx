import React from 'react'

const GuidesCard = () => {
  return (
    <div className=" w-[300px] h-[251.16px] mr-4 px-[11.63px]">
              <div className="w-[290.09px]  hover:w-[300px] hover:h-[150px] transition-all duration-300">
                <img src={FAQ} className="aspect-auto object-cover" />
              </div>
              <h1 className="text-sm/[17.45px] text-primary font-normal mt-4 mb-4">
                FAQs
              </h1>

              <p className="text-sm/[11.63px] text-txtColor leading-4 font-normal mt-4 mb-4">
                Find answers to common questions and learn more about how to use
                Women Hub effectively.
              </p>
              <p className="text-sm/[11.63px] text-secondary leading-4 font-normal mt-4 mb-4">
                View FAQ’s
              </p>
            </div>
  )
}

export default GuidesCard