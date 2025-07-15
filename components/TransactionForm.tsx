"use client";
import { Transaction } from "@/app/transactions/transactions-columns";
import { TransactionData, transactionSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {
  transaction: Transaction;
  initialData?: Transaction;
};

export default function TransactionForm({ transaction, initialData }: Props) {
  const isEditMode = !!initialData;
  console.log(transaction);
  const form = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: isEditMode
      ? {
          amount: transaction.amount,
        }
      : {
          amount: 0,
          category: "",
          date: undefined,
          description: "",
          category_id: 1,
        },
  });
  return null;
}
