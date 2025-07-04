"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginSchema, signupSchema } from "./schemas";
import { z } from "zod";
import { loginWithPassword, signUp } from "./server-data-service";

export async function loginAction(values: z.infer<typeof loginSchema>) {
  const validatedLoginData = loginSchema.safeParse(values);

  if (!validatedLoginData.success) {
    return {
      error: true,
      message: validatedLoginData.error.issues[0] ?? "Login validation failed",
    };
  }

  const { error } = await loginWithPassword(validatedLoginData.data);

  if (error) {
    return { error };
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function signupAction(values: z.infer<typeof signupSchema>) {
  const validatedSignupData = signupSchema.safeParse(values);
  console.log(validatedSignupData);
  if (!validatedSignupData.success) {
    return {
      error: true,
      message:
        validatedSignupData.error.issues[0] ?? "Form data validation failed",
    };
  }
  const { error } = await signUp(validatedSignupData.data);

  revalidatePath("/", "layout");
  return { error };
}
