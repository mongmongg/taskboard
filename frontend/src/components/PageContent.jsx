import useModal from "../hooks/useModal";

import Button from "./UIcomponents/Button";
import Line from "./UIcomponents/Line";
import { motion } from "motion/react";

export default function PageContent({
  title,
  description,
  actions,
  onDelete,
  children,
}) {
  const { showModal } = useModal();
  const handleEdit = () => showModal("EDIT");

  return (
    <article className="text-left ml-5 mr-8 h-dvh max-lg:mr-2">
      <section className=" flex items-center justify-between mt-1">
        <motion.h1
          key={title}
          initial={{ y: 10, opacity: 0.5, transition: { duration: 1 } }}
          animate={{ y: 0, opacity: 1 }}
          className=" text-[1.6rem] text-white "
        >
          {title}
        </motion.h1>
        {actions && (
          <div className="flex gap-2">
            <Button
              onClick={handleEdit}
              className="bg-[var(--violet-500)]/50 text-white border-[var(--violet-300)] hover:bg-[var(--violet-500)]"
            >
              Edit
            </Button>
            <Button danger onClick={onDelete}>
              Delete
            </Button>
          </div>
        )}
      </section>
      <section className="mb-2 mt-4">
        <div>
          {description && <p className="italic text-sm">{description}</p>}
          <p></p>
        </div>
        <Line className="mt-2" />
      </section>
      {children}
    </article>
  );
}
