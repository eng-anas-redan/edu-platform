const API_URL = "http://localhost:5000/api";

export const getStats = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/admin/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};