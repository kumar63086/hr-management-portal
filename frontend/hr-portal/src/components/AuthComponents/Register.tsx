import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./RegistrationForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/configureStore";
import { registerUser } from "../../store/actions/Resiteraction";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();

  // Select registration state from Redux
  const { success, error } = useSelector((s: RootState) => s.registration);

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    dispatch(registerUser(data));
  };

  // Navigate to login on success
  useEffect(() => {
    if (success) {

       toast.success("Registration successful!");
      navigate("/");
    }
  }, [success, navigate]);

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
        <h2>Register User</h2>

        <label>First Name</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        <label>Last Name</label>
        <input {...register("username", { required: "Username is required" })} />
        {errors.username && <p className="error-message">{errors.username.message}</p>}

        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <label>Role</label>
        <select {...register("role", { required: "Role is required" })}>
          <option value="">Select role</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        {errors.role && <p className="error-message">{errors.role.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        {error && <p className="error-message">{error}</p>}

        <span className="forgot-password">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegistrationForm;
