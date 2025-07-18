"use client";

import { Transaction } from "@/app/transactions/transactions-columns";
import { Table } from "@tanstack/react-table";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Calendar } from "./ui/calendar";

export default function Filter({ table }: { table: Table<Transaction> }) {
  const [checked, setChecked] = useState({ expense: false, income: false });
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const typeColumn = table.getColumn("type");
  const dateColumn = table.getColumn("date");

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium justify-self-end">Filter by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <FilterIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={checked.expense}
            onCheckedChange={(value) => {
              if (checked.expense === true) {
                setChecked(() => ({ expense: false, income: false }));
                typeColumn?.setFilterValue([]);
              }
              if (checked.expense === false) {
                setChecked(() => ({ expense: value, income: false }));
                typeColumn?.setFilterValue("expense");
              }
            }}
          >
            Expense
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked.income}
            onCheckedChange={(value) => {
              if (checked.income === true) {
                setChecked(() => ({ expense: false, income: false }));
                typeColumn?.setFilterValue([]);
              }
              if (checked.income === false) {
                setChecked(() => ({ expense: false, income: value }));
                typeColumn?.setFilterValue("income");
              }
            }}
          >
            Income
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="pl-[1.9rem]">
              Date
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(value) => {
                    setDateRange(value);
                    if (!dateRange) {
                      dateColumn?.setFilterValue([]);
                    } else {
                      dateColumn?.setFilterValue(value);
                    }
                  }}
                  className="rounded-lg border shadow-sm"
                />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
