import Button from "../UIcomponents/Button";
export default function ModalFormButton({
  onCancel,
  isPending,
  actionBtnText,
}) {
  return (
    <div className="flex justify-end mt-4 gap-2">
      <Button type="reset" onClick={onCancel} disabled={isPending}>
        Cancel
      </Button>
      <Button
        highlight
        type="submit"
        className={`${isPending ? "animate-bounce" : ""}`}
        disabled={isPending}
      >
        {actionBtnText}
      </Button>
    </div>
  );
}
