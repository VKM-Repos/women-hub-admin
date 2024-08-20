import { useState } from "react"
import { Icons } from "../icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Editor } from "@tiptap/react"
import { Toggle } from "@/components/ui/toggle"

interface TextAlignGroupProps {
  editor: Editor | null
}

export default function TextAlignGroup({ editor }: TextAlignGroupProps) {
  const [selectedAlign, setSelectedAlign] = useState<"left" | "center" | "right" | "justify">("left")

  if (!editor) {
    return null
  }

  const textAlignOptions: { textAlign: "left" | "center" | "right" | "justify"; label: string }[] = [
    { textAlign: "left", label: "Align Left" },
    { textAlign: "center", label: "Align Center" },
    { textAlign: "right", label: "Align Right" },
    { textAlign: "justify", label: "Justify" },
  ]

  const SelectedIcon =
    Icons[
      `align${selectedAlign.charAt(0).toUpperCase()}${selectedAlign.slice(1)}` as keyof typeof Icons
    ]

  return (
    <div className="h-9 justify-center items-center flex hover:bg-accent rounded-lg">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: selectedAlign })}
          >
            <span className="flex items-center justify-between w-8 h-8" title={`Text Align ${selectedAlign.charAt(0).toUpperCase() + selectedAlign.slice(1)}`}>
              <SelectedIcon className="w-4 h-4" />
              <Icons.chevronDown className="w-4 h-4" />
            </span>
          </Toggle>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {textAlignOptions.map((option) => {
            const Icon =
              Icons[
                `align${option.textAlign.charAt(0).toUpperCase()}${option.textAlign.slice(
                  1
                )}` as keyof typeof Icons
              ]

            return (
              <DropdownMenuItem
                key={option.textAlign}
                onSelect={() => {
                  editor.chain().focus().setTextAlign(option.textAlign).run()
                  setSelectedAlign(option.textAlign)
                }}
                className="hover:bg-blue-500 hover:text-white"
              >
                <Icon className="h-4 w-4 mr-2" />
                {option.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
