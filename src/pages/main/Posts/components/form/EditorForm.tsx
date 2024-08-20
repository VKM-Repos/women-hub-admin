import CustomFormField, { FormFieldType } from "@/components/form/custom-form-fields";
import { useForm } from "react-hook-form";
import { createBlogPostSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useCreatePostFormStore } from "@/store/useCreatePostForm.store";
import { useEffect } from "react";

type Props = {
  handleNext: () => void;
};

const EditorForm = ({ handleNext }: Props) => {
  const { data, setData } = useCreatePostFormStore();

  const form = useForm<z.infer<typeof createBlogPostSchema>>({
    resolver: zodResolver(createBlogPostSchema),
    defaultValues: {
      body: data.body || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createBlogPostSchema>) => {
    setData({
      ...values,
      body: values.body,
    });
    handleNext();
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const values = form.getValues();
      setData({
        ...data, 
        body: values.body, 
      });
      
    }, 3000);


    return () => clearInterval(interval);
  }, [form, data, setData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 flex flex-col gap-y-6">
        {/* Editor */}
        <CustomFormField
          fieldType={FormFieldType.EDITOR}
          control={form.control}
          name="body"
        />
      </form>
    </Form>
  );
};

export default EditorForm;
