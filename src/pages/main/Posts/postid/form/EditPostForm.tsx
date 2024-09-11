/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomFormField, {
  FormFieldType,
} from '@/components/form/custom-form-fields';
import { useForm, useWatch } from 'react-hook-form';
import { editBlogPostSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import Avatar from '@/assets/icons/avatar.svg';
import { useGET } from '@/hooks/useGET.hook';
import { Category } from '@/types/category.types';
import useAppStore from '@/lib/store/app.store';
import { useEffect, useState } from 'react';
import { useEditPostFormStore } from '@/store/useEditPostForm.store';
import { Post } from '@/types/posts.type';
import Icon from '@/components/icons/Icon';
import { Button } from '@/components/ui/button';

type Props = {
  handleNext: () => void;
  data: Post;
};

const EditPostForm = ({ handleNext, data }: Props) => {
  const { setData } = useEditPostFormStore();
  const { user } = useAppStore();

  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [data]);

  const authorsList = [
    { name: 'Women Hub' },
    { name: user.name },
    ...(data?.author && data.author !== user.name
      ? [{ name: data.author }]
      : []),
    { name: 'Other Editors' },
  ];

  // Create a Set to ensure unique names
  const authorsSet = new Set(authorsList.map(author => author.name));

  // Convert the Set back to an array of objects
  const authors = Array.from(authorsSet).map(name => ({ name }));

  const { data: categories } = useGET({
    url: 'categories',
    queryKey: ['categories'],
    withAuth: false,
    enabled: true,
  });

  const form = useForm<z.infer<typeof editBlogPostSchema>>({
    resolver: zodResolver(editBlogPostSchema),
    defaultValues: {
      title: data?.title,
      author: data?.author,
      description: data?.description,
      externalEditorName: data?.author,
      coverImage: data?.coverImageUrl,
      categoryId: data?.category.id.toString(),
      body: data?.body,
    },
  });

  const [isExternalEditor, setIsExternalEditor] = useState(false);

  const selectedAuthor = useWatch({
    control: form.control,
    name: 'author',
  });

  useEffect(() => {
    setIsExternalEditor(selectedAuthor === 'Other Editors');
  }, [selectedAuthor]);

  const onSubmit = async (values: z.infer<typeof editBlogPostSchema>) => {
    const author = isExternalEditor
      ? values.externalEditorName
      : selectedAuthor;

    let imageUrl: string | undefined;
    if (typeof values.coverImage === 'string') {
      imageUrl = values.coverImage;
    } else if (values.coverImage instanceof File) {
      imageUrl = URL.createObjectURL(values.coverImage);
    } else {
      console.error('Invalid cover image type.');
      return; // Exit if the coverImage type is invalid
    }

    setData({
      ...values,
      title: values.title,
      author: author,
      description: values.description,
      coverImage: values.coverImage,
      coverImagePreview: imageUrl,
      categoryId: values.categoryId,
    });

    console.log(data);

    handleNext();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 p-6"
      >
        {/* TITLE */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="title"
          placeholder=""
          label="Title"
        />

        {/* AUTHORS */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="author"
          label="Author"
          placeholder="Select an author"
        >
          {authors?.map((author: any) => (
            <SelectItem key={author.name} value={author.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <img
                  src={author.image ? author.image : Avatar}
                  width={32}
                  height={32}
                  alt="author"
                  className="border-dark-500 rounded-full border"
                />
                <p>{author.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        {isExternalEditor && (
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="externalEditorName"
            placeholder="Enter External Editor's Name"
            label="External Editor's Name"
          />
        )}

        {/* DESCRIPTION */}
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter description"
        />

        {/* UPLOAD FILE */}
        <CustomFormField
          fieldType={FormFieldType.IMAGE_UPLOAD}
          control={form.control}
          name="coverImage"
          label="Cover Picture"
          initialImage={data?.coverImageUrl}
        />

        {/* CATEGORY */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="categoryId"
          label="Category"
          placeholder="Select a category"
        >
          {categories?.content?.map((category: Category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{category.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <section className="flex h-full min-h-[5rem] w-full items-center justify-between rounded-lg bg-white p-6 shadow">
          <span className="w-fit">
            <Icon name="doubleCheckmarks" />
          </span>
          <Button variant="secondary" size="lg">
            Next
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default EditPostForm;
