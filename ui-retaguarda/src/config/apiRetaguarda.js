import axios from "axios";

const apiRetaguarda = axios.create({
  baseURL: "http://209.38.6.161:3010/api",
  // baseURL: "http://127.0.0.1:3010/api",
});

apiRetaguarda.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiRetaguarda;
