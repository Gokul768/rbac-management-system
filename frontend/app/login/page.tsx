"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { loginUser } from "@/services/auth.service";


export default function LoginPage() {

  const router = useRouter();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);
      setError("");



      const response = await loginUser({
        email,
        password,
      });



      console.log(
        "LOGIN RESPONSE:",
        response
      );



      // ===============================
      // Save Token in Cookies
      // ===============================


      Cookies.set(
        "accessToken",
        response.accessToken,
        {
          expires: 1,
          secure: false,
          sameSite: "lax",
        }
      );


      Cookies.set(
        "refreshToken",
        response.refreshToken,
        {
          expires: 7,
          secure: false,
          sameSite: "lax",
        }
      );



      Cookies.set(
        "user",
        JSON.stringify(response.user),
        {
          expires: 1,
          secure: false,
          sameSite: "lax",
        }
      );





      // ===============================
      // Save Token in LocalStorage
      // ===============================


      localStorage.setItem(
        "accessToken",
        response.accessToken
      );


      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );


      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );




      console.log(
        "ACCESS TOKEN SAVED:",
        localStorage.getItem(
          "accessToken"
        )
      );



      console.log(
        "USER SAVED:",
        localStorage.getItem(
          "user"
        )
      );




      // ===============================
      // Redirect
      // ===============================


      router.push("/dashboard");



    } catch(err:any) {


      console.log(
        "LOGIN ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Login failed"
      );


    } finally {


      setLoading(false);


    }

  };





  return (

    <div className="min-h-screen flex items-center justify-center">


      <form
        onSubmit={handleLogin}
        className="w-96 p-6 border rounded-lg space-y-4 shadow"
      >


        <h1 className="text-2xl font-bold text-center">
          Login
        </h1>



        {
          error && (

            <p className="text-red-500 text-center">
              {error}
            </p>

          )
        }




        <input

          type="email"

          placeholder="Email"

          className="border p-2 w-full rounded"

          value={email}

          onChange={
            (e)=>setEmail(e.target.value)
          }

          required

        />





        <input

          type="password"

          placeholder="Password"

          className="border p-2 w-full rounded"

          value={password}

          onChange={
            (e)=>setPassword(e.target.value)
          }

          required

        />





        <button

          type="submit"

          disabled={loading}

          className="bg-black text-white p-2 w-full rounded"

        >

          {
            loading
            ? "Logging in..."
            : "Login"
          }


        </button>



      </form>


    </div>

  );

}