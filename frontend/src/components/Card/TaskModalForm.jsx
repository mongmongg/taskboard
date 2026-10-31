import { useParams } from "react-router-dom";
import { useCurrentTask } from "../../hooks/useBoardsData";

import Form from "../Form/Form";
import Input from "../Form/Input";
import ModalFormButton from "../Form/ModalFormButtons";
import SelectOptions from "../Form/SelectOption";
import { COLUMNS } from "../../pages/(protected)/Board";
import FormError from "../Form/FormError";

export default function TaskModalForm({
  className,
  isEdit,
  isError,
  error,
  onUpdate,
  onCancel,
}) {
  const { bId, tId } = useParams();
  const { data } = useCurrentTask({ bId, tId });

  function handleSubmit(formData) {
    onUpdate({ data: formData, bId, tId });
  }

  return (
    <Form
      key={tId}
      header={isEdit ? "Edit Task" : "Create Task"}
      className={className}
      onSubmit={handleSubmit}
    >
      {isError && <FormError>{error.message}</FormError>}
      <Input
        name="title"
        label="title"
        defaultValue={data.task.title}
        isError={isError}
      ></Input>
      <Input
        name="description"
        label="description"
        textarea
        placeholder="description"
        defaultValue={data.task.description}
      ></Input>
      <Input
        name="status"
        label="Status"
        select
        defaultValue={data.task.status}
      >
        {COLUMNS.map((col) => (
          <SelectOptions key={col.id} name={col.id} title={col.title} />
        ))}
      </Input>
      <ModalFormButton
        onCancel={onCancel}
        actionBtnText={isEdit ? "Update" : "Create"}
      />
    </Form>
  );
}
