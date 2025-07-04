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

  const userProfile = await getUserProfile(user!.email);

  if (userProfile.error) {
    await createNewUserProfile(user!.email);
  }
  console.log("userprofile:", userProfile);

  return <Sidebar />;
}
