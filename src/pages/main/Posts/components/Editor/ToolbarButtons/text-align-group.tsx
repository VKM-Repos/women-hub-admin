import { useState } from 'react';
import { Icons } from '../icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';

interface TextAlignGroupProps {
  editor: Editor | null;
}

export default function TextAlignGroup({ editor }: TextAlignGroupProps) {
  const [selectedAlign, setSelectedAlign] = useState<
    'left' | 'center' | 'right' | 'justify'
  >('left');

  if (!editor) {
    return null;
  }

  const textAlignOptions: {
    textAlign: 'left' | 'center' | 'right' | 'justify';
    label: string;
  }[] = [
    { textAlign: 'left', label: 'Align Left' },
    { textAlign: 'center', label: 'Align Center' },
    { textAlign: 'right', label: 'Align Right' },
    { textAlign: 'justify', label: 'Justify' },
  ];

  const SelectedIcon =
    Icons[
      `align${selectedAlign.charAt(0).toUpperCase()}${selectedAlign.slice(1)}` as keyof typeof Icons
    ];

  return (
    <div className="hover:bg-accent flex h-9 items-center justify-center rounded-lg">
      <Popover>
        <PopoverTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: selectedAlign })}
          >
            <span
              className="flex h-8 w-8 items-center justify-between"
              title={`Text Align ${selectedAlign.charAt(0).toUpperCase() + selectedAlign.slice(1)}`}
            >
              <SelectedIcon className="h-4 w-4" />
              <Icons.chevronDown className="h-4 w-4" />
            </span>
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="start">
          {textAlignOptions.map(option => {
            const Icon =
              Icons[
                `align${option.textAlign.charAt(0).toUpperCase()}${option.textAlign.slice(
                  1
                )}` as keyof typeof Icons
              ];

            return (
              <button
                key={option.textAlign}
                onClick={() => {
                  editor.chain().focus().setTextAlign(option.textAlign).run();
                  setSelectedAlign(option.textAlign);
                }}
                className="hover:bg-blue-500 flex w-full items-center rounded-md p-2 text-left text-xs hover:text-white"
              >
                <Icon className="mr-2 h-4 w-4" />
                {option.label}
              </button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
