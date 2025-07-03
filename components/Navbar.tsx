import Link from "next/link";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import { Button } from "./Button";

export default function Navbar({
  variant = "default",
}: {
  variant: "with-btn" | "default";
}) {
  return (
    <div className="flex items-center justify-between p-5 h-24 z-1000">
      <Logo />
      <ul className="flex gap-5 items-center">
        <li>
          <DarkModeToggle />
        </li>
        <li className="-translate-y-0.5 ">
          <Link href="/about" className="text-xl">
            About
          </Link>
        </li>
        {variant === "with-btn" ? (
          <li>
            <Button variant="outline">
              <Link href="/login">LOGIN</Link>
            </Button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}
