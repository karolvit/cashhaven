import axios from "axios";

const apiAcai = axios.create({
  baseURL: "http://celebreserver2.ddns.net:5238/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiAcai.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiAcai;
