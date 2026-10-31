import { handleResponse } from "./http";
import { BASE_URL } from "./http";
const TOKEN = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};
export async function verifyUser() {
  const url = `${BASE_URL}/user/verify`;
  try {
    const response = await fetch(url, { credentials: "include" });
    if (response.status === 401 || response.status === 403) {
      return null;
    }
    return handleResponse(response, "An Error occured while verify");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUserData({ signal, uId }) {
  console.log("hit");
  const url = `${BASE_URL}/${uId}`;
  try {
    const response = await fetch(url, {
      signal,
      credentials: "include",
    });
    return handleResponse(
      response,
      "An error occured while fetching user data",
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function createUser({ signal, data }) {
  const url = `${BASE_URL}/signup`;
  try {
    const response = await fetch(url, {
      signal,
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers,
    });
    return handleResponse(response, "An error occured while creating account");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function loginUser({ signal, data }) {
  const url = `${BASE_URL}/login`;
  try {
    const response = await fetch(url, {
      signal,
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers,
    });
    return handleResponse(response, "An error occured while login account");
  } catch (error) {
    console.log("here", error);
    throw error;
  }
}
export async function updateUserData({ signal, uId, data }) {
  const url = `${BASE_URL}/${uId}/settings`;
  console.log(data);
  try {
    const response = await fetch(url, {
      signal,
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",

      headers,
    });
    return handleResponse(response, "An error occured while creating account");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser({ signal, uId }) {
  const url = `${BASE_URL}/${uId}/settings/delete`;
  console.log("delete");
  try {
    const response = await fetch(url, {
      signal,
      method: "DELETE",
      credentials: "include",
    });
    return handleResponse(response, "An error occured while creating account");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function logoutUser({ signal, uId }) {
  console.log("logout");
  const url = `${BASE_URL}/${uId}/logout`;
  try {
    const response = await fetch(url, {
      signal,
      method: "POST",
      credentials: "include",
    });
    return handleResponse(response, "An error occured while logging out");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
