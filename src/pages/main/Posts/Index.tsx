import { useState } from 'react';
import PostFilters from './PostFilters';
import PostPreviewCard from './PostPreviewCard';
import { Post } from '@/types/posts.type';
import { postData } from './post-mockup-data';

export default function Posts() {
  const [showFilters, setShowFilters] = useState(false);

  let posts: Post[] | any = postData 

  return (
    <section className="flex flex-col gap-y-6">
      <PostFilters showFilters={showFilters} setShowFilters={setShowFilters} posts={posts} />

      <div className="flex flex-col gap-4">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post: Post) => (
            <PostPreviewCard key={post.id} showFilters={showFilters} post={post} />
          ))
        ) : (
          <>No post yet</>
        )}
      </div>
    </section>
  );
}
