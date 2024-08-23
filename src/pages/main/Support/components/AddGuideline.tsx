import Header from "../components/Header";
import Footer from "../components/Footer";
import MDEditor from "../components/form/MDEditor";
import { useEditSupportHeaderForm } from "@/store/useEditSupportHeaderForm.store";

import CreateGuidelineForm from "./form/CreateGuidelineForm";

const AddGuideline = () => {
  const { step, setStep, data, setData, resetStore } =
    useEditSupportHeaderForm();

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
        return <CreateGuidelineForm />;
      case 2:
        return <MDEditor handleNext={handleNext} handleGoBack={handleGoBack} />;

      default:
        return null;
    }
  };

  return (
    <section className="mx-auto w-full space-y-1 md:w-[95%] pb-[5rem]">
      <div className="rounded-lg bg-white w-full pb-[4rem]">
        <Header
          step={step}
          title={data?.headerDetails?.title}
          handleGoBack={handleGoBack}
        />

        {RenderSteps()}
      </div>
      {step === 1 && <Footer handleNext={handleNext} />}
    </section>
  );
};

export default AddGuideline;
