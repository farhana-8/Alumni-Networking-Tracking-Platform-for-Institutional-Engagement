import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/apiService";
import Loader from "../../components/Loader";

function AdminDashboard() {

const [users,setUsers] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

load();

},[]);

const load = async ()=>{

try{

const res = await getAllUsers();
setUsers(res.data);

}catch(err){

console.log(err);

}

setLoading(false);

};

if(loading) return <Loader/>;

return(

<div className="p-8 space-y-8">

<h1 className="text-3xl font-bold">Admin Dashboard</h1>

<div className="grid grid-cols-4 gap-6">

<div className="glass-card p-6 card-hover">
<p>Total Users</p>
<h2 className="text-3xl font-bold">{users.length}</h2>
</div>

<div className="glass-card p-6 card-hover">
<p>Verified Users</p>
<h2 className="text-3xl font-bold text-green-400">
{users.filter(u=>u.verified).length}
</h2>
</div>

<div className="glass-card p-6 card-hover">
<p>Pending</p>
<h2 className="text-3xl font-bold text-red-400">
{users.filter(u=>!u.verified).length}
</h2>
</div>

<div className="glass-card p-6 card-hover">
<p>Alumni</p>
<h2 className="text-3xl font-bold">
{users.filter(u=>u.role==="ALUMNI").length}
</h2>
</div>

</div>

</div>

);

}

export default AdminDashboard;