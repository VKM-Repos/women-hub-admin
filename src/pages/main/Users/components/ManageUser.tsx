import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ManageUser({ user }: { user: any}) {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex flex-col items-start gap-2 font-medium font-inter text-sm px-5 cursor-pointer">
            <ViewUser user={user} />
            <p>Edit</p>
            <FlagUser user={user} />
            <SuspendUser user={user} />
            <ActivateUser user={user} />
            <DeleteUser user={user} />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}


const ViewUser = ({ user }: { user: any}) => {
    console.log(user);

    return (
        <Dialog>
            <DialogTrigger>View</DialogTrigger>
            <DialogContent></DialogContent>
        </Dialog>
    )
}


const SuspendUser = ({ user }: { user: any}) => {
    console.log(user);

    return (
        <Dialog>
            <DialogTrigger>Suspend</DialogTrigger>
            <DialogContent></DialogContent>
        </Dialog>
    )
}


const DeleteUser = ({ user }: { user: any}) => {
    console.log(user);

    return (
        <Dialog>
            <DialogTrigger>Delete</DialogTrigger>

            <DialogContent className="w-[33.5rem] flex flex-col gap-[3rem]">
                <DialogHeader className="flex flex-col gap-4 items-center">
                    <DialogTitle className="text-textPrimary font-bold text-2xl py-3 px-5 w-full text-center">
                        You are about to delete a user
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

const ActivateUser = ({ user }: { user: any}) => {
    console.log(user);

    return (
        <Dialog>
            <DialogTrigger>Activate</DialogTrigger>
            <DialogContent></DialogContent>
        </Dialog>
    )
}

const FlagUser = ({ user }: { user: any}) => {
    console.log(user);

    return (
        <Dialog>
            <DialogTrigger>Flag</DialogTrigger>
            <DialogContent></DialogContent>
        </Dialog>
    )
}