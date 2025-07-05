import Sidebar from "@/components/Sidebar";
import {
  createNewUserProfile,
  getUserProfile,
} from "@/lib/server-data-service";

import { createClient } from "@/lib/supabase-client/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log("session:", user);

  if (!user) return;

  const userProfile = await getUserProfile(user.email);
  // console.log("userprofile:", userProfile);

  if (userProfile.error) {
    await createNewUserProfile(user.email!, user.user_metadata?.avatar_url);
  }
  // console.log("newuserprofile:", userProfile);

  return <Sidebar />;
}
