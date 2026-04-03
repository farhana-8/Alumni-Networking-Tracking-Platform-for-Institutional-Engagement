import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminRoutes from "./AdminRoutes";
import AlumniRoutes from "./AlumniRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Alumni routes */}
        <Route path="/alumni/*" element={<AlumniRoutes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;