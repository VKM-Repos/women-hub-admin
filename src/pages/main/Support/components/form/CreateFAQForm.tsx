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

const CreateFAQForm = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const { mutate, isPending: pendingCreatingFAQ } = usePOST("faqs", {
    baseURL: API_BASE_URLS.supportServive,
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
      created_at: state.details?.created_at ? state.details.created_at : "",
      updated_at: state.details?.updated_at ? state.details.updated_at : "",
      status: "",
    },
  });

  function onSubmit(data: z.infer<typeof createFAQSchema>) {
    toast.success(`Added FAQ.........`, {
      position: "bottom-right",
      style: {
        backgroundColor: "green",
        color: "white",
        textAlign: "left",
      },
      icon: "",
    });
    const timestamp = new Date().toISOString();
    data.created_at = timestamp;
    data.updated_at = timestamp;
    data.status = "Draft";

    mutate(data, {
      onSuccess: () => {
        toast.success("Published", {
          position: "bottom-right",
          style: {
            backgroundColor: "green",
            color: "white",
            textAlign: "left",
          },
          icon: "",
        });

        form.reset();
        navigate("/"); // Navigate after successful submission
      },
      onError: (error) => {
        console.error("Error creating FAQ:", error);
        toast.error("Error creating FAQ.");
      },
    });
  }

  return (
    <Form {...form}>
      <form
        className="rounded-lg  w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
          >
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default CreateFAQForm;
