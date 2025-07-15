import { Category } from "@/app/transactions/transactions-columns";
import { getCategoriesClient } from "@/lib/client-data-service";
import { useQuery } from "@tanstack/react-query";

export function useCategories(initialData?: Category[]) {
  const { data: cachedCategories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesClient,
    initialData,
  });
  return { cachedCategories };
}
