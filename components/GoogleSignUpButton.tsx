"use client";

import { signUpWithGoogle } from "@/lib/actions";
import { Button } from "./Button";

export default function GoogleSignInButton() {
  return (
    // <div className="w-full flex items-center justify-center">
    <Button
      // className="max-w-[90%] w-[90%]"
      variant="outline"
      onClick={signUpWithGoogle}
    >
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      Continue with Google
    </Button>
    // </div>
  );
}
