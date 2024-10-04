import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom-form-fields";
import { useForm } from "react-hook-form";
import { createFAQSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { usePOST } from "@/hooks/usePOST.hook";
import { Category } from "@/types/category.types";
import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URLS } from "@/config/api.config";
import { useLocation } from "react-router-dom";
import { usePATCH } from "@/hooks/usePATCH.hook";
import Header from "../Header";
import { useRef, useState } from "react";

const CreateFAQForm = () => {
  // fetch the data attach to the link
  const { state } = useLocation();
  const formRef = useRef<HTMLFormElement>(null); // Form reference

  const [saveDraft, setSaveDraft] = useState(false);

  const navigate = useNavigate();
  const { mutate, isPending: pendingCreatingFAQ } = usePOST("faqs", {
    baseURL: API_BASE_URLS.supportServive,
  });

  const { mutate: updPublishFAQ } = usePATCH(`faqs/${state.details?.id}`, {
    baseURL: API_BASE_URLS.supportServive,
    method: "PATCH",
    // callback: () => {
    //   toast.success("FAQ Published");
    //   setTimeout(() => {
    //     navigate(-1);
    //   }, 1000);
    // },
  });

  const categories = [
    {
      id: 1,
      name: "Getting Started",
      imageUrl: "May 8, 2024",
      createdAt: "May 8, 2024",
      updatedAt: "May 8, 2024",
    },
    {
      id: 2,
      name: "User Profiles",
      imageUrl: "May 8, 2024",
      createdAt: "May 8, 2024",
      updatedAt: "May 8, 2024",
    },
    {
      id: 3,
      name: "Features and Services",
      imageUrl: "May 8, 2024",
      createdAt: "May 8, 2024",
      updatedAt: "May 8, 2024",
    },
    {
      id: 4,
      name: "Community Engagement",
      imageUrl: "May 8, 2024",
      createdAt: "May 8, 2024",
      updatedAt: "May 8, 2024",
    },
    {
      id: 5,
      name: "Resources",
      imageUrl: "May 8, 2024",
      createdAt: "May 8, 2024",
      updatedAt: "May 8, 2024",
    },
    {
      id: 6,
      name: "Health and Wellness",
      imageUrl: "May 8, 2024",
      createdAt: "May 8, 2024",
      updatedAt: "May 8, 2024",
    },
    {
      id: 7,
      name: "Technology and Tools",
      imageUrl: "May 8, 2024",
      createdAt: "May 8, 2024",
      updatedAt: "May 8, 2024",
    },
    {
      id: 8,
      name: "Policies and Guidelines",
      imageUrl: "May 8, 2024",
      createdAt: "May 8, 2024",
      updatedAt: "May 8, 2024",
    },
  ];

  // const { data: categories } = useGET({
  //   url: "categories",
  //   queryKey: ["categories"],
  //   withAuth: true,
  //   enabled: true,
  // });

  const form = useForm<z.infer<typeof createFAQSchema>>({
    resolver: zodResolver(createFAQSchema),

    defaultValues: {
      question: state.details?.question ? state.details.question : "",
      answer: state.details?.answer ? state.details.answer : "",
      category: state.details?.category ? state.details.category : "",
      created_at: state.details?.created_at ? state.details.created_at : "",
      updated_at: state.details?.updated_at ? state.details.updated_at : "",
      status: "",
    },
  });

  function onSubmit(data: z.infer<typeof createFAQSchema>) {
    if (state?.operation === "Edit") {
      const timestamp = new Date().toISOString();

      data.updated_at = timestamp;
      data.status = "Published";

      updPublishFAQ(data, {
        onSuccess: () => {
          setSaveDraft(false);
          form.reset();
          navigate(-1);
          toast.success("FAQ has been updated");
        },
        onError: (error) => {
          setSaveDraft(false);
          console.error("Error Updating and publishing FAQ:", error);
          toast.error("Failed Updating FAQ.");
        },
      });
    } else {
      const timestamp = new Date().toISOString();
      data.created_at = timestamp;
      data.updated_at = timestamp;
      saveDraft ? (data.status = "Draft") : (data.status = "Published");

      mutate(data, {
        onSuccess: () => {
          form.reset();
          navigate(-1); // Navigate after successful submission
          saveDraft
            ? toast.success("FAQ has been draft")
            : toast.success("FAQ has been published");
          setSaveDraft(false);
        },
        onError: (error) => {
          setSaveDraft(false);
          console.error("Error creating FAQ:", error);
          toast.error("Failed creating FAQ.");
        },
      });
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="rounded-lg  w-full"
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission on Enter key
          }
        }}
      >
        <Header
          data={state}
          formRef={formRef}
          setSaveDraft={setSaveDraft}
          handleGoBack={handleGoBack}
        />
        <div className="p-6 pb-[4rem] flex flex-col gap-y-6 bg-white">
          {/* CATEGORY */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="category"
            label="Category"
            placeholder="Select a category"
          >
            {/* categories?.content.map((category: Category) */}
            {categories?.map((category: Category) => (
              <SelectItem key={category.name} value={category.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{category.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* Add Question */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="question"
            placeholder=""
            label="Add Question"
          />

          {/* Answer */}
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="answer"
            label="Answer"
            placeholder="Enter description"
          />
        </div>
        <section className="flex h-full min-h-[5rem] w-full items-center mt-2 justify-between rounded-br-lg rounded-bl-lg bg-white shadow p-6">
          <Icon name="check" />
          <Button
            variant="secondary"
            size="lg"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={pendingCreatingFAQ}
            className="w-[117px] h-[48px]"
          >
            {state.operation === "Edit" ? (
              "Update"
            ) : (
              <div className="flex items-center">
                <div className="mr-2">
                  <Icon name="saveSupportIcon" />
                </div>
                <span>Save</span>
              </div>
            )}
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default CreateFAQForm;
