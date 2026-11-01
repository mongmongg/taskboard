import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useModal from "../../hooks/useModal";

import Modal from "../../components/UIcomponents/Modal";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import Button from "../../components/UIcomponents/Button";
import Loading from "../Loading";
import {
  useCreateBoardMutation,
  useCurrentBoards,
} from "../../hooks/useBoardsData";
import FormError from "../../components/Form/FormError";
import ModalFormButton from "../../components/Form/ModalFormButtons";

export default function CreateBoardModal() {
  const { bId } = useParams();
  const { modalState, closeModal } = useModal();

  const isCreate = modalState === "CREATE";

  const { data, isLoading } = useCurrentBoards({ bId });

  const { mutate, isPending, isError, error, reset } = useCreateBoardMutation({
    bId,
    isCreate,
    onSuccessCallback: closeModal,
  });
  async function handleSubmit(formData) {
    await mutate({ data: formData, bId: isCreate ? null : bId });
  }
  useEffect(() => {
    if (modalState === "") {
      reset();
    }
  }, [modalState, reset]);

  return (
    <Modal
      id={isCreate ? "CREATE" : "EDIT"}
      open={modalState === "CREATE" || modalState === "EDIT"}
      onClose={closeModal}
    >
      {!isCreate && isLoading && <Loading />}
      {!isLoading && (
        <article className="bg-[var(--primary-700)] w-100 rounded-[20px] shadow-lg m-auto py-10 max-md:w-80 ">
          <Form
            header={modalState === "CREATE" ? "Create board" : "Edit board"}
            className="px-8 max-md:px-5 max-md:w-full"
            onSubmit={handleSubmit}
            key={modalState}
          >
            {isError && <FormError>{error.message}</FormError>}
            <Input
              label="Board title"
              name="title"
              placeholder="e.g. Q4 roadmap"
              isError={isError}
              defaultValue={isCreate ? "" : data?.board?.title}
            />
            <Input
              label="Description"
              name="description"
              textarea
              placeholder="description..."
              defaultValue={isCreate ? "" : data?.board?.description}
            />
            <ModalFormButton
              onCancel={closeModal}
              isPending={isPending}
              actionBtnText={
                modalState === "CREATE" ? "Create board" : "Update"
              }
            />
          </Form>
        </article>
      )}
    </Modal>
  );
}
