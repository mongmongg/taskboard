import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../UIcomponents/Dropdown";
import { useLogout, useGetUserData } from "../../hooks/useUserData";

import Line from "../UIcomponents/Line";
import Avatar from "./Avatar";

export default function ProfileDropdown({ hover, button }) {
  const { data } = useGetUserData();
  const navigate = useNavigate();
  const { mutate: logoutMutate } = useLogout({
    onLogoutSuccess: () => {
      navigate("/auth?mode=login");
    },
  });
  const userData = data.user;
  const userName = `${userData.name.firstName} ${userData.name.lastName[0]}`;

  async function handleLogout() {
    await logoutMutate();
  }
  return (
    <Dropdown isShow={hover} button={button} navbar>
      <div className="flex gap-4 text-base text-left">
        <Avatar />
        <div className="flex flex-col gap-1">
          <p className="text-[1rem] overflow-hidden">{userName}</p>
          <p className="text-[0.8rem]">{userData.email}</p>
        </div>
      </div>
      <Line />
      <Link to="/settings" className="hover:text-[var(--violet-300)]">
        Profile
      </Link>
      <Line />
      <Link className="hover:text-[var(--violet-300)]" onClick={handleLogout}>
        Log out
      </Link>
    </Dropdown>
  );
}
