export type Role =
  | "admin"
  | "manager"
  | "member";


export interface User {

    id:string;
    name:string;
    email:string;
    role:Role;
}



export interface LoginResponse {

    accessToken:string;
    refreshToken:string;
    user:User;

}