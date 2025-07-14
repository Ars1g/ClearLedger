import { getOrCreateUserProfile } from "@/lib/server-data-service";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const userProfile = await getOrCreateUserProfile();
  if (!userProfile) {
    redirect("/login");
  }
  return <div>Dashboard</div>;
}
