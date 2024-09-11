import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Toggle } from '@/components/ui/toggle';
import { type Editor } from '@tiptap/react';
import { Link2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type AddLinkProps = {
  editor: Editor | null;
};

const AddLink = ({ editor }: AddLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && editor) {
      const previousUrl = editor.getAttributes('link').href || '';
      setInputUrl(previousUrl);
    }
  }, [isOpen, editor]);

  const validateUrl = (url: string) => {
    // Check if the URL starts with http:// or https://
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const handleSetUrl = (event: React.FormEvent) => {
    event.preventDefault();
    let url = inputUrl.trim();
    if (url) {
      url = validateUrl(url);
      if (/^https?:\/\//i.test(url)) {
        setInputUrl(url);
        editor
          ?.chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run();
        setError('');
      } else {
        setError('Invalid URL format');
        return;
      }
    } else {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    setIsOpen(false);
    setInputUrl('');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="border-none" asChild>
        <Button
          className="flex w-[40px] items-center justify-center gap-2 p-0"
          variant="outline"
        >
          <Toggle
            size="sm"
            aria-label="Toggle link"
            pressed={editor?.isActive('link')}
            title="link"
          >
            <Link2 className="h-5 w-5" />
          </Toggle>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-2">
        <form onSubmit={handleSetUrl} className="flex flex-col">
          <input
            type="text"
            placeholder="Add or paste link here"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            className="mb-2 rounded-md border px-2 py-1"
          />
          {error && <span className="text-red-500 text-xs">{error}</span>}
          <Button type="submit" variant="primary" size="sm">
            {inputUrl ? 'Update Link' : 'Add Link'}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default AddLink;
