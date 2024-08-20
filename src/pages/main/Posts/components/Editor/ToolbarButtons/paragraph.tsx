import { Toggle } from "@/components/ui/toggle"
import { Editor } from "@tiptap/react"

interface ParagraphProps {
  editor: Editor | null
  indented?: boolean
}

export default function Paragraph({ editor, indented = false }: ParagraphProps) {
  if (!editor) {
    return null
  }

  const title = indented ? "Paragraph (with indentation)" : "Normal text"
  const command = indented
    ? () => editor.chain().focus().setBlockquote().run() // Assuming indentation is done via blockquote
    : () => editor.chain().focus().setParagraph().run()

  return (
    <Toggle
      size="sm"
      pressed={indented ? editor.isActive("blockquote") : editor.isActive("paragraph")}
      onPressedChange={command}
    >
      <span title={title}>{title}</span>
    </Toggle>
  )
}
