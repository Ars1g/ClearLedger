import AppSidebar from "@/components/AppSidebar";
import QueryProvider from "@/components/providers/QueryProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getUserSession } from "@/lib/server-data-service";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClearLedger",
  description: "Take control of your finances",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUserSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        <QueryProvider>
          <ThemeProvider>
            {user ? (
              <SidebarProvider>
                <AppSidebar user={user} />
                <div className="flex flex-col gap-3 w-full">
                  <AppHeader />

                  <main className="flex-1">{children}</main>
                </div>
              </SidebarProvider>
            ) : (
              <main>{children}</main>
            )}
          </ThemeProvider>
          <Toaster richColors expand={true} position="bottom-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
