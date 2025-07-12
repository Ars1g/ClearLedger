import { Transaction } from "@/app/transactions/transactions-columns";
import supabase from "./supabase-client/client";

export async function getTransactionsClient(): Promise<Transaction[]> {
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*");

  if (error) {
    throw new Error("Failed to get transactions");
  }

  return transactions;
}

export async function getCategory(categoryId: number) {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (error) {
    throw new Error("Failed to get category");
  }

  return categories;
}
