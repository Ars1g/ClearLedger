"use client";
import { DataTable } from "@/components/Data-table";

import { Category, columns, Transaction } from "./transactions-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { useTransactions } from "@/hooks/useTransactions";

type Props = {
  transactions: Transaction[];
  categories: Category[];
};

export default function TransactionsClientTable({
  transactions,
  categories,
}: Props) {
  const { cachedTransactions } = useTransactions(transactions);

  const categoryMap = categories.reduce(
    (acc, cat) => ({
      ...acc,
      [cat.id]: cat,
    }),
    {}
  );

  return (
    <div className="flex flex-col gap-2">
      <Button asChild className="flex-none max-w-max ">
        <Link href="/transactions/new" className="flex items-center gap-2">
          <PlusIcon />
          Add Transaction
        </Link>
      </Button>
      <DataTable
        columns={columns}
        data={cachedTransactions}
        meta={{ categoryMap }}
      />
    </div>
  );
}
