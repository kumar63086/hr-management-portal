import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/configureStore";
import { loginUser } from "../../store/actions/loginaction";
import { toast } from "react-toastify";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginFormInputs>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //  Select login state from Redux
  const { user, accessToken, error, loading } = useSelector(
    (state: RootState) => state.login
  );

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(
      loginUser({
        usernameOrEmail: data.email,
        password: data.password,
      })
    );
    
  };

  //  React to login success/failure
  useEffect(() => {
    if (user && accessToken) {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
    if (error) {
      toast.error(error);
    }
  }, [user, accessToken, error, navigate]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <span className="forgot-password">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </span>

        <button type="submit" disabled={isSubmitting || loading}>
          {isSubmitting || loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
