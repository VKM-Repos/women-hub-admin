import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/icons/Icon";
import { usePOST } from "@/hooks/usePOST.hook";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageUser({ user, refetch }: { user: any, refetch: any }) {
    const navigate = useNavigate();
    function redirectToEditPage() {
        const redirectPath = encodeURIComponent(user?.id);
        navigate(`/users/edit-user?id=${redirectPath}`);
    }
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex flex-col items-start gap-3 font-medium font-inter text-sm px-2 cursor-pointer">
            <FlagUser user={user} />
            <SuspendUser user={user} />
            <ActivateUser user={user} refetch={refetch} />
            <DeactivateUser user={user} refetch={refetch} />
            <DeleteUser user={user} />
            <button onClick={redirectToEditPage} className="flex gap-2 hover:bg-[#EAEAEA] w-full py-1 px-1.5 rounded items-center">
                <span><Icon name="editIcon" /></span> Edit
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}


const SuspendUser = ({ user }: { user: any}) => {

    return (
        <Dialog>
            <DialogTrigger className="hover:bg-[#EAEAEA] w-full py-1 px-1.5 rounded">
                <span className="flex gap-2">
                    <span><Icon name="suspendIcon" /></span> Suspend
                </span>
            </DialogTrigger>
            <DialogContent className="w-[33.5rem] flex flex-col gap-[3rem]">
                <DialogHeader className="flex flex-col gap-4 items-center">
                    <DialogTitle className="text-textPrimary font-bold text-2xl py-3 px-5 w-full text-center">
                        You are about to suspend {user?.name}
                        <hr className="w-full mt-2 mb-0" />
                    </DialogTitle>
                    
                    <DialogDescription className="text-[#515151] font-medium text-sm text-center">
                        Suspending a user sends a notification to the user
                    </DialogDescription>
                </DialogHeader>
               <DialogFooter className="flex !justify-center !items-center !gap-4 cursor-pointer">
                    <DialogClose className="text-black bg-white h-10 px-5 border border-[#EFEFEF] rounded-lg">
                        Cancel
                    </DialogClose>
                    <Button className="text-white bg-secondary h-10 px-5 ml-7 rounded-lg">
                        Confirm
                    </Button>
               </DialogFooter>
           </DialogContent>
        </Dialog>
    )
}


const DeleteUser = ({ user }: { user: any}) => {

    return (
        <Dialog>
            <DialogTrigger className="hover:bg-[#EAEAEA] w-full py-1 px-1.5 rounded">
                <span className="flex gap-2">
                    <span><Icon name="deletingIcon" /></span> Delete
                </span>
            </DialogTrigger>
            <DialogContent className="w-[33.5rem] flex flex-col gap-[3rem]">
                <DialogHeader className="flex flex-col gap-4 items-center">
                    <DialogTitle className="text-textPrimary font-bold text-2xl py-3 px-5 w-full text-center">
                        You are about to delete {user?.name}
                        <hr className="w-full mt-2 mb-0" />
                    </DialogTitle>
                    
                    <DialogDescription className="text-[#515151] font-medium text-sm text-center">
                        Deleting will permanently clear this user’s data from women hub.
                        Are you sure?
                    </DialogDescription>
                </DialogHeader>
               <DialogFooter className="flex !justify-center !items-center !gap-4 cursor-pointer">
                    <DialogClose className="text-black bg-white h-10 px-5 border border-[#EFEFEF] rounded-lg">
                        Cancel
                    </DialogClose>
                    <Button className="text-white bg-secondary h-10 px-5 ml-7 rounded-lg">
                        Delete
                    </Button>
               </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const ActivateUser = ({ user, refetch }: { user: any, refetch: any }) => {
    const [open, setOpen] = useState(false);
 

    const { mutate: activateUser } = usePOST(
        `admin/users/${user?.id}/activate`,
        {
          callback: () => {
            setOpen(false);
            refetch();
            toast.success(`${user?.name} has been activated. They can now access WomenHub`);
          },
        }
      );
    
    const handleActivate = () => {
        if (user?.active === false) {
            activateUser(
                { id: user?.name }
            );
        }
        else {
            toast.error(`${user?.name} is already active. You cannot activate this user.`)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="hover:bg-[#EAEAEA] w-full py-1 px-1.5 rounded">
                <span className="flex gap-2">
                    <span><Icon name="activateIcon" /></span> Activate
                </span>
            </DialogTrigger>
            <DialogContent className="w-[33.5rem] flex flex-col gap-[3rem]">
                <DialogHeader className="flex flex-col gap-4 items-center">
                    <DialogTitle className="text-textPrimary font-bold text-2xl py-3 px-5 w-full text-center">
                        You are about to activate {user?.name}
                        <hr className="w-full mt-2 mb-0" />
                    </DialogTitle>
                    
                    <DialogDescription className="text-[#515151] font-medium text-sm text-center">
                        Are you sure you want to activate this user?
                    </DialogDescription>
                </DialogHeader>
               <DialogFooter className="flex !justify-center !items-center !gap-4 cursor-pointer">
                    <DialogClose className="text-black bg-white h-10 px-5 border border-[#EFEFEF] rounded-lg">
                        Cancel
                    </DialogClose>
                    <Button
                        className="text-white bg-secondary h-10 px-5 ml-7 rounded-lg"
                        onClick={handleActivate}>
                        Confirm
                    </Button>
               </DialogFooter>
           </DialogContent>
        </Dialog>
    )
}


const DeactivateUser = ({ user, refetch }: { user: any, refetch: any }) => {
    const [open, setOpen] = useState(false);

    const { mutate: deactivateUser } = usePOST(
        `admin/users/${user?.id}/deactivate`,
        {
          callback: () => {
            refetch();
            toast.success(`${user?.name} has been deactivated. They can no longer access WomenHub`);
          },
        }
      );

    const handleDeactivate = () => {
        if (user?.active === true) {
            deactivateUser(
                { id: user?.id }
            );
            setOpen(false);
        } else {
            toast.error(`${user?.name} has already been deactivated. You can not deactivate this user.`)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="hover:bg-[#EAEAEA] w-full py-1 px-1.5 rounded">
                <span className="flex gap-2">
                    <span><Icon name="suspendIcon" /></span> Deactivate
                </span>
            </DialogTrigger>
            <DialogContent className="w-[33.5rem] flex flex-col gap-[3rem]">
                <DialogHeader className="flex flex-col gap-4 items-center">
                    <DialogTitle className="text-textPrimary font-bold text-2xl py-3 px-5 w-full text-center">
                        You are about to deactivate this user
                        <hr className="w-full mt-2 mb-0" />
                    </DialogTitle>
                    
                    <DialogDescription className="text-[#515151] font-medium text-sm text-center">
                        Are you sure you want to deactivate this user? You can reactivate them with the Activate button.
                    </DialogDescription>
                </DialogHeader>
               <DialogFooter className="flex !justify-center !items-center !gap-4 cursor-pointer">
                    <DialogClose className="text-black bg-white h-10 px-5 border border-[#EFEFEF] rounded-lg">
                        Cancel
                    </DialogClose>
                    <Button 
                        className="text-white bg-secondary h-10 px-5 ml-7 rounded-lg"
                        onClick={handleDeactivate}>
                        Confirm
                    </Button>
               </DialogFooter>
           </DialogContent>
        </Dialog>
    )
}


const FlagUser = ({ user }: { user: any}) => {

    return (
        <Dialog>
            <DialogTrigger className="hover:bg-[#EAEAEA] w-full py-1 px-1.5 rounded">
                <span className="flex gap-2">
                    <span><Icon name="flagIcon" /></span> Flag
                </span>
            </DialogTrigger>
            <DialogContent>
                Flag {user?.name}
            </DialogContent>
        </Dialog>
    )
}