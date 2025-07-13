import {
  createNewUserProfile,
  getUserProfile,
  getUserSession,
} from "@/lib/server-data-service";

export default async function DashboardPage() {
  const { user } = await getUserSession();
  console.log("dashboard session:", user);

  if (!user) return;

  const userProfile = await getUserProfile(user.id);

  if (userProfile.error) {
    await createNewUserProfile(user.email!, user.user_metadata?.avatar_url);
  }
  console.log("userprofile:", userProfile);

  return <div>Dashboard</div>;
}
