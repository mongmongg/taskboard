import logo from "/logo.png";
import { Link } from "react-router-dom";
export default function Logo({ className, path }) {
  let cssClass =
    "flex gap-1 center hover:cursor-pointer *:hover:text-[var(--violet-300)]" +
    " " +
    className;
  return (
    <Link to={path} className={cssClass}>
      <div className="w-[1.8rem] h-[1.8rem] bg-[var(--violet-300)] rounded-[50%] overflow-hidden flex items-center justify-center">
        <img src={logo} alt="logo" className="w-fit object-cover"></img>
      </div>
      <h2 className="text-xl text-white">Taskboard</h2>
    </Link>
  );
}
