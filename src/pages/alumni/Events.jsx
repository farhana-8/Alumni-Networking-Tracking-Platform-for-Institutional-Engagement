import { useEffect, useState } from "react";
import {
  getEvents,
  registerEvent,
  getMyRegistrations
} from "../../services/apiService";

import Loader from "../../components/Loader";
import Button from "../../components/Button";

function Events(){

const [events,setEvents] = useState([]);
const [registered,setRegistered] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

load();

},[]);

const load = async ()=>{

try{

const eventsRes = await getEvents();
const regRes = await getMyRegistrations();

setEvents(eventsRes.data);

// extract event ids
const ids = regRes.data.map(r => r.event.id);
setRegistered(ids);

}catch(err){

console.error(err);

}

setLoading(false);

};

const register = async(id)=>{

try{

await registerEvent(id);

alert("Registered successfully");

// update UI immediately
setRegistered(prev => [...prev,id]);

}catch(err){

alert(err.response?.data || "Already registered");

}

};

if(loading) return <Loader/>;

return(

<div className="p-8">

<h1 className="text-3xl font-bold mb-8">
Events
</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{events.map(e=>{

const isRegistered = registered.includes(e.id);
const isFull = e.maxSeats && e.registeredCount >= e.maxSeats;

return(

<div
key={e.id}
className="glass-card p-6 card-hover"
>

<h3 className="text-xl font-bold mb-2">
{e.title}
</h3>

<p className="text-gray-900 mb-4">
{e.description}
</p>

<p className="text-sm text-gray-900 mb-2">
📍 {e.location}
</p>

<p className="text-sm text-gray-900 mb-2">
📅 {new Date(e.eventDate).toLocaleDateString()}
</p>

<p className="text-sm text-gray-700 mb-4">
👥 {e.registeredCount || 0}
{e.maxSeats && ` / ${e.maxSeats}`} Registered
</p>

{isRegistered ? (

<Button
disabled
className="w-full bg-green-600"
>
Registered
</Button>

) : isFull ? (

<Button
disabled
className="w-full bg-gray-500"
>
Event Full
</Button>

) : (

<Button
onClick={()=>register(e.id)}
className="w-full bg-blue-600 hover:bg-blue-700"
>
Register
</Button>

)}

</div>

);

})}

</div>

</div>

);

}

export default Events;