import { Transaction } from "@/app/transactions/transactions-columns";
import { Table } from "@tanstack/react-table";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
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

import CalendarWithRange from "./CalendarWithRange";

export default function Filter({ table }: { table: Table<Transaction> }) {
  const [checked, setChecked] = useState({ expense: false, income: false });

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium">Filter by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <FilterIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={checked.expense}
            onCheckedChange={(value) => {
              if (checked.expense === true) {
                setChecked(() => ({ expense: false, income: false }));
                table.setColumnFilters([]);
              }
              if (checked.expense === false) {
                setChecked(() => ({ expense: value, income: false }));
                table.setColumnFilters([{ id: "type", value: "expense" }]);
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
                table.setColumnFilters([]);
              }
              if (checked.income === false) {
                setChecked(() => ({ expense: false, income: value }));
                table.setColumnFilters([{ id: "type", value: "income" }]);
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
                <CalendarWithRange />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
