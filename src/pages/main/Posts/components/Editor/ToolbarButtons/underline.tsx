import { Icons } from "../icons"
import { Toggle } from "@/components/ui/toggle"
import { Editor } from "@tiptap/react"

interface UnderlineProps {
  editor: Editor | null
}

export default function Underline({ editor }: UnderlineProps) {
  if (!editor) {
    return null
  }

  return (
    <Toggle
      size="sm"
      pressed={editor.isActive("underline")}
      onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
    >
      <span title="Underline">
        <Icons.underline className="h-4 w-4" />
      </span>
    </Toggle>
  )
}
