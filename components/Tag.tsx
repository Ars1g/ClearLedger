import { ReactNode } from "react";

export default function Tag({
  children,
  variant,
}: {
  children: ReactNode;
  variant: string;
}) {
  return (
    <div
      className={`px-2 py-1 ${
        variant === "income"
          ? "bg-green-400 text-stone-950 "
          : "bg-red-400 text-stone-950"
      }  max-w-[4.8rem] rounded-full flex items-center justify-center`}
    >
      {children}
    </div>
  );
}
