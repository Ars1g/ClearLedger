import { Transaction } from "@/app/transactions/transactions-columns";
import { create } from "zustand";

type ModalType = "editTransaction" | "deleteTransaction";

type ModalState = {
  type: ModalType | null;
  data?: Transaction;
};

type useModalStore = {
  modal: ModalState;
  onOpen: (type: ModalType, data: Transaction) => void;
  onClose: () => void;
};

export const useModalStore = create<useModalStore>((set) => ({
  modal: { type: null, data: undefined },
  onOpen: (type, data) => set({ modal: { type, data } }),
  onClose: () => set({ modal: { type: null, data: undefined } }),
}));
