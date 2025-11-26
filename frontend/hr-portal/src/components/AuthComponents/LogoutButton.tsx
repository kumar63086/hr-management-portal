import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";  // ✅ import useNavigate
import { employeeLogoutRequest } from "../../store/actions/EmployeLogoutactions";
import type { RootState } from "../../store/configureStore";
import { Button } from "@mui/material";

const EmployeeLogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Select the logout state from Redux to listen for the success action
  const { isLoggedOut, loading } = useSelector((state: RootState) => state.employeeLogout);

  const handleLogout = () => {
    dispatch(employeeLogoutRequest()); // Dispatch logout request
  };

  // Use useEffect to listen for logout success and then navigate
  useEffect(() => {
    if (isLoggedOut) {
      // Redirect to login page after logout success
      navigate("/register");
    }
  }, [isLoggedOut, navigate]);

  return (
    <Button variant="contained"
      sx={{
        backgroundColor: "#1976d2", // Blue
        color: "white",
        "&:hover": {
          backgroundColor: "black", // Turns black on hover
        },
      }} onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default EmployeeLogoutButton;
