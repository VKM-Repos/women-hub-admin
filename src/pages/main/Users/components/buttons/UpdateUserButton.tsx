import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import spalsh from "@/assets/splash.svg";
import { useNavigate } from "react-router-dom";


export default function UpdateUserButton({
  showModal,
  pathname,
  handleExternalSubmit
}: {
  showModal: boolean;
  pathname: any;
  handleExternalSubmit: any;
}) {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (showModal) {
      setIsOpen(true);
    }
  }, [showModal]);

  const handleNavigation = async () => {
    if (pathname == "create-user") {
      navigate("/users");
    } else if (pathname == "create-editor") {
      navigate("/editors");
    } else if (pathname == "create-organization") {
      navigate("/administrators");
    }
  };
  
  return (
    <div className="bg-white mt-6 px-5 py-3 flex items-center justify-between w-full rounded-[1.25rem]">
      <Icon name="check" />
      <Button
        type="submit"
        variant="default"
        onClick={handleExternalSubmit}
        className="bg-secondary text-white px-5 py-2"
      >
        Update
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="bg-secondary text-white px-5 py-2 hidden"
          >
            Update
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={handleNavigation}
        >
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
                  Updated successfully
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
