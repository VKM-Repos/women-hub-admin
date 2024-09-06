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
import {
  AlignCenter,
  Bold,
  Italic,
  Link2,
  List,
  SmileIcon,
  Strikethrough,
  Underline,
} from "lucide-react";
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
import { useState } from "react";
import toast from "react-hot-toast";

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
  const { mutate, isPending: pendingCreatingGuideline } = usePOST("guides", {
    baseURL: API_BASE_URLS.supportServive,
    contentType: "multipart/form-data",
  });

  const form = useForm<z.infer<typeof createGuideSchema>>({
    resolver: zodResolver(createGuideSchema),
    defaultValues: {
      title: "",
      body: "",
      coverImageUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof createGuideSchema>) {
    console.log(data);
    toast.success(`Added new guideline.........`, {
      position: "bottom-right",
      style: {
        backgroundColor: "green",
        color: "white",
        textAlign: "left",
      },
      icon: "",
    });
    if (!data.coverImageUrl) {
      setValidationError(true);
      return;
    }

    let formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("content", data.body || "");
    formData.append("picture_path", data.coverImageUrl || "");

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
          {/* UPLOAD FILE */}
          <CustomFormField
            fieldType={FormFieldType.IMAGE_UPLOAD}
            control={form.control}
            name="coverImageUrl"
            label="Cover Picture"
          />
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
                  codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
                  sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                  codeMirrorPlugin({
                    codeBlockLanguages: { js: "JavaScript", css: "CSS" },
                  }),
                  toolbarPlugin({
                    toolbarContents: () => (
                      <ConditionalContents
                        options={[
                          {
                            when: (editor) =>
                              editor?.editorType === "codeblock",
                            contents: () => <ChangeCodeMirrorLanguage />,
                          },
                          {
                            when: (editor) => editor?.editorType === "sandpack",
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
                    This will publish this post to the blog page.
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
