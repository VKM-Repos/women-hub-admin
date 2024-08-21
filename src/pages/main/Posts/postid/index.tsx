import { useCreatePostFormStore } from '@/store/useCreatePostForm.store';
import PostHeader from '../components/PostHeader';
import PostForm from '../components/form/PostForm';
import EditorForm from '../components/form/EditorForm';
import { usePOST } from '@/hooks/usePOST.hook';
import toast from 'react-hot-toast';
import Loading from '@/components/shared/Loading';

const PostDetailsPage = () => {
  const { step, setStep, data } = useCreatePostFormStore();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const { mutate, isPending } = usePOST(
    'admin/posts',
    true,
    'multipart/form-data',
    () => {
      toast.success('Post created successfully');
    }
  );

  const onsubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('description', data.description);
      formData.append('categoryId', data.categoryId);
      formData.append('body', data.body);
      formData.append('coverImageUrl', data.coverImageUrl);

      mutate(formData);
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleSaveToDraft = () => {
    onsubmit();
  };
  const handlePublish = () => {
    // onsubmit()
    console.log('publish');
  };
  const handleUpdate = () => {
    // onsubmit()
    console.log('update');
  };

  console.log(data);

  const RenderSteps = () => {
    switch (step) {
      case 1:
        return <PostForm handleNext={handleNext} />;
      case 2:
        return <EditorForm handleNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <>
      {isPending && <Loading />}
      <section className="mx-auto w-full space-y-1 pb-[5rem] md:w-[95%]">
        <div className="relative w-full rounded-lg bg-white pb-[0rem]">
          <PostHeader
            step={step}
            title={data?.title}
            handleGoBack={handleGoBack}
            handleSaveToDraft={handleSaveToDraft}
            handlePublish={handlePublish}
            handleUpdate={handleUpdate}
          />
          {RenderSteps()}
        </div>
      </section>
    </>
  );
};

export default PostDetailsPage;
