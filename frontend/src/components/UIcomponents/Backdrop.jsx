import { createPortal } from "react-dom";

export default function Backdrop({ onClick }) {
  return createPortal(
    <div
      className="w-full h-lvh fixed z-1 bg-black/40"
      onClick={onClick}
    ></div>,
    document.getElementById("backdrop-hook"),
  );
}
