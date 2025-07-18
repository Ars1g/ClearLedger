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
import { Category, getColumns, Transaction } from "./transactions-columns";
import Filter from "@/components/Filter";

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

  const columns = getColumns(categoryMap);

  const table = useReactTable({
    data: cachedTransactions,
    columns,

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
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2 sm:gap-3  justify-between md:gap-5 lg:gap-8">
          <Button asChild className="flex-none max-w-max">
            <Link href="/transactions/new" className="flex gap-2">
              <PlusIcon />
              <span className="hidden md:inline">Add Transaction</span>
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
            className="lg:max-w-sm lg:w-[22rem] max-w-40 w-[16rem]"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Filter table={table} />
          <SortControls table={table} />
        </div>
      </div>
      <DataTable table={table} columns={columns} />
    </div>
  );
}
