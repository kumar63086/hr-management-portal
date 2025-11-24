import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/configureStore";
import { loginUser } from "../../store/actions/loginaction";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginFormInputs>();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(
      loginUser({
        usernameOrEmail: data.email,   // FIXED
        password: data.password
      })
    );
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <span className="forgot-password">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-600 underline">Register</Link>
        </span>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
