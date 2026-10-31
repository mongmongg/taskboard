import * as motion from "motion/react-client";
import { stagger } from "motion/react";
import { Link } from "react-router-dom";

import SideNavItem from "./SideNavItem";
import Loading from "../../pages/Loading";
import { useCurrentBoards } from "../../hooks/useBoardsData";

export default function SideNavList() {
  const { data: boardsData, isLoading } = useCurrentBoards({});
  console.log(boardsData);
  const navVariants = {
    open: { transition: { delayChildren: stagger(0.05, { startDelay: 0.1 }) } },
    closed: { transition: { delayChildren: stagger(0.05, { from: "last" }) } },
  };

  return (
    <div className="pl-6 pr-2 py-2 text-left">
      <h3 className="uppercase text-[0.8rem] font-normal ">
        <Link to={`/main`} className="hover:text-[var(--violet-300)]">
          workspace
        </Link>
        <div className="pl-4 mt-2">
          <h3 className={`uppercase text-[0.8rem] font-normal`}>boards</h3>
          <motion.ul
            className="flex flex-col gap-0.5 normal-case"
            variants={navVariants}
          >
            {isLoading && (
              <div className="mt-6">
                <Loading />
              </div>
            )}
            {/* map board lists */}

            {!isLoading &&
              boardsData?.boards.length !== 0 &&
              boardsData?.boards.map((board) => (
                <SideNavItem
                  key={board._id}
                  id={board._id}
                  name={board.title}
                />
              ))}
          </motion.ul>
        </div>
      </h3>
    </div>
  );
}
