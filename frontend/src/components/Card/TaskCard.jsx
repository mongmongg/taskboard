import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

import CardItem from "./CardItem";
import TaskCardForm from "./TaskCardForm";

export default function TaskCard({ id, title, tasks }) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: ["item"],
    collisionPriority: CollisionPriority.Low,
  });

  const columnTask = tasks.filter((task) => task.status === id);
  return (
    <li className="bg-[var(--primary-700)] min-w-67 h-auto rounded-lg p-4">
      <div className="flex items-center justify-between mb-1 text-[0.8rem]">
        <h2 className=" text-white text-sm font-medium ">{title}</h2>
      </div>
      <div
        ref={ref}
        className="w-full h-auto min-h-9 flex flex-col gap-2 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        {columnTask &&
          columnTask.length > 0 &&
          columnTask.map((task, index) => (
            <CardItem
              key={task._id}
              index={index}
              data={task}
              column={id}
              linkTo={`task/${task._id}/details`}
              canDrag
            />
          ))}
      </div>
      <TaskCardForm id={id} />
    </li>
  );
}
