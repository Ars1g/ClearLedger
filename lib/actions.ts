"use server";

import { revalidatePath } from "next/cache";
import {
  LoginData,
  loginSchema,
  SignupData,
  signupSchema,
  TransactionData,
  transactionSchema,
} from "./schemas";

import { redirect } from "next/navigation";
import {
  addNewTransaction,
  createUserAccount,
  loginWithPassword,
} from "./server-data-service";
import { createClient } from "./supabase-client/server";

export async function newTransactionAction(values: TransactionData) {
  const validatedTransactionData = transactionSchema.safeParse(values);

  if (!validatedTransactionData.success) {
    return {
      error: true,
      message:
        validatedTransactionData.error.issues[0] ??
        "Transaction validation failed",
    };
  }
  try {
    await addNewTransaction(values);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add new transaction" };
  }
}

export async function loginAction(values: LoginData) {
  const validatedLoginData = loginSchema.safeParse(values);

  if (!validatedLoginData.success) {
    return {
      error: true,
      message: validatedLoginData.error.issues[0] ?? "Login validation failed",
    };
  }

  const result = await loginWithPassword(validatedLoginData.data);

  if (result.error) {
    return { error: true, message: result.error.message };
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function signupSubmitAction(values: SignupData) {
  const validatedSignupData = signupSchema.safeParse(values);

  if (!validatedSignupData.success) {
    return {
      error: true,
      message: validatedSignupData.error.issues[0] ?? "Form validation failed",
      field: validatedSignupData.error.issues[0]?.path?.[0],
    };
  }
  try {
    await createUserAccount(validatedSignupData.data);
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to sign up" };
  }
}

export async function signUpWithGoogleAction() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.SITE_URL}/auth/callback`,
      },
    });
    if (error) throw error;
    if (data.url) redirect(data.url);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Could not authenticate with Google. Please try again",
    };
  }
}

export async function signOutAction() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to sign out" };
  }
}

export async function deleteTransactionAction(id: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete transaction" };
  }
}
