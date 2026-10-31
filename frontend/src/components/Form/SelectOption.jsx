export default function SelectOptions({ name, title }) {
  return (
    <option value={name} className="bg-[var(--primary-500)] ">
      <span className="capitalize"> {title}</span>
    </option>
  );
}
