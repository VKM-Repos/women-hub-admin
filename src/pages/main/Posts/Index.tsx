import { useEffect, useState } from 'react';
import PostFilters from './PostFilters';
import PostPreviewCard from './PostPreviewCard';
import { Post } from '@/types/posts.type';
import { useGET } from '@/hooks/useGET.hook';
import Loading from '@/components/shared/Loading';

export default function Posts() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Conditional URL based on whether searchTerm is empty or not
  const apiUrl = searchTerm
    ? `admin/posts/search?title=${searchTerm}`
    : 'admin/posts';

  // Fetching posts based on search term or all posts
  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useGET({
    url: apiUrl,
    queryKey: searchTerm ? ['posts', searchTerm] : ['posts'],
    withAuth: true,
    enabled: true,
  });

  useEffect(() => {
    console.log('Fetched posts:', posts);
  }, [posts]);

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  useEffect(() => {
    if (posts?.content) {
      const applyFilters = () => {
        let updatedPosts = posts.content;
        if (statusFilter) {
          updatedPosts = updatedPosts.filter(
            post => post.status === statusFilter
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

  return (
    <section className="flex flex-col gap-y-6">
      <PostFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        posts={posts?.content}
        selectedCount={selectedPosts}
        totalCount={posts?.content.length}
        toggleSelectAll={toggleSelectAll}
        setSearchTerm={setSearchTerm}
        onStatusFilterChange={handleStatusFilterChange}
      />

      <div className="flex flex-col gap-4">
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
      </div>
    </section>
  );
}
