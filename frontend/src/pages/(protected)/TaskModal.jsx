import { useParams, useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { useCreateTaskMutation } from "../../hooks/useBoardsData";

import Modal from "../../components/UIcomponents/Modal";
import TaskModalForm from "../../components/Card/TaskModalForm";
export default function TaskModal() {
  const { closeModal } = useModal();
  const { bId, tId } = useParams();
  const navigate = useNavigate();

  const isEdit = "EDIT_TASK";
  const isOpen = isEdit ? isEdit : "CREATE_TASK";

  const {
    mutate: updateMutate,
    isPending,
    isError,
    error,
    reset,
  } = useCreateTaskMutation({ bId, tId, onSuccessCallback: handleCancel });

  function handleCancel() {
    reset();
    closeModal;
    navigate(`/boards/${bId}`);
  }

  return (
    <Modal id={isOpen} onClose={handleCancel}>
      <article className="bg-[var(--primary-700)] w-100 rounded-[20px] shadow-lg m-auto py-10 px-8 max-md:w-80 ">
        <TaskModalForm
          isEdit={isEdit}
          isError={isError}
          isPending={isPending}
          error={error}
          onUpdate={updateMutate}
          onCancel={handleCancel}
        />
      </article>
    </Modal>
  );
}
