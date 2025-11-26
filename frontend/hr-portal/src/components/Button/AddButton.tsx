
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const EmployeeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/emloyeeForm"); 
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#1976d2", // Blue
        color: "white",
        "&:hover": {
          backgroundColor: "black", // Turns black on hover
        },
      }}
      onClick={handleClick}
    >
      AddEmployee
    </Button>
  );
};

export default EmployeeButton;

