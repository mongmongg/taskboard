import { Outlet, useParams } from "react-router-dom";
import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import useModal from "../../hooks/useModal";

import PageContent from "../../components/PageContent";
import CardList from "../../components/Card/CardList";
import TaskCard from "../../components/Card/TaskCard";
import Loading from "../Loading";
import {
  useCurrentBoards,
  useUpdateTaskDragMutation,
} from "../../hooks/useBoardsData";
export const COLUMNS = [
  {
    id: "TODO",
    title: "To Do",
  },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];
export default function Board() {
  const { bId } = useParams();
  const { showModal } = useModal();
  const [dragStatus, setDragStatus] = useState();
  const { data, isLoading } = useCurrentBoards({ bId });
  const { mutate: updateMutate, isPending } = useUpdateTaskDragMutation({
    bId,
  });
  
  const tasks = data.board.task;
  const board = data.board;

  function handleDragStart(event) {
    const { operation } = event;
    const { source } = operation;
    setDragStatus(source.group);
  }
  function handleDrag(event) {
    const { operation, canceled } = event;
    const { source, target } = operation;
    if (canceled) {
      return;
    }
    if (target) {
      const taskId = source.id;
      const newStatus = target.type === "item" ? target.group : target.id;
      const data = { status: newStatus };
      console.log(source.group, target.type, target.group, target.id);
      if (dragStatus !== (target.type === "item" ? target.group : target.id)) {        
        updateMutate({ data, tId: taskId });
      }
    }
  }
  function handleDeleteBoard() {
    showModal("CONFIRM");
  }
  return (
    <PageContent
      title={board.title}
      description={board.description}
      actions
      onDelete={handleDeleteBoard}
    >
      <Outlet />
      <section className="max-lg:mx-auto max-lg:w-[90%]">
        {(isLoading || isPending) && <Loading />}
        {!isLoading && !isPending && (
          <CardList className="max-lg:grid-cols-1  ">
            <DragDropProvider
              onDragEnd={handleDrag}
              onDragStart={handleDragStart}
            >
              {COLUMNS.map((col) => (
                <TaskCard
                  key={col.id}
                  id={col.id}
                  title={col.title}
                  tasks={tasks}
                />
              ))}
            </DragDropProvider>
          </CardList>
        )}
      </section>
    </PageContent>
  );
}
