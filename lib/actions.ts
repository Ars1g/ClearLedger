"use server";

import { revalidatePath } from "next/cache";
import { LoginData, loginSchema, SignupData, signupSchema } from "./schemas";

import { loginWithPassword, createUserAccount } from "./server-data-service";
import { redirect } from "next/navigation";
import { createClient } from "./supabase-client/server";

export async function loginAction(values: LoginData) {
  const validatedLoginData = loginSchema.safeParse(values);

  if (!validatedLoginData.success) {
    return {
      error: true,
      message: validatedLoginData.error.issues[0] ?? "Login validation failed",
    };
  }

  const { error } = await loginWithPassword(validatedLoginData.data);

  if (error) {
    return { error: true };
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function handleSignupSubmission(values: SignupData) {
  const validatedSignupData = signupSchema.safeParse(values);

  if (!validatedSignupData.success) {
    return {
      error: true,
      message: validatedSignupData.error.issues[0] ?? "Form validation failed",
      field: validatedSignupData.error.issues[0]?.path?.[0],
    };
  }
  const { error } = await createUserAccount(validatedSignupData.data);

  if (error) {
    return { error: true };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signUpWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.SITE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
  if (error) {
    return { error: true };
  }
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: true };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function deleteTransaction(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    return { error };
  }
}
