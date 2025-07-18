import { Transaction } from "@/app/transactions/transactions-columns";
import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortControls({ table }: { table: Table<Transaction> }) {
  const currentSortColumnId = table.getState().sorting[0]?.id;

  const handleSortChange = (value: string) => {
    if (value === "default") {
      table.setSorting([]);
      return;
    }
    const [id, order] = value.split("-");

    table.setSorting([{ id, desc: order === "desc" }]);
  };
  return (
    <div className="flex items-center gap-2 ">
      <span className="text-sm font-medium">Sort by:</span>
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="sm:w-[9rem] w-[6rem] md:w-[12rem]">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="date-desc">Date: Newest first</SelectItem>
          <SelectItem value="date-asc">Date: Oldest first</SelectItem>
          <SelectItem value="amount-desc">Amount: High to Low</SelectItem>
          <SelectItem value="amount-asc">Amount: Low to High</SelectItem>
          <SelectItem value="category_id-asc">Category</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
