const API_URL = "http://localhost:5000/api";

export const createRequest = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/requests`, {
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

export const approveRequest = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/requests/${id}/approve`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.request;
};

export const rejectRequest = async (id , rejectionReason = "") => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/requests/${id}/reject`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rejectionReason }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.request;
};

export const getRequests = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/requests`,{
    headers: {
  Authorization: `Bearer ${token}`,
}
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
