import { deleteTransactionAction } from "@/lib/actions";
import { usePendingStore } from "@/lib/store/usePendingStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTransaction(id: number) {
  const queryClient = useQueryClient();
  const { add: addPendingId, remove: removePendingId } = usePendingStore();

  const { mutate: deleteTransaction, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteTransactionAction(id),

    onMutate: () => {
      addPendingId(id);
    },
    onSuccess: () => {
      toast.success("Transaction has been deleted");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
    onSettled: () => {
      removePendingId(id);
    },
  });
  return { deleteTransaction, isDeleting };
}
