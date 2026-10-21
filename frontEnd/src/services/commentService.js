
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createComment = async (commentData, articleId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/comments/${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create comment");
  }

  return data;
};

export const getComments = async (id) => {
  const response = await fetch(`${API_URL}/comments/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get comments");
  }

  return data;
};

export const getCommentById = async (id) => {
  const response = await fetch(`${API_URL}/comments/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get comment");
  }

  return data;
};

export const editComment = async (commentData, id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to edit comment");
  }

  return data;
};

export const deleteComment = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete comment");
  }

  return data;
};

export const getAllComments = async () => {
  const response = await fetch(`${API_URL}/comments`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get all comments");
  }

  return data;
};
