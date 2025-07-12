import { Category } from "@/app/transactions/transactions-columns";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    categoryMap?: Record<number, Category>;
  }
}
