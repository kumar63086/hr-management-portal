import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createEmployeeRequest } from "../../../../store/actions/EmployeeCreateaction";

// Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  role: yup.string().oneOf(["Admin", "Editor", "Viewer"]).required("Role is required"),
  isActive: yup.boolean().required("Active status is required"),
  skills: yup
    .array()
    .of(yup.string().required("Skill is required"))
    .min(1, "At least one skill is required"),
  availableSlots: yup
    .array()
    .of(yup.string().required("Slot is required"))
    .min(1, "At least one slot is required"),
  address: yup.object({
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
    zipcode: yup.string().required("Zipcode is required"),
  }),
  company: yup.object({
    name: yup.string().required("Company name is required"),
  }),
});

export interface EmployeeFormValues {
  name: string;
  username: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  isActive: boolean;
  skills: string[];
  availableSlots: string[];
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

export default function EmployeeForm({
  defaultValues,
}: {
  defaultValues?: Partial<EmployeeFormValues>;
}) {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm<EmployeeFormValues>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      role: "Viewer",
      isActive: true,
      skills: [""],
      availableSlots: [""],
      address: {
        street: "",
        city: "",
        zipcode: "",
      },
      company: {
        name: "",
      },
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });

  // Dynamic Skills FieldArray
  const { fields: skillFields, append: addSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills",
  });

  // Dynamic Available Slots FieldArray
  const { fields: slotFields, append: addSlot, remove: removeSlot } = useFieldArray({
    control,
    name: "availableSlots",
  });

  const submitHandler = (data: EmployeeFormValues) => {
    dispatch(createEmployeeRequest(data)); // Redux Saga triggers API
    toast.success("Employee submission started...");
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Employee Form
      </Typography>

      {/* Name */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Username */}
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Username"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Role */}
      <Controller
        name="role"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label="Role"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            SelectProps={{ native: true }}
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </TextField>
        )}
      />

      {/* Active */}
      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Active" />
        )}
      />

      {/* Skills */}
      <Typography mt={2}>Skills</Typography>
      {skillFields.map((skill, index) => (
        <Box key={skill.id} display="flex" alignItems="center" gap={1} mt={1}>
          <Controller
            name={`skills.${index}`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={`Skill ${index + 1}`}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <IconButton onClick={() => removeSkill(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<Add />} onClick={() => addSkill("")}>
        Add Skill
      </Button>

      {/* Available Slots */}
      <Typography mt={2}>Available Slots</Typography>
      {slotFields.map((slot, index) => (
        <Box key={slot.id} display="flex" alignItems="center" gap={1} mt={1}>
          <Controller
            name={`availableSlots.${index}`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="datetime-local"
                label={`Slot ${index + 1}`}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <IconButton onClick={() => removeSlot(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<Add />} onClick={() => addSlot("")}>
        Add Slot
      </Button>

      {/* Address */}
      <Typography mt={2}>Address</Typography>
      <Controller
        name="address.street"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Street"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="address.city"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="City"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="address.zipcode"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Zipcode"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Company Name */}
      <Typography mt={2}>Company</Typography>
      <Controller
        name="company.name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Company Name"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Submit Button */}
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Employee
        </Button>
      </Box>
    </Box>
  );
}
