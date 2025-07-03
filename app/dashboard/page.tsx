import Sidebar from "@/components/Sidebar";

import { createClient } from "@/lib/supabase-client/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  console.log("asd");
  return <Sidebar />;
}
