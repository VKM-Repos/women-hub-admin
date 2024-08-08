import { useState } from "react";
import Filters from "./Filters";
import GuidePreviewCard from "./GuidePreviewCard";
import { Guide } from "@/types/guides.type";
import { guideData } from "./guide-mockup-data";
import HELPLINES from "@/assets/images/HELPLINES.png";
import { Button } from "@/components/ui/button";

export default function Helplines() {
  const [showFilters, setShowFilters] = useState(false);

  let guides: Guide[] | any = guideData;

  const [guidesData, setGuidesData] = useState(guides);

  const handleFilter = (event: any) => {
    const filterValue = event.target.value.toLowerCase();
    const filteredData = guides.filter((guide: any) =>
      guide.title.toLowerCase().includes(filterValue)
    );

    setGuidesData(filteredData);
  };

  return (
    <>
      <div className="flex flex-row justify-between bg-white border-2 border-zinc-100 shadow-xl rounded-lg px-5 py-5 mb-10">
        <div className="flex flex-col justify-around">
          <div>
            <h1 className="text-[#106840] font-medium text-[32px]">
              A Guide to Women Hub
            </h1>
          </div>
          <div className="mt-2 mb-2">
            <p className="text-[#515151] text-[16px]">
              Learn about our community guidelines and policies to ensure a safe
              and welcoming environment for everyone.
            </p>
          </div>
          <div>
            <button className="bg-[#FCFCFC] px-[16px] py-[8px] border-2 border-gray-300 rounded-lg">
              Edit Header
            </button>
          </div>
        </div>
        <div className="w-[290.09px]">
          <img src={HELPLINES} className="h-full" />
        </div>
      </div>
      <section className="flex flex-col gap-y-6">
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          data={guidesData}
          handleFilter={handleFilter}
        />

        <div className="flex flex-col gap-4">
          {Array.isArray(guidesData) && guidesData.length > 0 ? (
            guidesData.map((guide) => (
              <GuidePreviewCard
                key={guide.id}
                showFilters={showFilters}
                data={guide}
              />
            ))
          ) : (
            <>No Guide yet</>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing 1-10 of {guides.length}
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
    </>
  );
}
