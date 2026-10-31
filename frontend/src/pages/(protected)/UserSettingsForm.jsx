import Form from "../../components/Form/Form";
import FormError from "../../components/Form/FormError";
import Input from "../../components/Form/Input";
import ModalFormButton from "../../components/Form/ModalFormButtons";
import { useUpdateUser } from "../../hooks/useUserData";

export default function UserSettingsForm({ userData, onCancel }) {
  const {
    mutate: updateMutate,
    isError,
    error,
  } = useUpdateUser({ onUpdateSuccess: onCancel });
  function handleSubmit(formData) {
    //console.log(formData);
    updateMutate({ data: formData });
  }
  return (
    <Form onSubmit={handleSubmit}>
      {isError && <FormError>{error.message}</FormError>}
      <div className="flex gap-4">
        <Input
          label="First Name"
          name="firstName"
          defaultValue={userData.name.firstName}
          className="text-xs "
        ></Input>
        <Input
          label="Last Name"
          name="lastName"
          defaultValue={userData.name.lastName}
          className="text-xs "
        ></Input>
      </div>
      <Input
        label="Email"
        name="email"
        type="email"
        defaultValue={userData.email}
        className="text-xs "
      ></Input>
      <Input
        label="Password"
        name="password"
        type="password"
        className="text-xs "
      ></Input>
      <ModalFormButton actionBtnText="Update" onCancel={onCancel} />
    </Form>
  );
}
