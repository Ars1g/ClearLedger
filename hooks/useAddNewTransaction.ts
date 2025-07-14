import { newTransactionAction } from "@/lib/actions";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAddNewTransaction() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: addNewTransaction, isPending: isAdding } = useMutation({
    mutationFn: newTransactionAction,
    onSuccess: () => {
      toast.success("Successfully added new transaction");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.push("/transactions");
    },
    onError: () => toast.error("Failed to add new transaction"),
  });
  return { addNewTransaction, isAdding };
}
