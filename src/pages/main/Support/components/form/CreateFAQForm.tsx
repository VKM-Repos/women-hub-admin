import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom-form-fields";
import { useForm } from "react-hook-form";
import { createGuideSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { useGET } from "@/hooks/useGET.hook";
import { Category } from "@/types/category.types";

const CreateFAQForm = () => {
  // Assuming you have the logged-in user data available
  const loggedInUser = { firstName: "Jane", lastName: "Doe" };

  const { data: categories } = useGET({
    url: "categories",
    queryKey: ["categories"],
    withAuth: false,
    enabled: true,
  });

  const form = useForm<z.infer<typeof createGuideSchema>>({
    resolver: zodResolver(createGuideSchema),
    defaultValues: {
      title: "",
      description: "",
      coverImageUrl: "",
    },
  });

  return (
    <Form {...form}>
      <form className="p-6 flex flex-col gap-y-6">
        {/* CATEGORY */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="category"
          label="Category"
          placeholder="Select a category"
        >
          {categories?.content.map((category: Category) => (
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
          name="title"
          placeholder=""
          label="Add Question"
        />

        {/* Answer */}
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="Answer"
          label="Answer"
          placeholder="Enter description"
        />
      </form>
    </Form>
  );
};

export default CreateFAQForm;
