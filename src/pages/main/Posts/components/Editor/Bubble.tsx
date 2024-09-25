import { BubbleMenu, Editor } from '@tiptap/react';
import Bold from './ToolbarButtons/bold';
import BulletList from './ToolbarButtons/bullet-list';
import Heading from './ToolbarButtons/title';
import Italic from './ToolbarButtons/italic';
import OrderedList from './ToolbarButtons/ordered-list';
import Strikethrough from './ToolbarButtons/strikethrough';
// import { AI } from './ToolbarButtons/ai';

interface BubbleProps {
  editor: Editor | null;
}

export default function Bubble({ editor }: BubbleProps) {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className=" px-2"
    >
      <div className="min-w-2xl flex  items-center justify-center space-x-1 rounded-[1rem] border-2 bg-white p-2">
        {/* <AI /> */}
        <Heading editor={editor} level={1} isIcon />
        <Heading editor={editor} level={2} isIcon />
        <Heading editor={editor} level={3} isIcon />
        <Bold editor={editor} />
        <Italic editor={editor} />
        <Strikethrough editor={editor} />
        <BulletList editor={editor} />
        <OrderedList editor={editor} />
      </div>
    </BubbleMenu>
  );
}
