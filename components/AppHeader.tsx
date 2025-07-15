"use client";
import { usePathname } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export default function AppHeader() {
  const pathname = usePathname();
  function getHeaderTitle(pathname: string) {
    const map: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/settings": "Settings",
      "/reports": "Reports",
      "/transactions": "Transactions",
      "/transactions/new": "New Transaction",
    };
    return map[pathname] || "Page";
  }

  const headerTitle = getHeaderTitle(pathname);

  return (
    <>
      <header className="px-2 pt-4 flex items-baseline gap-7 sm:px-4">
        <SidebarTrigger />
        <h1 className="mr-auto text-2xl">{headerTitle}</h1>
        <DarkModeToggle />
      </header>
      <Separator />
    </>
  );
}
