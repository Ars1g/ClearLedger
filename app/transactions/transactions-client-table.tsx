"use client";
import { DataTable } from "@/components/DataTable";

import SortControls from "@/components/SortControls";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Category, Transaction, columns } from "./transactions-columns";

type Props = {
  transactions: Transaction[];
  categories: Category[];
};

export default function TransactionsClientTable({
  transactions,
  categories,
}: Props) {
  const { cachedTransactions } = useTransactions(transactions);

  const { cachedCategories } = useCategories(categories);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const categoryMap = cachedCategories.reduce(
    (acc, cat) => ({
      ...acc,
      [cat.id]: cat,
    }),
    {}
  );

  const table = useReactTable({
    data: cachedTransactions,
    columns,
    meta: { categoryMap },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: {
        id: false,
      },
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <Button asChild className="flex-none max-w-max ">
          <Link href="/transactions/new" className="flex items-center gap-2">
            <PlusIcon />
            Add Transaction
          </Link>
        </Button>
        <SortControls table={table} />
      </div>
      <DataTable table={table} columns={columns} />
    </div>
  );
}
