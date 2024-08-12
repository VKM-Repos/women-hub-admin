import { useCreatePostFormStore } from "@/store/useCreatePostForm.store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditForm from "../components/form/EditForm";
import MDEditor from "../components/form/MDEditor";

const EditHeader = () => {
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
        return <EditForm />;
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
        <Header
          step={step}
          title={data?.postDetails?.title}
          handleGoBack={handleGoBack}
        />

        {RenderSteps()}
      </div>
      {step === 1 && <Footer handleNext={handleNext} />}
    </section>
  );
};

export default EditHeader;
