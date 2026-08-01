import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;



const getAuthHeaders = () => {

    const token = localStorage.getItem(
        "accessToken"
    );


    return {
        headers:{
            Authorization:`Bearer ${token}`
        }
    };

};




export const getMembers = async () => {

    const response = await axios.get(
        `${API_URL}/members`,
        getAuthHeaders()
    );


    return response.data;

};





export const createMember = async(data:any)=>{


    const response = await axios.post(
        `${API_URL}/members`,
        data,
        getAuthHeaders()
    );


    return response.data;

};





export const updateMember = async(
    id:string,
    data:any
)=>{


    const response = await axios.put(
        `${API_URL}/members/${id}`,
        data,
        getAuthHeaders()
    );


    return response.data;

};
export const getMemberById = async (
    id:string
)=>{

    const response = await axios.get(
        `${API_URL}/members/${id}`,
        getAuthHeaders()
    );

    return response.data;

};





export const deleteMember = async(
    id:string
)=>{


    const response = await axios.delete(
        `${API_URL}/members/${id}`,
        getAuthHeaders()
    );


    return response.data;

};