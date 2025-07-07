"use client";
import { usePathname } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export default function AppHeader() {
  const pathname = usePathname();
  //   function getHeaderTitle(pathname: string) {
  //     const map: Record<string, string> = {
  //       "/dashboard": "Dashboard",
  //       "/settings": "Settings",
  //       "/reports": "Reports",
  //       "/transactions": "Transactions",
  //       // add more as needed
  //     };
  //     return map[pathname] || "Page";
  //   }
  const header = pathname
    .toUpperCase()
    .split("/")
    .at(1)
    ?.slice(0, 1)
    .concat(pathname.slice(2));

  return (
    <>
      <header className="px-2 pt-4 flex items-baseline gap-7 sm:px-4">
        <SidebarTrigger />
        <h1 className="mr-auto text-2xl">{header}</h1>
        <DarkModeToggle />
      </header>
      <Separator />
    </>
  );
}
