export default function Input({
  label,
  name,
  type = "text",
  textarea,
  select,
  children,
  isError,
  className,
  ...props
}) {
  const cssClass = "flex flex-col mx-0 mb-3.5" + className ? className : "";
  let cssInput =
    "p-3 rounded-lg border w-full border-[var(--border)] bg-[var(--primary-700)]";
  if (isError) {
    cssInput = cssInput + " border-red-300 bg-red-500/0.5";
  }
  return (
    <p className={cssClass}>
      <label htmlFor={name} className="mb-1 text-sm">
        {label}
      </label>
      {textarea && (
        <textarea
          id={name}
          name={name}
          {...props}
          className="p-3 rounded-lg border w-full border-[var(--border)] bg-[var(--primary-700)]"
        />
      )}
      {select && (
        <select
          name={name}
          id={name}
          {...props}
          className=" w-full px-3  py-1 rounded-lg border border-[var(--border)]"
        >
          {children}
        </select>
      )}
      {!textarea && !select && (
        <input
          type={type}
          id={name}
          name={name}
          className={cssInput}
          {...props}
        />
      )}
    </p>
  );
}
