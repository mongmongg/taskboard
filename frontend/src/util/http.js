import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();
export const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
// export const BASE_URL = "http://localhost:3000";

export async function handleResponse(response, fallbackError) {
  if (!response.ok) {
    const error = await response.json();
    error.fallbackError = fallbackError;
    throw error;
  }
  if (response.status === 401) {
    window.location.href = "/auth?mode=login";
    throw new Error("Session expired, please login again.");
  }
  const resData = await response.json();
  return resData;
}

export async function fetchData({ signal, uId, bId, tId }) {
  if (!uId) return;
  let url = bId
    ? `${BASE_URL}/${uId}/boards/${bId}`
    : `${BASE_URL}/${uId}/boards`;
  url = tId ? `${BASE_URL}/${uId}/boards/${bId}/task/${tId}` : url;
  try {
    const response = await fetch(url, {
      signal,
      credentials: "include",
    });
    return handleResponse(response, "An error occurred while fetching");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function createNewBoardData({
  signal,
  uId,
  bId,
  taskStatus,
  data,
}) {
  const url = bId
    ? `${BASE_URL}/${uId}/boards/${bId}/task/${taskStatus}`
    : `${BASE_URL}/${uId}/boards`;

  const response = await fetch(url, {
    signal,
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response, "An error occurred while creating");
}
export async function updateStatusTask({ signal, uId, bId, tId, data }) {
  if (!bId) return;
  const url = `${BASE_URL}/${uId}/boards/${bId}/task/${tId}/drag`;

  const response = await fetch(url, {
    signal,
    method: "PATCH",
    body: JSON.stringify(data),
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response, "An error occurred while updating");
}
export async function updateBoard({ signal, uId, bId, tId, data }) {
  if (!bId) return;
  console.log(tId);
  const url = tId
    ? `${BASE_URL}/${uId}/boards/${bId}/task/${tId}`
    : `${BASE_URL}/${uId}/boards/${bId}`;

  const response = await fetch(url, {
    signal,
    method: "PATCH",
    body: JSON.stringify(data),
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response, "An error occurred while updating");
}
export async function deleteData({ signal, uId, bId, tId }) {
  if (!bId) return;
  const url = tId
    ? `${BASE_URL}/${uId}/boards/${bId}/task/${tId}`
    : `${BASE_URL}/${uId}/boards/${bId}`;

  const response = await fetch(url, {
    signal,
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(response, "An error occurred while deleting");
}
