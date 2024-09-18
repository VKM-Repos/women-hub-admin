import Header from "../components/Header";
import { useEditSupportHeaderForm } from "@/store/useEditSupportHeaderForm.store";
import { useLocation } from "react-router-dom";
import CreateGuidelineForm from "./form/CreateGuidelineForm";

const AddGuideline = () => {
  const { state } = useLocation();
  const { step, setStep } = useEditSupportHeaderForm();

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <section className="mx-auto w-full space-y-1 md:w-[95%] pb-[5rem]">
      <Header step={step} data={state} handleGoBack={handleGoBack} />
      <CreateGuidelineForm />;
    </section>
  );
};

export default AddGuideline;
