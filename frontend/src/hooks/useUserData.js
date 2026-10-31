import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import {
  authMutationOptions,
  authVerifyQueryOptions,
  unAuthMutationOptions,
  userQueryOptions,
  updateUserMutationOptions,
  deleteUserMutationOptions,
} from "./query-option";
import { useNavigate } from "react-router-dom";

export function useGetAuth() {
  const ctx = useContext(AuthContext);
  return {
    userId: ctx.data.userId,
    isLoading: ctx.isLoading,
  };
}
export function useAuthVerifyQueryOptions() {
  return useQuery({ ...authVerifyQueryOptions() });
}
export function useGetUserData() {
  const { userId: uId } = useGetAuth();
  return useSuspenseQuery({ ...userQueryOptions({ uId }) });
}
export function useSetAuth() {
  const ctx = useContext(AuthContext);
  return (userId) => ctx.setAuthorization(userId);
}
export function useLogout({ onLogoutSuccess }) {
  const { userId: uId } = useGetAuth();
  return useMutation({ ...unAuthMutationOptions({ uId, onLogoutSuccess }) });
}

export function useAuthUser({ isLoginPage, onAuthSuccess }) {
  return useMutation({
    ...authMutationOptions({ isLoginPage, onAuthSuccess }),
  });
}
export function useUpdateUser({ data, onUpdateSuccess }) {
  const { userId: uId } = useGetAuth();
  return useMutation({
    ...updateUserMutationOptions({ data, uId, onUpdateSuccess }),
  });
}
export function useDeleteUser({ path }) {
  const { userId: uId } = useGetAuth();
  const navigate = useNavigate();
  const onDeleteSuccess = () => navigate(path);
  return useMutation({
    ...deleteUserMutationOptions({ uId, onDeleteSuccess }),
  });
}
