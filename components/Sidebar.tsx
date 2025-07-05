"use client";

import { signOut } from "@/lib/client-data-service";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <div className="mx-auto max-w-screen w-full">
      <Button onClick={signOut}>Sign out</Button>
    </div>
  );
}
