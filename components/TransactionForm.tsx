"use client";
import { Transaction } from "@/app/transactions/transactions-columns";
import { useCategories } from "@/hooks/useCategories";
import { TransactionData, transactionSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useAddNewTransaction } from "@/hooks/useAddNewTransaction";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { useEditTransaction } from "@/hooks/useEditTransaction";

type Props = {
  transaction?: Transaction;
  children?: (props: { isEditing: boolean }) => ReactNode;

  onSuccess?: () => void;
};

export default function TransactionForm({
  transaction,
  children,
  // setOpenDialog,
  onSuccess,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { cachedCategories } = useCategories();
  const { addNewTransaction, isAdding } = useAddNewTransaction();
  const { editTransaction, isEditing } = useEditTransaction();

  const isEditMode = !!transaction;

  let defaultCategory;
  if (isEditMode) {
    defaultCategory = cachedCategories.find(
      (cat) => cat.id === transaction.category_id
    );
  }

  const form = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: isEditMode
      ? {
          amount: transaction.amount ?? 0,
          category: defaultCategory?.name ?? "",
          date: transaction.date ? new Date(transaction.date) : undefined,
          description: transaction.description ?? "",
          category_id: transaction.category_id ?? 1,
        }
      : {
          amount: 0,
          category: "",
          date: undefined,
          description: "",
          category_id: 1,
        },
  });

  const categoryValue = form.watch("category");

  useEffect(() => {
    const selectedCategory = cachedCategories.find(
      (cat) => cat.name === categoryValue
    );
    if (selectedCategory) {
      const category_id = selectedCategory?.id;
      form.setValue("category_id", category_id);
    }
  }, [cachedCategories, categoryValue, form]);

  function onSubmit(values: TransactionData) {
    if (isEditMode) {
      const editValues = {
        ...values,
        id: transaction?.id,
      };

      editTransaction(editValues, {
        onSettled: () => {
          onSuccess?.();
        },
      });
    } else addNewTransaction(values);
  }

  return (
    <Card
      className={`${
        isEditMode ? "mt-5 min-w-[80%] max-w-lg" : "mt-20 max-w-lg mx-auto"
      }`}
    >
      {isEditMode ? null : (
        <CardHeader>
          <CardTitle className="text-2xl">New Transaction</CardTitle>
          <CardDescription>Add new transaction</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Date</FormLabel>
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isAdding || isEditing}
                          variant={"outline"}
                          className={cn(
                            "font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date);
                          }
                          setIsOpen(false);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isAdding || isEditing}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Describe transaction"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isAdding || isEditing}
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="w-full"
                        disabled={isAdding || isEditing}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cachedCategories.map((category) => (
                        <SelectItem value={category.name!} key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem hidden>
                  <Input {...field} type="number" />
                </FormItem>
              )}
            />
            {isEditMode ? (
              children && children({ isEditing })
            ) : (
              <Button
                variant="default"
                size="sm"
                className="w-full mt-4"
                disabled={isAdding || isEditing}
              >
                {isAdding ? "Adding..." : "Add New Transaction"}
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
