"use client";
import { DataTable } from "@/components/DataTable";

import DebouncedInput from "@/components/DebouncedInput";
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
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Category, columns, Transaction } from "./transactions-columns";

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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const categoryMap = useMemo(
    () =>
      cachedCategories.reduce(
        (acc, cat) => ({
          ...acc,
          [cat.id]: cat,
        }),
        {}
      ),
    [cachedCategories]
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
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-8  justify-between">
          <Button asChild className="flex-none max-w-max">
            <Link href="/transactions/new" className="flex gap-2">
              <PlusIcon />
              <span className="hidden sm:inline">Add Transaction</span>
            </Link>
          </Button>

          <DebouncedInput
            placeholder="Filter by description..."
            value={
              (table.getColumn("description")?.getFilterValue() as string) ?? ""
            }
            onChange={(value) =>
              table.getColumn("description")?.setFilterValue(value)
            }
            className="md:max-w-sm lg:w-[22rem] max-w-35 w-[16rem]"
          />
        </div>
        <SortControls table={table} />
      </div>
      <DataTable table={table} columns={columns} />
    </div>
  );
}
