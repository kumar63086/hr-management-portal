import { postData } from "../axios/axiosbase";

// Registration payload
export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "Admin" | "Editor" | "Viewer";
}

// Registration response
export interface RegisterResponse {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

// Login payload
export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}


// Login response
export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

// Registration service function
export const registerUser = (payload: RegisterPayload) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  return postData<RegisterResponse>(`${BASE_URL}/auth/register`, payload);
};

// Login service function
export const loginApi = (payload: LoginPayload) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  return postData<LoginResponse>(`${BASE_URL}/auth/login`, payload);
};
