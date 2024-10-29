import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import BlogImage from "@/assets/sample-blog-image.png";
// import { useCreatePostFormStore } from "@/store/useCreatePostForm.store";
// import { useEditPostFormStore } from "@/store/useEditPostForm.store";
// import ImageWithFallback from "@/components/shared/ImageWithFallBack";
// import { useGET } from "@/hooks/useGET.hook";
// import FooterSVG from "./components/FooterSVG";
import Footer from "@/assets/images/footer.png";
import { useCreateGuidelineFormStore } from "@/store/useCreateGuidelineForm.store";

const Preview = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const { data } = useCreateGuidelineFormStore();
  // const { data: editData } = useEditPostFormStore();
  // const { id } = useParams<{ id: string }>();

  // const today = new Date().toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "short",
  //   day: "2-digit",
  // });

  // const calculateReadTime = (text: string) => {
  //   const wordsPerMinute = 200; // Average reading speed
  //   const words = text?.split(" ").length;
  //   const readTime = Math.ceil(words / wordsPerMinute);
  //   return readTime;
  // };

  // const navigate = useNavigate();

  // const goBack = () => {
  //   navigate(-1);
  // };

  return (
    <div className="absolute inset-0 !z-[1000] !min-h-screen w-screen overflow-y-scroll bg-white pb-[4rem]">
      <div className="flex justify-center">
        <h1>{data.title}</h1>
      </div>

      <article className=" mx-auto mt-[5rem] w-[95%] max-w-[80%] space-y-10">
        <div
          className="tiptap font-quicksand space-y-6 overflow-hidden text-base font-medium md:text-lg"
          dangerouslySetInnerHTML={{
            __html: data.content,
            // __html: data.content ? data.content : editData?.content,
          }}
        />
      </article>
      <section className="mx-auto mt-[5rem] w-[95%] max-w-[80%] space-y-10">
        <img src={Footer} />
        {/* <FooterSVG /> */}
      </section>
    </div>
  );
};

export default Preview;
