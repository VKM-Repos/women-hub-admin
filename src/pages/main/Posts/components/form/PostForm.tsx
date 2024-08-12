import { useState } from "react";
import CustomFormField, { FormFieldType } from "@/components/form/custom-form-fields";
import FileUploader from "@/components/form/file-uploader";
import Icon from "@/components/icons/Icon";
import { Label } from "@/components/ui/label";
import { useForm, useWatch } from "react-hook-form";
import { createBlogPostSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import Avatar from '@/assets/icons/avatar.svg';
import { useGET } from "@/hooks/useGET.hook";
import { Category } from "@/types/category.types";

type Props = {
  handleNext?: () => void;
};

const PostForm = ({ }: Props) => {
  
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

  console.log(selectedAuthor);
  

  return (
    <Form {...form}>
      <form className="p-6 flex flex-col gap-y-6">
        {/* TITLE */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="title"
          placeholder=""
          label="Title"
        />

        {/* AUTHORS */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="author"
          label="Author"
          placeholder="Select an author"
        >
          {authors.map((author: any) => (
            <SelectItem key={author.name} value={author.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <img
                  src={author.image ? author.image : Avatar}
                  width={32}
                  height={32}
                  alt="author"
                  className="rounded-full border border-dark-500"
                />
                <p>{author.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        {selectedAuthor === "Other Editors" && (
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name=""
            placeholder="Enter External Editor's Name"
            label="External Editor's Name"
          />
        )}

        {/* DESCRIPTION */}
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter description"
        />

        {/* UPLOAD FILE */}
        <fieldset className="space-y-2">
          <Label className="text-base font-semibold flex gap-1 items-center" htmlFor="coverPhoto">
            Cover photo <Icon name="info" />
          </Label>
          <FileUploader />
        </fieldset>

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
      </form>
    </Form>
  );
};

export default PostForm;
