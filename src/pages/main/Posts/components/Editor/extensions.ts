import { cn } from '@/lib/utils';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import TiptapLink from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import ImageResize from 'tiptap-extension-resize-image';

const starterKit = StarterKit.configure();
const bubbleMenu = BubbleMenuExtension.configure();

const imageResize = ImageResize.configure();
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cn(
      'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer'
    ),
  },
});
const textAlign = TextAlign.configure({
  types: ['heading', 'paragraph'],
  alignments: ['left', 'center', 'right', 'justify'],
});
const youtube = Youtube.configure({ controls: false, nocookie: false });
const globalDragHandle = GlobalDragHandle.configure({
  dragHandleWidth: 20,
  scrollTreshold: 100,
});

export default [
  starterKit,
  bubbleMenu,
  textAlign,
  tiptapLink,
  youtube,
  globalDragHandle,
  imageResize,
  Underline,
];
