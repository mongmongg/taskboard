import Button from "../UIcomponents/Button";
export default function ModalFormButton({ onCancel, actionBtnText }) {
  return (
    <div className="flex justify-end mt-4 gap-2">
      <Button type="reset" onClick={onCancel}>
        Cancel
      </Button>
      <Button highlight type="submit">
        {actionBtnText}
      </Button>
    </div>
  );
}
