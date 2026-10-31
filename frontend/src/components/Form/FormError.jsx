export default function FormError({ children, className }) {
  const cssClass = "text-red-400 " + className;
  return <p className={cssClass}>{children}</p>;
}
