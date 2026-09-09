import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/icons/Icon";

import { usePOST } from "@/hooks/usePOST.hook";
import { useDELETE } from "@/hooks/useDelete.hook";

/**
 * The action currently awaiting confirmation. `null` means no dialog is open.
 *
 * NOTE: the dialogs are rendered as SIBLINGS of <DropdownMenu>, never inside
 * <DropdownMenuContent>. DropdownMenuContent renders into a Radix Portal that
 * unmounts the moment the menu closes, so a <Dialog> nested inside it is torn
 * down before it can ever open. That was why none of the action buttons worked.
 */
type UserAction =
  | "flag"
  | "unflag"
  | "suspend"
  | "unsuspend"
  | "activate"
  | "deactivate"
  | "delete";

const FLAG_REASONS = [
  "Inappropriate Language",
  "Inappropriate Content",
  "Spam",
  "Misleading information",
  "Other",
];

export default function ManageUser({
  user,
  refetch,
}: {
  user: any;
  refetch: () => void;
}) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [action, setAction] = useState<UserAction | null>(null);
  const [flagReasons, setFlagReasons] = useState<string[]>([]);

  const userId = user?.id;
  const isActive = user?.active !== false;
  const isSuspended = user?.suspended === true;
  const isFlagged = user?.flagged === true;
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const closeDialog = () => {
    setAction(null);
    setFlagReasons([]);
  };

  const onDone = (message: string) => () => {
    closeDialog();
    refetch();
    toast.success(message);
  };

  // --- mutations -----------------------------------------------------------
  // Hooks must run unconditionally, so every mutation is declared up front and
  // only fired from its own confirm handler.

  const { mutate: activateUser, isPending: activating } = usePOST(
    `admin/users/${userId}/activate`,
    { callback: onDone(`${user?.name} has been activated.`) }
  );

  const { mutate: deactivateUser, isPending: deactivating } = usePOST(
    `admin/users/${userId}/deactivate`,
    { callback: onDone(`${user?.name} has been deactivated.`) }
  );

  const { mutate: suspendUser, isPending: suspending } = usePOST(
    `admin/users/${userId}/suspend`,
    { callback: onDone(`${user?.name} has been suspended.`) }
  );

  const { mutate: unsuspendUser, isPending: unsuspending } = usePOST(
    `admin/users/${userId}/unsuspend`,
    { callback: onDone(`${user?.name}'s suspension has been lifted.`) }
  );

  const { mutate: flagUser, isPending: flagging } = usePOST(
    `admin/users/${userId}/flag`,
    { callback: onDone(`${user?.name} has been flagged for review.`) }
  );

  const { mutate: unflagUser, isPending: unflagging } = usePOST(
    `admin/users/${userId}/unflag`,
    { callback: onDone(`${user?.name} is no longer flagged.`) }
  );

  const { mutate: deleteUser, isPending: deleting } = useDELETE(
    `admin/users/${userId}`,
    {
      showSuccessToast: false,
      callback: onDone(`${user?.name} has been deleted.`),
    }
  );

  const busy =
    activating ||
    deactivating ||
    suspending ||
    unsuspending ||
    flagging ||
    unflagging ||
    deleting;

  // --- menu ----------------------------------------------------------------

  const openAction = (next: UserAction) => {
    if (!userId) {
      toast.error("This user has no id, so it cannot be managed.");
      return;
    }
    setMenuOpen(false);
    // Opening the dialog in the same tick as the menu closing makes Radix's
    // two focus/pointer-event locks fight each other, and the dialog ends up
    // inert or never painted. Deferring by a frame lets the menu fully unmount
    // first. Paired with modal={false} on the menu below.
    setTimeout(() => setAction(next), 0);
  };

  const goToEditPage = () => {
    setMenuOpen(false);
    navigate(`/users/edit-user?id=${encodeURIComponent(String(userId))}`);
  };

  const menuItem =
    "flex gap-2 items-center w-full py-1.5 px-1.5 rounded cursor-pointer focus:bg-[#EAEAEA] data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed";

  return (
    <>
      {/*
        modal={false} is essential. In Radix's default modal mode the menu sets
        `pointer-events: none` on <body> and holds a focus trap. When it closes
        and a Dialog opens, the two locks collide and the dialog is left inert.
      */}
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-[11rem] font-inter text-sm font-medium"
          // Stops Radix returning focus to the trigger while the dialog is
          // trying to take it, which otherwise leaves the dialog unfocusable.
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {isFlagged ? (
            <DropdownMenuItem
              className={menuItem}
              onSelect={() => openAction("unflag")}
            >
              <Icon name="flagIcon" /> Unflag
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className={menuItem}
              onSelect={() => openAction("flag")}
              disabled={isSuperAdmin}
            >
              <Icon name="flagIcon" /> Flag
            </DropdownMenuItem>
          )}

          {isSuspended ? (
            <DropdownMenuItem
              className={menuItem}
              onSelect={() => openAction("unsuspend")}
            >
              <Icon name="activateIcon" /> Lift suspension
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className={menuItem}
              onSelect={() => openAction("suspend")}
              disabled={isSuperAdmin}
            >
              <Icon name="suspendIcon" /> Suspend
            </DropdownMenuItem>
          )}

          {isActive ? (
            <DropdownMenuItem
              className={menuItem}
              onSelect={() => openAction("deactivate")}
              disabled={isSuperAdmin}
            >
              <Icon name="deactivateIcon" /> Deactivate
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className={menuItem}
              onSelect={() => openAction("activate")}
            >
              <Icon name="activateIcon" /> Activate
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className={menuItem}
            onSelect={goToEditPage}
            disabled={!isActive}
          >
            <Icon name="editIcon" /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className={`${menuItem} text-[#FF6A55] focus:text-[#FF6A55]`}
            onSelect={() => openAction("delete")}
            disabled={isSuperAdmin}
          >
            <Icon name="deletingIcon" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ---------------------------------------------------------------- */}
      {/* Confirmation dialogs — siblings of the menu, so they survive it   */}
      {/* closing.                                                         */}
      {/* ---------------------------------------------------------------- */}

      <ConfirmDialog
        open={action === "delete"}
        onOpenChange={(o) => !o && closeDialog()}
        title={`You are about to delete ${user?.name}`}
        description="Deleting will permanently clear this user's data from WomenHub. Are you sure?"
        confirmLabel="Delete"
        destructive
        busy={busy}
        onConfirm={() => deleteUser({})}
      />

      <ConfirmDialog
        open={action === "suspend"}
        onOpenChange={(o) => !o && closeDialog()}
        title={`You are about to suspend ${user?.name}`}
        description="Suspending a user blocks them from posting and sends them a notification."
        confirmLabel="Confirm"
        busy={busy}
        onConfirm={() => suspendUser({})}
      />

      <ConfirmDialog
        open={action === "unsuspend"}
        onOpenChange={(o) => !o && closeDialog()}
        title={`Lift suspension on ${user?.name}`}
        description="This user will be able to post and comment again."
        confirmLabel="Confirm"
        busy={busy}
        onConfirm={() => unsuspendUser({})}
      />

      <ConfirmDialog
        open={action === "activate"}
        onOpenChange={(o) => !o && closeDialog()}
        title={`You are about to activate ${user?.name}`}
        description="Are you sure you want to activate this user? They will regain access to WomenHub."
        confirmLabel="Confirm"
        busy={busy}
        onConfirm={() => activateUser({})}
      />

      <ConfirmDialog
        open={action === "deactivate"}
        onOpenChange={(o) => !o && closeDialog()}
        title={`You are about to deactivate ${user?.name}`}
        description="They will lose access to WomenHub. You can reactivate them at any time."
        confirmLabel="Confirm"
        busy={busy}
        onConfirm={() => deactivateUser({})}
      />

      <ConfirmDialog
        open={action === "unflag"}
        onOpenChange={(o) => !o && closeDialog()}
        title={`Remove the flag on ${user?.name}`}
        description="This will clear the review flag on this account."
        confirmLabel="Confirm"
        busy={busy}
        onConfirm={() => unflagUser({})}
      />

      {/* Flag needs its own body because it collects reasons. */}
      <Dialog
        open={action === "flag"}
        onOpenChange={(o) => !o && closeDialog()}
      >
        <DialogContent className="w-[33.5rem] flex flex-col gap-8">
          <DialogHeader className="flex flex-col gap-4 items-center">
            <DialogTitle className="text-textPrimary font-bold text-2xl py-3 px-5 w-full text-center">
              Flag {user?.name}
              <hr className="w-full mt-2 mb-0" />
            </DialogTitle>
            <DialogDescription className="text-[#515151] font-medium text-sm text-center">
              Select up to 2 reasons for flagging this account.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 px-6">
            {FLAG_REASONS.map((reason) => {
              const checked = flagReasons.includes(reason);
              const atLimit = flagReasons.length >= 2 && !checked;
              return (
                <label
                  key={reason}
                  className={`flex items-center justify-between text-sm ${
                    atLimit ? "opacity-40" : "cursor-pointer"
                  }`}
                >
                  {reason}
                  <Checkbox
                    checked={checked}
                    disabled={atLimit}
                    onCheckedChange={(value) =>
                      setFlagReasons((prev) =>
                        value
                          ? [...prev, reason]
                          : prev.filter((r) => r !== reason)
                      )
                    }
                  />
                </label>
              );
            })}
          </div>

          <DialogFooter className="flex !justify-center !items-center !gap-4">
            <Button
              type="button"
              variant="outline"
              className="text-black bg-white h-10 px-5 border border-[#EFEFEF] rounded-lg"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button
              className="text-white bg-secondary h-10 px-5 rounded-lg"
              disabled={busy || flagReasons.length === 0}
              onClick={() => flagUser({ reasons: flagReasons })}
            >
              {flagging ? "Flagging…" : "Flag user"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
  busy,
  destructive = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  busy: boolean;
  destructive?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[33.5rem] flex flex-col gap-12">
        <DialogHeader className="flex flex-col gap-4 items-center">
          <DialogTitle className="text-textPrimary font-bold text-2xl py-3 px-5 w-full text-center">
            {title}
            <hr className="w-full mt-2 mb-0" />
          </DialogTitle>
          <DialogDescription className="text-[#515151] font-medium text-sm text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex !justify-center !items-center !gap-4">
          <Button
            type="button"
            variant="outline"
            className="text-black bg-white h-10 px-5 border border-[#EFEFEF] rounded-lg"
            onClick={() => onOpenChange(false)}
            disabled={busy}
          >
            Cancel
          </Button>
          <Button
            className={`text-white h-10 px-5 rounded-lg ${
              destructive ? "bg-[#FF6A55] hover:bg-[#e85f4b]" : "bg-secondary"
            }`}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "Working…" : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}