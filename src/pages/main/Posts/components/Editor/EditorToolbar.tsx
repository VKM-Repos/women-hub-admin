
import { Editor } from "@tiptap/react"
import Bold from "./ToolbarButtons/bold"
import Italic from "./ToolbarButtons/italic"
import Strikethrough from "./ToolbarButtons/strikethrough"
import Link from "./ToolbarButtons/link"
import Image from "./ToolbarButtons/image"
import Emoji from "./ToolbarButtons/emoji"
import YouTube from "./ToolbarButtons/youtube"
import Underline from "./ToolbarButtons/underline"
import TextAlignGroup from "./ToolbarButtons/text-align-group"
import ListGroup from "./ToolbarButtons/list-group"
import { AI } from "./ToolbarButtons/ai"
import Typography from "./ToolbarButtons/typography"
import Undo from "./ToolbarButtons/undo"
import Redo from "./ToolbarButtons/redo"



interface EditorToolbarProps {
  editor: Editor | null
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className="min-h-[4rem] w-full gap-1 bg-white px-2 flex flex-wrap items-center justify-start">
      <Bold editor={editor} />
      <Italic editor={editor} />
      <Underline editor={editor} />
      <Strikethrough editor={editor} />
      <Emoji editor={editor} />
      <Link editor={editor} />
      <TextAlignGroup editor={editor} />
      <ListGroup editor={editor} />
      <Image editor={editor} />
      <YouTube editor={editor} />
      <Typography editor={editor} />
      <AI />
      <Undo editor={editor} />
      <Redo editor={editor} />
    </div>
  )
}
