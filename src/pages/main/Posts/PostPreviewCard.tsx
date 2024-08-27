import { Checkbox } from '@/components/ui/checkbox';
import Thumbnail from '@/assets/images/women-hub-img-thumbnail.png';
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

type Props = {
  showFilters: boolean;
  post: Post;
};

function PostPreviewCard({ showFilters, post }: Props) {
  const navigate = useNavigate();

  const { mutate: publishPost } = usePOST(
    `admin/posts/${post.id}/publish`,
    true,
    'multipart/form-data',
    () => {
      toast.success('Post published successfully');
    }
  );

  const handleArchivePost = (id: number) => {
    try {
      toast.success(`Post ${id} archived`);
      // Implement actual archiving logic here
    } catch (error) {
      console.error('Archive error:', error);
    }
  };

  const handleDeletePost = (id: number) => {
    try {
      toast.success(`Post ${id} deleted`);
      // Implement actual deleting logic here
    } catch (error) {
      console.error('Delete error:', error);
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
  date.setDate(date.getDate() - 4);
  const formattedDate = date.toISOString().split('T')[0];

  return (
    <div className="font-inter hover:border-secondary/70 group flex w-full items-center rounded-xl border-2 border-white bg-white p-4 shadow-sm">
      {showFilters && (
        <div className="w-[4rem]">
          <Checkbox></Checkbox>
        </div>
      )}
      <div className={`grid w-full grid-cols-10 gap-6`}>
        <picture className="col-span-1 aspect-square w-full">
          <img src={Thumbnail} alt="Thumbnail" />
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
                'text-xs font-bold capitalize',
                post?.status === 'DRAFT' ? 'text-secondary' : 'text-textPrimary'
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
          <span className="invisible flex items-center justify-start gap-2 group-hover:visible">
            {post.status === 'PUBLISHED' && (
              <PostButtons
                icon={<Icon name="archivePostIcon" />}
                label="Archive"
                onClick={() => handleArchivePost(post?.id)}
              />
            )}
            {post.status === 'DRAFT' && (
              <PostButtons
                icon={<Icon name="publishPostIcon" />}
                label="Publish"
                onClick={() => handlePublishPost(post?.id)}
              />
            )}
            <PostButtons
              icon={<Icon name="viewPostIcon" />}
              label="View"
              onClick={() => handleViewPost(post?.id)}
            />
            <PostButtons
              icon={<Icon name="deletePostIcon" />}
              label="Delete"
              onClick={() => handleDeletePost(post?.id)}
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
};

export const PostButtons: React.FC<PostButtonActions> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={''}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="relative flex aspect-square w-fit items-center justify-center ">
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
    </button>
  );
};
