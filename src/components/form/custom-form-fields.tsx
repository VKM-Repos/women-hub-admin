/* eslint-disable no-unused-vars */
// import { E164Number } from "libphonenumber-js/core";
// import ReactDatePicker from "react-datepicker";
import { Control } from "react-hook-form";
// import PhoneInput from "react-phone-number-input";

import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import Dropzone from "react-dropzone";
import { cn } from "@/lib/utils";


export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
//   DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  IMAGE_UPLOAD = "imageUpload",
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
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md ">
          {props.iconSrc && (
            <img
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
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
            className="min-h-[7rem] p-4 text-base caret-black focus:outline-none rounded-lg"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          {/* <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          /> */}
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
    // case FormFieldType.DATE_PICKER:
    //   return (
    //     <div className="flex rounded-md border border-dark-500 bg-dark-400">
    //       <img
    //         src="/assets/icons/calendar.svg"
    //         height={24}
    //         width={24}
    //         alt="user"
    //         className="ml-2"
    //       />
    //       <FormControl>
    //         <ReactDatePicker
    //           showTimeSelect={props.showTimeSelect ?? false}
    //           selected={field.value}
    //           onChange={(date: Date) => field.onChange(date)}
    //           timeInputLabel="Time:"
    //           dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
    //           wrapperClassName="date-picker"
    //         />
    //       </FormControl>
    //     </div>
    //   );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-64">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.IMAGE_UPLOAD:
      return (
        <FormControl>
          <Dropzone
                  accept={{
                    "image/*": [".jpg", ".jpeg", ".png"],
                  }}
                  multiple={true}
                  maxSize={5000000}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps({
                        className: cn(
                          "p-3 mb-4 flex flex-col items-center justify-center w-full rounded-md cursor-pointer border border-[#e2e8f0]"
                        ),
                      })}
                    >
                      <div className="flex items-center gap-x-3 mt-2 mb-2">
                        <label
                          htmlFor="Products"
                          className={`text-sm text-[7E8DA0] cursor-pointer focus:outline-none focus:underline ${
                            form.formState.errors.products && "text-red-500"
                          }`}
                        >
                          Add your Product Images
                          <input {...getInputProps()} />
                        </label>
                      </div>
                    </div>
                  )}
                </Dropzone>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;