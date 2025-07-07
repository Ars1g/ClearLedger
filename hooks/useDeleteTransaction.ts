import { deleteTransaction as deleteTransactionAPI } from "@/lib/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const { mutate: deleteTransaction, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number) => deleteTransactionAPI(id),
    onSuccess: () => {
      toast.success("Transaction has been deleted");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });
  return { deleteTransaction, isDeleting };
}
