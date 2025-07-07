"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "@/components/ui/theme-provider";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
