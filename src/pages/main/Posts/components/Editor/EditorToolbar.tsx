import { Editor } from '@tiptap/react';
import Bold from './ToolbarButtons/bold';
import Italic from './ToolbarButtons/italic';
import Strikethrough from './ToolbarButtons/strikethrough';
import Emoji from './ToolbarButtons/emoji';
import Underline from './ToolbarButtons/underline';
import TextAlignGroup from './ToolbarButtons/text-align-group';
import ListGroup from './ToolbarButtons/list-group';
import { AI } from './ToolbarButtons/ai';
import Typography from './ToolbarButtons/typography';
import Undo from './ToolbarButtons/undo';
import Redo from './ToolbarButtons/redo';
import AddLink from './ToolbarButtons/AddLink';
import { AddImage } from './ToolbarButtons/add-image';
import { Embed } from './ToolbarButtons/embed';

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex min-h-[4rem] w-full flex-wrap items-center justify-start gap-1 bg-white px-2">
      <Bold editor={editor} />
      <Italic editor={editor} />
      <Underline editor={editor} />
      <Strikethrough editor={editor} />
      <Emoji editor={editor} />
      <AddLink editor={editor} />
      <TextAlignGroup editor={editor} />
      <ListGroup editor={editor} />
      <AddImage editor={editor} />
      <Embed editor={editor} />
      <Typography editor={editor} />
      <AI />
      <Undo editor={editor} />
      <Redo editor={editor} />
    </div>
  );
}
