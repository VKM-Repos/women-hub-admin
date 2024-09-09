import { useCreatePostFormStore } from '@/store/useCreatePostForm.store';
import PostHeader from '../components/PostHeader';
import PostForm from '../components/form/PostForm';
import EditorForm from '../components/form/EditorForm';
import { usePOST } from '@/hooks/usePOST.hook';
import toast from 'react-hot-toast';
import Loading from '@/components/shared/Loading';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { step, setStep, data, resetStore } = useCreatePostFormStore();

  const { mutate: createPost, isPending: isCreating } = usePOST('admin/posts', {
    callback: response => {
      console.log(response);
    },
    contentType: 'multipart/form-data',
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleGoBack = () => {
    resetStore;
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSaveToDraft = () => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('description', data.description);
      formData.append('categoryId', data.categoryId);
      formData.append('body', data.body);
      if (data?.coverImage) {
        formData.append('coverImage', data.coverImage);
      }
      formData.append('publish', 'false');

      createPost(formData);
      toast.success('Saved to drafts');
      resetStore();
      navigate('/posts');
    } catch (error) {
      console.log(error);
      toast.error('Failed to create post');
    }
  };

  const handlePublish = async () => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('description', data.description);
      formData.append('categoryId', data.categoryId);
      formData.append('body', data.body);
      formData.append('coverImage', data.coverImage);
      formData.append('publish', 'true');

      createPost(formData);
      toast.success('Post has been published');
      resetStore();
      navigate('/posts');
    } catch (error) {
      console.log(error);
      toast.error('Failed to publish post');
    }
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
      {isCreating && <Loading />}
      <section className="mx-auto w-full space-y-1 pb-[5rem] md:w-[95%]">
        <div className="relative w-full rounded-lg bg-white pb-[0rem]">
          <PostHeader
            step={step}
            post={data}
            handleGoBack={handleGoBack}
            handleSaveToDraft={handleSaveToDraft}
            handlePublish={handlePublish}
          />
          {RenderSteps()}
        </div>
      </section>
    </>
  );
};

export default CreatePostPage;
