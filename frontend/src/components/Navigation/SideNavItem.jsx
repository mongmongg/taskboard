import { NavLink } from "react-router-dom";
import * as motion from "motion/react-client";

export default function SideNavItem({  id, name }) {
  const cssLink = `text-white block px-4 py-2 text-sm rounded-lg hover:cursor-pointer hover:bg-[var(--primary-300)]`;
  const cssActive = cssLink + " bg-[var(--primary-300)]";
  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };
  return (
    <motion.li
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full mx-0 my-2 text-[1rem]"
    >
      <NavLink
        to={`/boards/${id}`}
        relative="path"
        className={({ isActive }) => (isActive ? cssActive : cssLink)}
      >
        {name}
      </NavLink>
    </motion.li>
  );
}
