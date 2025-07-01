"use client";
import { useTheme } from "next-themes";

import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./Button";

export default function DarkModeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <div
      className={`flex items-center space-x-2 ${className ? className : ""}`}
    >
      <Tooltip>
        <TooltipTrigger
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        >
          <Button variant="outline">
            <SunIcon className="dark:block hidden" />
            <MoonIcon className="dark:hidden block" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Switch to {resolvedTheme === "light" ? "dark mode" : "light mode"}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
