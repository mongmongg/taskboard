import useModal from "../../hooks/useModal";
import { motion } from "motion/react";
import {
  useCurrentTask,
  useCreateTaskMutation,
} from "../../hooks/useBoardsData";
import { useParams, useNavigate } from "react-router-dom";
import { lazy, useState } from "react";

import { VscClose } from "react-icons/vsc";
import Modal from "../../components/UIcomponents/Modal";
import Button from "../../components/UIcomponents/Button";
//import TaskModalForm from "../../components/Card/TaskModalForm";
const TaskModalForm = lazy(() => import("../../components/Card/TaskModalForm"));

export default function TaskDetailsModal() {
  const { bId, tId } = useParams();
  const navigate = useNavigate();
  const { data } = useCurrentTask({ bId, tId });
  const task = data.task;

  const { closeModal } = useModal();
  const [isEdit, setIsEdit] = useState(false);

  const {
    mutate: updateMutate,
    isError,
    error,
    reset,
  } = useCreateTaskMutation({ bId, tId, onSuccessCallback: handleCancel });

  function handleEdit() {
    setIsEdit(true);
  }
  function handleCancelForm() {
    reset();
    setIsEdit(false);
  }
  function handleClose() {
    reset();
    closeModal;
    navigate(`/boards/${bId}`);
    setIsEdit(false);
  }

  return (
    <>
      <Modal id={"DETAILS"} onClose={handleClose}>
        <article className="bg-[var(--primary-500)] w-100 rounded-[20px] shadow-lg m-auto px-8 py-6">
          <div className="flex justify-end mb-2">
            <VscClose
              className="text-2xl text-[var(--text)] text-right hover:cursor-pointer hover:text-[var(--text-h)]"
              onClick={handleClose}
            />
          </div>
          {!isEdit && (
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.3, type: "tween" },
              }}
            >
              <h3 className="text-xl mb-5 text-white ">{task.title}</h3>
              <p className="italic text-[var(--text)] ">{task.description}</p>
              <p className="leading-10 text-[var(--text)]">
                Status: <span className="italic">{task.status}</span>
              </p>
              <div className="flex justify-end">
                <Button
                  className="px-5 bg-[var(--violet-500)]/50 border-[var(--violet-300)] hover:bg-[var(--violet-500)]"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              </div>
            </motion.div>
          )}
          {isEdit && (
            <TaskModalForm
              className="px-0 py-4"
              isEdit={isEdit}
              isError={isError}
              error={error}
              onUpdate={updateMutate}
              onCancel={handleCancelForm}
            />
          )}
        </article>
      </Modal>
    </>
  );
}
