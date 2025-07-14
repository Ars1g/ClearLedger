import { Transaction } from "@/app/transactions/transactions-columns";
import { getTransactionsClient } from "@/lib/client-data-service";
import { useQuery } from "@tanstack/react-query";

export function useTransactions(initialData: Transaction[]) {
  const { data: cachedTransactions = [] } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getTransactionsClient,
    initialData,
  });
  return { cachedTransactions };
}
