import { motion } from "motion/react";
export default function Loading() {
  const dotCss = "w-[8px] h-[8px] rounded-[50%] bg-[var(--text)]";
  const dotVariants = {
    jump: {
      transform: "translateY(-10px)",
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };
  return (
    <article className="absolute top-0 left-0 w-full h-full bg-black/40 flex gap-4 justify-center items-center">
      <motion.div
        animate="jump"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="flex gap-2"
      >
        <motion.div className={dotCss} variants={dotVariants} />
        <motion.div className={dotCss} variants={dotVariants} />
        <motion.div className={dotCss} variants={dotVariants} />
      </motion.div>
    </article>
  );
}
