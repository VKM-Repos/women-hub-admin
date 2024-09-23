import CustomFormField, {
  FormFieldType,
} from '@/components/form/custom-form-fields';
import { useForm } from 'react-hook-form';
import { editBlogPostSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useEffect } from 'react';
import { useEditPostFormStore } from '@/store/useEditPostForm.store';
import { Post } from '@/types/posts.type';

type Props = {
  handleNext: () => void;
  data: Post;
};

const EditEditorForm = ({ handleNext, data }: Props) => {
  const { setData, data: editData } = useEditPostFormStore();
  const form = useForm<z.infer<typeof editBlogPostSchema>>({
    resolver: zodResolver(editBlogPostSchema),
    defaultValues: {
      body: editData?.body ? editData?.body : data?.body,
    },
  });

  const onSubmit = async (values: z.infer<typeof editBlogPostSchema>) => {
    setData({
      ...values,
      body: values?.body,
    });
    handleNext();
  };

  const handleAutoSave = (content: string) => {
    setData({
      body: content,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 p-6"
      >
        {/* Editor */}
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

export default EditEditorForm;
