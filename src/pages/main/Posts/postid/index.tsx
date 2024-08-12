import { useCreatePostFormStore } from '@/store/useCreatePostForm.store';
import PostHeader from '../components/PostHeader';
import PostFooter from '../components/PostFooter';
import PostForm from '../components/form/PostForm';
import MDEditor from '../components/form/MDEditor';


const PostDetailsPage = () => {
  const { step, setStep, data, setData, resetStore } = useCreatePostFormStore();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };


  const RenderSteps = () => {
    switch (step) {
      case 1:
        return <PostForm />;
      case 2:
        return <MDEditor handleNext={handleNext} handleGoBack={handleGoBack} />;
        // return <OrgStepComplete orgId={orgId} />;
      default:
        return null;
    }
  };

  return (
    <section className="mx-auto w-full space-y-1 md:w-[95%] pb-[5rem]">
      <div className="rounded-lg bg-white w-full pb-[4rem]">
      <PostHeader step={step} title={data?.postDetails?.title} handleGoBack={handleGoBack} />

      {RenderSteps()}

      </div>
      {step === 1 && <PostFooter handleNext={handleNext} />}
    </section>
  );
};

export default PostDetailsPage;


