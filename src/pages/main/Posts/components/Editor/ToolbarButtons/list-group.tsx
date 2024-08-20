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

interface ListGroupProps {
  editor: Editor | null
}

export default function ListGroup({ editor }: ListGroupProps) {
  const [selectedList, setSelectedList] = useState<"bulletList" | "orderedList" | null>(null)

  if (!editor) {
    return null
  }

  const listOptions: { listType: "bulletList" | "orderedList"; label: string }[] = [
    { listType: "bulletList", label: "Bullet List" },
    { listType: "orderedList", label: "Ordered List" },
  ]

  const SelectedIcon =
    selectedList === "bulletList"
      ? Icons.list
      : selectedList === "orderedList"
      ? Icons.listOrdered
      : Icons.list // default icon if nothing is selected

  return (
    <div className="h-9 justify-center items-center flex hover:bg-accent rounded-lg">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Toggle
            size="sm"
            pressed={selectedList !== null && editor.isActive(selectedList)}
          >
            <span className="flex items-center justify-between w-8 h-8" title={selectedList ? selectedList : "List Options"}>
              <SelectedIcon className="w-4 h-4" />
              <Icons.chevronDown className="w-4 h-4" />
            </span>
          </Toggle>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {listOptions.map((option) => {
            const Icon =
              option.listType === "bulletList"
                ? Icons.list
                : Icons.listOrdered

            return (
              <DropdownMenuItem
                key={option.listType}
                onSelect={() => {
                  const isActive = editor.isActive(option.listType)
                  if (option.listType === "bulletList") {
                    editor.chain().focus().toggleBulletList().run()
                  } else {
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  setSelectedList(isActive ? null : option.listType)
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
