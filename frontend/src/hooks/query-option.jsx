import { queryOptions, mutationOptions } from "@tanstack/react-query";
import {
  fetchData,
  createNewBoardData,
  deleteData,
  queryClient,
  updateBoard,
  updateStatusTask,
} from "../util/http";
import {
  createUser,
  deleteUser,
  getUserData,
  loginUser,
  logoutUser,
  updateUserData,
  verifyUser,
} from "../util/user-http";

const BASE_KEY = ["currentBoards"];
export const handleQueryKey = (uId, bId) => {
  return [...BASE_KEY, uId, bId];
};
export const getCurrentBoardsQueryOptions = ({ uId, bId }) => {
  return queryOptions({
    queryKey: handleQueryKey(bId),
    queryFn: ({ signal }) => fetchData({ signal, uId, bId }),
  });
};
export const getCurrentTaskQueryOptions = ({ uId, bId, tId }) => {
  return queryOptions({
    queryKey: BASE_KEY,
    queryFn: ({ signal }) => fetchData({ signal, uId, bId, tId }),
  });
};

export const createBoardsMutationOptions = ({
  uId,
  bId,
  isCreate,
  onSuccessCallback,
  token,
}) => {
  return mutationOptions({
    mutationKey: handleQueryKey(bId),
    mutationFn: async ({ data }) => {
      if (isCreate) {
        return createNewBoardData({ data, uId });
      }
      return updateBoard({ data, uId, bId, token });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: BASE_KEY,
      });

      onSuccessCallback?.();
    },
  });
};

export const createTasksMutationOptions = ({
  uId,
  bId,
  taskStatus,
  onSuccessCallback,
}) => {
  return mutationOptions({
    mutationFn: async ({ data, tId }) => {
      if (taskStatus) {
        return createNewBoardData({ data, uId, bId, taskStatus });
      }
      return updateBoard({ data, uId, bId, tId });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: BASE_KEY,
      });

      onSuccessCallback?.();
    },
  });
};
export const updateTaskDragMutationOptions = ({
  uId,
  bId,
  tId,
  onSuccessCallback,
}) => {
  return mutationOptions({
    mutationFn: async ({ data, tId }) => {
      return updateStatusTask({ data, uId, bId, tId });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: BASE_KEY,
      });

      onSuccessCallback?.();
    },
  });
};
export const deleteBoardMutationOptions = ({
  uId,
  bId,
  tId,
  onSuccessCallback,
  token,
}) => {
  return mutationOptions({
    mutationFn: () => deleteData({ uId, bId, tId, token }),
    onSuccess: async () => {
      onSuccessCallback();
      if (!tId) {
        queryClient.clear;
      }
      await queryClient.invalidateQueries({ queryKey: BASE_KEY });
    },
  });
};

export const authMutationOptions = ({ isLoginPage, onAuthSuccess }) => {
  return mutationOptions({
    mutationFn: ({ data }) => {
      return isLoginPage ? loginUser({ data }) : createUser({ data });
    },
    onSuccess: async (resData, variables) => {
      if (resData.userData) {
        onAuthSuccess(resData.userData.id);
      }
      await queryClient.invalidateQueries({ queryKey: ["auth", "verify"] });
    },
  });
};
export const unAuthMutationOptions = ({ uId, onLogoutSuccess }) => {
  return mutationOptions({
    mutationFn: () => logoutUser({ uId }),
    onSuccess: (data) => {
      queryClient.clear;
      onLogoutSuccess();
    },
  });
};
export const authVerifyQueryOptions = () => {
  return queryOptions({
    queryKey: ["auth", "verify"],
    queryFn: verifyUser,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
};
export const userQueryOptions = ({ uId }) => {
  return queryOptions({
    queryKey: ["user"],
    queryFn: ({ signal }) => getUserData({ signal, uId }),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
};

export const updateUserMutationOptions = ({ uId, data, onUpdateSuccess }) => {
  return mutationOptions({
    mutationFn: async ({ signal, data }) =>
      updateUserData({ signal, uId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["auth,verify"]);
      onUpdateSuccess();
    },
  });
};
export const deleteUserMutationOptions = ({ uId, onDeleteSuccess }) => {
  return mutationOptions({
    mutationFn: ({ signal }) => deleteUser({ signal, uId }),
    onSuccess: () => {
      queryClient.clear();
      onDeleteSuccess();
    },
  });
};

