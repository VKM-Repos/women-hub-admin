import { useState } from "react";
import Filters from "./components/Filters";
import FaqPreviewCard from "./previewCards/FaqPreviewCard";
import { Faq } from "@/types/faqs.type";
import { faqData } from "./mockupData/faq-mockup-data";
import FAQ from "@/assets/images/FAQ.png";

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
  return (
    <div className="mx-10">
      <div className="flex flex-row justify-between bg-white border-2 border-zinc-100 shadow-xl rounded-lg px-5 py-5 mb-10">
        <div className="flex flex-col justify-around">
          <div>
            <h1 className="text-[#106840] font-medium text-[32px]">FAQs</h1>
          </div>
          <div className="mt-2 mb-2">
            <p className="text-[#515151] text-[16px]">
              Find answers to common questions and learn more about how to use
              Women Hub effectively.
            </p>
          </div>
          <div>
            <button className="bg-[#FCFCFC] px-[16px] py-[8px] border-2 border-gray-300 rounded-lg">
              Edit Header
            </button>
          </div>
        </div>
        <div className="w-[290.09px]">
          <img src={FAQ} className="h-full" />
        </div>
      </div>
      <section className="flex flex-col gap-y-6">
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          data={faqsData}
          handleFilter={handleFilter}
        />

        <div className="flex flex-col gap-4">
          {Array.isArray(faqsData) && faqsData.length > 0 ? (
            faqsData.map((faq: Faq) => (
              <FaqPreviewCard
                key={faq.id}
                showFilters={showFilters}
                data={faq}
              />
            ))
          ) : (
            <>No faq yet</>
          )}
        </div>
      </section>
    </div>
  );
}
