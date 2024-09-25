import CreateFAQForm from "./form/CreateFAQForm";

const AddFAQ = () => {
  return (
    <section className="mx-auto w-full space-y-1 md:w-[95%] pb-[5rem]">
      {/* <Header step={step} data={state} handleGoBack={handleGoBack} /> */}
      <CreateFAQForm />
    </section>
  );
};

export default AddFAQ;
