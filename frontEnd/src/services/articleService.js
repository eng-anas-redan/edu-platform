
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createArticle = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/articles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create article");
  }

  return data;
};

export const updateArticle = async (id, formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update article");
  }

  return data;
};

export const getArticles = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/articles?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get articles");
  }

  return data;
};

export const getFeed = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/articles/shared-articles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get feed");
  }

  return data;
};

export const getArticleById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get article");
  }

  return data;
};

export const getArticlesByUserId = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/articles/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get user articles");
  }

  return data;
};

export const likedArticle = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/articles/${id}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to like article");
  }

  return data;
};

export const deleteArticle = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete article");
  }

  return data;
};

export const getAllTags = async () => {
  const response = await fetch(`${API_URL}/articles/tags`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get tags");
  }

  return data;
};
