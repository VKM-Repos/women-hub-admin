import { Toggle } from '@/components/ui/toggle';
import { Editor } from '@tiptap/react';
import { Icons } from '../icons';

interface RedoProps {
  editor: Editor | null;
}

export default function Redo({ editor }: RedoProps) {
  if (!editor) {
    return null;
  }

  return (
    <Toggle
      size="sm"
      pressed={editor.isActive('redo')}
      onPressedChange={() => editor.chain().focus().redo().run()}
    >
      <span title="Redo">
        <Icons.redo className="h-4 w-4" />
      </span>
    </Toggle>
  );
}
