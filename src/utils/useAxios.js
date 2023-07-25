import axios from "axios";

const axiosClient = axios.create();

// Replace this with our own backend base URL
axiosClient.defaults.baseURL = "https://server.sampoornakitab.com";

export const BASE_URL = "https://server.sampoornakitab.com";

axiosClient.interceptors.request.use(
  (config) => {
    const access_token = JSON.parse(localStorage.getItem("authTo")).access;
    if (access_token) {
      // Configure this as per your backend requirements
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log("original", err);
    if (originalConfig.url !== "/" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axios.post(`${BASE_URL}/account/login/refresh/`, {
            refresh: JSON.parse(localStorage.getItem("authTo"))?.refresh,
          });
          localStorage.setItem("access_token", rs.data.access);
          return axiosClient(originalConfig);
        } catch (_error) {
          localStorage.remove("authTo");
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
