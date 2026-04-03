import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";

import Dashboard from "../pages/alumni/Dashboard";
import Directory from "../pages/alumni/AlumniDirectory";
import Events from "../pages/alumni/Events";
import Posts from "../pages/alumni/Posts";
import Profile from "../pages/alumni/Profile";
import Announcement from "../pages/alumni/Announcement";
import Mentor from "../pages/alumni/Mentorship"

function AlumniRoutes() {

  return (

<div>

<Navbar />

<div className="p-6">

<Routes>

<Route path="dashboard" element={<Dashboard />} />
<Route path="directory" element={<Directory />} />
<Route path="events" element={<Events />} />
<Route path="posts" element={<Posts />} />
<Route path="mentorship" element={<Mentor/>} />
<Route path="announcement" element={<Announcement />} />
<Route path="profile" element={<Profile />} />

</Routes>

</div>

</div>

  );

}

export default AlumniRoutes;