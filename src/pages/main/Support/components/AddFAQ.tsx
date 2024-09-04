import Header from "../components/Header";
import MDEditor from "../components/form/MDEditor";
import { useEditSupportHeaderForm } from "@/store/useEditSupportHeaderForm.store";
import CreateFAQForm from "./form/CreateFAQForm";

const AddFAQ = () => {
  const { step, setStep } = useEditSupportHeaderForm();

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
        return <CreateFAQForm />;
      case 2:
        return <MDEditor handleNext={handleNext} handleGoBack={handleGoBack} />;

      default:
        return null;
    }
  };

  return (
    <section className="mx-auto w-full space-y-1 md:w-[95%] pb-[5rem]">
      <Header step={step} title={"Add FAQ"} handleGoBack={handleGoBack} />
      <CreateFAQForm />;
    </section>
  );
};

export default AddFAQ;
