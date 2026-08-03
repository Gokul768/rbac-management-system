import axios from "axios";

import {
  refreshAccessToken
} from "@/services/auth.service";


const API_URL = process.env.NEXT_PUBLIC_API_URL;


const api = axios.create({
  baseURL: API_URL,
});


// REQUEST INTERCEPTOR

api.interceptors.request.use(

(config) => {

  let token = null;


  if (typeof window !== "undefined") {

    token = localStorage.getItem("accessToken");

  }


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



// RESPONSE INTERCEPTOR

api.interceptors.response.use(


(response) => response,


async (error) => {


  const originalRequest = error.config;


  // avoid infinite loop

  if (
    error.response?.status === 401 &&
    !originalRequest._retry
  ) {


    originalRequest._retry = true;


    try {


      const data = await refreshAccessToken();


      if (typeof window !== "undefined") {

        localStorage.setItem(
          "accessToken",
          data.accessToken
        );

      }


      originalRequest.headers.Authorization =
        `Bearer ${data.accessToken}`;


      return api(originalRequest);


    }

    catch (refreshError) {


      if (typeof window !== "undefined") {

        localStorage.clear();

        window.location.href = "/login";

      }


      return Promise.reject(refreshError);

    }

  }


  return Promise.reject(error);


}

);


export default api;