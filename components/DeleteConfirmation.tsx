"use client";
import { Transaction } from "@/app/transactions/transactions-columns";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";
import { Button } from "./ui/button";

type Props = {
  transaction: Transaction;
  onClose: () => void;
};

export default function DeleteConfirmation({ transaction, onClose }: Props) {
  const { deleteTransaction } = useDeleteTransaction(transaction.id);

  return (
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
            deleteTransaction();
            onClose();
          }}
        >
          Delete
        </Button>
      </DialogFooter>
    </>
  );
}
