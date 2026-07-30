const API_URL = "http://localhost:5000/api";

// Share Article
export const shareArticle = async (articleId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/shared-articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ articleId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// Get My Shared Articles
export const getMySharedArticles = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/shared-articles/my`, {
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

// Remove Shared Article
export const removeSharedArticle = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/shared-articles/${id}`, {
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