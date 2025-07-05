"use client";

import { signUpWithGoogle } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function GoogleSignInButton() {
  return (
    <Button variant="outline" onClick={signUpWithGoogle}>
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      Continue with Google
    </Button>
  );
}
