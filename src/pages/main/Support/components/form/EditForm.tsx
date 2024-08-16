import { useState } from "react";
import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom-form-fields";
import FileUploader from "@/components/form/file-uploader";
import Icon from "@/components/icons/Icon";
import { Label } from "@/components/ui/label";
import { useForm, useWatch } from "react-hook-form";
import { createBlogPostSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import Avatar from "@/assets/icons/avatar.svg";
import { useGET } from "@/hooks/useGET.hook";


type Props = {
  handleNext?: () => void;
};

const EditForm = ({}: Props) => {
  // Assuming you have the logged-in user data available
  const loggedInUser = { firstName: "Jane", lastName: "Doe" };

  const authors: any = [
    { name: "Women Hub" },
    { name: `${loggedInUser.firstName} ${loggedInUser.lastName}` },
    { name: "Other Editors" },
  ];

  const { data: categories } = useGET({
    url: "categories",
    queryKey: ["categories"],
    withAuth: false,
    enabled: true,
  });

  const form = useForm<z.infer<typeof createBlogPostSchema>>({
    resolver: zodResolver(createBlogPostSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      coverImageUrl: "",
      categoryId: "",
      body: "",
    },
  });

  const selectedAuthor = useWatch({
    control: form.control,
    name: "author",
  });


  return (
    <Form {...form}>
      <form className="p-6 flex flex-col gap-y-6">

        {/* UPLOAD FILE */}
        <fieldset className="space-y-2 w-[315px]">
          <Label
            className="text-base font-semibold flex gap-1 items-center"
            htmlFor="coverPhoto"
          >
            Cover photo <Icon name="info" />
          </Label>
          <FileUploader />
        </fieldset>


        {/* TITLE */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="title"
          placeholder=""
          label="Sub page title"
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
