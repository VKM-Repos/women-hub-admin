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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import spalsh from "@/assets/splash.svg";
export default function SubmitButton({
  showModal,
  handleSetShpwModal,
  handleResetForm,
  userId,
  orgId,
  pathname,
}: {
  showModal: boolean;
  handleSetShpwModal: () => void;
  handleResetForm: () => void;
  userId?: string;
  orgId?: string;
  pathname?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [splash, setSplash] = useState(false);
  useEffect(() => {
    if (showModal) {
      setIsOpen(true);
    }
  }, [showModal]);

  return (
    <div className="bg-white mt-6 px-5 py-7 flex items-center justify-between w-full">
      <Icon name="check" />
      <Button
        type="submit"
        variant="default"
        className="bg-secondary text-white px-5 py-2"
      >
        Save and Continue
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            // id="confirmModal"
            className="bg-secondary text-white px-5 py-2 hidden"
          >
            Save and Continue
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => e.preventDefault()}
        >
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
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  setSplash(true);
                  handleSetShpwModal();
                  handleResetForm();
                }}
              >
                No, skip
              </Button>
              <Link
                to={
                  orgId
                    ? `/upload-org-picture/${orgId}/${userId}`
                    : `/upload-user-picture/${userId}${pathname}`
                }
                className="bg-secondary text-white px-5 py-2 rounded-md"
              >
                Yes , please
              </Link>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={splash} onOpenChange={setSplash}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            // id="confirmModal"
            className="bg-secondary text-white px-5 py-2 hidden"
          >
            Save and Continue
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col items-center justify-center mb-2">
                <div className="mb-10">
                  <span className="absolute">
                    <img src={spalsh} alt="" className="w-[300px]" />
                  </span>
                  <iframe src="https://lottie.host/embed/d669c5d3-f186-4e69-a874-3151a335757d/ZPQiEbkXq2.json"></iframe>
                </div>
                <h2 className="font-bold font-inter text-2xl text-[#106840]">
                  Created successfully
                </h2>
              </div>
            </DialogTitle>
            <hr />
            <DialogDescription>
              <p className="text-center text-[14px] mt-4 text-txtColor font-inter">
                {" "}
                <p>User has been notified</p>
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
