const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to register user");
  }

  return data;
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get user");
  }

  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to login");
  }

  return data;
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get users");
  }

  return data;
};

export const updateUser = async (userData, id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update user");
  }

  return data;
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete user");
  }

  return data;
};
