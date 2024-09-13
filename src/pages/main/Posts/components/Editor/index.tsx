import { EditorContent } from '@tiptap/react';
import EditorToolbar from './EditorToolbar';
import Bubble from './Bubble';
import { useEditorWithDebounce } from './use-editor-with-debounce';

type Props = {
  onChange: (richText: string) => void;
  body: string;
  onAutoSave: (content: string) => void;
};

export default function Editor({ body, onChange, onAutoSave }: Props) {
  const { editor, charsCount, saveStatus } = useEditorWithDebounce(
    body,
    onChange,
    onAutoSave
  );

  return (
    <div className="bg-background relative mx-auto min-h-screen w-[95%] overflow-hidden rounded-[1rem] border-2">
      <div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
        <div className="bg-accent text-muted-foreground rounded-lg px-2 py-1 text-xs">
          {saveStatus}
        </div>
        <div
          className={
            charsCount
              ? 'bg-accent text-muted-foreground rounded-lg px-2 py-1 text-xs'
              : 'hidden'
          }
        >
          {charsCount} Words
        </div>
      </div>

      {editor && (
        <>
          <Bubble editor={editor} />
          <EditorToolbar editor={editor} />
        </>
      )}
      <div className="mx-auto mt-[1rem] w-[85%] bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
