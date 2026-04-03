import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";

import Dashboard from "../pages/admin/Dashboard";
import CreateAlumni from "../pages/admin/CreateAlumni";
import ManageAlumni from "../pages/admin/ManageAlumni";
import EventsManager from "../pages/admin/EventsManager";
import Announcement from "../pages/admin/Announcement";

function AdminRoutes() {

  return (

<div>

<Navbar />

<div className="p-6">

<Routes>

<Route path="dashboard" element={<Dashboard />} />
<Route path="create-alumni" element={<CreateAlumni />} />
<Route path="manage-alumni" element={<ManageAlumni />} />
<Route path="events-manager" element={<EventsManager />} />
<Route path="announcement" element={<Announcement />} />

</Routes>

</div>

</div>

  );

}

export default AdminRoutes;