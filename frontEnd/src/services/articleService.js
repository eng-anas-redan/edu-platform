const API_URL = "http://localhost:5000/api";

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
    throw new Error(data.message);
  }

  return data;
};

export const updateArticle = async (id , formData) => {
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
    throw new Error(data.message);
  }

  return data;
};

export const getArticles = async () => {
  const response = await fetch(`${API_URL}/articles`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getArticleById = async (id) => {
  const response = await fetch(`${API_URL}/articles/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getArticlesByUserId = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/articles/user/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`},
    });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const likedArticle = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
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
    throw new Error(data.message);
  }

  return data;
};