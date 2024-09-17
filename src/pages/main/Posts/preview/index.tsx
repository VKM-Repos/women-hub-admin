import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogImage from '@/assets/sample-blog-image.png';
import NewsLetterSVG from './components/NewsLetterSVG';
import { useCreatePostFormStore } from '@/store/useCreatePostForm.store';
import { useEditPostFormStore } from '@/store/useEditPostForm.store';
import ImageWithFallback from '@/components/shared/ImageWithFallBack';
import { useGET } from '@/hooks/useGET.hook';

const PostPreview = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // const { id } = useParams<{ id: string }>();

  const { data } = useCreatePostFormStore();
  const { data: editData } = useEditPostFormStore();

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text?.split(' ').length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
  };

  const readTime = calculateReadTime(data?.body ? data?.body : editData?.body);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { data: category } = useGET({
    url: `admin/categories/${data?.categoryId ? data?.categoryId : editData?.categoryId}`,
    queryKey: ['categories'],
    withAuth: false,
    enabled: true,
  });

  return (
    <div className="absolute inset-0 !z-[1000] !min-h-screen w-screen overflow-y-scroll bg-white pb-[4rem]">
      <section className="bg-textPrimary mx-auto mt-[2rem] grid h-[28rem] w-full grid-cols-1 rounded-[1rem] p-4 md:grid-cols-2 md:p-12 lg:w-[90%]">
        <div className=" relative col-span-1 flex flex-col items-start justify-center gap-2">
          <button onClick={goBack} className="absolute -top-5 left-0">
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1541 26.8945L5.95741 17.6979C5.81807 17.5585 5.71914 17.4076 5.66061 17.245C5.60302 17.0824 5.57422 16.9082 5.57422 16.7225C5.57422 16.5367 5.60302 16.3625 5.66061 16.1999C5.71914 16.0373 5.81807 15.8864 5.95741 15.747L15.1541 6.55039C15.4095 6.29493 15.7286 6.16116 16.1114 6.14908C16.495 6.13793 16.8262 6.2717 17.1049 6.55039C17.3836 6.80585 17.5289 7.12495 17.541 7.50768C17.5522 7.89134 17.4184 8.22251 17.1397 8.5012L10.3119 15.329H25.8835C26.2783 15.329 26.6095 15.4623 26.877 15.7289C27.1436 15.9965 27.2769 16.3276 27.2769 16.7225C27.2769 17.1173 27.1436 17.448 26.877 17.7146C26.6095 17.9821 26.2783 18.1159 25.8835 18.1159H10.3119L17.1397 24.9437C17.3952 25.1992 17.5289 25.5243 17.541 25.9191C17.5522 26.3139 17.4184 26.6391 17.1397 26.8945C16.8842 27.1732 16.5591 27.3125 16.1643 27.3125C15.7695 27.3125 15.4328 27.1732 15.1541 26.8945Z"
                fill="white"
              />
            </svg>
          </button>
          <span className="bg-secondary rounded-lg p-1 px-2 text-xs text-white">
            {category?.name}
          </span>
          <h2 className="font-sora max-w-md text-pretty text-[2.5rem] font-semibold text-white">
            {data.title ? data.title : editData.title}
          </h2>
          <p className="font-light font-quicksand text-sm text-white">
            Published by:{' '}
            <strong>{data.author ? data.author : editData.author}</strong> •{' '}
            {today}
          </p>
          <p className="font-light font-quickSand text-sm text-white">
            {readTime} mins Read
          </p>
        </div>
        <div className="relative col-span-1">
          <div className="absolute left-5 top-3 z-[10] mx-auto hidden aspect-video w-full rounded-[1rem] bg-[#B5FFE1] md:block" />
          <span className="relative z-[15] w-full overflow-hidden ">
            <ImageWithFallback
              src={
                data?.coverImagePreview
                  ? data?.coverImagePreview
                  : (editData?.coverImagePreview as string)
                    ? (editData?.coverImagePreview as string)
                    : BlogImage
              }
              fallbackSrc={BlogImage}
              aspectRatio={{ width: 100, height: 55 }}
              alt={data?.title}
              className="relative z-[15] mx-auto aspect-video w-full overflow-hidden rounded-[1rem] bg-white object-cover p-0.5"
            />
          </span>
        </div>
      </section>

      <article className=" mx-auto mt-[5rem] w-[95%] max-w-[80%] space-y-10">
        <div
          className="tiptap font-quicksand space-y-6 overflow-hidden text-base font-medium md:text-lg"
          dangerouslySetInnerHTML={{
            __html: data.body ? data.body : editData?.body,
          }}
        />
      </article>
      <section className="mx-auto mt-[5rem] w-[95%] max-w-[80%] space-y-10">
        <NewsLetterSVG />
      </section>
    </div>
  );
};

export default PostPreview;
