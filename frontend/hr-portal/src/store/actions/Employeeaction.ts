import * as actions from "../actions/actionTypes";

// Payload type for fetch request (query params)
export interface FetchEmployeesPayload {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  isActive?: string; // ⭐ FIXED (was `active`)
}

// Employee type
export interface Employee {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

// Success payload type
export interface FetchEmployeesSuccessPayload {
  data: Employee[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalRecords: number;
  };
}

// ---------- ACTION CREATORS ---------- //

// Start fetch
export const fetchEmployees = (payload: FetchEmployeesPayload) => ({
  type: actions.FETCH_EMPLOYEES_START as const,
  payload,
});

// Success
export const fetchEmployeesSuccess = (
  payload: FetchEmployeesSuccessPayload
) => ({
  type: actions.FETCH_EMPLOYEES_SUCCEEDED as const,
  payload,
});

// Error
export const fetchEmployeesError = (error: string) => ({
  type: actions.FETCH_EMPLOYEES_FAILED as const,
  error,
});

// ---------- ACTION TYPES ---------- //

export type FetchEmployeesAction =
  | ReturnType<typeof fetchEmployees>
  | ReturnType<typeof fetchEmployeesSuccess>
  | ReturnType<typeof fetchEmployeesError>;
