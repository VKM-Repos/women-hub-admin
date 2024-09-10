/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Dropzone, { DropzoneInputProps } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { UploadIcon } from 'lucide-react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import Editor from '@/pages/main/Posts/components/Editor';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  EDITOR = 'editor',
  SELECT = 'select',
  SKELETON = 'skeleton',
  IMAGE_UPLOAD = 'imageUpload',
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  initialImage?: string;
  onAutoSave?: (content: string) => void;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    props.initialImage ?? null
  );

  useEffect(() => {
    setBackgroundImage(props.initialImage ?? null);
  }, [props.initialImage]);

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md ">
          {props.iconSrc && (
            <img
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || 'icon'}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="caret-black min-h-[7rem] rounded-lg p-4 text-base focus:outline-none"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-64">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.IMAGE_UPLOAD:
      return (
        <FormControl>
          <Dropzone
            accept={{ 'image/*': ['.jpg', '.jpeg', '.png'] }}
            multiple={false}
            maxSize={5000000}
            onDrop={acceptedFiles => {
              const file = acceptedFiles[0];
              if (file) {
                // Create a preview URL for the image to be shown as a background
                const imageUrl = URL.createObjectURL(file);
                setBackgroundImage(imageUrl);

                // Send the file to the form handler (like a FormData object)
                field.onChange(file); // Ensure the raw file is passed here for backend consumption
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({
                  className: cn(
                    'mt-6 w-full min-h-[14rem] cursor-pointer flex items-center p-4 rounded-lg text-center',
                    backgroundImage ? 'bg-cover bg-center' : 'bg-background'
                  ),
                  style: backgroundImage
                    ? { backgroundImage: `url(${backgroundImage})` }
                    : {},
                })}
              >
                <input {...(getInputProps() as DropzoneInputProps)} />
                <span className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-white p-4 shadow-md">
                  <UploadIcon />
                  <p className="font-bold">
                    {!backgroundImage ? 'Click, or drop files' : 'Change photo'}
                  </p>
                </span>
              </div>
            )}
          </Dropzone>
        </FormControl>
      );
    case FormFieldType.EDITOR:
      return (
        <FormControl>
          <Editor
            body={field.value}
            onChange={field.onChange}
            onAutoSave={props.onAutoSave || (() => {})}
          />
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label, onAutoSave } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={{ ...props, onAutoSave }} />
          <FormMessage className="" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
