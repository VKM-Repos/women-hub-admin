import { useRef, useEffect, useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import defaultExtensions from './extensions';
import EditorToolbar from './EditorToolbar';
import Bubble from './Bubble';

type Props = {
  onChange: (richText: string) => void;
  body: string;
  onAutoSave: (content: string) => void;
};

export default function Editor({ body, onChange, onAutoSave }: Props) {
  const editor = useEditor({
    content: body,
    extensions: [...defaultExtensions],
    onUpdate({ editor }) {
      const newContent = editor.getHTML();
      onChange(newContent);
    },
    editorProps: {
      attributes: {
        class:
          'h-[90dvh] !p-[1.5rem] overflow-y-auto border-none focus:outline-none space-y-6',
      },
    },
  });

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const autoSave = useCallback(() => {
    if (editor) {
      const content = editor.getHTML();
      onAutoSave(content);
      console.log(content);
    }
  }, [editor, onAutoSave]);

  useEffect(() => {
    if (editor) {
      const handleEditorChange = () => {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(() => {
          autoSave();
        }, 1500);
      };

      editor.on('update', handleEditorChange);

      return () => {
        editor.off('update', handleEditorChange);
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
      };
    }
  }, [editor, autoSave]);

  return (
    <div className="bg-background mx-auto min-h-screen w-[95%] overflow-hidden rounded-[1rem] border-2">
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
