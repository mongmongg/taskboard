import * as motion from "motion/react-client";
export default function Button({
  className,
  highlight,
  transparent,
  danger,
  children,
  ...props
}) {
  const csshighlight =
    "bg-[var(--violet-300)] text-[var(--primary-900)] border-none hover:bg-[var(--violet-500)] hover:text-white disabled:opacity-50";
  let cssClass = `px-2.5 py-1.5 border-1 border-[var(--border)] rounded-lg bg-[var(--primary-500)] text-[0.9rem] shadow-lg hover:text-white hover:cursor-pointer hover:bg-[var(--primary-300)] ${highlight ? csshighlight : ""} ${className ? className : ""}`;
  if (transparent) {
    cssClass = `border-none rounded-md px-4 py-2 text-xs text-[var(--primary-100)] hover:text-white hover:cursor-pointer hover:bg-[var(--primary-300)] disabled:opacity-50 ${className ? className : ""}`;
  }
  if (danger) {
    cssClass =
      cssClass +
      " bg-red-400/35 text-white border-red-300 hover:bg-red-500/60";
  }
  return (
    <motion.button
      className={cssClass}
      {...props}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
