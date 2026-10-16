import axios from "axios";

const api = axios.create({
  baseURL: "https://edu-platform-api-jce0.onrender.com/api",
});

export default api;