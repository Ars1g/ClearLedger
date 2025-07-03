import { z } from "zod";
import { loginSchema, signupSchema } from "./schemas";
import { redirect } from "next/navigation";
import { createClient } from "./server";

export async function loginWithPassword(data: z.infer<typeof loginSchema>) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }
}

export async function signUp(data: z.infer<typeof signupSchema>) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }
}
