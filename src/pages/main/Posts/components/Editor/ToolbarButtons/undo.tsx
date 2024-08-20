
import { Toggle } from "@/components/ui/toggle"
import { Editor } from "@tiptap/react"
import { Icons } from "../icons"

interface UndoProps {
  editor: Editor | null
}

export default function Undo({ editor }: UndoProps) {
  if (!editor) {
    return null
  }

  return (
    <Toggle
      size="sm"
      pressed={editor.isActive("undo")}
      onPressedChange={() => editor.chain().focus().undo().run()}
    >
      <span title="Undo">
        <Icons.undo className="h-6 w-6" />
      </span>
    </Toggle>
  )
}
