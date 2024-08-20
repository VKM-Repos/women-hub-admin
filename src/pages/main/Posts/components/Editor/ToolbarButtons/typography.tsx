import { useState, useEffect } from "react"
import { Icons } from "../icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Editor } from "@tiptap/react"

interface TypographyProps {
  editor: Editor | null
}

export default function Typography({ editor }: TypographyProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("Paragraph")

  if (!editor) {
    return null
  }

  const formatOptions = [
    { label: "Heading", command: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: "Sub Heading", command: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "Paragraph", command: () => editor.chain().focus().setBlockquote().run() },
    { label: "Normal", command: () => editor.chain().focus().setParagraph().run() },
  ]

  useEffect(() => {
    if (editor) {
      if (editor.isActive('heading', { level: 1 })) {
        setSelectedFormat('Heading')
      } else if (editor.isActive('heading', { level: 3 })) {
        setSelectedFormat('Sub Heading')
      } else if (editor.isActive('blockquote')) {
        setSelectedFormat('Paragraph')
      } else {
        setSelectedFormat('Normal')
      }
    }
  }, [editor?.state.selection])

  return (
    <div className="h-9 justify-center items-center flex ">
      <DropdownMenu >
        <DropdownMenuTrigger asChild className="focus:ring-0 focus:outline-none ">
          <button className="flex items-center justify-between px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none text-txtColor">
            {selectedFormat}
            <Icons.chevronDown className="w-4 h-4 ml-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {formatOptions.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onSelect={() => {
                option.command()
                setSelectedFormat(option.label)
              }}
              className="hover:bg-blue-500 hover:text-white"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
