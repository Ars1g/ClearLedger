import { Transaction } from "@/app/transactions/transactions-columns";
import { editTransactionAction } from "@/lib/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export function useEditTransaction() {
  const queryClient = useQueryClient();
  //   const router = useRouter();
  const { mutate: editTransaction, isPending: isEditing } = useMutation({
    mutationFn: editTransactionAction,
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Successfully edited transaction");
        queryClient.invalidateQueries({
          queryKey: ["transactions"],
        });
        // You could also use `queryClient.setQueryData` here with `result.data`
        // for an optimistic update feel.
      } else if (result.error) {
        console.error(result.error);

        toast.error(
          typeof result.error === "string" ? result.error : result.error.message
        );
      }
    },
    onError: () => {
      toast.error("Failed to edit transaction. Try again later");
    },
  });
  return { editTransaction, isEditing };
}
