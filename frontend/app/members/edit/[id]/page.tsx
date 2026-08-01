"use client";


import {
useEffect,
useState
} from "react";


import {
useParams,
useRouter
} from "next/navigation";


import {
getMemberById,
updateMember
} from "@/services/members.service";




export default function EditMemberPage(){


const router=useRouter();


const params=useParams();


const id=params.id as string;



const [form,setForm]=useState<any>({

name:"",
email:"",
phone:"",
role:"",
status:true

});



useEffect(()=>{


const load=async()=>{


const data=await getMemberById(id);


setForm(data);


};


if(id)
load();



},[id]);






const handleChange=(e:any)=>{


const {name,value}=e.target;


setForm({

...form,

[name]:

name==="status"
?value==="true"
:value

});


};





const submit=async(e:any)=>{


e.preventDefault();


await updateMember(
id,
form
);


alert(
"Updated Successfully"
);


router.push("/members");


};





return(

<div className="p-10">


<h1 className="text-3xl font-bold mb-6">
Edit Member
</h1>



<form
onSubmit={submit}
className="space-y-4 max-w-xl"
>


<input
name="name"
value={form.name}
onChange={handleChange}
className="border p-3 w-full"
/>



<input
name="email"
value={form.email}
onChange={handleChange}
className="border p-3 w-full"
/>



<input
name="phone"
value={form.phone}
onChange={handleChange}
className="border p-3 w-full"
/>




<select
name="role"
value={form.role}
onChange={handleChange}
className="border p-3 w-full"
>

<option>Member</option>
<option>Manager</option>
<option>Admin</option>


</select>




<button
className="bg-blue-600 text-white px-5 py-2 rounded"
>

Update Member

</button>



</form>


</div>


);



}