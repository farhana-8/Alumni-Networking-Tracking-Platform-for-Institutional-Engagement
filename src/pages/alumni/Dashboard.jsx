import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Loader from "../../components/Loader";

import {
Users,
Calendar,
MessageSquare,
Award,
Bell
} from "lucide-react";

import {
getAlumni,
getEvents,
getAnnouncements,
getPosts,
getMentors
} from "../../services/apiService";

function Dashboard(){

const [alumni,setAlumni] = useState([]);
const [events,setEvents] = useState([]);
const [announcements,setAnnouncements] = useState([]);
const [posts,setPosts] = useState([]);
const [mentors,setMentors] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{
load();
},[]);

const load = async()=>{

try{

const alumniRes = await getAlumni();
setAlumni(alumniRes.data);

const eventRes = await getEvents();
setEvents(eventRes.data);

const announceRes = await getAnnouncements();
setAnnouncements(announceRes.data);

const postRes = await getPosts();
setPosts(postRes.data);

const mentorRes = await getMentors();
setMentors(mentorRes.data);

}catch(err){
console.log(err);
}

setLoading(false);

};

if(loading) return <Loader/>

return(

<div className="p-8 space-y-10">

{/* Welcome */}

<div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl text-white">

<h1 className="text-3xl font-bold mb-2">
Welcome Back 👋
</h1>

<p className="text-indigo-100">
Stay connected with alumni network and explore opportunities.
</p>

</div>


{/* Stats */}

<div className="grid grid-cols-4 gap-6">

<div className="glass-card p-6">
<div className="flex items-center gap-3">
<Users className="text-indigo-500"/>
<p>Total Alumni</p>
</div>
<h2 className="text-3xl font-bold mt-3">
{alumni.length}
</h2>
</div>


<div className="glass-card p-6">
<div className="flex items-center gap-3">
<Calendar className="text-purple-500"/>
<p>Events</p>
</div>
<h2 className="text-3xl font-bold mt-3">
{events.length}
</h2>
</div>


<div className="glass-card p-6">
<div className="flex items-center gap-3">
<MessageSquare className="text-green-500"/>
<p>Forum Posts</p>
</div>
<h2 className="text-3xl font-bold mt-3">
{posts.length}
</h2>
</div>


<div className="glass-card p-6">
<div className="flex items-center gap-3">
<Award className="text-yellow-500"/>
<p>Mentors</p>
</div>
<h2 className="text-3xl font-bold mt-3">
{mentors.length}
</h2>
</div>

</div>


<div className="grid grid-cols-3 gap-8">


{/* EVENTS */}

<div className="col-span-2 glass-card p-6">

<div className="flex justify-between mb-5">

<h2 className="text-xl font-semibold">
Upcoming Events
</h2>

<Link to="/alumni/events" className="text-indigo-500">
View All
</Link>

</div>


{events.slice(0,3).map(event=>(

<div key={event.id}
className="flex justify-between items-center p-4 border-b border-gray-700">

<div>

<h4 className="font-semibold">
{event.title}
</h4>

<p className="text-sm text-gray-600">
{event.location}
</p>

</div>

<p className="text-sm text-indigo-500">
{event?.date && !isNaN(new Date(event.date))
  ? format(new Date(event.date), "d")
  : "-"
}
</p>

</div>

))}

</div>



{/* ANNOUNCEMENTS */}

<div className="glass-card p-6">

<div className="flex justify-between mb-5">

<h2 className="text-xl font-semibold flex items-center gap-2">
<Bell size={18}/>
Announcements
</h2>

<Link to="/alumni/announcement" className="text-indigo-500">
View All
</Link>

</div>

{announcements.slice(0,4).map(a=>(

<div key={a.id}
className="border-b border-gray-800 pb-3 mb-3">

<p className="text-sm text-indigo-600">
{a.category}
</p>

<h4 className="font-semibold">
{a.title}
</h4>

<p className="text-xs text-gray-600">
{a.content.substring(0,80)}...
</p>

</div>

))}

</div>


</div>



{/* POSTS */}

<div className="glass-card p-6">

<h2 className="text-xl font-semibold mb-5">
Recent Discussions
</h2>

{posts.slice(0,5).map(p=>(

<div key={p.id}
className="border-b border-gray-700 pb-4 mb-4">

<h4 className="font-semibold">
{p.title}
</h4>

<p className="text-sm text-gray-600">
{p.content.substring(0,120)}...
</p>

</div>

))}

</div>


</div>

)

}

export default Dashboard;