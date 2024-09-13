/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor } from '@tiptap/react';
import { useEffect, useState, useCallback, useRef } from 'react';

import defaultExtensions from './extensions';

export const useEditorWithDebounce = (
  initialContent: string,
  onChange: (richText: string) => void,
  onAutoSave: (content: string) => void
) => {
  const [charsCount, setCharsCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState('Saved');

  const editor = useEditor({
    content: initialContent,
    extensions: [...defaultExtensions],
    onUpdate: useCallback(
      ({ editor }: any) => {
        const newContent = editor.getHTML();
        onChange(newContent);

        // Update word count
        const words = editor.state.doc.textContent
          .split(/\s+/)
          .filter((word: string) => word.length > 0);
        setCharsCount(words.length);

        // Mark as unsaved
        setSaveStatus('Unsaved');
      },
      [onChange]
    ),
    autofocus: false,
    editorProps: {
      attributes: {
        class:
          'h-[120dvh] !p-[1.5rem] !tiptap overflow-y-auto border-none focus:outline-none space-y-6',
      },
    },
  });

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const autoSave = useCallback(() => {
    if (editor) {
      const content = editor.getHTML();
      onAutoSave(content);
      setSaveStatus('Saved');
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

  return { editor, charsCount, saveStatus };
};
