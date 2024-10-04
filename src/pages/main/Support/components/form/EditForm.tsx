import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom-form-fields";
import { useForm } from "react-hook-form";
import { editHeaderSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import { useLocation } from "react-router-dom";

import Icon from "@/components/icons/Icon";

const EditForm = () => {
  const { state } = useLocation();
  console.log(state.data?.coverImageUrl);

  const form = useForm<z.infer<typeof editHeaderSchema>>({
    resolver: zodResolver(editHeaderSchema),
    defaultValues: {
      title: state.data?.title,
      description: state.data?.description,
      coverImage: state.data?.coverImageUrl,
    },
  });

  return (
    <Form {...form}>
      <form
        // className="p-6 flex flex-col gap-y-6"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission on Enter key
          }
        }}
      >
        <Header data={state} />
        <div className="p-6 pb-[4rem] flex flex-col gap-y-6 bg-white">
          {/* UPLOAD FILE */}
          <div className="w-[315px]">
            <CustomFormField
              fieldType={FormFieldType.IMAGE_UPLOAD}
              control={form.control}
              name="coverImage"
              label="Cover Picture"
              initialImage={state.data?.coverImageUrl}
            />
          </div>

          {/* TITLE */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="title"
            placeholder="Title"
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
        </div>

        <section className="flex h-full min-h-[5rem] w-full items-center mt-2 justify-between rounded-br-lg rounded-bl-lg bg-white shadow p-6">
          <Icon name="check" />
          <Button
            variant="secondary"
            size="lg"
            type="submit"
            // onClick={form.handleSubmit(onSubmit)}
            // disabled={pendingCreatingFAQ}
          >
            Update
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default EditForm;
