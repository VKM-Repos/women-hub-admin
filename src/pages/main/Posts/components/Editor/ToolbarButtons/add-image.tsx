import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Toggle } from '@/components/ui/toggle';
import { type Editor } from '@tiptap/react';
import { Icons } from '../icons';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import CustomFormField, {
  FormFieldType,
} from '@/components/form/custom-form-fields';
import { useState } from 'react';

type Props = {
  editor?: Editor | null;
};

type FormData = {
  image: File | null;
};

export function AddImage({ editor }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormData>({
    defaultValues: {
      image: null,
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.image && editor) {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(data.image);

      // Insert the image into the editor at the current position
      editor.chain().focus().setImage({ src: imageUrl }).run();

      console.log('Image added to editor:', imageUrl);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="border-none">
        <Toggle size="sm" aria-label="Toggle image" title="image">
          <Icons.picture className="h-5 w-5" />
        </Toggle>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-6 p-6"
            >
              {/* UPLOAD FILE */}
              <div className="rounded-lg">
                <CustomFormField
                  fieldType={FormFieldType.IMAGE_UPLOAD}
                  control={form.control}
                  name="image"
                  label="Upload Image"
                />
              </div>

              <div className="flex w-full place-content-end">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-fit"
                  type="submit"
                >
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
