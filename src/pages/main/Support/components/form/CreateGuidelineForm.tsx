import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom-form-fields";
import { useForm } from "react-hook-form";
import { createGuideSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import "@mdxeditor/editor/style.css";

import { Button } from "@/components/ui/button";
import { usePOST } from "@/hooks/usePOST.hook";
import { useGET } from "@/hooks/useGET.hook";
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
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Dropzone, { DropzoneInputProps } from "react-dropzone";

const defaultSnippetContent = `
export default function App() {
return (
<div className="App">
<h1>Hello CodeSandbox</h1>
<h2>Start editing to see some magic happen!</h2>
</div>
);
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

import {
  MDXEditor,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  SandpackConfig,
  ShowSandpackInfo,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { API_BASE_URLS } from "@/config/api.config";

const CreateGuidelineForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isPending: pendingCreatingGuideline } = usePOST(
    "guides-with-file",
    {
      baseURL: API_BASE_URLS.supportServive,
      contentType: "multipart/form-data",
    }
  );

  // Handle image change
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);

      // Set the corresponding state based on the type

      setCoverPreview(imageUrl);
      setSelectedFile(imageFile);
    }
  };

  const form = useForm<z.infer<typeof createGuideSchema>>({
    resolver: zodResolver(createGuideSchema),
    defaultValues: {
      title: "",
      body: "",
      coverImageUrl: "",
    },
  });

  const handleChooseFile = () => {
    coverInputRef.current?.click();
  };

  function onSubmit(data: z.infer<typeof createGuideSchema>) {
    if (!selectedFile) {
      setValidationError(true);
      return;
    }
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
    formData.append("content", data.body);
    if (selectedFile instanceof File) {
      formData.append("file", selectedFile);
    }
    formData.append("status", "Draft");

    console.log(selectedFile);
    console.log(formData);

    mutate(formData, {
      onSuccess: () => {
        setSelectedFile("");
        setImagePreview(null);
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

          {/* Image */}
          <div className="rounded-md w-full ">
            <div className="bg-gray-200 h-[200px] rounded-md flex justify-center items-center w-full">
              <img
                src={
                  coverPreview ||
                  "https://placehold.co/400x400?text=Cover%20Picture"
                }
                alt=""
                className="h-[200px] max-h-[200px] w-full object-cover rounded-md aspect-auto"
              />
              <input
                ref={coverInputRef}
                type="file"
                onChange={(e) => handleImageChange(e)}
                name="image"
                className="hidden"
                accept="image/*"
              />
              <Button
                variant="outline"
                className="flex items-center gap-2 absolute"
                onClick={() => handleChooseFile()}
                type="button"
              >
                <Icon name="upload" /> Click or drop image
              </Button>
            </div>
            {validationError && (
              <p className="text-xs text-red-500 px-1 mt-1">
                Image field is required
              </p>
            )}
          </div>

          {/* Editor */}
          <CustomFormField
            fieldType={FormFieldType.EDITOR}
            control={form.control}
            name="body"
          />

          {/* <section className="w-full mx-auto border-2 bg-background rounded-[1rem] min-h-screen overflow-hidden">
            
            <div className="w-full min-h-[4rem] flex gap-4 items-center justify-start px-2 bg-white">
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="h-5 w-5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="h-5 w-5" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline"
                  aria-label="Toggle underline"
                >
                  <Underline className="h-5 w-5" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="strikethrough"
                  aria-label="Toggle strikethrough"
                >
                  <Strikethrough className="h-5 w-5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="emoticon" aria-label="Toggle emoticon">
                  <SmileIcon className="h-5 w-5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="link" aria-label="Toggle link">
                  <Link2 className="h-5 w-5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="Toggle list">
                  <List className="h-5 w-5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="align" aria-label="Toggle align">
                  <AlignCenter className="h-5 w-5" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            
            <div className="w-[75%] mt-[2rem] mx-auto bg-white min-h-[120dvh] ">
              <MDXEditor
                markdown=""
                plugins={[
                  codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                  sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                  codeMirrorPlugin({
                    codeBlockLanguages: { js: 'JavaScript', css: 'CSS' },
                  }),
                  toolbarPlugin({
                    toolbarContents: () => (
                      <ConditionalContents
                        options={[
                          {
                            when: editor => editor?.editorType === 'codeblock',
                            contents: () => <ChangeCodeMirrorLanguage />,
                          },
                          {
                            when: editor => editor?.editorType === 'sandpack',
                            contents: () => <ShowSandpackInfo />,
                          },
                          {
                            fallback: () => (
                              <>
                                <InsertCodeBlock />
                                <InsertSandpack />
                              </>
                            ),
                          },
                        ]}
                      />
                    ),
                  }),
                ]}
              />
            </div>
          </section> */}
        </div>

        <div className="flex h-full min-h-[5rem] w-full items-center mt-2 justify-between rounded-br-lg rounded-bl-lg bg-white shadow p-6">
          <Icon name="check" />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="lg">
                Save
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[425px]"
              onInteractOutside={(e) => e.preventDefault()}
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
                    This will publish this Guide to the Guidelines page.
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
