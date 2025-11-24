import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./RegistrationForm.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/configureStore";
import { registerUser } from "../../store/actions/Resiteraction";

type RegisterFormInputs = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "Admin" | "Editor" | "Viewer";
};

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log("Form submitted:", data);
    // Dispatch Redux action to trigger saga
    dispatch(registerUser(data));
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
        <h2>Register User</h2>

        {/* Name */}
        <label>Name</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        {/* Username */}
        <label>Username</label>
        <input {...register("username", { required: "Username is required" })} />
        {errors.username && <p className="error-message">{errors.username.message}</p>}

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        {/* Password */}
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        {/* Role */}
        <label>Role</label>
        <select {...register("role", { required: "Role is required" })}>
          <option value="">Select role</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        {errors.role && <p className="error-message">{errors.role.message}</p>}

        {/* Submit */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <span className="forgot-password">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegistrationForm;
