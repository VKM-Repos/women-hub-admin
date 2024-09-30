import { useState } from 'react';
import { Icons } from '../icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';

interface ListGroupProps {
  editor: Editor | null;
}

export default function ListGroup({ editor }: ListGroupProps) {
  const [selectedList, setSelectedList] = useState<
    'bulletList' | 'orderedList' | null
  >(null);

  if (!editor) {
    return null;
  }

  const listOptions: {
    listType: 'bulletList' | 'orderedList';
    label: string;
  }[] = [
    { listType: 'bulletList', label: 'Bullet List' },
    { listType: 'orderedList', label: 'Ordered List' },
  ];

  const SelectedIcon =
    selectedList === 'bulletList'
      ? Icons.list
      : selectedList === 'orderedList'
        ? Icons.listOrdered
        : Icons.list; // default icon if nothing is selected

  return (
    <div className="hover:bg-accent flex h-9 items-center justify-center rounded-lg">
      <Popover>
        <PopoverTrigger asChild>
          <Toggle
            size="sm"
            pressed={selectedList !== null && editor.isActive(selectedList)}
          >
            <span
              className="flex h-8 w-8 items-center justify-between"
              title={selectedList ? selectedList : 'List Options'}
            >
              <SelectedIcon className="h-4 w-4" />
              <Icons.chevronDown className="h-4 w-4" />
            </span>
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="start">
          {listOptions.map(option => {
            const Icon =
              option.listType === 'bulletList' ? Icons.list : Icons.listOrdered;

            return (
              <button
                key={option.listType}
                onClick={() => {
                  const isActive = editor.isActive(option.listType);
                  if (option.listType === 'bulletList') {
                    editor.chain().focus().toggleBulletList().run();
                  } else {
                    editor.chain().focus().toggleOrderedList().run();
                  }
                  setSelectedList(isActive ? null : option.listType);
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
