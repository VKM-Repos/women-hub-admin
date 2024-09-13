import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom-form-fields";
import { useForm } from "react-hook-form";
import { createGuideSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import "@mdxeditor/editor/style.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePOST } from "@/hooks/usePOST.hook";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Tag from "@/components/dashboard/Tag";
import Icon from "@/components/icons/Icon";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import "@mdxeditor/editor/style.css";
import { API_BASE_URLS } from "@/config/api.config";
import { usePATCH } from "@/hooks/usePATCH.hook";

const CreateGuidelineForm = () => {
  const navigate = useNavigate();

  // fetch the data attach to the link
  const { state } = useLocation();
  // const [selectedFile, setSelectedFile] = useState<File | string>("");
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [validationError, setValidationError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [coverPreview, setCoverPreview] = useState<string | null>(null);
  // const coverInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isPending: pendingCreatingGuideline } = usePOST(
    "guides-with-file",
    {
      baseURL: API_BASE_URLS.supportServive,
      contentType: "multipart/form-data",
    }
  );

  const { mutate: updPublishGuide } = usePATCH(
    `guides-with-file/${state.details?.id}`,
    {
      baseURL: API_BASE_URLS.supportServive,
      callback: () => {
        toast.success("Guide Published");
        setTimeout(() => {
          navigate("/support");
        }, 1000);
      },
    }
  );

  const form = useForm<z.infer<typeof createGuideSchema>>({
    resolver: zodResolver(createGuideSchema),
    defaultValues: {
      title: state.details?.title ? state.details.title : "",
      content: state.details?.content ? state.details.content : "",
      coverImage: state.details?.picture_path ? state.details.picture_path : "",
    },
  });

  const handleAutoSave = (content: string) => {
    console.log(content);
    // setData({
    //   ...data,
    //   body: content,
    // });
  };

  function onSubmit(data: z.infer<typeof createGuideSchema>) {
    if (state?.operation === "Edit") {
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      formData.append("file", data.coverImage);

      formData.append("status", "Published");

      updPublishGuide(formData, {
        onSuccess: () => {
          // setSelectedFile("");
          // setImagePreview(null);
          toast.success("Published", {
            position: "bottom-right",
            style: {
              backgroundColor: "green",
              color: "white",
              textAlign: "left",
            },
            icon: "",
          });

          setIsOpen(false);
          form.reset();
        },
        onError: (error) => {
          console.error("Error Updating and publishing Guideline:", error);
          alert("Error Updating and publishing Guideline.");
        },
      });
    } else {
      toast.success(`Added new guideline.........`, {
        position: "bottom-right",
        style: {
          backgroundColor: "green",
          color: "white",
          textAlign: "left",
        },
        icon: "",
      });

      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      formData.append("file", data.coverImage);

      formData.append("status", "Draft");

      mutate(formData, {
        onSuccess: () => {
          // setSelectedFile("");
          // setImagePreview(null);
          toast.success("Published", {
            position: "bottom-right",
            style: {
              backgroundColor: "green",
              color: "white",
              textAlign: "left",
            },
            icon: "",
          });

          setIsOpen(false);
          form.reset();
        },
        onError: (error) => {
          console.error("Error creating Guideline:", error);
          alert("Error creating Guideline.");
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className=" rounded-lg  w-full"
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="p-6 pb-[4rem] flex flex-col gap-y-6 bg-white">
          {/* TITLE */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="title"
            placeholder=""
            label="Title"
          />

          {/* UPLOAD FILE */}
          {state?.operation === "Edit" ? (
            <CustomFormField
              fieldType={FormFieldType.IMAGE_UPLOAD}
              control={form.control}
              name="coverImage"
              label="Cover Picture"
              initialImage={state.details?.picture_path}
              // initialImage={
              //   "https://dev.womenhub.org/api/images/7a88a52f-5967-4b94-8921-83d521df6b46.jpeg"
              // }
            />
          ) : (
            <CustomFormField
              fieldType={FormFieldType.IMAGE_UPLOAD}
              control={form.control}
              name="coverImage"
              label="Cover Picture"
            />
          )}

          {/* Editor */}
          <CustomFormField
            fieldType={FormFieldType.EDITOR}
            control={form.control}
            name="content"
            onAutoSave={handleAutoSave}
          />
        </div>

        <div className="flex h-full min-h-[5rem] w-full items-center mt-2 justify-between rounded-br-lg rounded-bl-lg bg-white shadow p-6">
          <Icon name="check" />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="lg">
                {state?.operation === "Edit" ? (
                  "Update and Save"
                ) : (
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Icon name="saveSupportIcon" />
                    </div>
                    <span>Save</span>
                  </div>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[425px]"
              onInteractOutside={(e: any) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>
                  <div className="mb-2">
                    <Tag title="Publish Article" color="bg-[#FFBC99]" />
                  </div>
                </DialogTitle>
                <hr />
                <DialogDescription>
                  <span className="text-[14px] mt-4 text-txtColor font-inter">
                    {state?.operation === "Edit"
                      ? "Do you want to save the changes and publish the guideline?"
                      : "This will publish this Guide to the Guidelines page."}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="justify-center">
                <div className="flex items-center justify-center gap-5">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                    className="bg-secondary text-white px-5 py-2 rounded-md"
                    disabled={pendingCreatingGuideline}
                  >
                    Confirm
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Form>
  );
};

export default CreateGuidelineForm;
