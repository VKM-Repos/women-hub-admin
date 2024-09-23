import MoreOptions from '@/components/common/dropdowns/MoreOptions';
import Icon from '@/components/icons/Icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCreatePostFormStore } from '@/store/useCreatePostForm.store';
import { useEditPostFormStore } from '@/store/useEditPostForm.store';
import { Post } from '@/types/posts.type';
import { Link } from 'react-router-dom';
import { AlertGoBack } from './AlertGoBack';

type Props = {
  step: number;
  post?: Partial<Post>;
  handleGoBack: () => void;
  handleSaveToDraft?: () => void;
  handlePublish: () => void;
  handleUpdate?: () => void;
};
type OptionsMenu = {
  title: string;
  isButton: boolean;
  onClick: () => void;
};

const PostHeader = ({
  step,
  post,
  handleGoBack,
  handleSaveToDraft,
  handlePublish,
  handleUpdate,
}: Props) => {
  const menu: OptionsMenu[] = [
    {
      title: 'Save to drafts',
      isButton: true,
      onClick: () => {
        handleSaveToDraft?.();
      },
    },
    ...(post?.status === 'DRAFT'
      ? [
          {
            title: 'Update',
            isButton: true,
            onClick: () => {
              handleUpdate?.();
            },
          },
        ]
      : []),
  ];

  const { data } = useCreatePostFormStore();
  const { data: editData } = useEditPostFormStore();

  return (
    <header className="grid min-h-[5rem] grid-cols-2 items-center justify-between p-4">
      <div className="col-span-1 flex w-full items-center justify-start gap-4">
        <div className="h-[40px] w-[20px] rounded bg-[#B5E4CA]"></div>
        <h2 className="w-full max-w-[300px] truncate text-xl font-semibold">
          {post?.title
            ? post.title
            : data?.title
              ? data.title
              : editData?.title
                ? editData.title
                : 'Add post'}
        </h2>
      </div>
      <div className=" col-span-1 flex items-center justify-end gap-x-4">
        <AlertGoBack onClick={handleGoBack} />
        {step > 1 && (
          <>
            <Link
              to={`/posts/${post?.id}/preview`}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'flex items-center gap-1'
              )}
            >
              <Icon name="eyeIcon" />
              <span>Preview</span>
            </Link>
            <Button
              onClick={() => {
                post?.id && post?.status !== 'DRAFT'
                  ? handleUpdate?.()
                  : handlePublish?.();
              }}
              variant="outline"
              className="flex items-center gap-1"
            >
              {post?.id && post?.status !== 'DRAFT' ? (
                <Icon name="publishIcon" />
              ) : (
                <Icon name="publishIcon" />
              )}
              <span>
                {post?.id && post?.status !== 'DRAFT' ? 'Update' : 'Publish'}
              </span>
            </Button>
            <MoreOptions label="more options" menu={menu} />
          </>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
