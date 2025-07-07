import { getTransactions } from "@/lib/server-data-service";
import TransactionsClientTable from "./transactions-client-table";

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  console.log(transactions);
  return (
    <div className="max-w-[75rem] mx-auto py-10 px-2 sm:px-4">
      <TransactionsClientTable initialData={transactions} />
    </div>
  );
}
