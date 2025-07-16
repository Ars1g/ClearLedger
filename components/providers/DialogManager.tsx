"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import TransactionForm from "../TransactionForm";
import { useModalStore } from "@/lib/store/useModalStore";
import { Button } from "../ui/button";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";

export function DialogManager() {
  const { modal, onClose } = useModalStore();
  const { deleteTransaction, isDeleting } = useDeleteTransaction();

  const isOpen = modal.type !== null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  let content = null;
  if (isOpen && modal.data) {
    switch (modal.type) {
      case "editTransaction":
        content = (
          <>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
              <DialogDescription>
                Make changes to your transaction here. Click save changes when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <TransactionForm
              transaction={modal.data}
              onSuccess={onClose} // Pass onClose to close the dialog on success
            >
              {({ isEditing }) => (
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isEditing}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isEditing}>
                    {isEditing ? "Editing..." : "Save changes"}
                  </Button>
                </DialogFooter>
              )}
            </TransactionForm>
          </>
        );
        break;
      case "deleteTransaction":
        content = (
          <>
            <DialogHeader>
              <DialogTitle>Delete transaction</DialogTitle>
            </DialogHeader>

            <DialogDescription>
              Are you sure you want to delete this transaction?
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  deleteTransaction(modal.data!.id);
                  onClose();
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </>
        );
        break;
      default:
        content = null;
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}
