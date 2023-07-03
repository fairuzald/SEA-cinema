import { create } from "zustand";

interface SeatModalProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}
const useSeatModal = create<SeatModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useSeatModal
