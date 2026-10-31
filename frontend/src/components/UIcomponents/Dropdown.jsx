export default function Dropdown({ isShow, button, navbar, children }) {

  const topClass = navbar ? "right-0 " : "";
  const toggle = isShow ? "block" : "hidden";
  const cssClass = `absolute bg-[var(--primary-500)] min-w-[11rem] p-4 rounded-lg shadow-xl/10 text-[0.9rem] text-left flex flex-col gap-2 [&_a]:hover:text-[var(--violet-300)] ${toggle} ${topClass}`;
  return (
    <div className={`relative ${navbar ? "z-10" : "z-1"}`}>
      <div className="cursor-pointer">{button}</div>
      <div className={cssClass}>
        {children}
      </div>
    </div>
  );
}
