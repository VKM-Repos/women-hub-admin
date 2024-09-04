import Filters from "./components/Filters";
import FaqPreviewCard from "./previewCards/FaqPreviewCard";
import { Faq } from "@/types/faqs.type";
import { faqData } from "./mockupData/faq-mockup-data";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import GuideHeroSection from "./components/GuideHeroSection";
import { useGET } from "@/hooks/useGET.hook";
import Loading from "@/components/shared/Loading";
import { useEffect, useState } from "react";

export default function FAQs() {
  const location = useLocation();
  const guide = location.state?.guide;

  const [showFilters, setShowFilters] = useState(false);
  const [selectedFAQs, setSelectedFAQs] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredFAQs, setFilteredFAQs] = useState<Faq[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize] = useState<number>(10);

  // Construct the URL based on pagination and search term
  const apiUrl = searchTerm
    ? `faqs/search?title=${searchTerm}&page=${currentPage}&size=${pageSize}`
    : `faqs?page=${currentPage}&size=${pageSize}`;

  const {
    data: FAQs,
    isLoading,
    refetch,
    isRefetching,
  } = useGET({
    url: apiUrl,
    queryKey: [searchTerm ? "FAQs-search" : "FAQs", searchTerm, currentPage],
    withAuth: true,
    enabled: true,
  });

  useEffect(() => {
    console.log("Fetched FAQs:", FAQs);
  }, [FAQs]);

  useEffect(() => {
    // The query URL will be updated when currentPage or searchTerm changes
    refetch();
  }, [searchTerm, currentPage]); // Refetch when search term or page changes

  useEffect(() => {
    if (FAQs?.content) {
      const applyFilters = () => {
        let updatedFAQs = FAQs.content;
        if (statusFilter) {
          updatedFAQs = updatedFAQs.filter(
            (faq: Faq) => faq.status === statusFilter
          );
        }
        setFilteredFAQs(updatedFAQs);
      };

      applyFilters();
    }
  }, [FAQs, statusFilter]);

  const handleNextPage = () => {
    if (FAQs?.totalElements && currentPage < FAQs.totalElements - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const toggleFAQSelection = (faqId: any) => {
    setSelectedFAQs((prevSelected) =>
      prevSelected.includes(faqId)
        ? prevSelected.filter((id) => id !== faqId)
        : [...prevSelected, faqId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedFAQs.length === filteredFAQs.length) {
      setSelectedFAQs([]);
    } else {
      setSelectedFAQs(filteredFAQs.map((faq: any) => faq.id));
    }
  };

  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
  };

  return (
    <div className="mx-10">
      <GuideHeroSection data={guide} />
      <section className="flex flex-col gap-y-6">
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          data={filteredFAQs}
          selectedCount={selectedFAQs}
          totalCount={filteredFAQs.length}
          toggleSelectAll={toggleSelectAll}
          setSearchTerm={setSearchTerm}
          onStatusFilterChange={handleStatusFilterChange}
          // handleFilter={handleFilter}
          // toggleCheckedAll={toggleCheckedAll}
          page="FAQs"
        />

        <div className="flex flex-col gap-4">
          {isLoading || isRefetching ? (
            <Loading />
          ) : Array.isArray(filteredFAQs) && filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq: Faq) => (
              <FaqPreviewCard
                key={faq.id}
                showFilters={showFilters}
                data={faq}
                // isSelected={selectedFAQs.filter((faq: any) =>
                //   faq.id.includes(faq.id)
                // )}
                isSelected={selectedFAQs.includes(faq.id)}
                toggleFAQSelection={() => toggleFAQSelection(faq.id)}
              />
            ))
          ) : (
            <>No Result</>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing 1-10 of {filteredFAQs.length}
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
