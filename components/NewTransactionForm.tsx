"use client";

import { TransactionData, transactionSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useAddNewTransaction } from "@/hooks/useAddNewTransaction";
import { useCategories } from "@/hooks/useCategories";
import { useEffect, useState } from "react";

export default function NewTransactionForm() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      category: "",
      date: undefined,
      description: "",
      category_id: 1,
    },
  });
  const { addNewTransaction, isAdding } = useAddNewTransaction();
  const { cachedCategories } = useCategories();

  const category = form.watch("category");

  useEffect(() => {
    const selectedCategory = cachedCategories.find(
      (cat) => cat.name === category
    );
    if (selectedCategory) {
      const category_id = selectedCategory?.id;
      form.setValue("category_id", category_id);
    }
  }, [cachedCategories, category, form]);

  function onSubmit(values: TransactionData) {
    addNewTransaction(values);
  }

  return (
    <Card className="mt-20 max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">New Transaction</CardTitle>
        <CardDescription>Add new transaction</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
                          disabled={isAdding}
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
                          field.onChange(date);
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
              disabled={isAdding}
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
              disabled={isAdding}
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
                      <SelectTrigger className="w-full" disabled={isAdding}>
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
            <Button
              variant="default"
              size="sm"
              className="flex justify-between items-center ml-auto"
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Add New Transaction"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
