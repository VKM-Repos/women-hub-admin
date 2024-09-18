import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SupportButtonActions = {
  icon: React.ReactNode;
  onClick: (e: any) => void;
  label: string;
  // isHovered: boolean;
};

export const SupportButtons: React.FC<SupportButtonActions> = ({
  icon,
  label,
  onClick,
  // isHovered,
}) => {
  return (
    <button onClick={onClick} className={""}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="relative flex aspect-square w-fit items-center justify-center ">
              {icon}
            </span>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="bg-secondary border-none text-xs text-white"
          >
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </button>
    // <button onClick={onClick} className="relative">
    //   {isHovered && (
    //     <TooltipProvider>
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <span className="relative flex aspect-square w-fit items-center justify-center">
    //             {icon}
    //           </span>
    //         </TooltipTrigger>
    //         <TooltipContent
    //           side="top"
    //           className="bg-secondary border-none text-xs text-white"
    //         >
    //           {label}
    //         </TooltipContent>
    //       </Tooltip>
    //     </TooltipProvider>
    //   )}
    // </button>
  );
};
