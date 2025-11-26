import { deleteData, getData, postData, putData } from "../axios/axiosbase";
import Cookies from "js-cookie";

// --- Registration ---
export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "Admin" | "Editor" | "Viewer";
}

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

// --- Login ---
export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

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

export const registerUser = (payload: RegisterPayload) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  return postData<RegisterResponse>(`${BASE_URL}/auth/register`, payload);
};

export const loginApi = (payload: LoginPayload) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  return postData<LoginResponse>(`${BASE_URL}/auth/login`, payload);
};
export const logout = async (): Promise<void> => {
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  
  await getData<void>(`${BASE_URL}/auth/logout`); // GET request to backend
};





// --- Employee ---
export interface Employee {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer" | "Developer";
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
  createdAt: string;
  updatedAt: string;
}

export interface EmployeePayload {
  name: string;
  username: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer" ;
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

export interface EmployeesResponse {
  data: Employee[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalRecords: number;
  };
}

// --- Employee API ---
export const getAllEmployees = (
  page = 1,
  limit = 10,
  search = "",
  role = "",
  isActive = ""
) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  if (search) params.append("search", search);
  if (role) params.append("role", role);
  if (isActive) params.append("isActive", isActive);
  return getData<EmployeesResponse>(`${BASE_URL}/employees?${params.toString()}`);
};



export const viewEmployeeDetails = (id: string) => {
  
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  return getData<Employee>(`${BASE_URL}/employees/${id}`);
};



export const EditEmployeeDetails = (id: string, payload: Partial<Employee>) => {
  
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  return putData<Employee>(`${BASE_URL}/employees/${id}`, payload);
};

export const DeleteEmployee = (id: string) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  return deleteData(`${BASE_URL}/employees/${id}`);
};

export const createEmployees = (payload: EmployeePayload) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  return postData<Employee>(`${BASE_URL}/employees/create`, payload);
};
