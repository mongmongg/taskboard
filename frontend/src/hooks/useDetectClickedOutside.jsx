import { useEffect } from "react";

export function useDetectClickedOutside(ref, isOpen, setIsOpen, closeFn) {
  useEffect(() => {
    function handler(event) {
      if (isOpen && ref.current && !ref.current.contains(event.target)) {
        setIsOpen ? setIsOpen(false) : closeFn;
      }
    }

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, isOpen, closeFn, setIsOpen]);
}
