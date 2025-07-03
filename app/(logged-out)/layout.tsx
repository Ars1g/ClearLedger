import { ReactNode } from "react";

import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function LoggedOutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar variant="with-btn" />
      {children}
    </div>
  );
}
