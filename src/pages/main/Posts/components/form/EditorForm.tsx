import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField, {
  FormFieldType,
} from '@/components/form/custom-form-fields';
import { createBlogPostSchema } from './validation';
import { useCreatePostFormStore } from '@/store/useCreatePostForm.store';
import { useEffect } from 'react';

type Props = {
  handleNext: () => void;
};

const EditorForm = ({ handleNext }: Props) => {
  const { data, setData } = useCreatePostFormStore();

  const form = useForm<z.infer<typeof createBlogPostSchema>>({
    resolver: zodResolver(createBlogPostSchema),
    defaultValues: {
      body: data.body || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof createBlogPostSchema>) => {
    setData({
      ...values,
      body: values.body,
    });
    handleNext();
  };

  const handleAutoSave = (content: string) => {
    setData({
      ...data,
      body: content,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 p-6"
      >
        {/* Editor with auto-save */}
        <CustomFormField
          fieldType={FormFieldType.EDITOR}
          control={form.control}
          name="body"
          onAutoSave={handleAutoSave}
        />
      </form>
    </Form>
  );
};

export default EditorForm;
