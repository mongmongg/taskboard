import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useModal from "../../hooks/useModal";
export default function Modal({ id, onClose, children }) {
  const dialog = useRef();
  const { modalState } = useModal();
  const isOpen = modalState === id;
  const cssClass = "p-0 m-auto bg-transparent backdrop:bg-[rgba(0,0,0,0.3)]";
  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (isOpen) {
      if (!modal.open) {
        modal.showModal();
      }
    } else {
      if (modal.open) modal.close();
    }
  }, [isOpen, modalState]);
  return createPortal(
    <dialog ref={dialog} onClose={onClose} closedby="any" className={cssClass}>
      {children}
    </dialog>,
    document.getElementById("modal-hook"),
  );
}
