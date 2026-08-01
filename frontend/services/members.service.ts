import api from "./api";

export const getMembers = async () => {
  const response = await api.get("/members");
  return response.data;
};

export const getMemberById = async (id: string) => {
  const response = await api.get(`/members/${id}`);
  return response.data;
};

export const createMember = async (data: any) => {
  const response = await api.post("/members", data);
  return response.data;
};

export const updateMember = async (
  id: string,
  data: any
) => {
  const response = await api.put(`/members/${id}`, data);
  return response.data;
};

export const deleteMember = async (id: string) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};