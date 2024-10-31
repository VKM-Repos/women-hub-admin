/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, useEditor } from '@tiptap/react';
import { useState, useCallback, useEffect } from 'react';

import defaultExtensions from './extensions';

interface Props {
  editor: Editor | any;
}

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
      ({ editor }: Props) => {
        const newContent = editor?.getHTML();
        onChange(newContent);

        // Update character count
        const words = editor?.state.doc.textContent
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
      handleDOMEvents: {
        submit: () => {
          if (editor) {
            const content = editor.getHTML();
            onAutoSave(content);
            setSaveStatus('Saved');
          }
          return false;
        },
      },
    },
  });

  // Use useEffect to handle clicks on the specified elements
  useEffect(() => {
    const handleAutoSave = () => {
      if (editor) {
        const content = editor.getHTML();
        onAutoSave(content);
        setSaveStatus('Saved');
      }
    };

    const trigger1 = document.getElementById('trigger_auto_save');
    const trigger2 = document.getElementById('trigger_auto_save2');
    const trigger3 = document.getElementById('trigger_auto_save3');

    // Check if elements exist and add event listeners
    trigger1?.addEventListener('click', handleAutoSave);
    trigger2?.addEventListener('click', handleAutoSave);
    trigger3?.addEventListener('click', handleAutoSave);

    // Cleanup event listeners on component unmount
    return () => {
      trigger1?.removeEventListener('click', handleAutoSave);
      trigger2?.removeEventListener('click', handleAutoSave);
      trigger3?.removeEventListener('click', handleAutoSave);
    };
  }, [editor, onAutoSave]);

  return { editor, charsCount, saveStatus };
};
