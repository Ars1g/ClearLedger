import { WalletIcon } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <WalletIcon height={26} width={26} />
      <h5>ClearLedger</h5>
    </Link>
  );
}
