import { useState } from "react";
import Filters from "./components/Filters";
import GuidePreviewCard from "./previewCards/GuidePreviewCard";
import { Guide } from "@/types/guides.type";
import { guideData } from "./mockupData/guide-mockup-data";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import GuideHeroSection from "./components/GuideHeroSection";

export default function Guidelines() {
  const location = useLocation();
  const guide = location.state?.guide;

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

  const [checkedAll, setCheckedAll] = useState(false);

  const toggleCheckedAll = (value: boolean) => {
    setCheckedAll(value);
  };

  return (
    <div className="mx-10">
      <GuideHeroSection data={guide} />
      <section className="flex flex-col gap-y-6">
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          data={guidesData}
          handleFilter={handleFilter}
          toggleCheckedAll={toggleCheckedAll}
          page="Guidelines"
        />

        <div className="flex flex-col gap-4">
          {Array.isArray(guidesData) && guidesData.length > 0 ? (
            guidesData.map((guide) => (
              <GuidePreviewCard
                key={guide.id}
                showFilters={showFilters}
                data={guide}
                checkedAll={checkedAll}
              />
            ))
          ) : (
            <>No Result</>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing 1-10 of {guidesData.length}
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
            <Button variant="outline" size="sm">
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
