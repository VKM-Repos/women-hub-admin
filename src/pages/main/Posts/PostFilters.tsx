import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PostButtons } from './PostPreviewCard';
import Icon from '@/components/icons/Icon';
import { Post } from '@/types/posts.type';

type Props = {
  showFilters: boolean;
  setShowFilters: any;
  posts: Post[]
};

const PostFilters = ({ showFilters, setShowFilters, posts }: Props) => {
  //   const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  return (
    <div className="w-full space-y-8">
      <div className="flex w-full justify-between">
        <div className="relative flex w-full max-w-sm items-center justify-start gap-3 rounded-lg bg-white p-2 shadow-sm">
          <SearchIcon />
          <input
            type="text"
            name=""
            placeholder="Search posts"
            className="w-full border-none bg-transparent focus:outline-none"
          />
        </div>
        <Link
          to={'/posts/create-post'}
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'lg' }),
            'flex gap-2'
          )}
        >
          <PlusIcon />
          New Post
        </Link>
      </div>
      <div className="flex w-full justify-between">
        <>
          {showFilters ? (
            <span className="flex items-center justify-start gap-4">
              <Checkbox></Checkbox>
              <p className="text-txtColor">{'0 of 3'}</p>
              <span className="flex items-center justify-start gap-2">
                <PostButtons
                  icon={<Icon name="archivePostIcon" />}
                  label="Archive"
                  onClick={() => {}}
                />

                <PostButtons
                  icon={<Icon name="publishPostIcon" />}
                  label="Publish"
                  onClick={() => {}}
                />

                <PostButtons
                  icon={<Icon name="deletePostIcon" />}
                  label="Delete"
                  onClick={() => {}}
                />
              </span>
            </span>
          ) : (
            <span className="text-textPrimary flex items-center gap-2">
              {`All (${posts.length})`}
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M4.2323 7.17695C4.36297 6.86915 4.66498 6.66927 4.99937 6.66927L14.9994 6.66927C15.3338 6.66927 15.6358 6.86915 15.7664 7.17695C15.8971 7.48476 15.8311 7.84086 15.5989 8.08142L11.165 12.6739C11.0472 12.796 10.9076 12.9408 10.7712 13.0485C10.6079 13.1776 10.3503 13.3359 9.99937 13.3359C9.64847 13.3359 9.39088 13.1776 9.2275 13.0485C9.09111 12.9408 8.95149 12.796 8.83376 12.6739L4.39986 8.08142C4.1676 7.84086 4.10163 7.48476 4.2323 7.17695Z"
                    fill="#1B1B1B"
                  />
                  <path
                    d="M15.7691 7.17695C15.6385 6.86915 15.3365 6.66927 15.0021 6.66927H10.8354L6.88867 10.6564L8.83646 12.6739L8.83649 12.6739C8.95422 12.796 9.09383 12.9408 9.23021 13.0485C9.39359 13.1776 9.65117 13.3359 10.0021 13.3359C10.353 13.3359 10.6106 13.1776 10.7739 13.0485C10.9103 12.9408 11.0499 12.796 11.1677 12.6739L11.1677 12.6739L15.6016 8.08142C15.8338 7.84086 15.8998 7.48475 15.7691 7.17695Z"
                    fill="#1B1B1B"
                  />
                </svg>
              </>
            </span>
          )}
        </>
        <button
          onClick={toggleFilters}
          className="text-textPrimary flex items-center gap-2"
        >
          {showFilters ? (
            ''
          ) : (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M10.8573 1.66406H9.14267C7.51912 1.66404 6.20951 1.66401 5.17944 1.81374C4.10446 1.96998 3.214 2.3039 2.51502 3.05956C1.82458 3.80599 1.52733 4.74133 1.3868 5.87128C1.24998 6.97151 1.24998 8.37581 1.25 10.1423V10.6858C1.24998 12.4523 1.24998 13.8566 1.3868 14.9568C1.52733 16.0868 1.82458 17.0221 2.51502 17.7686C3.14873 18.4536 3.94185 18.7939 4.89211 18.9675C5.81224 19.1356 6.95111 19.159 8.3308 19.1632C8.791 19.1646 9.16525 18.7926 9.16667 18.3324C9.16808 17.8721 8.79608 17.498 8.33583 17.4966C6.93178 17.4923 5.94166 17.4649 5.19161 17.3279C4.47167 17.1964 4.0534 16.9772 3.73852 16.6368C3.38553 16.2552 3.16106 15.7187 3.04073 14.7511C2.91818 13.7658 2.91667 12.4654 2.91667 10.6281V10.2001C2.91667 9.31798 2.91702 8.55956 2.93094 7.90042C2.93569 7.67565 3.12011 7.4974 3.34493 7.4974H16.655C16.8798 7.4974 17.0642 7.67575 17.069 7.90051C17.0796 8.39915 17.0825 8.9559 17.0831 9.58156C17.0836 10.0418 17.4571 10.4146 17.9173 10.4141C18.3776 10.4136 18.7502 10.0401 18.7498 9.5799C18.7481 7.98351 18.7344 6.6974 18.5868 5.67405C18.4363 4.63195 18.1348 3.76205 17.485 3.05956C16.786 2.3039 15.8956 1.96998 14.8206 1.81374C13.7905 1.66401 12.4809 1.66404 10.8573 1.66406Z"
                  fill="#1B1B1B"
                />
                <path
                  d="M5.83268 1.66927C5.83268 1.20904 5.45958 0.835938 4.99935 0.835938C4.53912 0.835938 4.16602 1.20904 4.16602 1.66927V2.04331C4.48295 1.94278 4.82063 1.871 5.17879 1.81895C5.38542 1.78891 5.60328 1.7649 5.83268 1.74571V1.66927Z"
                  fill="#1B1B1B"
                />
                <path
                  d="M15.8327 2.04331C15.5158 1.94278 15.1781 1.871 14.8199 1.81895C14.6133 1.78891 14.3954 1.7649 14.166 1.74571V1.66927C14.166 1.20904 14.5391 0.835938 14.9993 0.835938C15.4596 0.835938 15.8327 1.20904 15.8327 1.66927V2.04331Z"
                  fill="#1B1B1B"
                />
                <path
                  d="M14.1654 10.8359C14.7234 10.8359 15.1053 11.2544 15.3168 11.6828L15.9426 12.9449C15.9646 12.9714 15.9943 12.9932 16.026 13.0065L17.1563 13.1959C17.6253 13.2748 18.1166 13.5227 18.2819 14.0413C18.4469 14.5591 18.1909 15.0459 17.8543 15.3834L17.8535 15.3842L16.9751 16.2701C16.9567 16.3004 16.9428 16.3489 16.9436 16.3844L17.195 17.4807C17.3062 17.9669 17.3085 18.6084 16.8161 18.9704C16.3212 19.3342 15.7094 19.1351 15.2818 18.8804L14.2214 18.2474C14.1853 18.2394 14.1443 18.2369 14.1085 18.2484L13.0504 18.8801C12.6216 19.1367 12.0112 19.3326 11.5168 18.9689C11.0255 18.6074 11.025 17.9677 11.1368 17.4802L11.3882 16.3844C11.3892 16.3455 11.3768 16.3031 11.3567 16.2701L10.4768 15.3828C10.1422 15.0454 9.88726 14.5591 10.0508 14.0424C10.2153 13.5233 10.7062 13.2748 11.1758 13.1959L12.3028 13.007C12.3346 12.9928 12.362 12.9704 12.3855 12.945L13.0116 11.6824L13.0122 11.6813C13.2253 11.2536 13.6083 10.8359 14.1654 10.8359Z"
                  fill="#1B1B1B"
                />
              </svg>
            </>
          )}
          <p className="text-secondary">{showFilters ? 'Cancel' : 'Manage'}</p>
        </button>
      </div>
    </div>
  );
};

export default PostFilters;
