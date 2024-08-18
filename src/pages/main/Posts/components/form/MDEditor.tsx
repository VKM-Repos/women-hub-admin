import {
  Bold,
  Film,
  Image,
  Italic,
  Strikethrough,
  Underline as Ul,
} from 'lucide-react';

import { EditorContent, useEditor } from '@tiptap/react';
import { type Editor } from '@tiptap/react';

import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit';
import { AlignGroup } from './AlignGroup';
import { Typography } from './Typography';
import { AskAI } from './AskAI';
import { Toggle } from '@/components/ui/toggle';
import { ListGroup } from './ListGroup';
import { useCallback } from 'react';
import AddLink from './AddLink';
// import EmojiPicker from '../CustomEmoji/EmojiPicker';
// import { Emoji } from '../CustomEmoji/Emoji';

type Props = {
  handleNext?: () => void;
  handleGoBack?: () => void;
  onChange: (richText: string) => void;
  body: string;
};

type EditorProps = {
  editor: Editor | null;
};

const MDEditor = ({ body, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Text,
      Paragraph,
      Heading,
      TextAlign.configure({
        defaultAlignment: 'right',
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify']
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          rel: null,
          target: '_blank',
          class: 'underline font-semibold text-blue-700 cursor-pointer',
          validate: (href: string) => /^https?:\/\//.test(href),
        },
      }),
      OrderedList.configure({
        itemTypeName: 'listItem',
        HTMLAttributes: {
        class: 'list-decimal ml-[2rem]',
      },
      keepAttributes: true,
      }),
      BulletList.configure({
        itemTypeName: 'listItem',
        HTMLAttributes: {
        class: 'list-disc ml-[2rem]',
        keepAttributes: true,
      },
    }),
      // Emoji.configure({
      //   enableEmoticons: true,
      // })
      ListItem,
    ],
    content: body,
    editorProps: {
      attributes: {
        class: 'border-none focus:outline-none p-4 min-h-[120vh]',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <section className="bg-background mx-auto min-h-screen w-[95%] overflow-hidden rounded-[1rem] border-2">
      <ToolBar editor={editor} />
      <div className="mx-auto mt-[2rem] min-h-[120dvh] w-[75%] bg-white ">
        <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
      </div>
    </section>
  );
};

export default MDEditor;

const ToolBar = ({ editor }: EditorProps) => {
  const setLink = useCallback(
    (url: string) => {
      // empty
      if (url === '') {
        editor?.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      // update link
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    },
    [editor]
  );

  if (!editor) return null;
  return (
    <div className="flex min-h-[4rem] w-full items-center justify-start gap-1 bg-white px-2">
      <Toggle
        size="sm"
        aria-label="Toggle bold"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-5 w-5" />
      </Toggle>
      <Toggle
        size="sm"
        aria-label="Toggle italic"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-5 w-5" />
      </Toggle>
      <Toggle
        size="sm"
        aria-label="Toggle underline"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Ul className="h-5 w-5" />
      </Toggle>
      <Toggle
        size="sm"
        aria-label="Toggle strikethrough"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-5 w-5" />
      </Toggle>
      {/* 
      <Toggle size='sm' aria-label="Toggle emoticon">
        <EmojiPicker action={(emoji: string) => {
          editor.chain().focus().setEmoji(emoji).run();
        }} />
      </Toggle> */}
      <AddLink setUrl={setLink} editor={editor} />
      <ListGroup editor={editor} />
      <AlignGroup editor={editor} />
      <Toggle size="sm" aria-label="Add Image">
        <Image className="h-5 w-5" />
      </Toggle>
      <Toggle size="sm" aria-label="Add video">
        <Film className="h-5 w-5" />
      </Toggle>
      <Typography />
      <AskAI />
    </div>
  );
};
