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

type Props = {
  handleNext: () => void;
  handleGoBack: () => void;
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

const MDEditor = ({}: Props) => {
  return (
    <section className="w-[95%] mx-auto border-2 bg-background rounded-[1rem] min-h-screen overflow-hidden">
      {/* markdown header */}
      <div className="w-full min-h-[4rem] flex gap-4 items-center justify-start px-2 bg-white">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-5 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-5 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
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

      {/* markdown body */}
      <div className="w-[75%] mt-[2rem] mx-auto bg-white min-h-[120dvh] ">
        <MDXEditor
          markdown="hello world"
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
                      when: (editor) => editor?.editorType === "codeblock",
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
    </section>
  );
};

export default MDEditor;
