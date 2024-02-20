import { create } from "zustand";

interface ConfirmSignUpModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  userId?: string;
  setUserId: (userId: string) => void;
}


const useConfirmSignUpModal = create<ConfirmSignUpModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setUserId: (userId: string) => set({ userId }),
}));

export default useConfirmSignUpModal;
