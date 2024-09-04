import Filters from "./components/Filters";
import GuidePreviewCard from "./previewCards/GuidePreviewCard";
import { Guide } from "@/types/guides.type";
import { useLocation } from "react-router-dom";
import GuideHeroSection from "./components/GuideHeroSection";
import { useGET } from "@/hooks/useGET.hook";
import Loading from "@/components/shared/Loading";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

export default function Guidelines() {
  const location = useLocation();
  const guide = location.state?.guide;

  const [showFilters, setShowFilters] = useState(false);
  const [selectedGuidelines, setSelectedGuidelines] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredGuidelines, setFilteredGuidelines] = useState<Guide[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize] = useState<number>(10);

  // Construct the URL based on pagination and search term
  const apiUrl = searchTerm
    ? `guides/search?title=${searchTerm}&page=${currentPage}&size=${pageSize}`
    : `guides?page=${currentPage}&size=${pageSize}`;

  const {
    data: guidelines,
    isLoading,
    refetch,
    isRefetching,
  } = useGET({
    url: apiUrl,
    queryKey: [
      searchTerm ? "Guidelines-search" : "Guidelines",
      searchTerm,
      currentPage,
    ],
    withAuth: true,
    enabled: true,
  });

  useEffect(() => {
    console.log("Fetched Guidelines:", guidelines);
  }, [guidelines]);

  useEffect(() => {
    // The query URL will be updated when currentPage or searchTerm changes
    refetch();
  }, [searchTerm, currentPage]); // Refetch when search term or page changes

  useEffect(() => {
    if (guidelines?.content) {
      const applyFilters = () => {
        let updatedGuidelines = guidelines.content;
        if (statusFilter) {
          updatedGuidelines = updatedGuidelines.filter(
            (guide: Guide) => guide.status === statusFilter
          );
        }
        setFilteredGuidelines(updatedGuidelines);
      };

      applyFilters();
    }
  }, [guidelines, statusFilter]);

  const toggleGuideSelection = (guideId: string) => {
    setSelectedGuidelines((prevSelected) =>
      prevSelected.includes(guideId)
        ? prevSelected.filter((id) => id !== guideId)
        : [...prevSelected, guideId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedGuidelines.length === filteredGuidelines.length) {
      setSelectedGuidelines([]);
    } else {
      setSelectedGuidelines(filteredGuidelines.map((guide: Guide) => guide.id));
    }
  };

  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
  };

  const handleNextPage = () => {
    if (
      guidelines?.totalElements &&
      currentPage < guidelines.totalElements - 1
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="mx-10">
      <GuideHeroSection data={guide} />
      <section className="flex flex-col gap-y-6">
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          data={filteredGuidelines}
          selectedCount={selectedGuidelines}
          totalCount={filteredGuidelines.length}
          toggleSelectAll={toggleSelectAll}
          setSearchTerm={setSearchTerm}
          onStatusFilterChange={handleStatusFilterChange}
          page="Guidelines"
        />

        <div className="flex flex-col gap-4">
          {isLoading || isRefetching ? (
            <Loading />
          ) : filteredGuidelines.length > 0 ? (
            filteredGuidelines.map((guide) => (
              <GuidePreviewCard
                key={guide.id}
                showFilters={showFilters}
                data={guide}
                isSelected={selectedGuidelines.includes(guide.id)}
                toggleGuideSelection={() => toggleGuideSelection(guide.id)}
              />
            ))
          ) : (
            <>No Result</>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Pagination
            handlePrevious={handlePreviousPage}
            handleNext={handleNextPage}
            currentPage={currentPage + 1}
            numberOfElements={guidelines?.numberOfElements ?? 0}
            totalElements={guidelines?.totalElements ?? 0}
          />
        </div>
      </section>
    </div>
  );
}
