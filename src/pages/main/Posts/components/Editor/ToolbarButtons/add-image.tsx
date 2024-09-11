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

type Props = {
  editor?: Editor | null;
};

export function AddImage(editor: Props) {
  const form = useForm();

  const onSubmit = () => {
    console.log('hello');
  };
  return (
    <Dialog>
      <DialogTrigger asChild className="border-none">
        <Toggle size="sm" aria-label="Toggle image" title="image">
          <Icons.imagePlus className="h-4 w-4" />
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
                  name=""
                  label=""
                  // initialImage={data?.coverImageUrl}
                />
              </div>

              <div className="flex w-full place-content-end">
                <Button variant="secondary" size="lg" className="w-fit">
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
