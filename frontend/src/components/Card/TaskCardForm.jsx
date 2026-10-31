import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateTaskMutation } from "../../hooks/useBoardsData";

import Form from "../Form/Form";
import Input from "../Form/Input";
import Button from "../UIcomponents/Button";
import { FaChevronUp } from "react-icons/fa";
import FormError from "../Form/FormError";

export default function TaskCardForm({ id }) {
  const { bId } = useParams();
  const [isAdding, setIsAdding] = useState(false);

  const {
    mutate: createTaskMutate,
    isError,
    error,
    reset,
  } = useCreateTaskMutation({
    bId,
    taskStatus: id,
    onSuccessCallback: () => setIsAdding(false),
  });
  function handleAddCard(formData) {
    if (isAdding) {
      createTaskMutate({ data: formData });
    }
  }
  function handleToggleCard() {
    setIsAdding(!isAdding);
    reset();
  }
  return (
    <Form key={isAdding} onSubmit={isAdding ? handleAddCard : handleToggleCard}>
      <Input
        name="title"
        className={!isAdding ? "hidden" : "text-sm"}
        placeholder="Add new task"
        isError={isError}
      ></Input>
      {isError && (
        <FormError className="text-xs text-wrap">{error.message}</FormError>
      )}
      <Button
        transparent
        className={`mt-0 ${isAdding ? "text-white mr-2 bg-[var(--primary-300)] hover:bg-[var(--violet-500)]" : ""}`}
        type="submit"
      >
        + Add card
      </Button>
      <FaChevronUp
        className={!isAdding ? "hidden" : "mx-auto hover:text-violet-500"}
        onClick={handleToggleCard}
      />
    </Form>
  );
}
