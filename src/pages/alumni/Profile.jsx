import React, { useState, useEffect } from "react";
import { getMyProfile, updateProfile } from "../../services/apiService";
import { X } from "lucide-react";

const DEPARTMENTS = [
  "Computer Science Engineering",
  "Electrical and Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics and Communication Engineering",
  "Information Technology",
  "Business Administration",
  "Electrical and Instrumentation Engineering",
  "Information Science",
  "Computer Technology",
  "Computer Science and Business Systems",
  "Mechatronics Engineering",
  "Fashion Technology",
  "Food Technology",
  "Agricultural Engineering",
  "Other"
];

const defaultForm = {
  name: "",
  batchYear: "",
  department: "",
  profession: "",
  location: "",
  contact: "",
  skills: [],
  isMentor: false
};

export default function MyProfile() {

const [formData,setFormData] = useState(defaultForm);
const [newSkill,setNewSkill] = useState("");
const [loading,setLoading] = useState(true);
const [saving,setSaving] = useState(false);

useEffect(()=>{
fetchProfile();
},[]);

const fetchProfile = async () => {
 try{

   const res = await getMyProfile();
   const data = res.data || {};

   setFormData({
     name: data.name || "",
     batchYear: data.batchYear || "",
     department: data.department || "",
     profession: data.profession || "",
     location: data.location || "",
     contact: data.contact || "",
     isMentor: data.isMentor || false,

     skills: data.skills
       ? data.skills.split(",")
       : []
   });

 }catch(err){
   console.log(err);
 }finally{
   setLoading(false);
 }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {

    const payload = {
      name: formData.name,
      batchYear: formData.batchYear,
      department: formData.department,
      profession: formData.profession,
      location: formData.location,
      contact: formData.contact,
      skills: formData.skills.join(","),
      isMentor: formData.isMentor
    };

    console.log("Sending payload:", payload);

    await updateProfile(payload);

    alert("Profile Updated Successfully");

  } catch (err) {

    console.log("Update Error:", err.response?.data || err.message);

    alert("Profile update failed");

  } finally {
    setSaving(false);
  }
};
const addSkill = ()=>{
if(newSkill.trim()){
setFormData({
...formData,
skills:[...formData.skills,newSkill.trim()]
});
setNewSkill("");
}
};

const removeSkill=(index)=>{
setFormData({
...formData,
skills:formData.skills.filter((_,i)=>i!==index)
});
};

if(loading){
return <div className="text-center mt-20 text-lg">Loading...</div>
}

return(

<div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 p-6">

<div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">

<h2 className="text-2xl font-bold mb-6">My Profile</h2>

<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

{/* Full Name */}
<div>
<label className="block text-sm font-medium">Full Name</label>
<input
type="text"
value={formData.name || ""}
onChange={(e)=>setFormData({...formData,name:e.target.value})}
className="w-full border rounded p-2 mt-1"
/>
</div>

{/* Batch */}
<div>
<label className="block text-sm font-medium">Batch Year</label>
<input
type="number"
value={formData.batchYear || ""}
onChange={(e)=>setFormData({...formData,batchYear:e.target.value})}
className="w-full border rounded p-2 mt-1"
/>
</div>

{/* Department */}
<div>
<label className="block text-sm font-medium">Department</label>
<select
value={formData.department || ""}
onChange={(e)=>setFormData({...formData,department:e.target.value})}
className="w-full border rounded p-2 mt-1"
>
<option value="">Select Department</option>
{DEPARTMENTS.map((dept)=>(
<option key={dept} value={dept}>{dept}</option>
))}
</select>
</div>

{/* Profession */}
<div>
<label className="block text-sm font-medium">Profession</label>
<input
type="text"
value={formData.profession || ""}
onChange={(e)=>setFormData({...formData,profession:e.target.value})}
className="w-full border rounded p-2 mt-1"
/>
</div>

{/* Contact */}
<div>
<label className="block text-sm font-medium">Contact</label>
<input
type="text"
value={formData.contact || ""}
onChange={(e)=>setFormData({...formData,contact:e.target.value})}
className="w-full border rounded p-2 mt-1"
/>
</div>

{/* Location */}
<div>
<label className="block text-sm font-medium">Location</label>
<input
type="text"
value={formData.location || ""}
onChange={(e)=>setFormData({...formData,location:e.target.value})}
className="w-full border rounded p-2 mt-1"
/>
</div>

{/* Skills */}
<div className="md:col-span-2">

<label className="block text-sm font-medium mb-2">Skills</label>

<div className="flex gap-2 mb-3">
<input
value={newSkill}
onChange={(e)=>setNewSkill(e.target.value)}
className="border rounded p-2 flex-1"
/>

<button
type="button"
onClick={addSkill}
className="bg-indigo-600 text-white px-4 rounded"
>
Add
</button>
</div>

<div className="flex flex-wrap gap-2">
{formData.skills.map((skill,i)=>(
<span
key={i}
className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
>
{skill}
<X
className="w-3 h-3 cursor-pointer"
onClick={()=>removeSkill(i)}
/>
</span>
))}
</div>

</div>

{/* Mentor Switch */}
<div className="md:col-span-2 flex items-center justify-between mt-4">

<label className="font-medium">Become Mentor</label>

<input
type="checkbox"
checked={formData.isMentor}
onChange={(e)=>setFormData({...formData,isMentor:e.target.checked})}
/>

</div>

<button
type="submit"
disabled={saving}
className="md:col-span-2 bg-indigo-600 text-white py-2 rounded mt-4 hover:bg-indigo-700"
>
{saving ? "Saving..." : "Save Profile"}
</button>

</form>

</div>

</div>

);
}