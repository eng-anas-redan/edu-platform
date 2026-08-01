const API_URL = "http://localhost:5000/api";

export const rateTeacher = async (ratingData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ratingData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getTeacherRating = async (teacherId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/ratings/${teacherId}`, {
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