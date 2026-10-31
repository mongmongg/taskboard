import { createContext, useState } from "react";

export const ModalContext = createContext({
  modalState: "",
  showModal: (state) => {},
  closeModal: () => {},
});
export default function ModalContextProvider({ children }) {
  const [modalState, setModalState] = useState("");
  //state: CREATE,EDIT
  function showModal(state) {
    setModalState(state);
  }
  function closeModal() {
    setModalState("");
  }
  const ctx = { modalState, showModal, closeModal };
  return <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>;
}
