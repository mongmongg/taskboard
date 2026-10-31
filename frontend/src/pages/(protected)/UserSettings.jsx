import { useGetUserData } from "../../hooks/useUserData";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import PageContent from "../../components/PageContent";
import avatar_dummy from "/Avatar/Avatar_3.png";
import UserSettingsForm from "./UserSettingsForm";
import UserDetail from "../../components/User/UserDetail";
import Button from "../../components/UIcomponents/Button";

export default function UserSettings() {
  const { data } = useGetUserData();
  const { showModal } = useModal();
  const [isEdit, setIsEdit] = useState(false);
  const userData = data.user;
  function toggleEdit() {
    setIsEdit(!isEdit);
  }
  function handleDelete() {
    showModal("CONFIRM_USER");
  }
  return (
    <PageContent title="Settings">
      <section className="flex gap-20 mt-8 justify-center max-md:flex-col ">
        <div className="relative rounded-[50%] bg-red-300 w-40 h-40 max-md:mx-auto">
          <img
            src={avatar_dummy}
            alt={userData.name.firstName}
            className="w-60 aspect-square cursor-pointer"
          />
        </div>
        <div>
          {isEdit && (
            <UserSettingsForm userData={userData} onCancel={toggleEdit} />
          )}
          {!isEdit && (
            <div className="flex flex-col gap-4">
              <UserDetail
                label="Name"
                detail={`${userData.name.firstName} ${userData.name.lastName}`}
              />
              <UserDetail label="E,mail" detail={userData.email} />
              <Button onClick={toggleEdit}>Edit</Button>
              <Button danger onClick={handleDelete}>
                Delete Acount
              </Button>
            </div>
          )}
        </div>
      </section>
    </PageContent>
  );
}
