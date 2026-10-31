import { useState, useRef } from "react";
import { useDetectClickedOutside } from "../../hooks/useDetectClickedOutside.jsx";

import Dropdown from "./Dropdown";
import { VscEllipsis } from "react-icons/vsc";

export default function ThreeDots({ hide, children }) {
  const [isClicked, setIsClicked] = useState();
  const menuRef = useRef();

  useDetectClickedOutside(menuRef, isClicked, setIsClicked);
  function showMenuHandler(event) {
    setIsClicked(!isClicked);
    event.stopPropagation();
  }

  return (
    <div ref={menuRef} className={hide ? "hidden" : ""}>
      <Dropdown
        isShow={isClicked}
        button={<VscEllipsis className="text-2xl" onClick={showMenuHandler} />}
      >
        {children}
      </Dropdown>
    </div>
  );
}
