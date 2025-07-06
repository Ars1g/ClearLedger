import { redirect } from "next/navigation";
import supabase from "./supabase-client/client";

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  redirect("/");
}
