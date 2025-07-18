"use client";

import SpinnerMini from "@/components/SpinnerMini";
import Tag from "@/components/Tag";
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
import { format, isWithinInterval } from "date-fns";

import { EllipsisVerticalIcon } from "lucide-react";
import { ReactNode } from "react";

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
): ColumnDef<Transaction, ReactNode>[] => [
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
    filterFn: (row, columnId, filterValue) =>
      isWithinInterval(row.original.date!, {
        start: format(filterValue.from, "yyyy-MM-dd"),
        end: format(filterValue.to, "yyyy-MM-dd"),
      }),
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
    cell: ({ row, table, getValue }) => {
      console.log(getValue());
      const value = getValue();
      if (value === "income") {
        return (
          <Tag variant="income">
            <span>{value}</span>
          </Tag>
        );
      } else {
        return (
          <Tag variant="expense">
            <span>{value}</span>
          </Tag>
        );
      }
    },
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
