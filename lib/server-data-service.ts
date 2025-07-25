import { Category, Transaction } from "@/app/transactions/transactions-columns";
import { LoginData, SignupData, TransactionData } from "./schemas";
import { createClient } from "./supabase-client/server";
import { cache } from "react";
import { format } from "date-fns";

export async function editTransaction(
  values: TransactionData
): Promise<Transaction> {
  const supabase = await createClient();
  console.log("Editing transaction with values:", values);
  const { data: editedTransaction, error } = await supabase
    .from("transactions")
    .update({
      date: format(values.date, "yyyy-MM-dd"),
      description: values.description,
      amount: values.amount,
      category_id: values.category_id,
    })
    .eq("id", values.id)
    .select()
    .single();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error("Failed to edit transaction");
  }
  console.log("Edited transaction result:", editedTransaction);
  return editedTransaction;
}

export async function addNewTransaction(
  values: TransactionData
): Promise<Transaction[]> {
  const supabase = await createClient();

  const { data: transactions, error } = await supabase
    .from("transactions")
    .insert([
      {
        date: format(values.date, "yyyy-MM-dd"),
        description: values.description,
        amount: values.amount,
        category_id: values.category_id,
      },
    ])
    .select();
  if (error) {
    throw new Error("Failed to add new transaction");
  }
  return transactions;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return categories;
}

export async function getTransactions(): Promise<Transaction[]> {
  const supabase = await createClient();
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch transactions");
  }

  return transactions;
}

export async function loginWithPassword(data: LoginData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error };
  }
  return { success: true };
}

export async function createUserAccount(data: SignupData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(data);
  if (error) {
    throw new Error("Failed to create user account");
  }
  return { success: true };
}

export async function getUserProfile(userId: string | undefined) {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profile && !error) return profile;
  return null;
}

export async function createNewUserProfile(email: string, avatar_url?: string) {
  const supabase = await createClient();

  const profileData: { email: string; avatar_url?: string } = {
    email,
  };
  if (avatar_url) {
    profileData.avatar_url = avatar_url;
  }

  const { error } = await supabase
    .from("profiles")
    .insert([profileData])
    .select();

  if (error) {
    throw new Error("Failed to create new user profile");
  }
  return { success: true };
}

export async function getUserSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user };
}

export const getOrCreateUserProfile = cache(async () => {
  const { user } = await getUserSession();

  if (!user) return null;

  const userProfile = await getUserProfile(user.id);
  if (userProfile) return userProfile;

  try {
    const newUserProfile = await createNewUserProfile(
      user.email!,
      user.user_metadata?.avatar_url
    );
    return newUserProfile;
  } catch (error) {
    console.error(error);
    return null;
  }
});
