import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom-form-fields";
import { useForm } from "react-hook-form";
import { createGuideSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";

type Props = {
  data: any;
};

const EditForm = ({ data }: Props) => {
  const form = useForm<z.infer<typeof createGuideSchema>>({
    resolver: zodResolver(createGuideSchema),
    defaultValues: {
      title: data.title,
      body: data.description,
      coverImageUrl: data.coverImageUrl,
    },
  });

  return (
    <Form {...form}>
      <form className="p-6 flex flex-col gap-y-6">
        {/* UPLOAD FILE */}
        <div className="w-[315px]">
          <CustomFormField
            fieldType={FormFieldType.IMAGE_UPLOAD}
            control={form.control}
            name="coverImageUrl"
            label="Cover Picture"
          />
        </div>

        {/* TITLE */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="title"
          placeholder=""
          label="Title"
        />

        {/* DESCRIPTION */}
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter description"
        />
      </form>
    </Form>
  );
};

export default EditForm;
