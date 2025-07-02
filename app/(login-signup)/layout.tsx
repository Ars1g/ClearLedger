import Navbar from "@/app/_components/Navbar";
import { ReactNode } from "react";

export default function LoginSignupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar variant="default" />
      <div className="max-w-lg mx-auto px-2">{children}</div>
    </div>
  );
}
