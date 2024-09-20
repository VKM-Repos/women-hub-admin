import EditForm from "../components/form/EditForm";

import { useLocation } from "react-router-dom";

const EditHeader = () => {
  const location = useLocation();
  const guide = location.state?.data;

  return (
    <section className="mx-auto w-full space-y-1 md:w-[95%] pb-[5rem]">
      <div className="rounded-lg bg-white w-full pb-[4rem]">
        {/* <Header
          step={step}
          data={data?.headerDetails?.title}
          handleGoBack={handleGoBack}
        /> */}

        <EditForm data={guide} />
      </div>
    </section>
  );
};

export default EditHeader;
