import { useNavigate, useParams } from 'react-router-dom';
import PostHeader from '../components/PostHeader';
import toast from 'react-hot-toast';
import Loading from '@/components/shared/Loading';
import EditEditorForm from './form/EditEditorForm';
import EditPostForm from './form/EditPostForm';
import { useGET } from '@/hooks/useGET.hook';
import { useEditPostFormStore } from '@/store/useEditPostForm.store';
import { usePOST } from '@/hooks/usePOST.hook';
import { useEffect } from 'react';
import { usePATCH } from '@/hooks/usePATCH.hook';

const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { step, setStep, data, resetStore } = useEditPostFormStore();

  const {
    data: post,
    isLoading,
    refetch,
  } = useGET({
    url: `admin/posts/${id}`,
    queryKey: ['posts details'],
    withAuth: true,
    enabled: true,
  });

  useEffect(() => {
    refetch();
  }, []);

  const { mutate: updatePost, isPending: isUpdating } = usePATCH(
    `admin/posts/${id}`,
    {
      callback: () => {
        toast.success('Post updated');
        resetStore();
        navigate('/posts');
      },
      contentType: 'multipart/form-data',
      method: 'PATCH',
    }
  );

  const { mutate: publishPost, isPending: isPublishing } = usePOST(
    `admin/posts/${id}/publish`,
    {
      callback: () => {
        toast.success('Post published');
        resetStore();
        navigate('/posts');
      },
    }
  );

  const handlePublish = () => {
    try {
      publishPost(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
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

      updatePost(formData);
    } catch (error) {
      console.log(error);
      toast.error('Failed to update post');
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleGoBack = () => {
    resetStore;
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const RenderSteps = () => {
    switch (step) {
      case 1:
        return <EditPostForm handleNext={handleNext} data={post} />;
      case 2:
        return <EditEditorForm handleNext={handleNext} data={post} />;
      default:
        return null;
    }
  };

  return (
    <>
      {(isLoading || isUpdating || isPublishing) && <Loading />}
      <section className="mx-auto w-full space-y-1 pb-[5rem] md:w-[95%]">
        <div className="relative w-full rounded-lg bg-white pb-[0rem]">
          <PostHeader
            step={step}
            post={post}
            handleGoBack={handleGoBack}
            handlePublish={handlePublish}
            handleUpdate={handleUpdate}
          />
          {<RenderSteps />}
        </div>
      </section>
    </>
  );
};

export default PostDetailsPage;
