"use client";
import { DataTable } from "@/components/Data-table";
import { getTransactionsClient } from "@/lib/client-data-service";
import { useQuery } from "@tanstack/react-query";
import { columns, Transaction } from "./transactions-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

type Props = {
  initialData: Transaction[];
};

export default function TransactionsClientTable({ initialData }: Props) {
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsClient,
    initialData,
  });
  return (
    <div className="flex flex-col gap-2">
      <Button asChild className="flex-none max-w-max ">
        <Link href="/transactions/new" className="flex items-center gap-2">
          <PlusIcon />
          Add Transaction
        </Link>
      </Button>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
