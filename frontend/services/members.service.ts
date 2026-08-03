import api from "@/utils/axios";


// ================= TYPES =================

export interface CreateMemberPayload {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: boolean;
}


// ================= GET ALL MEMBERS =================

export const getMembers = async (
  page: number = 1,
  limit: number = 5,
  search: string = "",
  role: string = "All",
  status: string = "All",
  sortBy: string = "createdAt",
  order: string = "desc"
) => {

  const response = await api.get(
    "/members",
    {
      params: {

        page,

        limit,

        search,

        role:
          role === "All"
            ? ""
            : role,

        status:
          status === "Active"
            ? "true"
            : status === "Inactive"
            ? "false"
            : "",

        sortBy,

        order,

      },
    }
  );


  return response.data;

};



// ================= GET MEMBER BY ID =================

export const getMemberById = async (
  id: string
) => {

  const response = await api.get(
    `/members/${id}`
  );


  return response.data;

};



// ================= CREATE MEMBER =================

export const createMember = async (
  data: CreateMemberPayload
) => {

  const response = await api.post(
    "/members",
    data
  );


  return response.data;

};



// ================= UPDATE MEMBER =================

export const updateMember = async (
  id: string,
  data: Partial<CreateMemberPayload>
) => {

  const response = await api.put(
    `/members/${id}`,
    data
  );


  return response.data;

};



// ================= DELETE MEMBER =================

export const deleteMember = async (
  id: string
) => {

  const response = await api.delete(
    `/members/${id}`
  );


  return response.data;

};