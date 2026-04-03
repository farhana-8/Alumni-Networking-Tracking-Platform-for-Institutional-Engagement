import { useEffect, useState } from "react";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent
} from "../../services/apiService";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

function EventsManager() {

  const [events,setEvents] = useState([]);
  const [loading,setLoading] = useState(false);
  const [editingId,setEditingId] = useState(null);

  const [formData,setFormData] = useState({
    title:"",
    description:"",
    location:"",
    eventDate:"",
    maxSeats:""
  });

  useEffect(()=>{
    loadEvents();
  },[]);

  const loadEvents = async()=>{
    try{
      setLoading(true);
      const res = await getEvents();
      setEvents(res.data);
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  };

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const resetForm=()=>{
    setFormData({
      title:"",
      description:"",
      location:"",
      eventDate:"",
      maxSeats:""
    });
    setEditingId(null);
  };

  const handleCreateOrUpdate = async()=>{
    try{
      if(editingId){
        await updateEvent(editingId,formData);
      }else{
        await createEvent(formData);
      }
      resetForm();
      loadEvents();
    }catch(err){
      console.error(err);
    }
  };

  const handleEdit=(event)=>{
    setEditingId(event.id);
    setFormData({
      title:event.title || "",
      description:event.description || "",
      location:event.location || "",
      eventDate:event.eventDate || "",
      maxSeats:event.maxSeats || ""
    });
  };

  const handleDelete=async(id)=>{
    if(!window.confirm("Delete this event?")) return;
    await deleteEvent(id);
    loadEvents();
  };

  return(

<div className="p-8 space-y-8">

<h1 className="text-3xl font-bold">
Events Manager
</h1>

<div className="glass-card p-6 space-y-4">

<input
name="title"
placeholder="Event title"
value={formData.title}
onChange={handleChange}
className="glass-input w-full"
/>

<input
name="description"
placeholder="Description"
value={formData.description}
onChange={handleChange}
className="glass-input w-full"
/>

<input
name="location"
placeholder="Location"
value={formData.location}
onChange={handleChange}
className="glass-input w-full"
/>

<input
type="datetime-local"
name="eventDate"
value={formData.eventDate}
onChange={handleChange}
className="glass-input w-full"
/>

<input
type="number"
name="maxSeats"
placeholder="Max Seats"
value={formData.maxSeats}
onChange={handleChange}
className="glass-input w-full"
/>

<div className="flex gap-3">

<Button onClick={handleCreateOrUpdate}>
{editingId ? "Update Event" : "Create Event"}
</Button>

{editingId && (
<Button onClick={resetForm} variant="secondary">
Cancel
</Button>
)}

</div>

</div>

{loading && <Loader/>}

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{events.map(e=>(

<div key={e.id} className="glass-card p-6 card-hover">

<h3 className="text-xl font-bold mb-2">
{e.title}
</h3>

<p className="text-gray-900">
{e.description}
</p>

<p className="text-sm text-gray-900 mt-2">
{e.location}
</p>

<p className="text-sm text-gray-900">
{new Date(e.eventDate).toLocaleString()}
</p>

{e.maxSeats && (
<p className="text-sm text-gray-900">
Seats: {e.maxSeats}
</p>
)}

<div className="flex gap-2 mt-4">

<Button
variant="warning"
onClick={()=>handleEdit(e)}
>
Edit
</Button>

<Button
variant="danger"
onClick={()=>handleDelete(e.id)}
>
Delete
</Button>

</div>

</div>

))}

</div>

</div>

  );
}

export default EventsManager;