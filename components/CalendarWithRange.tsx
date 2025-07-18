"use client";

import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function CalendarWithRange() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  console.log("calendar mounts");
  console.log("calendar unmounts");
  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      className="rounded-lg border shadow-sm"
    />
  );
}
