import { Toggle } from '@/components/ui/toggle';
import { Editor } from '@tiptap/react';

interface HeadingProps {
  level: 1 | 3;
  editor: Editor | null;
}

export default function Heading({ level, editor }: HeadingProps) {
  if (!editor) {
    return null;
  }

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const title = level === 1 ? 'Heading' : 'Subheading';

  return (
    <Toggle
      size="sm"
      pressed={editor.isActive('heading', { level })}
      onPressedChange={() =>
        editor.chain().focus().toggleHeading({ level }).run()
      }
    >
      <span title={title}>
        <Tag>{title}</Tag>
      </span>
    </Toggle>
  );
}
