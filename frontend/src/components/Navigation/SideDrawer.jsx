import { useRef } from "react";
import { createPortal } from "react-dom";
import { spring } from "motion/react";
import * as motion from "motion/react-client";
export default function SideDrawer({ children }) {
  const containerRef = useRef < HTMLElement > null;

  const variants = {
    open: { width: "70%", opacity: 1 },
    closed: { width: 0, opacity: 0 },
  };
  return createPortal(
    <motion.aside
      id="sideNav"
      variants={variants}
      initial="closed"
      animate="open"
      transition={{
        duration: 0.5,
        type: spring,
      }}
      exit="closed"
      className="fixed w-[60%] h-lvh bg-[var(--primary-700)] p-12 z-2 max-md:pl-4 max-md:pr-2 "
      ref={containerRef}
    >
      {children}
    </motion.aside>,
    document.getElementById("drawer-hook"),
  );
}
