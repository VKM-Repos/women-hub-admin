import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectOptions = [
  { value: "heading", label: "Heading", onClick: () => {} },
  { value: "subHeading", label: "Sub Heading", onClick: () => {} },
  { value: "paragraph", label: "Paragraph", onClick: () => {} },
  { value: "normal", label: "Normal", onClick: () => {} },
];

export function Typography() {
  return (
    <Select>
      <SelectTrigger className="w-[150px] bg-transparent focus:outline-none border h-[40px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectOptions.map((option, index) => (
            <div key={option.value}>
              <SelectItem value={option.value} className="hover:bg-blue-600 hover:text-white text-txtColor" onClick={option.onClick}>
                <span className="flex gap-2 items-center justify-center">
                  <p>{option.label}</p>
                </span>
              </SelectItem>
              {index < selectOptions.length - 1 && (
                <div className="bg-gray-300 w-full h-[1px]" />
              )}
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
