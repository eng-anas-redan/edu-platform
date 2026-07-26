const API_URL = "http://localhost:5000/api";

export const createReport = async (report) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(report),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const updateReportStatus = async (id, report) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:  JSON.stringify(report),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getReports = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reports`, {
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
