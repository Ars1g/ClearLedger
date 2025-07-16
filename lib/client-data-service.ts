import { Category, Transaction } from "@/app/transactions/transactions-columns";
import supabase from "./supabase-client/client";

export async function getTransactionsClient(): Promise<Transaction[]> {
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch transactions");
  }

  return transactions;
}

export async function getCategoriesClient(): Promise<Category[]> {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return categories;
}

export async function getCategory(categoryId: number) {
  // TODO: currently used nowhere, maybe I don't need it, instead I already fetching all categories
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (error) {
    return { error };
  }

  return categories;
}
