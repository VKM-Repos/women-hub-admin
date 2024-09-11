import Header from "../components/Header";
import { useEditSupportHeaderForm } from "@/store/useEditSupportHeaderForm.store";

import CreateGuidelineForm from "./form/CreateGuidelineForm";

const AddGuideline = () => {
  const { step, setStep } = useEditSupportHeaderForm();

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <section className="mx-auto w-full space-y-1 md:w-[95%] pb-[5rem]">
      <Header step={step} title={"Add Guideline"} handleGoBack={handleGoBack} />
      <CreateGuidelineForm />;
    </section>
  );
};

export default AddGuideline;
