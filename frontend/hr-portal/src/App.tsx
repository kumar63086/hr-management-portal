import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/components/modules/pages/Dashboard/Ddashboard";

import Unauthorized from "../src/components/Common/PageNotFound";
import Login from "../src/components/AuthComponents/Login";
import { RoleProtectedRoute } from "../src/routes/RoleProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistrationForm from "../src/components/AuthComponents/Register"
import EmployeeForm from "./components/modules/pages/Employees/EmployeeForm";
import PageNotFound from "../src/components/Common/PageNotFound";
function AppRoutes() {
  return (
    <>
    <Routes >
      <Route path="/" element={<Login />} />
       <Route path="/register" element={<RegistrationForm />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/emloyeeForm" element={<EmployeeForm />} />
      <Route path="*" element={<PageNotFound />} />
   
      {/* Any logged-in user can access Dashboard */}
      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["Admin", "Editor", "Viewer"]}>
            <Dashboard />
          </RoleProtectedRoute>
        }
      />

     
      
    </Routes>
  <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
}


export default AppRoutes;
