import Button from "../../components/UIcomponents/Button";
import Modal from "../../components/UIcomponents/Modal";
import Form from "../../components/Form/Form";
import useModal from "../../hooks/useModal";
import { useDeleteUser } from "../../hooks/useUserData";
import { useDeleteCurrentBoard } from "../../hooks/useBoardsData";
import { useParams, useSearchParams } from "react-router-dom";
export default function ConfirmationDeleteModal() {
  const { bId } = useParams();
  const [searchParams] = useSearchParams();
  const tId = searchParams.get("deletetask");
  const { modalState, closeModal } = useModal();
  const { mutate: deleteUserMutate } = useDeleteUser({
    path: `/auth?mode=signup`,
  });
  const { mutate: deleteMutate } = useDeleteCurrentBoard({
    bId,
    tId,
    path: tId ? `/boards/${bId}` : "/main",
    fn: closeModal,
  });
  const isDeleteUser = modalState === "CONFIRM_USER";
  function handleConfirm() {
    if (isDeleteUser) {
      deleteUserMutate({});
    } else {
      deleteMutate({ bId, tId });
    }
  }
  return (
    <Modal
      id={isDeleteUser ? "CONFIRM_USER" : "CONFIRM"}
      open={modalState === "CONFIRM" || isDeleteUser}
      onClose={closeModal}
    >
      <article className="bg-[var(--primary-500)] w-100 rounded-[20px] shadow-lg m-auto py-6">
        <Form onSubmit={handleConfirm} className="px-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl">
              Delete {isDeleteUser ? "Account" : "item"}?
            </h2>
            <p className="text-[var(--text)] text-sm">
              This will permanently delete {isDeleteUser ? "account" : "item"}?{" "}
              <br />
              This action can't be undone.
            </p>
          </div>
          <div className="flex justify-end gap-1">
            <Button type="reset" className="shadow-lg" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" danger>
              Delete
            </Button>
          </div>
        </Form>
      </article>
    </Modal>
  );
}
