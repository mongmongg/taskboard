import { Link, replace, useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/react/sortable";
import { motion } from "motion/react";
import useModal from "../../hooks/useModal";

import ThreeDots from "../UIcomponents/ThreeDots";
import Line from "../UIcomponents/Line";
import Avatar from "../User/Avatar";
export default function CardItem({
  index,
  data,
  column,
  canDrag,
  linkTo,
  ...props
}) {
  const navigation = useNavigate();
  const { showModal } = useModal();

  const date = new Date(data.createdAt);
  const newDate = date.toLocaleString("en-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const { ref } = useSortable({
    id: data._id,
    index,
    group: column,
    type: "item",
    accept: ["item"],
  });

  function cardDetailHandle() {
    navigation(linkTo);
    showModal("DETAILS");
  }
  function handleDeleteTask(event) {
    event.stopPropagation();
    showModal("CONFIRM");
  }
  function handleEdit(event) {
    event.stopPropagation();
    showModal("EDIT_TASK");
  }
  return (
    <motion.div
      ref={canDrag && ref}
      className="bg-[var(--primary-500)] min-w-58 w-58 border border-[var(--primary-300)] rounded-lg px-4 pt-2 pb-3 mb-1 shadow-lg hover:cursor-pointer hover:bg-[var(--primary-300)] hover:border-[var(--violet-300)] hover:shadow-lg/20 max-lg:min-w-full max-lg:w-full"
      {...props}
      whileTap={{ scale: 0.95 }}
      onClick={cardDetailHandle}
    >
      <div className="flex items-center justify-between ">
        <span
          className={`w-[15%] rounded-2xl border-2 border-[var(--violet-300)] ${!canDrag ? "mt-4 mb-2" : ""}`}
        ></span>
        <ThreeDots hide={!canDrag}>
          <Link to={`task/${data._id}`} onClick={handleEdit}>
            Edit
          </Link>
          <Line />
          <Link to={`?deletetask=${data._id}`} onClick={handleDeleteTask}>
            Delete
          </Link>
        </ThreeDots>
      </div>
      <p className="text-white text-[0.7rem] overflow-hidden">{data.title}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-[0.7rem]">{newDate}</p>
        <Avatar />
      </div>
    </motion.div>
  );
}
