/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from '@/components/ui/checkbox';
import Avatar from '@/assets/icons/avatar.svg';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Icon from '@/components/icons/Icon';
import { Post } from '@/types/posts.type';
import { cn } from '@/lib/utils';
import { usePOST } from '@/hooks/usePOST.hook';
import { useRef, useState, useEffect } from 'react';

type Props = {
  showFilters: boolean;
  post: Post;
  isSelected: boolean; // Whether the post is selected
  togglePostSelection: () => void; // Function to toggle selection
};

function PostPreviewCard({
  showFilters,
  post,
  isSelected,
  togglePostSelection,
}: Props) {
  const navigate = useNavigate();

  const { mutate: publishPost } = usePOST(`admin/posts/${post.id}/publish`, {
    contentType: 'multipart/form-data',
    callback: () => {
      toast.success('Post published successfully');
    },
  });

  const { mutate: archivePost } = usePOST(`admin/posts/${post.id}/archive`, {
    contentType: 'multipart/form-data',
    callback: () => {
      toast.success('Post has been archived');
    },
  });

  const handleArchivePost = (id: number) => {
    try {
      archivePost(id);
    } catch (error) {
      console.error('Archive error:', error);
    }
  };

  const handleViewPost = (id: number) => {
    navigate(`/posts/${id}`);
  };

  const handlePublishPost = (id: number) => {
    try {
      publishPost(id);
    } catch (error) {
      console.error('Publish error:', error);
    }
  };

  const date = new Date(post.createdAt);
  date.setDate(date.getDate());
  const formattedDate = date.toISOString().split('T')[0];

  const buttonRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const buttonElement = buttonRef.current;
    if (buttonElement) {
      buttonElement.addEventListener('mouseenter', handleMouseEnter);
      buttonElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (buttonElement) {
        buttonElement.removeEventListener('mouseenter', handleMouseEnter);
        buttonElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className="font-inter hover:border-secondary/70 group flex w-full items-center gap-x-4 rounded-xl border-2 border-white bg-white p-4 shadow-sm"
    >
      <div className="">
        {showFilters && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={togglePostSelection}
          />
        )}
      </div>
      <div className={`grid w-full grid-cols-10 gap-6`}>
        <picture className="col-span-1 aspect-square w-full overflow-hidden">
          <img
            src={post.coverImageUrl}
            alt="Thumbnail"
            className="aspect-square w-full object-cover"
          />
        </picture>
        <div className="col-span-9 space-y-1">
          <h5 className="font-normal text-textPrimary w-full max-w-xl truncate text-base">
            {post?.title
              ? post.title.charAt(0).toUpperCase() + post.title.slice(1)
              : 'No Title'}
          </h5>

          <div className="flex items-center justify-start gap-2">
            <span className="border-secondary text-secondary font-light flex w-fit items-center justify-center rounded-[4px] border bg-white p-0 px-2 text-xs">
              {post?.category?.name || 'No Category'}
            </span>
            <p
              className={cn(
                'fontlight text-xs capitalize',
                post?.status === 'DRAFT'
                  ? 'text-secondary'
                  : post?.status === 'PUBLISHED'
                    ? 'text-textPrimary'
                    : post?.status === 'ARCHIVED'
                      ? ' text-yellow-400'
                      : 'text-textPrimary'
              )}
            >
              {post?.status?.toLocaleLowerCase() || 'Unknown Status'}
            </p>
            &bull;
            <p className="font-normal text-txtColor text-xs">
              {post?.status === 'PUBLISHED'
                ? post.datePublished
                : formattedDate}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`flex w-full max-w-60 flex-col items-end justify-end gap-y-2`}
      >
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center justify-start gap-2">
            {post?.status === 'PUBLISHED' && (
              <PostButtons
                icon={<Icon name="archivePostIcon" />}
                label="Archive"
                onClick={() => handleArchivePost(post?.id)}
                isHovered={isHovered}
              />
            )}
            {post?.status === 'ARCHIVED' && (
              <PostButtons
                icon={<Icon name="publishPostIcon" />}
                label="Archive"
                onClick={() => handlePublishPost(post?.id)}
                isHovered={isHovered}
              />
            )}
            {post?.status === 'DRAFT' && (
              <PostButtons
                icon={<Icon name="publishPostIcon" />}
                label="Publish"
                onClick={() => handlePublishPost(post?.id)}
                isHovered={isHovered}
              />
            )}
            <PostButtons
              icon={<Icon name="viewPostIcon" />}
              label="View"
              onClick={() => handleViewPost(post?.id)}
              isHovered={isHovered}
            />
          </span>
          <p className="text-textPrimary font-normal text-xs">
            {post?.author || 'No Author'}
          </p>
          <picture className="aspect-square w-5">
            <img src={Avatar} alt="Avatar" />
          </picture>
        </div>
        <div className="text-txtColor flex items-start gap-4 text-xs font-semibold">
          <span className="flex items-center gap-2">
            {post.numberOfComments || 0}
            <Icon name="postCommentIcon" />
          </span>
          <span className="flex items-center gap-2">
            {post.numberOfLikes || 0}
            <Icon name="postInteractionIcon" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostPreviewCard;

type PostButtonActions = {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  isHovered: boolean;
};

export const PostButtons: React.FC<PostButtonActions> = ({
  icon,
  label,
  onClick,
  isHovered,
}) => {
  return (
    <button onClick={onClick} className="relative">
      {isHovered && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="relative flex aspect-square w-fit items-center justify-center">
                {icon}
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="bg-secondary border-none text-xs text-white"
            >
              {label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </button>
  );
};
