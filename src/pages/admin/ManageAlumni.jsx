import { useEffect,useState } from "react";
import { getAllUsers,verifyUser,deleteUser } from "../../services/apiService";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

function ManageAlumni(){

const [alumni,setAlumni] = useState([]);
const [loading,setLoading] = useState(false);
const [search,setSearch] = useState("");

useEffect(()=>{
loadAlumni();
},[]);

const loadAlumni = async()=>{
try{
setLoading(true);
const res = await getAllUsers();
setAlumni(res.data.filter(u=>u.role==="ALUMNI"));
}finally{
setLoading(false);
}
};

const handleApprove=async(id)=>{
await verifyUser(id);
loadAlumni();
};

const handleDelete=async(id)=>{
if(!window.confirm("Delete alumni?")) return;
await deleteUser(id);
loadAlumni();
};

const filtered = alumni.filter(a =>
a.email.toLowerCase().includes(search.toLowerCase())
);

return(

<div className="p-8 space-y-6">

<h1 className="text-3xl font-bold">
Manage Alumni
</h1>

<div className="flex gap-4">

<input
placeholder="Search alumni..."
className="glass-input w-80"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<Button onClick={loadAlumni}>
Refresh
</Button>

</div>

{loading && <Loader/>}

<div className="glass-card overflow-x-auto">

<table className="w-full text-left">

<thead className="border-b border-white/20">

<tr>
<th className="p-4">ID</th>
<th>Email</th>
<th>Role</th>
<th>Status</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{filtered.map(a=>(

<tr key={a.id} className="border-t border-white/10">

<td className="p-4">{a.id}</td>
<td>{a.email}</td>
<td>{a.role}</td>

<td>

{a.verified ? (

<span className="text-green-400 font-semibold">
Verified
</span>

):(

<span className="text-yellow-400 font-semibold">
Pending
</span>

)}

</td>

<td className="flex gap-2 py-3">

{!a.verified && (

<Button
variant="success"
onClick={()=>handleApprove(a.id)}
>
Verify
</Button>

)}

<Button
variant="danger"
onClick={()=>handleDelete(a.id)}
>
Delete
</Button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

export default ManageAlumni;