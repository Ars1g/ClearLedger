"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";
import { Tables } from "@/types/supabase";

import { ColumnDef, Row } from "@tanstack/react-table";

import { EllipsisVerticalIcon } from "lucide-react";

function ActionCell({ row }: { row: Row<Transaction> }) {
  const { deleteTransaction, isDeleting } = useDeleteTransaction();
  const transaction = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <EllipsisVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            deleteTransaction(transaction.id);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type Transaction = Tables<"transactions">;

function Category({
  row,
  categoryMap,
}: {
  row: Row<Transaction>;
  categoryMap: Record<number, Category>;
}) {
  const categoryId = row.getValue("categoryId") as number;
  const category = categoryMap[categoryId];

  return <span>{category?.name}</span>;
}

export type Category = Tables<"categories">;

function TransactionType({
  row,
  categoryMap,
}: {
  row: Row<Transaction>;
  categoryMap: Record<number, Category>;
}) {
  const categoryId = row.getValue("categoryId") as number;
  const category = categoryMap[categoryId];

  return <span>{category?.type}</span>;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row, table }) => (
      <Category row={row} categoryMap={table.options.meta!.categoryMap} />
    ),
  },
  {
    id: "type",
    header: "Type",
    cell: ({ row, table }) => (
      <TransactionType
        row={row}
        categoryMap={table.options.meta!.categoryMap}
      />
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", //TODO: change it to dynamic. based on user settings
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
