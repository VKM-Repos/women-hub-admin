import CustomFormField, {
  FormFieldType,
} from '@/components/form/custom-form-fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { type Editor } from '@tiptap/react';
import { Link2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod schema
const urlSchema = z.object({
  url: z
    .string()
    .min(1, { message: 'URL is required' })
    .refine(
      url => {
        // Check if the URL is valid or is missing http/https
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
          url
        );
      },
      { message: 'Invalid URL format' }
    ),
});

type AddLinkProps = {
  editor: Editor | null;
};

type FormData = z.infer<typeof urlSchema>;

const AddLink = ({ editor }: AddLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');

  useEffect(() => {
    if (isOpen && editor) {
      const previousUrl = editor.getAttributes('link').href || '';
      setInputUrl(previousUrl);
    }
  }, [isOpen, editor]);

  const form = useForm<FormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: inputUrl,
    },
  });

  const validateUrl = (url: string) => {
    // Ensure URL starts with http:// or https://
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const handleSetUrl = (data: FormData) => {
    const url = validateUrl(data.url.trim());

    setInputUrl(url);
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();

    setIsOpen(false);
    setInputUrl('');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="border-none" asChild>
        <Button
          className="flex w-[40px] items-center justify-center gap-2 p-0"
          variant="outline"
          title="link"
        >
          <Link2 className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSetUrl)}
            className="flex flex-col gap-y-4 p-4"
          >
            {/* URL Input Field */}
            <div className="rounded-lg">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="url"
                label="Add or paste link here"
              />
            </div>

            <div className="flex w-full place-content-end">
              <Button
                type="submit"
                variant="secondary"
                size="default"
                className="w-fit"
              >
                {inputUrl ? 'Update Link' : 'Add Link'}
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default AddLink;
