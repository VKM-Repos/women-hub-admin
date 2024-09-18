import Filters from "./components/Filters";
import FaqPreviewCard from "./previewCards/FaqPreviewCard";
import { Faq } from "@/types/faqs.type";
import { useLocation } from "react-router-dom";
import GuideHeroSection from "./components/GuideHeroSection";
import { useGET } from "@/hooks/useGET.hook";
import Loading from "@/components/shared/Loading";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { API_BASE_URLS } from "@/config/api.config";
// import { faqData } from "./mockupData/faq-mockup-data";

export default function FAQs() {
  const location = useLocation();
  const guide = location.state?.guide;

  const [showFilters, setShowFilters] = useState(false);
  const [selectedFAQs, setSelectedFAQs] = useState<string[]>([]);
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
    baseURL: API_BASE_URLS.supportServive,
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

  // const test = faqData;

  return (
    <div className="mx-10">
      <GuideHeroSection data={guide} />
      <section className="flex flex-col gap-y-6">
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          data={FAQs}
          selectedCount={selectedFAQs}
          totalCount={filteredFAQs.length}
          toggleSelectAll={toggleSelectAll}
          setSearchTerm={setSearchTerm}
          onStatusFilterChange={handleStatusFilterChange}
          page="FAQs"
        />

        <div className="flex flex-col gap-4">
          {isLoading || isRefetching ? (
            <Loading />
          ) : Array.isArray(FAQs) && FAQs.length > 0 ? (
            FAQs.map((faq: Faq) => (
              <FaqPreviewCard
                key={faq.id}
                showFilters={showFilters}
                data={faq}
                isSelected={selectedFAQs.includes(faq.id)}
                toggleFAQSelection={() => toggleFAQSelection(faq.id)}
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
            numberOfElements={FAQs?.numberOfElements ?? 0}
            totalElements={FAQs?.totalElements ?? 0}
          />
        </div>
      </section>

      {/* <section className="flex flex-col gap-y-6">
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          data={test}
          selectedCount={selectedFAQs}
          totalCount={filteredFAQs.length}
          toggleSelectAll={toggleSelectAll}
          setSearchTerm={setSearchTerm}
          onStatusFilterChange={handleStatusFilterChange}
          page="FAQs"
        />

        <div className="flex flex-col gap-4">
          {isLoading || isRefetching ? (
            <Loading />
          ) : Array.isArray(test) && test.length > 0 ? (
            test.map((faq: any) => (
              <FaqPreviewCard
                key={faq.id}
                showFilters={showFilters}
                data={faq}
                isSelected={selectedFAQs.includes(faq.id)}
                toggleFAQSelection={() => toggleFAQSelection(faq.id)}
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
            numberOfElements={FAQs?.numberOfElements ?? 0}
            totalElements={FAQs?.totalElements ?? 0}
          />
        </div>
      </section> */}
    </div>
  );
}
