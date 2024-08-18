import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { SmileIcon } from 'lucide-react';

interface IProps {
  action?: any;
}

const EmojiPicker = (props: IProps) => {
  function onChange(emoji: any) {
    props.action?.(emoji?.id);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <SmileIcon className="h-5 w-5" />
      </PopoverTrigger>

      <PopoverContent hideWhenDetached>
        <Picker theme={'dark'} data={data} onEmojiSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;