import { useState } from "react";
import { createUser } from "../../services/apiService";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

function CreateAlumni(){

const [form,setForm] = useState({
email:"",
password:"",
role:"ALUMNI"
});

const [loading,setLoading] = useState(false);

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{
e.preventDefault();

try{
setLoading(true);
await createUser(form);

alert("Alumni created successfully");

setForm({
email:"",
password:"",
role:"ALUMNI"
});

}finally{
setLoading(false);
}
};

return(

<div className="flex justify-center p-10">

<form
onSubmit={handleSubmit}
className="glass-card p-8 w-full max-w-md space-y-6"
>

<h2 className="text-2xl font-bold text-center">
Create Alumni
</h2>

<input
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
className="glass-input w-full"
required
/>

<input
type="password"
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
className="glass-input w-full"
required
/>

<Button
type="submit"
className="w-full"
>
{loading ? "Creating..." : "Create Alumni"}
</Button>

</form>

</div>

);

}

export default CreateAlumni;