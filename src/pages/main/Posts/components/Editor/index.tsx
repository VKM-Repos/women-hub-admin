
import "./editor.css"
import { EditorContent, useEditor } from "@tiptap/react"
import Bubble from "./Bubble"
import EditorToolbar from "./EditorToolbar"
import defaultExtensions from "./extensions"

type Props = {
   onChange: (richText: string) => void;
   body: string;
}

export default function Editor({ body, onChange }: Props) {
  const editor = useEditor({
    content: body,
    extensions: [...defaultExtensions],
    onCreate({ editor }) {},
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "h-[90dvh] !p-[1.5rem] overflow-y-auto border-none focus:outline-none space-y-6",
      },
    },
  })

  return (
    <div className="bg-background mx-auto min-h-screen w-[95%] overflow-hidden rounded-[1rem] border-2">
      {editor && (
        <>
          <Bubble editor={editor} />
          <EditorToolbar editor={editor} />
        </>
      )}
      <div className="mx-auto mt-[1rem] w-[85%] bg-white ">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}