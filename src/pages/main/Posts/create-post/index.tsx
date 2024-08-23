import { useCreatePostFormStore } from '@/store/useCreatePostForm.store';
import PostHeader from '../components/PostHeader';
import PostForm from '../components/form/PostForm';
import EditorForm from '../components/form/EditorForm';
import { usePOST } from '@/hooks/usePOST.hook';
import toast from 'react-hot-toast';
import Loading from '@/components/shared/Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const navigate = useNavigate()
  const { step, setStep, data, resetStore } = useCreatePostFormStore();
  const [postId, setPostId] = useState<string | null>(null); // Store the created post ID

  const { mutate: createPost, isPending: isCreating } = usePOST(
    'admin/posts',
    true,
    'multipart/form-data',
    (response: any) => {
      setPostId(response?.id);
    },
  );

  const { mutate: publishPost, isPending: isPublishing } = usePOST(
    `admin/posts/${postId}/publish`,
    true,
    'application/json',
    () => {
      toast.success('Post published successfully');
    },
  );

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onsubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('description', data.description);
      formData.append('categoryId', data.categoryId);
      formData.append('body', data.body);
      formData.append('coverImageUrl', data.coverImageUrl);

      createPost(formData);
    } catch (error: any) {
      console.log(error);
      toast.error('Failed to submit post');
    }
  };

  const handleSaveToDraft = () => {
    onsubmit(); 
    toast.success('Post created successfully');
    resetStore()
    navigate('/posts')
  };

  const handlePublish = async () => {
    try {
      // Step 1: Create the post
      await onsubmit();

      // Step 2: Publish the post after the ID is set
      if (postId) {
        publishPost(postId);
      } else {
        toast.error('Failed to retrieve post ID');
      }
    } catch (error: any) {
      console.log(error);
      toast.error('Failed to publish post');
    }
  };

  const handleUpdate = () => {
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
      {(isCreating || isPublishing) && <Loading />}
      <section className="mx-auto w-full space-y-1 pb-[5rem] md:w-[95%]">
        <div className="relative w-full rounded-lg bg-white pb-[0rem]">
          <PostHeader
            step={step}
            post={data}
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

export default CreatePostPage;
