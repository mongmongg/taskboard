import { useState, useRef } from "react";
import { useDetectClickedOutside } from "../../hooks/useDetectClickedOutside";
import { AnimatePresence } from "motion/react";
import useModal from "../../hooks/useModal";
import { VscMenu } from "react-icons/vsc";

import Logo from "../../components/Logo";
import Button from "../../components/UIcomponents/Button";
import ProfileDropdown from "../../components/User/ProfileDropdown";
import Backdrop from "../../components/UIcomponents/Backdrop";
import SideDrawer from "../../components/Navigation/SideDrawer";
import Avatar from "../../components/User/Avatar";
import SideNavList from "../../components/Navigation/SideNavList";
export default function MainNavigation() {
  const [isHover, setIsHover] = useState();
  const menuRef = useRef(null);
  const { showModal } = useModal();

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  function openDrawHandler() {
    setDrawerIsOpen(!drawerIsOpen);
  }
  useDetectClickedOutside(menuRef, isHover, setIsHover);

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={openDrawHandler} />}
      <AnimatePresence>
        {drawerIsOpen && (
          <SideDrawer isOpen={drawerIsOpen}>
            <Logo path={`/main`}/>
            <nav className="h-full">
              <SideNavList />
            </nav>
          </SideDrawer>
        )}
      </AnimatePresence>
      <header className="px-4 py-[0.3rem] bg-[var(--primary-700)] border-b-1 border-[var(--border)] flex items-center justify-between fixed top-0 w-full">
        <VscMenu
          className="w-11 h-11 block mr-8 cursor-pointer m-0 hover:text-[var(--violet-300)] lg:hidden "
          onClick={openDrawHandler}
        />
        <Logo className="max-lg:hidden" path={`/main`} />
        <nav>
          <ul className="flex items-center justify-center gap-2 p-0">
            <li>
              <Button highlight onClick={() => showModal("CREATE")}>
                Create Board
              </Button>
            </li>
            <li ref={menuRef}>
              <ProfileDropdown
                hover={isHover}
                button={<Avatar onClick={() => setIsHover(!isHover)} />}
              />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
