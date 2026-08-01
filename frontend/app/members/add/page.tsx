"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createMember,
} from "@/services/members.service";



export default function AddMemberPage(){


const router = useRouter();



const [form,setForm]=useState({

name:"",
email:"",
phone:"",
role:"Member",
status:true,

});




const handleChange=(e:any)=>{


const {name,value}=e.target;


setForm({

...form,

[name]:

name==="status"
? value==="true"
:value

});


};




const handleSubmit=async(e:any)=>{


e.preventDefault();


try{


await createMember(form);


alert(
"Member Added Successfully"
);


router.push("/members");


}catch(error){


console.log(
"ADD ERROR",
error
);


alert(
"Failed"
);


}



};




return(

<div className="p-10">


<h1 className="text-3xl font-bold mb-6">
Add Member
</h1>



<form
onSubmit={handleSubmit}
className="space-y-4 max-w-xl"
>



<input
name="name"
placeholder="Name"
className="border p-3 w-full"
onChange={handleChange}
/>



<input
name="email"
placeholder="Email"
className="border p-3 w-full"
onChange={handleChange}
/>



<input
name="phone"
placeholder="Phone"
className="border p-3 w-full"
onChange={handleChange}
/>



<select
name="role"
className="border p-3 w-full"
onChange={handleChange}
>


<option>Member</option>
<option>Manager</option>
<option>Admin</option>


</select>



<select
name="status"
className="border p-3 w-full"
onChange={handleChange}
>


<option value="true">
Active
</option>


<option value="false">
Inactive
</option>


</select>



<button
className="bg-blue-600 text-white px-5 py-2 rounded"
>

Add Member

</button>



</form>



</div>

);


}