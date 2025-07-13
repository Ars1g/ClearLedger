import { Transaction } from "@/app/transactions/transactions-columns";
import { LoginData, SignupData } from "./schemas";
import { createClient } from "./supabase-client/server";

export async function getCategories() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    throw new Error("Failed to get categories");
  }

  return categories;
}

export async function getTransactions(): Promise<Transaction[]> {
  const supabase = await createClient();
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*");

  if (error) {
    throw new Error("Failed to get transactions");
  }

  return transactions;
}

export async function loginWithPassword(data: LoginData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error };
  }
  return { error };
}

export async function createUserAccount(data: SignupData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(data);
  return { error };
}

export async function getUserProfile(userId: string | undefined) {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return { error };
  }
  return profile;
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
    return { error };
  }
}

export async function getUserSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user };
}
