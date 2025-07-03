"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginSchema, signupSchema } from "./schemas";
import { z } from "zod";
import { loginWithPassword, signUp } from "./data-service";

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedLoginData = loginSchema.safeParse(data);

  if (!validatedLoginData.success) {
    return {
      error: true,
      message: validatedLoginData.error.issues[0] ?? "Login validation failed",
    };
  }

  await loginWithPassword(validatedLoginData.data);
  console.log(validatedLoginData);

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(values: z.infer<typeof signupSchema>) {
  console.log("From server", values);

  const validatedSignupData = signupSchema.safeParse(values);
  console.log(validatedSignupData);
  if (!validatedSignupData.success) {
    return {
      error: true,
      message:
        validatedSignupData.error.issues[0] ?? "Form data validation failed",
    };
  }
  await signUp(validatedSignupData.data);

  // const { error } = await supabase
  //   .from("profiles")
  //   .insert([{ email: validatedSignupData.data.email, id: "otherValue" }]);

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
