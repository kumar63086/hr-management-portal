import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import EmployeeButton from "../../../Button/AddButton";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/configureStore";
import { fetchEmployees } from "../../../../store/actions/Employeeaction";
import { EditEmployeeDetails, DeleteEmployee } from "../../../../utils/Api";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import EmployeeLogoutButton from "../../../AuthComponents/LogoutButton";


export default function DashboardPage() {
  const { user } = useSelector((s: RootState) => s.login);
  const { data: employees, pagination, loading } = useSelector((s: RootState) => s.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filters
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("");

  // Dialog state
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);

  // Toast state
  const [toast, setToast] = React.useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  // Fetch employees whenever filters change
  React.useEffect(() => {
    dispatch(fetchEmployees({ page: 1, limit: 10, search, role: roleFilter, active: activeFilter }));
  }, [dispatch, search, roleFilter, activeFilter]);

  // Handle Edit click
  const handleEditClick = (employee: any) => {
    setSelectedEmployee(employee);
    setOpenEdit(true);
  };

  // Handle View click
  const handleViewClick = (employee: any) => {
    setSelectedEmployee(employee);
    setOpenView(true);
  };

  // Handle Delete click
  const handleDeleteClick = async (id: string) => {
    try {
      await DeleteEmployee(id);
      setToast({ open: true, message: "Employee deleted successfully", severity: "success" });
      dispatch(fetchEmployees({ page: 1, limit: 10, search, role: roleFilter, active: activeFilter }));
    } catch (err: any) {
      setToast({ open: true, message: err.message || "Failed to delete employee", severity: "error" });
    }
  };

  // Handle Edit form submit
  const handleEditSave = async () => {
    if (!selectedEmployee) return;
    try {
      await EditEmployeeDetails(selectedEmployee._id, {
        skills: selectedEmployee.skills,
        availableSlots: selectedEmployee.availableSlots,
      });
      setToast({ open: true, message: "Employee updated successfully", severity: "success" });
      setOpenEdit(false);
      dispatch(fetchEmployees({ page: 1, limit: 10, search, role: roleFilter, active: activeFilter }));
    } catch (err: any) {
      setToast({ open: true, message: err.message || "Failed to update employee", severity: "error" });
    }
  };

  // DataGrid columns
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "isActive",
      headerName: "Status",
      width: 160,
      renderCell: (params) =>
        params.value ? <Chip label="Active" color="success" size="small" /> : <Chip label="Inactive" color="error" size="small" />,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" variant="contained" color="primary" onClick={() => handleViewClick(params.row)}>View</Button>
          {(user?.role === "Admin" || user?.role === "Editor") && (
            <Button size="small" variant="contained" color="warning" onClick={() => handleEditClick(params.row)}>Edit</Button>
          )}
          {user?.role === "Admin" && (
            <Button size="small" variant="contained" color="error" onClick={() => handleDeleteClick(params.row._id)}>Delete</Button>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">
          Welcome, {user?.name} <span style={{ color: "gray" }}>({user?.role})</span> <EmployeeButton />
        </Typography>
       
<EmployeeLogoutButton/>
        {/* Filters */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField size="small" placeholder="Search name/email" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select size="small" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Viewer">Viewer</MenuItem>
          </Select>
          <Select size="small" value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* DataGrid Table */}
      <DataGrid
        rows={employees}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={pagination.limit}
        rowCount={pagination.totalRecords}
        paginationMode="server"
        loading={loading}
        autoHeight
        disableSelectionOnClick
        onPageChange={(newPage) =>
          dispatch(fetchEmployees({ page: newPage + 1, limit: pagination.limit, search, role: roleFilter, active: activeFilter }))
        }
      />

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Employee
          <IconButton
            aria-label="close"
            onClick={() => setOpenEdit(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Skills (comma separated)"
            value={selectedEmployee?.skills.join(", ")}
            onChange={(e) => setSelectedEmployee({ ...selectedEmployee, skills: e.target.value.split(",").map(s => s.trim()) })}
          />
          <TextField
            label="Available Slots (comma separated ISO)"
            value={selectedEmployee?.availableSlots.join(", ")}
            onChange={(e) => setSelectedEmployee({ ...selectedEmployee, availableSlots: e.target.value.split(",").map(s => s.trim()) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Employee Details
          <IconButton
            aria-label="close"
            onClick={() => setOpenView(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography><strong>Name:</strong> {selectedEmployee.name}</Typography>
              <Typography><strong>Email:</strong> {selectedEmployee.email}</Typography>
              <Typography><strong>Role:</strong> {selectedEmployee.role}</Typography>
              <Typography><strong>Skills:</strong> {selectedEmployee.skills.join(", ")}</Typography>
              <Typography><strong>Available Slots:</strong> {selectedEmployee.availableSlots.join(", ")}</Typography>
              <Typography><strong>Status:</strong> {selectedEmployee.isActive ? "Active" : "Inactive"}</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={toast.open}

        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
