import { BubbleMenu, Editor } from "@tiptap/react"
import Bold from "./ToolbarButtons/bold"
import BulletList from "./ToolbarButtons/bullet-list"
import Heading from "./ToolbarButtons/title"
import Italic from "./ToolbarButtons/italic"
import Link from "./ToolbarButtons/link"
import OrderedList from "./ToolbarButtons/ordered-list"
import Strikethrough from "./ToolbarButtons/strikethrough"

interface BubbleProps {
  editor: Editor | null
}

export default function Bubble({ editor }: BubbleProps) {
  if (!editor) {
    return null
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="px-2"
    >
      <div className="bg-white border-2 rounded-[1rem] p-1 space-x-2 flex justify-center items-center">
        <Heading editor={editor} level={1} isIcon />
        <Heading editor={editor} level={2} isIcon />
        <Heading editor={editor} level={3} isIcon />
        <Bold editor={editor} />
        <Italic editor={editor} />
        <Strikethrough editor={editor} />
        <BulletList editor={editor} />
        <OrderedList editor={editor} />
        <Link editor={editor} />
      </div>
    </BubbleMenu>
  )
}
