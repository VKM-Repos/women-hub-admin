import { useNavigate, useParams } from 'react-router-dom';
import PostHeader from '../components/PostHeader';
import toast from 'react-hot-toast';
import Loading from '@/components/shared/Loading';
import EditEditorForm from './form/EditEditorForm';
import EditPostForm from './form/EditPostForm';
import { useGET } from '@/hooks/useGET.hook';
import { useEditPostFormStore } from '@/store/useEditPostForm.store';
import { usePOST } from '@/hooks/usePOST.hook';
import { useEffect, useState } from 'react';
import { usePATCH } from '@/hooks/usePATCH.hook';
import { AlertGoBack } from '../components/AlertGoBack';

const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { step, setStep, data, resetStore } = useEditPostFormStore();
  const [showDialog, setShowDialog] = useState(false);

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
        refetch();
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
        refetch();
      },
    }
  );
  const { mutate: draftPost, isPending: isDrafting } = usePOST(
    `admin/posts/${id}/drafts`,
    {
      callback: () => {
        toast.success('Post saved to draft');
        resetStore();
        navigate('/posts');
        refetch();
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
      refetch();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update post');
    }
  };

  const handleSaveToDraft = () => {
    try {
      draftPost(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      resetStore();
      navigate('/posts');
    }
  };

  const handleConfirmLeave = () => {
    navigate('/posts');
    resetStore();
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      setShowDialog(true);
    };

    window.addEventListener('popstate', handlePopState);
    window.history.pushState({ modalOpened: false }, '');

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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
      {(isLoading || isUpdating || isPublishing || isDrafting) && <Loading />}
      <section className="mx-auto w-full space-y-1 pb-[5rem] md:w-[95%]">
        <div className="relative w-full rounded-lg bg-white pb-[0rem]">
          <PostHeader
            step={step}
            post={post}
            handleGoBack={handleGoBack}
            handlePublish={handlePublish}
            handleUpdate={handleUpdate}
            handleSaveToDraft={handleSaveToDraft}
          />
          <RenderSteps />
        </div>
      </section>
      {showDialog && (
        <AlertGoBack
          onClick={handleConfirmLeave}
          isOpen={showDialog}
          setIsOpen={setShowDialog}
        />
      )}
    </>
  );
};

export default PostDetailsPage;
