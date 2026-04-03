import { useEffect, useState } from "react";
import {
  getMentors,
  sendMentorshipRequest,
  getMyMentorshipRequests,
  getReceivedRequests,
  updateMentorshipStatus,
  becomeMentor
} from "../../services/apiService";

import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function Mentorship() {

const [mentors,setMentors] = useState([]);
const [myRequests,setMyRequests] = useState([]);
const [received,setReceived] = useState([]);
const [error,setError] = useState("");
const [loading,setLoading] = useState(false);

const [mentorForm,setMentorForm] = useState({
company:"",
designation:"",
location:"",
bio:"",
expertiseAreas:""
});

const [requestForm,setRequestForm] = useState({
areaOfInterest:"",
message:""
});

useEffect(()=>{
loadMentors();
loadMyRequests();
loadReceived();
},[]);


// ================= LOAD DATA =================

const loadMentors = async()=>{
setLoading(true);
try{
const res = await getMentors();
setMentors(res.data);
}catch{
setError("Failed to load mentors");
}
setLoading(false);
};

const loadMyRequests = async()=>{
try{
const res = await getMyMentorshipRequests();
setMyRequests(res.data);
}catch{
setError("Failed to load requests");
}
};

const loadReceived = async()=>{
try{
const res = await getReceivedRequests();
setReceived(res.data);
}catch{
setError("Failed to load received requests");
}
};


// ================= BECOME MENTOR =================

const handleBecomeMentor = async()=>{
try{

const payload={
...mentorForm,
expertiseAreas:mentorForm.expertiseAreas.split(",")
};

await becomeMentor(payload);

setMentorForm({
company:"",
designation:"",
location:"",
bio:"",
expertiseAreas:""
});

loadMentors();

}catch(err){
setError(err.response?.data || "Failed to become mentor");
}
};


// ================= SEND REQUEST =================

const sendRequest = async(mentorId)=>{

if(!requestForm.areaOfInterest){
setError("Area of interest is required");
return;
}

try{

await sendMentorshipRequest(mentorId,requestForm);

setRequestForm({
areaOfInterest:"",
message:""
});

loadMyRequests();

}catch{
setError("Failed to send request");
}

};


// ================= UPDATE STATUS =================

const updateStatus = async(id,status)=>{

try{
await updateMentorshipStatus(id,status);
loadReceived();
}catch{
setError("Failed to update request");
}

};


// ================= LOADER =================

if(loading) return <Loader/>;


// ================= UI =================

return(

<div className="p-8 space-y-10">

<h1 className="text-3xl font-bold">
Mentorship Program
</h1>


{/* ERROR */}

{error && (

<div className="glass-card p-4 text-red-500">
{error}
</div>

)}



{/* ================= BECOME MENTOR ================= */}

<div className="glass-card p-6 space-y-4">

<h2 className="text-xl font-semibold">
Become a Mentor
</h2>

<div className="grid md:grid-cols-2 gap-4">

<input
className="glass-input"
placeholder="Company"
value={mentorForm.company}
onChange={e=>setMentorForm({...mentorForm,company:e.target.value})}
/>

<input
className="glass-input"
placeholder="Designation"
value={mentorForm.designation}
onChange={e=>setMentorForm({...mentorForm,designation:e.target.value})}
/>

<input
className="glass-input"
placeholder="Location"
value={mentorForm.location}
onChange={e=>setMentorForm({...mentorForm,location:e.target.value})}
/>

<input
className="glass-input"
placeholder="Expertise (comma separated)"
value={mentorForm.expertiseAreas}
onChange={e=>setMentorForm({...mentorForm,expertiseAreas:e.target.value})}
/>

<textarea
className="glass-input md:col-span-2"
placeholder="Bio"
value={mentorForm.bio}
onChange={e=>setMentorForm({...mentorForm,bio:e.target.value})}
/>

</div>

<Button onClick={handleBecomeMentor}>
Become Mentor
</Button>

</div>



{/* ================= FIND MENTORS ================= */}

<h2 className="text-2xl font-semibold">
Find Mentors
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{mentors.map((m)=>(

<div key={m.id} className="glass-card p-6 card-hover">

<h3 className="text-xl font-bold mb-2">
{m.user?.name || "Mentor"}
</h3>

<p className="text-sm text-gray-700">
{m.company} • {m.designation}
</p>

<p className="text-sm text-gray-600">
{m.location}
</p>


<div className="mt-4 space-y-2">

<input
className="glass-input w-full"
placeholder="Area of Interest"
value={requestForm.areaOfInterest}
onChange={e=>setRequestForm({...requestForm,areaOfInterest:e.target.value})}
/>

<input
className="glass-input w-full"
placeholder="Message"
value={requestForm.message}
onChange={e=>setRequestForm({...requestForm,message:e.target.value})}
/>

<Button onClick={()=>sendRequest(m.id)}>
Send Request
</Button>

</div>

</div>

))}

</div>



{/* ================= MY REQUESTS ================= */}

<h2 className="text-2xl font-semibold mt-10">
My Requests
</h2>

<div className="grid md:grid-cols-2 gap-6">

{myRequests.map((r)=>(

<div key={r.id} className="glass-card p-5">

<p><b>Area:</b> {r.areaOfInterest}</p>

<p><b>Message:</b> {r.message}</p>

<p className="text-indigo-500">
<b>Status:</b> {r.status}
</p>

</div>

))}

</div>



{/* ================= RECEIVED REQUESTS ================= */}

<h2 className="text-2xl font-semibold mt-10">
Requests For Me
</h2>

<div className="grid md:grid-cols-2 gap-6">

{received.map((r)=>(

<div key={r.id} className="glass-card p-5">

<p><b>Area:</b> {r.areaOfInterest}</p>

<p><b>Message:</b> {r.message}</p>

<p><b>Status:</b> {r.status}</p>

{r.status==="PENDING" && (

<div className="flex gap-3 mt-3">

<Button
variant="success"
onClick={()=>updateStatus(r.id,"ACCEPTED")}
>
Accept
</Button>

<Button
variant="danger"
onClick={()=>updateStatus(r.id,"REJECTED")}
>
Reject
</Button>

</div>

)}

</div>

))}

</div>

</div>

);

}