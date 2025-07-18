import { useEffect, useState } from "react";
import { Input } from "./ui/input";

type Props = {
  value: string | number;
  onChange: (vaLue: string | number) => void;
  debounce?: number;
} & React.ComponentProps<"input">;

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: Props) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onChange(value);
      }
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, initialValue, onChange]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
