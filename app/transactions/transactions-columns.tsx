"use client";

import SpinnerMini from "@/components/SpinnerMini";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModalStore } from "@/lib/store/useModalStore";
import { usePendingStore } from "@/lib/store/usePendingStore";
import { Tables } from "@/types/supabase";

import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import { EllipsisVerticalIcon } from "lucide-react";

function ActionCell({ row }: { row: Row<Transaction> }) {
  const { onOpen } = useModalStore();

  const { pendingIds } = usePendingStore();
  const transaction = row.original;
  const isDeleting = pendingIds.has(transaction.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting}>
          <span className="sr-only">Open menu</span>
          {isDeleting ? (
            <SpinnerMini />
          ) : (
            <EllipsisVerticalIcon className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => onOpen("editTransaction", transaction)}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-500"
          onClick={() => {
            onOpen("deleteTransaction", transaction);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type Transaction = Tables<"transactions">;
export type Category = Tables<"categories">;

export const getColumns = (
  categoryMap: Record<number, Category>
): ColumnDef<Transaction>[] => [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return row.original.date
        ? format(row.original.date, "MMM dd, yyyy")
        : "-";
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category_id",
    header: "Category",
    accessorFn: (row) => {
      return categoryMap[row.category_id].name;
    },
  },
  {
    id: "type",
    header: "Type",
    accessorFn: (row) => {
      return categoryMap[row.category_id].type;
    },
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

    cell: ({ row }) => (
      <div className="text-right">
        <ActionCell row={row} />
      </div>
    ),
  },
];
