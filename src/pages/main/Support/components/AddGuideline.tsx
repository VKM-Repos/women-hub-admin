import CreateGuidelineForm from "./form/CreateGuidelineForm";

const AddGuideline = () => {
  return (
    <section className="mx-auto w-full space-y-1 md:w-[95%] pb-[5rem]">
      {/* <Header step={step} data={state} handleGoBack={handleGoBack} /> */}
      <CreateGuidelineForm />
    </section>
  );
};

export default AddGuideline;
