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

import { useModalStore } from "@/lib/store/useModalStore";
import DeleteConfirmation from "../DeleteConfirmation";
import TransactionForm from "../TransactionForm";
import { Button } from "../ui/button";

export function DialogManager() {
  const { modal, onClose } = useModalStore();

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
            <TransactionForm transaction={modal.data} onSuccess={onClose}>
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
          <DeleteConfirmation onClose={onClose} transaction={modal.data} />
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
