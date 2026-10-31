export default function Line({ className }) {
  const cssClass = `border-0.5px border-[var(--border)] w-full ${className}`;
  return <hr className={cssClass}></hr>;
}
