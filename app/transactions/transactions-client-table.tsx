"use client";
import { DataTable } from "@/components/Data-table";
import { getTransactionsClient } from "@/lib/client-data-service";
import { useQuery } from "@tanstack/react-query";
import { columns, Transaction } from "./transactions-columns";

type Props = {
  initialData: Transaction[];
};

export default function TransactionsClientTable({ initialData }: Props) {
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsClient,
    initialData,
  });
  return <DataTable columns={columns} data={transactions} />;
}
