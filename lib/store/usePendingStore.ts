import { create } from "zustand";

type PendingState = {
  pendingIds: Set<number>;
  add: (id: number) => void;
  remove: (id: number) => void;
};

export const usePendingStore = create<PendingState>((set) => ({
  pendingIds: new Set(),
  add: (id) =>
    set((state) => ({ pendingIds: new Set(state.pendingIds).add(id) })),
  remove: (id) =>
    set((state) => {
      const newPendingIds = new Set(state.pendingIds);
      newPendingIds.delete(id);
      return { pendingIds: newPendingIds };
    }),
}));
