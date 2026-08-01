"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getMembers,
  deleteMember,
} from "@/services/members.service";


export default function MembersPage() {

  const router = useRouter();

  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  const fetchMembers = async()=>{

    try {

      const response = await getMembers();

      console.log(
        "MEMBERS:",
        response
      );


      setMembers(
        response.data || response
      );


    }catch(error){

      console.log(
        "GET MEMBERS ERROR:",
        error
      );

    }finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchMembers();

  },[]);




  const handleDelete = async(id:string)=>{

    try{

      await deleteMember(id);

      alert(
        "Member Deleted"
      );

      fetchMembers();


    }catch(error){

      console.log(error);

    }

  };




  if(loading){

    return (
      <div className="p-10">
        Loading Members...
      </div>
    );

  }




  return (

    <div className="p-10">


      <div className="flex justify-between mb-6">


        <h1 className="text-3xl font-bold">
          Members Management
        </h1>


        <button

          onClick={()=>
            router.push("/members/add")
          }

          className="bg-blue-600 text-white px-4 py-2 rounded"

        >

          + Add Member

        </button>


      </div>




      <table className="w-full border">


        <thead>

          <tr className="border">

            <th className="p-3 border">
              Name
            </th>

            <th className="p-3 border">
              Email
            </th>

            <th className="p-3 border">
              Phone
            </th>

            <th className="p-3 border">
              Role
            </th>

            <th className="p-3 border">
              Status
            </th>

            <th className="p-3 border">
              Action
            </th>

          </tr>

        </thead>



        <tbody>


        {
          members.map((member)=>(

            <tr
              key={member._id}
              className="border"
            >


              <td className="p-3 border">
                {member.name}
              </td>


              <td className="p-3 border">
                {member.email}
              </td>


              <td className="p-3 border">
                {member.phone}
              </td>


              <td className="p-3 border">
                {member.role}
              </td>


              <td className="p-3 border">

                {
                  member.status
                  ? "Active"
                  : "Inactive"
                }

              </td>



              <td className="p-3 border space-x-2">


                <button

                  onClick={()=>
                    router.push(
                      `/members/edit/${member._id}`
                    )
                  }

                  className="bg-green-600 text-white px-3 py-1 rounded"

                >

                  Edit

                </button>



                <button

                  onClick={()=>
                    handleDelete(member._id)
                  }

                  className="bg-red-600 text-white px-3 py-1 rounded"

                >

                  Delete

                </button>



              </td>


            </tr>

          ))
        }


        </tbody>


      </table>


    </div>

  );

}