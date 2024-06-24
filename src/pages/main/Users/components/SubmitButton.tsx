import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export default function SubmitButton() {
  return (
    <div className="bg-white mt-6 px-5 py-7 flex items-center justify-between">
      <Icon name="check" />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="bg-secondary text-white px-5 py-2"
          >
            Save and Continue
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-center mb-2">
                <h2 className="font-bold font-inter text-2xl text-[#106840]">
                  want to add a profile image?
                </h2>
              </div>
            </DialogTitle>
            <hr />
            <DialogDescription>
              <p className="text-center text-[14px] mt-4 text-txtColor font-inter">
                {" "}
                Add a profile image for this user
              </p>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="justify-center">
            <div className="flex items-center justify-center gap-5">
              <Button variant="outline">No, skip</Button>
              <Link
                to={`/upload-user-picture/${2}`}
                className="bg-secondary text-white px-5 py-2 rounded-md"
              >
                Yes , please
              </Link>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
