import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGetAuth } from "./useUserData";
import {
  getCurrentBoardsQueryOptions,
  createBoardsMutationOptions,
  createTasksMutationOptions,
  deleteBoardMutationOptions,
  getCurrentTaskQueryOptions,
  updateTaskDragMutationOptions,
} from "./query-option";

export function useCurrentBoards({ bId }) {
  const { userId: uId } = useGetAuth();
  return useSuspenseQuery(getCurrentBoardsQueryOptions({ uId, bId }));
}
export function useCurrentTask({ bId, tId }) {
  const { userId: uId } = useGetAuth();
  return useSuspenseQuery(getCurrentTaskQueryOptions({ uId, bId, tId }));
}

//post board
export function useCreateBoardMutation({ bId, isCreate, onSuccessCallback }) {
  const { userId: uId, token } = useGetAuth();

  return useMutation({
    ...createBoardsMutationOptions({
      uId,
      bId,
      token,
      isCreate,
      onSuccessCallback,
    }),
  });
}

export function useCreateTaskMutation({
  bId,
  tId,
  taskStatus,
  onSuccessCallback,
}) {
  const { userId: uId, token } = useGetAuth();
  return useMutation({
    ...createTasksMutationOptions({
      uId,
      bId,
      tId,
      taskStatus,
      onSuccessCallback,
    }),
  });
}
export function useUpdateTaskDragMutation({ bId, tId, onSuccessCallback }) {
  const { userId: uId } = useGetAuth();
  return useMutation({
    ...updateTaskDragMutationOptions({
      uId,
      bId,
      tId,
      onSuccessCallback,
    }),
  });
}
export function useDeleteCurrentBoard({ bId, tId, path, fn }) {
  const navigation = useNavigate();
  const { userId: uId } = useGetAuth();

  const onSuccessCallback = () => {
    navigation(path);

    if (fn) {
      fn();
    }
  };

  return useMutation({
    ...deleteBoardMutationOptions({ uId, bId, tId, onSuccessCallback }),
  });
}
