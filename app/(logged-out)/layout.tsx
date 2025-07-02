import { ReactNode } from "react";
import Navbar from "../_components/Navbar";
import Image from "next/image";

export default function LoggedOutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar variant="with-btn" />
      {children}
    </div>
  );
}
