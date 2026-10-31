import { useContext } from "react";
import { ModalContext } from "../store/ModalContext";

export default function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalContextProvider");
  }
  const showModal = context.showModal;
  const closeModal = context.closeModal;
  const modalState = context.modalState;
  return { showModal, modalState, closeModal };
}
