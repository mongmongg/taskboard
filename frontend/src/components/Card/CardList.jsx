import { motion } from "motion/react";
export default function CardList({ children, className }) {
  const cssClass =
    "flex justify-start items-start gap-x-1 gap-y-4 flex-wrap max-lg:grid max-lg:grid-cols-1 max-lg:gap-2  max-lg:p-4" +
    className;
  return (
    <motion.ul
      variants={{
        hidden: { opacity: 0.8, y: 10 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
      }}
      initial="hidden"
      animate="visible"
      className={cssClass}
    >
      {children}
    </motion.ul>
  );
}
