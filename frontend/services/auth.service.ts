import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (data: any) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    data
  );

  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    data
  );

  return response.data;
};

export const refreshAccessToken = async () => {
  const refreshToken =
    localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const response = await axios.post(
    `${API_URL}/auth/refresh`,
    {
      refreshToken,
    }
  );

  return response.data;
};

export const logoutUser = async () => {
  const refreshToken =
    localStorage.getItem("refreshToken");

  if (!refreshToken) return;

  const response = await axios.post(
    `${API_URL}/auth/logout`,
    {
      refreshToken,
    }
  );

  return response.data;
};