import { getCategories, getTransactions } from "@/lib/server-data-service";
import TransactionsClientTable from "./transactions-client-table";
import Error from "@/components/Error";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

export default async function TransactionsPage() {
  const [transactionsResult, categoriesResult] = await Promise.allSettled([
    getTransactions(),
    getCategories(),
  ]);

  const transactions =
    transactionsResult.status === "fulfilled" ? transactionsResult.value : null;
  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : null;

  if (!transactions || !categories) {
    return (
      <Error
        title="Network Error"
        message="We couldn't load your financial data. Please try refreshing the page. If the problem persists, contact support."
      />
    );
  }

  return (
    <div className="max-w-[75rem] mx-auto py-10 px-2 sm:px-4">
      <Suspense fallback={<Spinner />}>
        <TransactionsClientTable
          transactions={transactions}
          categories={categories}
        />
      </Suspense>
    </div>
  );
}
