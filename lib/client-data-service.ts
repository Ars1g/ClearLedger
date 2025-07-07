import { Transaction } from "@/app/transactions/transactions-columns";
import supabase from "./supabase-client/client";
// import { createClient } from "@supabase/supabase-js";

export async function getTransactionsClient(): Promise<Transaction[]> {
  //   const supabase = await createClient(
  //     process.env.SUPABASE_URL!,
  //     process.env.SUPABASE_KEY!
  //   );
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*");

  if (error) {
    throw new Error("Failed to get transactions");
  }

  return transactions;
}
