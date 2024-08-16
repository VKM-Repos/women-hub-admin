import { useState } from "react";
import Filters from "./components/Filters";
import FaqPreviewCard from "./previewCards/FaqPreviewCard";
import { Faq } from "@/types/faqs.type";
import { faqData } from "./mockupData/faq-mockup-data";
import FAQ from "@/assets/images/FAQ.png";
import { Button } from "@/components/ui/button";

export default function FAQs() {
  const [showFilters, setShowFilters] = useState(false);

  const faqs: Faq[] | any = faqData;

  const [faqsData, setFAQData] = useState(faqs);

  const handleFilter = (event: any) => {
    const filterValue = event.target.value.toLowerCase();
    const filteredData = faqs.filter((faq: any) =>
      faq.title.toLowerCase().includes(filterValue)
    );
    setFAQData(filteredData);
  };

  const [checkedAll, setCheckedAll] = useState(false);

  const toggleCheckedAll = (value: boolean)=>{
    setCheckedAll(value)
  }

  

  return (
    <div className="mx-24">
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
            <button className="bg-[#FCFCFC] px-[16px] py-[8px] font-bold font-inter text-[13px] border-2 border-gray-300 rounded-lg">
              Edit Header
            </button>
          </div>
        </div>
        <div className="w-[322.95px]">
          <img src={FAQ} className="h-full aspect-auto object-cover rounded-[21.16px]" />
        </div>
      </div>
      <section className="flex flex-col gap-y-6">
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          data={faqsData}
          handleFilter={handleFilter}
          toggleCheckedAll={toggleCheckedAll}
          page="FAQs"
        />

        <div className="flex flex-col gap-4">
          {Array.isArray(faqsData) && faqsData.length > 0 ? (
            faqsData.map((faq: Faq) => (
              <FaqPreviewCard
                key={faq.id}
                showFilters={showFilters}
                data={faq}
                checkedAll={checkedAll}
              />
            ))
          ) : (
            <>No faq yet</>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing 1-10 of {faqsData.length}
          </div>
          <div className="space-x-0">
            <Button
              variant="outline"
              size="sm"
              // onClick={() => table.previousPage()}
              // disabled={!table.getCanPreviousPage()}
            >
              <span>
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.41 10.4008L2.83 5.99438L7.41 1.58798L6 0.234375L0 5.99438L6 11.7544L7.41 10.4008Z"
                    fill="#202224"
                  />
                </svg>
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => table.nextPage()}
              // disabled={!table.getCanNextPage()}
            >
              <span>
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.59 10.4008L5.17 5.99438L0.59 1.58798L2 0.234375L8 5.99438L2 11.7544L0.59 10.4008Z"
                    fill="#202224"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
