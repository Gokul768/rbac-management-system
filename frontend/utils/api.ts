import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================
// REQUEST INTERCEPTOR
// ============================

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("accessToken");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

// ============================
// RESPONSE INTERCEPTOR
// ============================

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // Access Token Expired

    if (

      originalRequest &&

      error.response?.status === 401 &&

      !originalRequest._retry

    ) {

      originalRequest._retry = true;

      try {

        const refreshToken =
          localStorage.getItem("refreshToken");

        if (!refreshToken) {

          throw new Error(
            "No Refresh Token Found"
          );

        }

        // Request New Access Token

        const response = await axios.post(

          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,

          {
            refreshToken,
          }

        );

        const newAccessToken =
          response.data.accessToken;

        // Save New Access Token

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        // Update Authorization Header

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Retry Original Request

        return api(originalRequest);

      } catch (refreshError) {

        console.log(
          "Refresh Token Expired",
          refreshError
        );

        // Clear Local Storage

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        localStorage.removeItem(
          "user"
        );

        // Redirect Login

        window.location.href =
          "/login";

        return Promise.reject(
          refreshError
        );

      }

    }

    return Promise.reject(error);

  }

);

export default api;