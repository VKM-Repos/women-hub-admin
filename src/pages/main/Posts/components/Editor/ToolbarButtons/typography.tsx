import { useState, useEffect } from 'react';
import { Icons } from '../icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Editor } from '@tiptap/react';

interface TypographyProps {
  editor: Editor | null;
}

export default function Typography({ editor }: TypographyProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('Paragraph');

  const formatOptions = [
    {
      label: 'Heading',
      command: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: 'Sub Heading',
      command: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: 'Paragraph',
      command: () => editor?.chain().focus().setBlockquote().run(),
    },
    {
      label: 'Normal',
      command: () => editor?.chain().focus().setParagraph().run(),
    },
  ];

  useEffect(() => {
    if (!editor) return;

    if (editor.isActive('heading', { level: 1 })) {
      setSelectedFormat('Heading');
    } else if (editor.isActive('heading', { level: 3 })) {
      setSelectedFormat('Sub Heading');
    } else if (editor.isActive('blockquote')) {
      setSelectedFormat('Paragraph');
    } else {
      setSelectedFormat('Normal');
    }
  }, [editor?.state.selection, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="relative flex h-9 items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="border-gray-300 text-txtColor flex items-center justify-between rounded-md border bg-white px-3 py-2 text-xs font-medium shadow-sm focus:outline-none">
            {selectedFormat}
            <Icons.chevronDown className="ml-2 h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="start">
          {formatOptions.map(option => (
            <button
              key={option.label}
              onClick={() => {
                option.command();
                setSelectedFormat(option.label);
              }}
              className="hover:bg-blue-500 w-full rounded-md p-2 text-left text-xs hover:text-white"
            >
              {option.label}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
