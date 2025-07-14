import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  title?: string;
  message?: string;
  // Optionally allow children for custom content
  children?: React.ReactNode;
}

export default function Error({
  title = "Something went wrong",
  message = "An unexpected error has occurred. Please try again later.",
  children,
}: ErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-red-50 rounded-md border border-red-200 text-red-800"
    >
      <AlertTriangle
        className="w-12 h-12 mb-4 text-red-500"
        aria-hidden="true"
      />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-4 text-center">{message}</p>
      {children}
    </div>
  );
}
