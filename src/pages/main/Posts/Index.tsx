import { useEffect, useState } from 'react';
import PostFilters from './PostFilters';
import PostPreviewCard from './PostPreviewCard';
import { Post } from '@/types/posts.type';
import { useGET } from '@/hooks/useGET.hook';
import Loading from '@/components/shared/Loading';

export default function Posts() {
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useGET({
    url: 'admin/posts',
    queryKey: ['posts'],
    withAuth: true,
    enabled: true,
  });

  useEffect(() => {
    refetch();
  }, [posts]);

  return (
    <section className="flex flex-col gap-y-6">
      <PostFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        posts={posts?.content}
      />

      <div className="flex flex-col gap-4">
        {isLoading || isRefetching ? (
          <Loading />
        ) : posts?.content?.length > 0 ? (
          posts?.content.map((post: Post) => (
            <PostPreviewCard
              key={post.id}
              showFilters={showFilters}
              post={post}
            />
          ))
        ) : (
          <>No post yet</>
        )}
      </div>
    </section>
  );
}
