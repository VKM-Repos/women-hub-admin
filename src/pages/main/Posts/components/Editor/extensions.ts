import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import TiptapLink from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import ImageResize from 'tiptap-extension-resize-image';

const starterKit = StarterKit.configure();
const bubbleMenu = BubbleMenuExtension.configure();
// const history = History.configure();
const document = Document.configure();

const imageResize = ImageResize.configure();
const tiptapLink = TiptapLink.configure();
const textAlign = TextAlign.configure({
  types: ['heading', 'paragraph'],
  alignments: ['left', 'center', 'right', 'justify'],
});
const youtube = Youtube.configure({ controls: true, nocookie: true });
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
  // history,
  document,
];
