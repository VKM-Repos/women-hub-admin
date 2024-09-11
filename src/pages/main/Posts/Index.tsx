import { useEffect, useState } from 'react';
import PostFilters from './PostFilters';
import PostPreviewCard from './PostPreviewCard';
import { Post } from '@/types/posts.type';
import { useGET } from '@/hooks/useGET.hook';
import Loading from '@/components/shared/Loading';
import PostPagination from './PostPagination';

export default function Posts() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize] = useState<number>(10);

  // Construct the URL based on pagination and search term
  const apiUrl = searchTerm
    ? `admin/posts/search?title=${searchTerm}&page=${currentPage}&size=${pageSize}`
    : `admin/posts?page=${currentPage}&size=${pageSize}`;

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useGET({
    url: apiUrl,
    queryKey: [searchTerm ? 'posts-search' : 'posts', searchTerm, currentPage],
    withAuth: true,
    enabled: true,
  });

  useEffect(() => {
    console.log('Fetched posts:', posts);
  }, [posts]);

  useEffect(() => {
    refetch();
  }, [searchTerm, currentPage]);

  useEffect(() => {
    if (posts?.content) {
      const applyFilters = () => {
        let updatedPosts = posts.content;
        if (statusFilter) {
          updatedPosts = updatedPosts.filter(
            (post: Post) => post.status === statusFilter
          );
        }
        setFilteredPosts(updatedPosts);
      };

      applyFilters();
    }
  }, [posts, statusFilter]);

  const togglePostSelection = (postId: number) => {
    setSelectedPosts(prevSelected =>
      prevSelected.includes(postId)
        ? prevSelected.filter(id => id !== postId)
        : [...prevSelected, postId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((post: Post) => post.id));
    }
  };

  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
  };

  const handleNextPage = () => {
    if (posts?.totalElements && currentPage < posts.totalElements - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <section className="font-sora flex flex-col gap-y-6">
      <PostFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        posts={filteredPosts}
        selectedCount={selectedPosts}
        totalCount={filteredPosts.length}
        toggleSelectAll={toggleSelectAll}
        setSearchTerm={setSearchTerm}
        onStatusFilterChange={handleStatusFilterChange}
      />

      <div className="flex flex-col gap-4 pb-[3rem]">
        {isLoading || isRefetching ? (
          <Loading />
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post: Post) => (
            <PostPreviewCard
              key={post.id}
              showFilters={showFilters}
              post={post}
              isSelected={selectedPosts.includes(post.id)}
              togglePostSelection={() => togglePostSelection(post.id)}
            />
          ))
        ) : (
          <>No posts found</>
        )}
        <PostPagination
          handlePrevious={handlePreviousPage}
          handleNext={handleNextPage}
          currentPage={currentPage + 1}
          numberOfElements={posts?.numberOfElements ?? 0}
          totalElements={posts?.totalElements ?? 0}
          pageSize={pageSize}
        />
      </div>
    </section>
  );
}
