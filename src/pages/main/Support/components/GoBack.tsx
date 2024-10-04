/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@/components/icons/Icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
  onClick?: () => void;
  isOpen?: boolean;
  setIsOpen?: any;
};

export function AlertGoBack({ onClick, isOpen, setIsOpen }: Props) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <Icon name="arrowLeft" />
          <span>Back</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-textPrimary text-center text-lg font-semibold lg:text-2xl">
            Leaving this page?
          </AlertDialogTitle>
          <Separator className="bg-black/40" />
          <AlertDialogDescription className="text-txtColor py-5 text-center text-base lg:text-lg">
            If you leave now, your changes won’t be saved
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full !items-center !justify-center gap-5">
          <AlertDialogCancel
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "border-gray-300 border"
            )}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className={cn(
              buttonVariants({
                variant: "secondary",
              })
            )}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
