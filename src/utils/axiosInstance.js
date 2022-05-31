import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: process.env.API,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.defaults.headers.Authorization = token ? `Bearer ${token}` : "";

axiosInstance.interceptors.request.use((config) => { // 처음 로딩시 등에 헤더에 안담길 수 있어
  const token = localStorage.getItem("token");

  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);

    const status = error.response ? error.response.status : 401;

    if (status && status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
