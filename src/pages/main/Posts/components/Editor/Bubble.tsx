import { BubbleMenu, Editor } from '@tiptap/react';
import Bold from './ToolbarButtons/bold';
import Italic from './ToolbarButtons/italic';
import Strikethrough from './ToolbarButtons/strikethrough';
import AI from './ToolbarButtons/ai';
import Typography from './ToolbarButtons/typography';
import ListGroup from './ToolbarButtons/list-group';
import Underline from './ToolbarButtons/underline';
import TextAlignGroup from './ToolbarButtons/text-align-group';
import AddLink from './ToolbarButtons/AddLink';

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
      tippyOptions={{
        duration: 150,
        moveTransition: 'transform 0.15s ease-out',
        placement: 'bottom',
        popperOptions: {
          strategy: 'fixed',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 10],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                padding: 8,
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['right'],
              },
            },
          ],
        },
      }}
      className="relative z-[30] mx-auto flex min-w-[32rem] items-center justify-center space-x-1 rounded-[1rem] border-2 bg-white p-1 shadow-lg"
    >
      <AI editor={editor} />
      <Typography editor={editor} />
      <Bold editor={editor} />
      <Italic editor={editor} />
      <Underline editor={editor} />
      <Strikethrough editor={editor} />
      <AddLink editor={editor} />
      <TextAlignGroup editor={editor} />
      <ListGroup editor={editor} />
    </BubbleMenu>
  );
}
