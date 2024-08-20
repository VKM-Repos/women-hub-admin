import { useState } from 'react';
import PostFilters from './PostFilters';
import PostPreviewCard from './PostPreviewCard';
import { Post } from '@/types/posts.type';
import { useGET } from '@/hooks/useGET.hook';

export default function Posts() {
  const [showFilters, setShowFilters] = useState(false);

    const { data: posts } = useGET({
    url: "admin/posts",
    queryKey: ["posts"],
    withAuth: true,
    enabled: true,
  });

  return (
    <section className="flex flex-col gap-y-6">
      <PostFilters showFilters={showFilters} setShowFilters={setShowFilters} posts={posts?.content} />

      <div className="flex flex-col gap-4">
        {posts?.content?.length > 0 ? (
          posts?.content.map((post: Post) => (
            <PostPreviewCard key={post.id} showFilters={showFilters} post={post} />
          ))
        ) : (
          <>No post yet</>
        )}
      </div>
    </section>
  );
}
