
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FC } from 'react';

interface Options {
  label: string;
  value: string;
}
interface FormSelect {
  value: any;
  onChange: (value: any) => void;
  defaultValue: any;
  placeholder: string;
  options: Options[];
}

const FormSelect: FC<FormSelect> = ({ value, onChange, defaultValue, placeholder, options }) => {

  return (
    <Select onValueChange={onChange} defaultValue={defaultValue} value={value}>
      <SelectTrigger className="w-full select-none bg-background border-none p-4 py-8 text-base caret-black focus:outline-none rounded-lg font-medium ">
        <SelectValue className='' placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='w-full max-w-sm'>
        {options &&
          options.map((option: any, id) => (
            <SelectItem value={option.value} key={id}>
              {option.label.toLowerCase()}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default FormSelect;